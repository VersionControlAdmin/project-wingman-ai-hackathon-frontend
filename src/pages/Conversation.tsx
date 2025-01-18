import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/components/ChatBubble";
import { useToast } from "@/hooks/use-toast";

const Conversation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm Jason, your personal wingman. Ready to find your perfect match?", isUser: false },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMicClick = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        // Mock recording for demo
        setTimeout(() => {
          setIsRecording(false);
          setMessages((prev) => [
            ...prev,
            { text: "I'm looking for someone who shares my interests in tech and hiking.", isUser: true },
            { text: "Great! I'll help you find someone perfect. Let's move on to some potential matches!", isUser: false },
          ]);
          toast({
            title: "Conversation complete!",
            description: "Let's check out your matches.",
          });
          setTimeout(() => navigate("/swipe"), 2000);
        }, 3000);
      } else {
        setIsRecording(false);
      }
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full max-w-md flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            className="animate-fade-in"
          />
        ))}
      </div>
      <div className="w-full max-w-md flex justify-center pb-4">
        <MicrophoneButton
          isRecording={isRecording}
          onClick={handleMicClick}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default Conversation;