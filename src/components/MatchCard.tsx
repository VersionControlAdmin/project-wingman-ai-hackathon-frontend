import { useState, useEffect } from "react";
import { Profile } from "@/data/mockProfiles";
import { ChatBubble } from "./ChatBubble";
import { Card } from "@/components/ui/card";

interface MatchCardProps {
  profile: Profile;
}

export const MatchCard = ({ profile }: MatchCardProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
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
  }, [profile.conversation.length]);

  return (
    <Card className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          className={cn(
            "w-16 h-16 rounded-full object-cover",
            visibleMessages === profile.conversation.length && "animate-buzz"
          )}
        />
        <div>
          <h3 className="text-lg font-semibold">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm text-gray-500">{profile.bio}</p>
        </div>
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
    </Card>
  );
};