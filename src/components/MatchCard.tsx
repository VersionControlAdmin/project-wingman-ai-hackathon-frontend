import { useState, useEffect, useRef } from "react";
import { Profile } from "@/data/mockProfiles";
import { ChatBubble } from "./ChatBubble";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Send, X, Heart } from "lucide-react";

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
  const [userMessages, setUserMessages] = useState<Array<{text: string, sender: "user"}>>([]);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [profilePictureBuzz, setProfilePictureBuzz] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (visibleMessages > 0) {
      scrollToBottom();
    }
  }, [visibleMessages, userMessages]);

  // Show more messages initially on mobile
  useEffect(() => {
    setVisibleMessages(0);
    setNewMessage("");
    setUserMessages([]);
    setShowProfilePicture(false);
    setProfilePictureBuzz(false);
    
    if (isActive) {
      const timer = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev < (window.innerWidth < 768 ? Math.min(4, profile.conversation.length) : profile.conversation.length)) {
            return prev + 1;
          }
          clearInterval(timer);
          setTimeout(() => {
            setShowProfilePicture(true);
            setTimeout(() => setProfilePictureBuzz(true), 500);
          }, 5000);
          return prev;
        });
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [profile.id, isActive]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setUserMessages(prev => [...prev, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="relative w-full px-4 md:px-0">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-8 bottom-4 md:left-4 md:top-1/2 md:-translate-y-1/2 z-10 w-14 h-14 rounded-full border-2 transition-all duration-300",
          "border-destructive/30 hover:border-destructive hover:bg-destructive/20"
        )}
        onClick={() => onSwipeLeft?.()}
      >
        <X className="h-6 w-6 text-destructive hover:text-destructive-foreground" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-8 bottom-4 md:right-4 md:top-1/2 md:-translate-y-1/2 z-10 w-14 h-14 rounded-full border-2 transition-all duration-300",
          "border-success/30 hover:border-success hover:bg-success/20"
        )}
        onClick={() => onSwipeRight?.()}
      >
        <Heart className="h-6 w-6 text-success hover:text-success-foreground" />
      </Button>

      <Card 
        className={cn(
          "w-full max-w-md mx-auto p-4 space-y-4 transition-all duration-300 bg-white/90 backdrop-blur-sm mb-24 md:mb-0",
          !isActive && "opacity-50 blur-sm pointer-events-none scale-95 -translate-y-4",
          "animate-fade-in"
        )}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-[#555555] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md" />
            <img
              src={profile.avatar}
              alt={profile.name}
              className={cn(
                "w-16 h-16 rounded-full object-cover cursor-pointer transition-all duration-300 relative z-10",
                !showProfilePicture && "blur-md",
                profilePictureBuzz && "animate-buzz",
              )}
              onClick={() => setImageOpen(true)}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">
              {profile.name}, {profile.age} • {profile.city}
            </h3>
            <p className="text-sm text-muted">{profile.bio}</p>
          </div>
        </div>

        <div className="text-xs text-primary mb-2 flex justify-between font-medium">
          <span>{profile.name}'s Wingman</span>
          <span>Anna's Wingman</span>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {profile.conversation.slice(0, visibleMessages).map((msg, index) => (
            <ChatBubble
              key={index}
              message={msg.text}
              isUser={msg.sender === "user"}
              className="animate-fade-in"
            />
          ))}
          {userMessages.map((msg, index) => (
            <ChatBubble
              key={`user-${index}`}
              message={msg.text}
              isUser={true}
              className="animate-fade-in"
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {visibleMessages === profile.conversation.length && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/10 animate-fade-in">
            <h4 className="font-semibold mb-2">Your Wingman's Recommendation</h4>
            <div className={cn(
              "text-sm p-2 rounded",
              profile.aiRecommendation.isMatch ? "bg-success/20" : "bg-destructive/20"
            )}>
              {profile.aiRecommendation.reason}
            </div>
          </div>
        )}

        {visibleMessages === profile.conversation.length && (
          <div className="flex items-center gap-2 mt-4 animate-fade-in">
            <Input
              placeholder="Ask their Wingman a question... They're here to help!"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="placeholder:text-gray-500"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-auto">
          <div className="relative w-full h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => setImageOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
