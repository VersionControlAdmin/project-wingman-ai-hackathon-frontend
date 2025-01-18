import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mockProfiles, Profile } from "@/data/mockProfiles";
import { MatchCard } from "@/components/MatchCard";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import { PhoneCall, X, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState<Profile[]>(mockProfiles);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [shouldBuzz, setShouldBuzz] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Don't buzz if coming from conversation page
    setShouldBuzz(location.state?.fromPage !== 'conversation');
  }, [location]);

  const handleSwipe = (liked: boolean) => {
    setDirection(liked ? "right" : "left");
    setTimeout(() => {
      if (liked) {
        console.log("Liked:", profiles[currentIndex].name);
      }
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  const handleCallClick = () => {
    navigate('/conversation', { state: { fromPage: 'swipe' } });
    toast({
      title: "Starting call...",
      description: "Connecting to the other person",
    });
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen flex flex-col bg-primary overflow-hidden">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-primary-foreground">
              That's it for now!
            </h2>
            <p className="text-muted">
              We'll notify you when new matches are available.
            </p>
          </div>
        </div>
        <Meteors />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden fixed inset-0">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0">
          <Meteors number={20} />
        </div>
        
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
        
        <div className="flex flex-col items-center w-full max-w-md mx-auto mt-20 mb-8 md:mt-0 gap-8">
          {/* Stack of future cards */}
          {profiles.slice(currentIndex + 1, currentIndex + 4).map((profile, idx) => (
            <div
              key={profile.id}
              className="absolute left-1/2 top-[40%]"
              style={{
                transform: `translate(-50%, -50%) scale(${0.95 - idx * 0.05}) translate(${idx * 20}px, ${idx * 20}px)`,
                zIndex: -idx,
                opacity: 0.5 - idx * 0.1,
              }}
            >
              <MatchCard profile={profile} isActive={false} />
            </div>
          ))}

          {/* Current card */}
          <div 
            className={cn(
              "relative z-10 transition-all duration-300 w-full",
              direction === "left" && "translate-x-[-100%] opacity-0 rotate-[-10deg]",
              direction === "right" && "translate-x-[100%] opacity-0 rotate-[10deg]"
            )}
          >
            <MatchCard profile={profiles[currentIndex]} />
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-8 w-full px-4 fixed bottom-8 left-0 right-0 md:relative md:bottom-0">
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