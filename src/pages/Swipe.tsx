import { useState } from "react";
import { mockProfiles, Profile } from "@/data/mockProfiles";
import { MatchCard } from "@/components/MatchCard";
import { Header } from "@/components/Header";

const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState<Profile[]>(mockProfiles);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

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
          {/* Stack of future cards */}
          {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, idx) => (
            <div
              key={profile.id}
              className="absolute left-1/2 -translate-x-1/2 top-[40%]"
              style={{
                transform: `translate(-50%, -50%) scale(${0.95 - idx * 0.05}) translateY(-${(idx + 1) * 20}px)`,
                zIndex: -idx,
                opacity: 0.5 - idx * 0.2,
              }}
            >
              <MatchCard profile={profile} isActive={false} />
            </div>
          ))}

          {/* Current card */}
          <div 
            className={cn(
              "relative z-10 transition-all duration-300",
              direction === "left" && "translate-x-[-100%] opacity-0 rotate-[-10deg]",
              direction === "right" && "translate-x-[100%] opacity-0 rotate-[10deg]"
            )}
          >
            <MatchCard
              profile={profiles[currentIndex]}
              onSwipeLeft={() => handleSwipe(false)}
              onSwipeRight={() => handleSwipe(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swipe;