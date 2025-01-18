import { useState, useEffect } from "react";
import { Profile } from "@/data/mockProfiles";
import { ChatBubble } from "./ChatBubble";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Send, X } from "lucide-react";

interface MatchCardProps {
  profile: Profile;
  isActive?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const MatchCard = ({ profile, isActive = true, onSwipeLeft, onSwipeRight }: MatchCardProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [newMessage, setNewMessage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev < profile.conversation.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [profile.conversation.length, isActive]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newOffset = e.movementX;
      setDragOffset((prev) => {
        const updated = prev + newOffset;
        if (Math.abs(updated) > 200) {
          if (updated > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
          return 0;
        }
        return updated;
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <>
      <Card 
        className={cn(
          "w-full max-w-md mx-auto p-4 space-y-4 transition-all duration-300 cursor-grab active:cursor-grabbing",
          !isActive && "opacity-50 blur-sm pointer-events-none",
          isDragging && "scale-105"
        )}
        style={{ transform: `translateX(${dragOffset}px)` }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className={cn(
              "w-16 h-16 rounded-full object-cover cursor-pointer",
              visibleMessages === profile.conversation.length && "animate-buzz"
            )}
            onClick={() => setImageOpen(true)}
          />
          <div>
            <h3 className="text-lg font-semibold">
              {profile.name}, {profile.age} • {profile.city}
            </h3>
            <p className="text-sm text-gray-500">{profile.bio}</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-2">
          <span>Anna's Agent</span> vs <span>{profile.name}'s Agent</span>
        </div>

        <div className="space-y-2">
          {profile.conversation.slice(0, visibleMessages).map((msg, index) => (
            <ChatBubble
              key={index}
              message={msg.text}
              isUser={msg.sender === "user"}
              className="animate-fade-in"
            />
          ))}
        </div>

        {visibleMessages === profile.conversation.length && (
          <div className="mt-4 p-4 rounded-lg bg-primary/10 animate-fade-in">
            <h4 className="font-semibold mb-2">AI Recommendation</h4>
            <div className={cn(
              "text-sm p-2 rounded",
              profile.aiRecommendation.isMatch ? "bg-success/20" : "bg-destructive/20"
            )}>
              {profile.aiRecommendation.reason}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder="Ask their agent a question..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="max-w-2xl">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setImageOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};