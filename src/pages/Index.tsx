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
      "powered by AI",
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
      <div className="container mx-auto px-4 py-8">
        <AuroraBackground className="absolute inset-0" />
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in md:pt-4 pt-32">
          <div className="relative md:pt-32">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform scale-[0.80] rounded-full blur-3xl" />
            <h1 className="text-4xl md:text-6xl font-bold text-white relative z-10">
              Find friends & love—
              <div className="h-[80px] md:h-[120px] relative flex justify-center items-center overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute w-full text-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      y:
                        titleNumber === index
                          ? 0
                          : titleNumber > index
                          ? -50
                          : 50,
                      opacity: titleNumber === index ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.6,
                      bounce: 0.3,
                    }}
                  >
                    <Sparkles>{title}</Sparkles>
                  </motion.span>
                ))}
              </div>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-xl md:text-2xl text-white max-w-2xl mx-auto relative z-10"
          >
            Find friends and love based on unique character with{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-[#E5DEFF]/60 to-[#FDE1D3]/60 blur-sm animate-pulse" />
              <Sparkles>
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#E5DEFF] to-[#FDE1D3] animate-shine-subtle">
                  Wingly
                </span>
              </Sparkles>
            </span>
          </motion.p>

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
                <div key={profile.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="relative w-12 h-12 rounded-full border-2 border-white object-cover aspect-square"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 px-2 py-1 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-primary">
                    {profile.name}
                  </div>
                </div>
              ))}
            </div>
            <span className="text-white text-left relative z-10">
              Join Marie, Luna & 1000+ others from Berlin already using the
              platform
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
