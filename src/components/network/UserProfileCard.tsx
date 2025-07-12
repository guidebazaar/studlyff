
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, User } from "lucide-react";

interface UserProfileCardProps {
  user: {
    id: number;
    name: string;
    profilePicture: string;
    role: string;
    school: string;
    status: string;
    tags: string[];
    interests: string[];
    connections: number;
    classYear: number;
    bio: string;
    isOnline: boolean;
  };
  onMessageClick: () => void;
}

const UserProfileCard = ({ user, onMessageClick }: UserProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border-2 border-white/10 bg-gradient-to-br from-black via-gray-900 to-purple-950 rounded-2xl shadow-xl hover:border-brand-purple/60 transition-all duration-300">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Profile Picture and Online Status */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-brand-purple/40">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              {/* Online Status Indicator */}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${user.isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">{user.name}</h3>
              <div className="text-sm text-white/80 truncate">{user.role}</div>
              <div className="text-xs text-white/50 truncate">{user.school}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${user.status === 'Connected' ? 'bg-green-600/20 text-green-400 border border-green-400' : user.status === 'Pending' ? 'bg-yellow-600/20 text-yellow-300 border border-yellow-300' : 'bg-white/10 text-white/70 border border-white/20'}`}>{user.status}</span>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {user.tags.map((tag, idx) => (
              <span key={idx} className="rounded-full px-3 py-1 text-xs font-semibold border border-brand-purple bg-brand-purple/10 text-brand-purple/90 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          {/* Connections & Class Year */}
          <div className="flex items-center gap-4 mb-2 text-xs text-white/60">
            <span>{user.connections} connections</span>
            <span className="mx-1">•</span>
            <span>Class of {user.classYear}</span>
          </div>
          {/* Bio */}
          <div className="mb-3">
            <p className="text-sm text-white/80 line-clamp-2">{user.bio}</p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              className={`flex-1 transition-all duration-300 ${isLiked
                  ? "text-pink-500 hover:text-pink-400 bg-pink-500/10"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              Like
            </Button>
            <Button
              onClick={onMessageClick}
              className="flex-1 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white font-medium"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
