import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  className?: string;
}

export const ChatBubble = ({ message, isUser, className }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2 mb-2",
        isUser
          ? "bg-primary text-primary-foreground ml-auto"
          : "bg-secondary text-secondary-foreground",
        className
      )}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
};