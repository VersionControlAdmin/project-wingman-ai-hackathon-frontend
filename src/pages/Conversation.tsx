import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Conversation = () => {
  const navigate = useNavigate();
  const [showEndCall, setShowEndCall] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEndCall(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    navigate('/swipe', { state: { fromPage: 'conversation' } });
    toast("Call has ended", {
      description: "You can now continue swiping",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0">
          <Meteors number={20} />
        </div>

        <div className="text-center space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-white"
          >
            Connecting...
          </motion.h2>

          {showEndCall && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-14 h-14 rounded-full",
                  "bg-destructive hover:bg-destructive/80"
                )}
                onClick={handleEndCall}
              >
                <PhoneOff className="h-6 w-6 text-white" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;