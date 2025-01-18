import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mockProfiles, Profile } from "@/data/mockProfiles";
import { MatchCard } from "@/components/MatchCard";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import { PhoneCall, X, Heart } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState<Profile[]>(mockProfiles);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [shouldBuzz, setShouldBuzz] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isCardMoving, setIsCardMoving] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setShouldBuzz(location.state?.fromPage !== 'conversation');
    
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setShowCards(true);
    }, 4000);

    return () => clearTimeout(welcomeTimer);
  }, [location]);

  useEffect(() => {
    if (currentIndex >= profiles.length) {
      setShouldBuzz(true);
    }
  }, [currentIndex, profiles.length]);

  const handleSwipe = (liked: boolean) => {
    setIsCardMoving(true);
    setDirection(liked ? "right" : "left");
    setTimeout(() => {
      if (liked) {
        console.log("Liked:", profiles[currentIndex].name);
      }
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
      setIsCardMoving(false);
    }, 300);
  };

  const handleCallClick = () => {
    navigate('/conversation', { state: { fromPage: 'swipe' } });
    toast("Starting call...", {
      description: "Connecting to the other person",
    });
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen flex flex-col bg-primary">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4 animate-fade-in relative z-10">
            <h2 className="text-2xl font-semibold text-white">
              That's it for now!
            </h2>
            <p className="text-white">
              We'll notify you when new matches are available.
            </p>
          </div>
        </div>
        <Meteors />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0">
          <Meteors number={20} />
        </div>
        
        <AnimatePresence>
          {showWelcome && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 flex items-center justify-center bg-primary/90 z-50"
            >
              <div className="text-center space-y-4 p-8 rounded-lg">
                <motion.h2 
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Jason, your Wingman
                </motion.h2>
                <motion.p 
                  className="text-xl text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  has conversed with {profiles.length} candidates and identified them for you
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed right-4 top-20 z-50 w-14 h-14 rounded-full",
            "bg-accent hover:bg-accent/80",
            shouldBuzz && "animate-buzz"
          )}
          onClick={handleCallClick}
        >
          <PhoneCall className="h-6 w-6 text-white" />
        </Button>
        
        <div className="flex flex-col items-center w-full max-w-md mx-auto mt-20 mb-24 md:mt-0 md:mb-8 gap-8 relative">
          <AnimatePresence mode="wait">
            {showCards && profiles.slice(currentIndex + 1, currentIndex + 4).map((profile, idx) => (
              <motion.div
                key={profile.id}
                initial={{ scale: 0.95 - (idx + 1) * 0.05, y: 0 }}
                animate={{ 
                  scale: 0.95 - idx * 0.05,
                  y: 0,
                  opacity: 0.5 - idx * 0.1
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="absolute left-1/2 top-1/2 w-full"
                style={{
                  transform: 'translate(-50%, -50%)',
                  zIndex: -idx,
                }}
              >
                <MatchCard profile={profile} isActive={false} />
              </motion.div>
            ))}

            {showCards && currentIndex < profiles.length && (
              <motion.div 
                key={profiles[currentIndex].id}
                initial={{ scale: 1, x: direction === "left" ? -100 : direction === "right" ? 100 : 0 }}
                animate={{ 
                  scale: 1,
                  x: direction ? (direction === "left" ? -1000 : 1000) : 0,
                  opacity: direction ? 0 : 1,
                  rotate: direction ? (direction === "left" ? -10 : 10) : 0
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="relative z-10 w-full"
              >
                <MatchCard 
                  profile={profiles[currentIndex]} 
                  isActive={!isCardMoving}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center gap-8 w-full px-4 fixed bottom-8 left-0 right-0 md:relative md:bottom-0 z-50 bg-primary/80 py-4 md:py-0 md:bg-transparent">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-14 h-14 rounded-full border-2 transition-all duration-300",
                "border-destructive/30 hover:border-destructive hover:bg-destructive/20"
              )}
              onClick={() => handleSwipe(false)}
            >
              <X className="h-6 w-6 text-destructive hover:text-destructive-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-14 h-14 rounded-full border-2 transition-all duration-300",
                "border-success/30 hover:border-success hover:bg-success/20"
              )}
              onClick={() => handleSwipe(true)}
            >
              <Heart className="h-6 w-6 text-success hover:text-success-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swipe;