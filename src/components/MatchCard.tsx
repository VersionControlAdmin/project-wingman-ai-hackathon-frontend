import { useState, useEffect } from "react";
import { MatchProfile } from "@/types/match";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileHeader } from "./ProfileHeader";
import { ChatSection } from "./ChatSection";

interface MatchCardProps {
  profile: MatchProfile;
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
      <ProfileHeader
        profile={profile}
        showProfilePicture={showProfilePicture}
        profilePictureBuzz={profilePictureBuzz}
        onImageClick={() => setImageOpen(true)}
      />

      <div className="text-xs text-primary mb-2 flex justify-between font-medium">
        <span>{profile.name}'s Wingman</span>
        <span>Anna's Wingman</span>
      </div>

      <ChatSection
        messages={profile.conversation}
        visibleMessages={visibleMessages}
        userMessages={userMessages}
        showAIRecommendation={showAIRecommendation}
        aiRecommendation={profile.aiRecommendation}
        newMessage={newMessage}
        onNewMessageChange={(value) => setNewMessage(value)}
        onSendMessage={handleSendMessage}
      />

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