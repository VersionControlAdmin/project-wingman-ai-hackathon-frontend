import { useState } from "react";
import { mockProfiles, Profile } from "@/data/mockProfiles";
import { MatchCard } from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800">
            That's it for now!
          </h2>
          <p className="text-gray-600">
            We'll notify you when new matches are available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <MatchCard profile={profiles[currentIndex]} />
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full border-2 border-red-500 hover:bg-red-50"
            onClick={() => handleSwipe(false)}
          >
            <X className="h-8 w-8 text-red-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full border-2 border-green-500 hover:bg-green-50"
            onClick={() => handleSwipe(true)}
          >
            <Heart className="h-8 w-8 text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Swipe;