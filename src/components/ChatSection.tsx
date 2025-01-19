import { useRef, useEffect } from "react";
import { Message } from "@/types/match";
import { ChatBubble } from "./ChatBubble";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSectionProps {
  messages: Array<any>;
  visibleMessages: number;
  userMessages: Array<{ text: string; sender: "user" }>;
  aiResponses: Array<{ text: string; sender: "ai" }>;
  showAIRecommendation: boolean;
  aiRecommendation: {
    reason: string;
    isMatch: boolean;
  };
  newMessage: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export const ChatSection = ({
  messages,
  visibleMessages,
  userMessages,
  aiResponses,
  showAIRecommendation,
  aiRecommendation,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  isLoading,
}: ChatSectionProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, userMessages, aiResponses, visibleMessages, isLoading]);

  return (
    <div className="space-y-4 h-[400px] overflow-y-auto pr-2">
      {messages.slice(0, visibleMessages).map((message, index) => (
        <ChatBubble
          key={index}
          message={message.text}
          isUser={message.sender === "user"}
          className="animate-fade-in"
        />
      ))}

      {userMessages.map((message, index) => (
        <div key={`message-group-${index}`}>
          <ChatBubble
            message={message.text}
            isUser={true}
            className="animate-fade-in"
          />
          {aiResponses[index] && (
            <ChatBubble
              message={aiResponses[index].text}
              isUser={false}
              className="animate-fade-in"
            />
          )}
        </div>
      ))}

      {isLoading && (
        <div className="chat-message ai">
          <span className="animate-pulse">Typing...</span>
        </div>
      )}

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

      <div ref={messagesEndRef} />
    </div>
  );
};
