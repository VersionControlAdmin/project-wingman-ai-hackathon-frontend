import { useState } from "react";
import { mockProfiles, Profile } from "@/data/mockProfiles";
import { MatchCard } from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { Header } from "@/components/Header";

const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState<Profile[]>(mockProfiles);

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      console.log("Liked:", profiles[currentIndex].name);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen flex flex-col bg-primary">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          {/* Previous profiles (blurred) */}
          {currentIndex > 0 && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full">
              <MatchCard
                profile={profiles[currentIndex - 1]}
                isActive={false}
              />
            </div>
          )}

          {/* Current profile */}
          <MatchCard
            profile={profiles[currentIndex]}
            onSwipeLeft={() => handleSwipe(false)}
            onSwipeRight={() => handleSwipe(true)}
          />

          {/* Next profiles (blurred) */}
          {currentIndex < profiles.length - 1 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full">
              <MatchCard
                profile={profiles[currentIndex + 1]}
                isActive={false}
              />
            </div>
          )}

          {/* Control buttons */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="w-16 h-16 rounded-full border-2 border-destructive hover:bg-destructive/10"
              onClick={() => handleSwipe(false)}
            >
              <X className="h-8 w-8 text-destructive" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-16 h-16 rounded-full border-2 border-success hover:bg-success/10"
              onClick={() => handleSwipe(true)}
            >
              <Heart className="h-8 w-8 text-success" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swipe;