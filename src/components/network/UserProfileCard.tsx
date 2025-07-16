
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, User, Send, Check } from "lucide-react";

interface UserProfileCardProps {
  user: {
    id: string;
    name: string;
    profilePicture: string;
    college?: string;
    year?: string;
    branch?: string;
    skills?: string[];
    bio?: string;
    isOnline?: boolean;
  };
  onMessageClick: () => void;
  getConnectionStatus: (userId: string) => 'none' | 'pending' | 'connected';
  onConnect: (userId: string) => void;
}

const UserProfileCard = ({ user, onMessageClick, getConnectionStatus, onConnect }: UserProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full w-full max-w-xs min-w-[260px] min-h-[340px] max-h-[340px] flex flex-col border-2 border-white/10 bg-gradient-to-br from-black via-gray-900 to-purple-950 rounded-2xl shadow-xl hover:border-brand-purple/60 transition-all duration-300">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Top: Profile Photo and Name */}
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="w-16 h-16 ring-2 ring-brand-purple/40">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-bold text-white whitespace-nowrap">{user.name}</h3>
          </div>
          {/* College */}
          <div className="text-sm text-white/80 mb-1 break-words whitespace-normal">{user.college}</div>
          {/* Branch and Year */}
          <div className="text-xs text-white/50 mb-2">{user.branch} {user.branch && user.year ? '•' : ''} {user.year}</div>
          {/* Bio */}
          {user.bio && (
            <div className="mb-2">
              <p className="text-sm text-white/80 line-clamp-2">{user.bio}</p>
            </div>
          )}
          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {user.skills.map((skill, idx) => (
                <span key={idx} className="rounded-full px-3 py-1 text-xs font-semibold border border-brand-purple bg-brand-purple/10 text-brand-purple/90 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          )}
          {/* Spacer to push button to bottom */}
          <div className="flex-1" />
          {/* Connect Button pinned to bottom */}
          <div className="flex-shrink-0 flex justify-center mt-4">
            {getConnectionStatus && getConnectionStatus(user.id) === 'none' && (
              <Button
                className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white font-medium rounded-full"
                onClick={() => onConnect(user.id)}
              >
                Connect
              </Button>
            )}
            {getConnectionStatus && getConnectionStatus(user.id) === 'pending' && (
              <div className="w-full flex items-center justify-center gap-2 bg-orange-500/90 text-white font-medium rounded-full py-2">
                <Send className="w-4 h-4 text-white" />
                Request Sent
              </div>
            )}
            {getConnectionStatus && getConnectionStatus(user.id) === 'connected' && (
              <div className="w-full flex flex-col gap-2 items-center justify-center">
                <div className="flex items-center justify-center gap-2 bg-green-600/90 text-white font-medium rounded-full py-2 w-full">
                  <Check className="w-4 h-4 text-white" />
                  Connected
                </div>
                <Button
                  className="w-full mt-2 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white font-medium rounded-full flex items-center justify-center gap-2"
                  onClick={onMessageClick}
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
