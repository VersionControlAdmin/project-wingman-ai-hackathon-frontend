import { useRef } from "react";
import { Message } from "@/types/match";
import { ChatBubble } from "./ChatBubble";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSectionProps {
  messages: Message[];
  visibleMessages: number;
  userMessages: Array<{ text: string; sender: "user" }>;
  showAIRecommendation: boolean;
  aiRecommendation: { isMatch: boolean; reason: string };
  newMessage: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatSection = ({
  messages,
  visibleMessages,
  userMessages,
  showAIRecommendation,
  aiRecommendation,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}: ChatSectionProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-auto">
      <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-[150px] max-h-[250px] md:max-h-[300px]">
        {messages.slice(0, visibleMessages).map((msg, index) => (
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

      {visibleMessages === messages.length && showAIRecommendation && (
        <div className="mt-3 p-3 rounded-lg bg-secondary/10 animate-fade-in">
          <h4 className="font-semibold mb-2">Your Wingman's Recommendation</h4>
          <div
            className={cn(
              "text-sm p-2 rounded",
              aiRecommendation.isMatch ? "bg-success/20" : "bg-destructive/20"
            )}
          >
            {aiRecommendation.reason}
          </div>
        </div>
      )}

      {visibleMessages === messages.length && showAIRecommendation && (
        <div className="flex items-center gap-2 mt-3 animate-fade-in">
          <Input
            placeholder="Ask their Wingman a question..."
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
            className="placeholder:text-gray-500"
          />
          <Button size="icon" onClick={onSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};