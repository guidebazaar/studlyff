
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, X, User } from "lucide-react";
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen || !user || !currentUser) {
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
        .filter((m: any) => Array.isArray(m.participants) && m.participants.includes(user.id) && m.participants.includes(currentUser.uid));
      setMessages(msgs);
            setLoading(false);
    }, (err) => {
            setError('Failed to load messages.');
            setLoading(false);
          });
    return () => unsubscribe();
  }, [isOpen, user, currentUser]);

  // Listen for typing events in Firestore (add a 'typing' subcollection or field per chat)
  useEffect(() => {
    if (!isOpen || !user || !currentUser) return;
    const typingDocId = [currentUser.uid, user.id].sort().join('_');
    const typingRef = collection(db, 'typing');
    const unsubscribe = onSnapshot(typingRef, (snapshot) => {
      const typingDocs = snapshot.docs.map(doc => doc.data());
      const otherTyping = typingDocs.find(doc => doc.userId === user.id && doc.targetId === currentUser.uid && doc.isTyping);
      setIsOtherTyping(!!otherTyping);
    });
    return () => unsubscribe();
  }, [isOpen, user, currentUser]);

  // Send typing event when user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!user || !currentUser) return;
    const typingDocId = [currentUser.uid, user.id].sort().join('_');
    const typingRef = collection(db, 'typing');
    // Set typing true
    addDoc(typingRef, {
      userId: currentUser.uid,
      targetId: user.id,
      isTyping: true,
      timestamp: Date.now(),
    });
    // Set typing false after 2s of inactivity
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      addDoc(typingRef, {
        userId: currentUser.uid,
        targetId: user.id,
        isTyping: false,
        timestamp: Date.now(),
      });
    }, 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && user && currentUser) {
      setError(null);
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: currentUser.uid,
          receiverId: user.id,
          participants: [currentUser.uid, user.id],
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

  if (!user) return null;

  return (
    <TooltipProvider>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl max-w-lg w-full mx-3 sm:mx-auto h-[80vh] max-h-[600px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                  user.isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
            <div>
              <DialogTitle className="text-white text-lg">{user.name}</DialogTitle>
              <p className="text-sm text-white/60">
                {user.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
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

        {/* Messages */}
        <div className="flex-1 overflow-y-scroll p-4 space-y-4">
          {loading && <div className="text-white/60 text-center">Loading messages...</div>}
          {error && <div className="text-red-400 text-center">{error}</div>}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.senderId === currentUser?.uid ? "justify-end" : "justify-start"
                }`}
              >
                  <div className="flex flex-col max-w-[70%]">
                    <span className={`text-xs font-semibold mb-1 ${message.senderId === currentUser?.uid ? 'text-brand-pink text-right' : 'text-brand-purple text-left'}`}>
                      {message.senderId === currentUser?.uid ? 'You' : user.name}
                    </span>
                <div
                      className={`p-3 rounded-2xl ${
                    message.senderId === currentUser?.uid
                      ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp?.toDate ? message.timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                  </p>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
          {/* Typing indicator */}
          {isOtherTyping && (
            <div className="flex items-center gap-2 px-4 pb-2">
              <span className="text-xs text-brand-purple">{user.name} is typing</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
            </div>
          )}
        </div>

        {/* Message Input */}
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
      </DialogContent>
    </Dialog>
    </TooltipProvider>
  );
};

export default ChatModal;
