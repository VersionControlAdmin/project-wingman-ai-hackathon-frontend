import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MicrophoneButtonProps {
  isRecording: boolean;
  onClick: () => void;
  className?: string;
}

export const MicrophoneButton = ({
  isRecording,
  onClick,
  className,
}: MicrophoneButtonProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "w-16 h-16 rounded-full transition-all duration-300",
        isRecording && "bg-red-500 hover:bg-red-600",
        className
      )}
      onClick={onClick}
    >
      <Mic className={cn("h-8 w-8", isRecording && "text-white")} />
    </Button>
  );
};