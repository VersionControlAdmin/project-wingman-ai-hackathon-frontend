import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessageSquare } from "lucide-react";
import { mockProfiles } from "@/data/mockProfiles";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Sparkles } from "@/components/ui/sparkles";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  
  const titles = useMemo(
    () => [
      "grounded in shared experiences",
      "shaped by your story",
      "powered by AI"
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timeoutId);
  }, [titles.length]);

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden">
      <main className="flex-1 relative">
        <AuroraBackground className="absolute inset-0" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform scale-[0.80] rounded-full blur-3xl" />
              <h1 className="text-4xl md:text-6xl font-bold text-white relative z-10">
                Find friends & love—
                <div className="h-[80px] md:h-[120px] relative flex justify-center items-center overflow-hidden">
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute w-full"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        y: titleNumber === index ? 0 : titleNumber > index ? -50 : 50,
                        opacity: titleNumber === index ? 1 : 0
                      }}
                      transition={{ 
                        type: "spring",
                        duration: 0.6,
                        bounce: 0.3
                      }}
                    >
                      {title}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Find friends and love based on unique character with <Sparkles>Wingly</Sparkles>
            </p>
            
            <div className="flex justify-center pt-8">
              <MagnetizeButton
                onClick={() => navigate("/conversation")}
                className="px-8 py-4"
              >
                <MessageSquare className="h-5 w-5" />
                Start talking to Jason, your personal Wingly
              </MagnetizeButton>
            </div>

            <div className="flex items-center justify-start gap-2 pb-4">
              <div className="flex -space-x-2">
                {mockProfiles.slice(0, 3).map((profile) => (
                  <div
                    key={profile.id}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="relative w-12 h-12 rounded-full border-2 border-white object-cover aspect-square"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 px-2 py-1 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {profile.name}
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground text-left">
                Join Marie, Luna & 1000+ others from Berlin already using the platform
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;