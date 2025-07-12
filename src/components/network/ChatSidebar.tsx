import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MessageSquare,
    User,
    X,
    Send,
    Search,
    ChevronLeft,
    MoreVertical,
    Phone,
    Video,
    Image,
    Paperclip,
    Smile
} from "lucide-react";

interface ChatUser {
    id: number;
    name: string;
    profilePicture: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
}

interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
    timestamp: Date;
}

interface ChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock data for chat users
const mockChatUsers: ChatUser[] = [
    {
        id: 1,
        name: "Alex Johnson",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Thanks for connecting!",
        lastMessageTime: "2m ago",
        unreadCount: 2,
        isOnline: true,
    },
    {
        id: 2,
        name: "Emily Davis",
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        lastMessage: "When is the project due?",
        lastMessageTime: "1h ago",
        unreadCount: 0,
        isOnline: true,
    },
    {
        id: 3,
        name: "Ryan Lee",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Let's meet tomorrow to discuss the details",
        lastMessageTime: "3h ago",
        unreadCount: 0,
        isOnline: false,
    },
    {
        id: 4,
        name: "Lisa Patel",
        profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        lastMessage: "I'll send you the files soon",
        lastMessageTime: "Yesterday",
        unreadCount: 0,
        isOnline: false,
    },
    {
        id: 5,
        name: "Michael Chen",
        profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Check out this new open source repo!",
        lastMessageTime: "2d ago",
        unreadCount: 1,
        isOnline: true,
    },
    {
        id: 6,
        name: "Sarah Wilson",
        profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Let's collaborate on the ML project.",
        lastMessageTime: "3d ago",
        unreadCount: 0,
        isOnline: false,
    },
    {
        id: 7,
        name: "David Kim",
        profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Sent you the marketing plan.",
        lastMessageTime: "4d ago",
        unreadCount: 0,
        isOnline: true,
    },
    {
        id: 8,
        name: "Priya Sharma",
        profilePicture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Loved your design portfolio!",
        lastMessageTime: "5d ago",
        unreadCount: 0,
        isOnline: false,
    },
    {
        id: 9,
        name: "Jordan Smith",
        profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Let's catch up soon!",
        lastMessageTime: "6d ago",
        unreadCount: 0,
        isOnline: true,
    },
    {
        id: 10,
        name: "Sophia Rodriguez",
        profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Thanks for the feedback!",
        lastMessageTime: "1w ago",
        unreadCount: 0,
        isOnline: false,
    },
    {
        id: 11,
        name: "Aiden Park",
        profilePicture: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
        lastMessage: "See you at the event!",
        lastMessageTime: "1w ago",
        unreadCount: 0,
        isOnline: true,
    },
];

const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [visibleCount, setVisibleCount] = useState(4);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const filteredUsers = mockChatUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const visibleUsers = filteredUsers.slice(0, visibleCount);

    useEffect(() => {
        if (selectedUser) {
            // Simulate initial conversation
            setMessages([
                {
                    id: 1,
                    text: "Hi there! Thanks for connecting!",
                    sender: "other",
                    timestamp: new Date(Date.now() - 10000),
                },
                {
                    id: 2,
                    text: "Hello! Nice to meet you. I saw your profile and found your interests really interesting.",
                    sender: "me",
                    timestamp: new Date(Date.now() - 5000),
                },
            ]);
        }
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedUser) {
            const message: Message = {
                id: messages.length + 1,
                text: newMessage,
                sender: "me",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, message]);
            setNewMessage("");

            // Simulate response after a delay
            setTimeout(() => {
                const response: Message = {
                    id: messages.length + 2,
                    text: "That's great! I'd love to learn more about your projects.",
                    sender: "other",
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, response]);
            }, 1000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleUserSelect = (user: ChatUser) => {
        setSelectedUser(user);
    };

    const handleBackToList = () => {
        setSelectedUser(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="mx-auto mt-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-black border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
                    style={{ position: 'relative', top: 0, right: 0, zIndex: 50 }}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-black">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={selectedUser ? handleBackToList : onClose}
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                {selectedUser ? <ChevronLeft className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            </Button>
                            <h2 className="text-xl font-bold text-white">
                                {selectedUser ? selectedUser.name : "Messages"}
                            </h2>
                        </div>
                        {selectedUser && (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <Phone className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <Video className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {!selectedUser ? (
                        <>
                            {/* Search */}
                            <div className="p-4 border-b border-white/10">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search messages..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                    />
                                </div>
                            </div>

                            {/* Chat List - Virtualized Infinite Scroll */}
                            <div
                                className="flex-1 overflow-y-auto"
                                style={{ maxHeight: 400 }}
                                onScroll={e => {
                                    const el = e.currentTarget;
                                    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && visibleCount < filteredUsers.length) {
                                        setVisibleCount(v => Math.min(v + 4, filteredUsers.length));
                                    }
                                }}
                            >
                                {visibleUsers.length > 0 ? (
                                    visibleUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleUserSelect(user)}
                                            className="p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="w-12 h-12 border-2 border-brand-purple/40">
                                                        <AvatarImage src={user.profilePicture} alt={user.name} />
                                                        <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                                                            <User className="w-6 h-6" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${user.isOnline ? "bg-green-500" : "bg-gray-500"}`}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-white">{user.name}</span>
                                                        <span className="text-xs text-white/60">{user.lastMessageTime}</span>
                                                    </div>
                                                    <p className="text-sm text-white/70 truncate">{user.lastMessage}</p>
                                                </div>
                                                {user.unreadCount > 0 && (
                                                    <div className="bg-brand-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        {user.unreadCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-white/60">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No conversations found</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                <AnimatePresence>
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            {message.sender === "other" && (
                                                <Avatar className="w-8 h-8 mr-2 self-end mb-1">
                                                    <AvatarImage src={selectedUser.profilePicture} alt={selectedUser.name} />
                                                    <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                                                        <User className="w-4 h-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div
                                                className={`max-w-[75%] p-3 rounded-2xl ${message.sender === "me"
                                                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                                                    : "bg-white/10 text-white border border-white/20"
                                                    }`}
                                            >
                                                <p className="text-sm">{message.text}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-black">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 h-10 w-10">
                                            <Paperclip className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 h-10 w-10">
                                            <Image className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 h-10 w-10">
                                            <Smile className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-brand-purple/50"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 h-10 w-10 p-0"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatSidebar;