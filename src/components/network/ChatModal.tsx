
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, X, User, MessageSquare } from "lucide-react";
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, getDocs } from 'firebase/firestore';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Card, CardContent } from "@/components/ui/card";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    profilePicture: string;
    isOnline: boolean;
  } | null;
}

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

const ChatModal = ({ isOpen, onClose, user }: ChatModalProps) => {
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(user);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch chat users (all users the current user has messaged with)
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userMap: Record<string, any> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const otherId = data.participants.find((id: string) => id !== currentUser.uid);
        if (!otherId) return;
        if (!userMap[otherId]) {
          userMap[otherId] = {
            id: otherId,
            lastMessage: data.content,
            lastMessageTime: data.timestamp,
            profilePicture: '', // You can fetch user profile if you store it elsewhere
            name: otherId, // Placeholder, ideally fetch user name
            isOnline: false, // Placeholder
          };
        }
        // Update last message if newer
        if (!userMap[otherId].lastMessageTime || (data.timestamp && data.timestamp.toMillis() > userMap[otherId].lastMessageTime.toMillis())) {
          userMap[otherId].lastMessage = data.content;
          userMap[otherId].lastMessageTime = data.timestamp;
        }
      });
      setChatUsers(Object.values(userMap));
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Fetch messages for selected user
  useEffect(() => {
    if (!selectedUser || !currentUser) {
      setMessages([]);
      return;
    }
        setLoading(true);
        setError(null);
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((m: any) => Array.isArray(m.participants) && m.participants.includes(selectedUser.id) && m.participants.includes(currentUser.uid));
      setMessages(msgs);
            setLoading(false);
    }, (err) => {
            setError('Failed to load messages.');
            setLoading(false);
          });
    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  // Listen for typing events in Firestore (add a 'typing' subcollection or field per chat)
  useEffect(() => {
    if (!selectedUser || !currentUser) return;
    const typingDocId = [currentUser.uid, selectedUser.id].sort().join('_');
    const typingRef = collection(db, 'typing');
    const unsubscribe = onSnapshot(typingRef, (snapshot) => {
      const typingDocs = snapshot.docs.map(doc => doc.data());
      const otherTyping = typingDocs.find(doc => doc.userId === selectedUser.id && doc.targetId === currentUser.uid && doc.isTyping);
      setIsOtherTyping(!!otherTyping);
    });
    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  // Send typing event when user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!selectedUser || !currentUser) return;
    const typingDocId = [currentUser.uid, selectedUser.id].sort().join('_');
    const typingRef = collection(db, 'typing');
    // Set typing true
    addDoc(typingRef, {
      userId: currentUser.uid,
      targetId: selectedUser.id,
      isTyping: true,
      timestamp: Date.now(),
    });
    // Set typing false after 2s of inactivity
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      addDoc(typingRef, {
        userId: currentUser.uid,
        targetId: selectedUser.id,
        isTyping: false,
        timestamp: Date.now(),
      });
    }, 2000);
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  }, [messages, selectedUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser && currentUser) {
      setError(null);
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: currentUser.uid,
          receiverId: selectedUser.id,
          participants: [currentUser.uid, selectedUser.id],
          content: newMessage,
          timestamp: serverTimestamp(),
          read: false,
        });
        setNewMessage("");
      } catch (err: any) {
        setError('Failed to send message: ' + (err?.message || 'Unknown error'));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat handler
  const handleClearChat = async () => {
    if (!selectedUser || !currentUser) return;
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'asc')
    );
    const snapshot = await getDocs(q);
    const batch = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (Array.isArray(data.participants) && data.participants.includes(selectedUser.id) && data.participants.includes(currentUser.uid)) {
        batch.push(deleteDoc(doc.ref));
      }
    });
    await Promise.all(batch);
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <TooltipProvider>
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl w-full max-w-3xl mx-3 sm:mx-auto h-[80vh] max-h-[700px] flex flex-row p-0">
          {/* Sidebar: Chat List */}
          <div className="w-1/3 min-w-[220px] max-w-xs border-r border-white/10 bg-black/80 flex flex-col">
            <div className="p-4 border-b border-white/10 text-lg font-bold text-white">Chats</div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {chatUsers.length === 0 && <div className="text-white/60 text-center mt-8">No conversations</div>}
              {chatUsers.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`flex items-center gap-3 p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${selectedUser && selectedUser.id === u.id ? 'bg-white/10' : ''}`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={u.profilePicture} alt={u.name} />
                    <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white truncate">{u.name}</span>
                      <span className="text-xs text-white/60">{u.lastMessageTime ? (u.lastMessageTime.toDate ? u.lastMessageTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : u.lastMessageTime) : ''}</span>
                    </div>
                    <p className="text-sm text-white/70 truncate">{u.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            {selectedUser && (
              <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedUser.profilePicture} alt={selectedUser.name} />
                    <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-white text-lg">{selectedUser.name}</DialogTitle>
                    <p className="text-sm text-white/60">
                      {selectedUser.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-red-400 hover:text-white hover:bg-red-500/20 border border-red-400 ml-2"
                >
                  Clear Chat
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Close chat</TooltipContent>
                </Tooltip>
              </DialogHeader>
            )}

            {/* Messages */}
            {selectedUser ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse custom-scrollbar" style={{ minHeight: 0 }} ref={messagesContainerRef}>
                {loading && <div className="text-white/60 text-center">Loading messages...</div>}
                {error && <div className="text-red-400 text-center">{error}</div>}
                <AnimatePresence>
                  {[...messages].reverse().map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.senderId === currentUser?.uid ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex flex-col max-w-[70%]">
                        <span className={`text-xs font-semibold mb-1 ${message.senderId === currentUser?.uid ? 'text-brand-pink text-right' : 'text-brand-purple text-left'}`} style={{ color: message.senderId === currentUser?.uid ? '#ff4ecd' : '#a259ff' }}>
                          {message.senderId === currentUser?.uid ? 'You' : selectedUser.name}
                        </span>
                        <div
                          className={`p-3 rounded-2xl ${
                            message.senderId === currentUser?.uid
                              ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                              : "bg-white/10 text-white border border-white/20"
                          }`}
                        >
                          <p className="text-sm" style={{ color: '#fff' }}>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1" style={{ color: '#fff' }}>
                            {message.timestamp?.toDate ? message.timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Typing indicator */}
                {isOtherTyping && (
                  <div className="flex items-center gap-2 px-4 pb-2">
                    <span className="text-xs text-brand-purple">{selectedUser.name} is typing</span>
                    <span className="flex gap-1">
                      <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/60 text-lg">Select a chat to start messaging</div>
            )}

            {/* Message Input */}
            {selectedUser && (
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-brand-purple/50"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || loading}
                        className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 px-3"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Send message</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
    </Dialog>
    </TooltipProvider>
  );
};

export default ChatModal;
