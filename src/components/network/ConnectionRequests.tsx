import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Clock, CheckCircle, X } from "lucide-react";

interface ConnectionRequest {
    id: string;
    name: string;
    profilePicture: string;
    role: string;
    school: string;
    mutualConnections: number;
    timeAgo: string;
}

interface ConnectionRequestsProps {
    requests: ConnectionRequest[];
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
}

const ConnectionRequests = ({ requests, onAccept, onDecline }: ConnectionRequestsProps) => {
    if (requests.length === 0) {
        return (
            <div className="bg-white/5 rounded-2xl shadow-lg p-6 border border-white/10 text-center">
                <div className="text-white/70 mb-2">No pending connection requests</div>
                <p className="text-xs text-white/50">When someone wants to connect with you, you'll see their request here</p>
            </div>
        );
    }

    return (
        <div className="bg-white/5 rounded-2xl shadow-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg text-white flex items-center gap-2">
                    <span>Connection Requests</span>
                    <span className="bg-brand-purple text-white text-xs rounded-full px-2 py-0.5 inline-flex items-center justify-center min-w-[1.5rem]">
                        {requests.length}
                    </span>
                </div>
                {requests.length > 3 && (
                    <button className="text-sm text-brand-purple hover:underline">View All</button>
                )}
            </div>

            <div className="space-y-4">
                {requests.map((request) => (
                    <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                        <Avatar className="w-12 h-12 border-2 border-brand-purple/40">
                            <AvatarImage src={request.profilePicture} alt={request.name} />
                            <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                                <User className="w-6 h-6" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-white">{request.name}</div>
                            <div className="text-xs text-white/70 line-clamp-1">{request.role}</div>
                            <div className="text-xs text-white/50 line-clamp-1">{request.school}</div>

                            <div className="flex items-center gap-1 mt-1 text-xs text-white/60">
                                <span>{request.mutualConnections} mutual connections</span>
                                <span className="mx-1">•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {request.timeAgo}
                                </span>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onDecline(request.id)}
                                    className="flex-1 border-gray-600 hover:bg-white/10 hover:text-white text-white/70"
                                >
                                    <X className="w-3 h-3 mr-1" />
                                    Decline
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => onAccept(request.id)}
                                    className="flex-1 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white"
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ConnectionRequests;