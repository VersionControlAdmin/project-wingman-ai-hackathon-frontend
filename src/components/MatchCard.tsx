import { useState, useEffect, useRef } from "react";
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
}

export const MatchCard = ({ profile, isActive = true }: MatchCardProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [newMessage, setNewMessage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [userMessages, setUserMessages] = useState<Array<{text: string, sender: "user"}>>([]);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [profilePictureBuzz, setProfilePictureBuzz] = useState(false);
  const [showAIRecommendation, setShowAIRecommendation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (visibleMessages > 0) {
      scrollToBottom();
    }
  }, [visibleMessages, userMessages]);

  useEffect(() => {
    setVisibleMessages(0);
    setNewMessage("");
    setUserMessages([]);
    setShowProfilePicture(false);
    setProfilePictureBuzz(false);
    setShowAIRecommendation(false);
    
    if (isActive) {
      const timer = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev < profile.conversation.length) {
            return prev + 1;
          }
          clearInterval(timer);
          
          // Show AI recommendation 2s after last message
          setTimeout(() => {
            setShowAIRecommendation(true);
            setTimeout(() => {
              setShowProfilePicture(true);
              setTimeout(() => setProfilePictureBuzz(true), 500);
            }, 500);
          }, 2000);
          
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
      scrollToBottom();
    }
  };

  return (
    <Card 
      className={cn(
        "w-full max-w-md mx-auto p-4 space-y-4 transition-all duration-300 bg-white/90 backdrop-blur-sm",
        !isActive && "opacity-50 blur-sm pointer-events-none scale-95 -translate-y-4",
        "animate-fade-in"
      )}
    >
      <div className="flex items-center space-x-4 mb-4">
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

      <div className="flex flex-col h-auto">
        <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-[150px] max-h-[250px] md:max-h-[300px]">
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

        {visibleMessages === profile.conversation.length && showAIRecommendation && (
          <div className="mt-3 p-3 rounded-lg bg-secondary/10 animate-fade-in">
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
          <div className="flex items-center gap-2 mt-3 animate-fade-in">
            <Input
              placeholder="Ask their Wingman a question..."
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
      </div>

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
    </Card>
  );
};