import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessageSquare, Brain, Users, Sparkles } from "lucide-react";
import { mockProfiles } from "@/data/mockProfiles";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm p-8 hover:bg-white/60 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform scale-[0.80] rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
        <p className="text-muted text-sm">{description}</p>
      </div>
      <div className="absolute inset-0 border border-primary/10 rounded-xl" />
    </div>
  );
};

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
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden">
      <Header />
      
      <main className="flex-1 relative">
        <AuroraBackground className="absolute inset-0" />
        
        <section className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform scale-[0.80] rounded-full blur-3xl" />
              <h1 className="text-4xl md:text-6xl font-bold text-white relative z-10">
                Find friends & love—
                <div className="h-[80px] md:h-[100px] relative flex justify-center items-center overflow-hidden">
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className={cn(
                        "absolute w-full",
                        "transition-all duration-300"
                      )}
                      initial={{ opacity: 0, y: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -50 : 50, opacity: 0 }
                      }
                      transition={{ type: "spring", stiffness: 50 }}
                    >
                      {title}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Find friends and love based on your unique character
            </p>
            
            <div className="flex justify-center pt-8">
              <MagnetizeButton
                onClick={() => navigate("/conversation")}
                className="px-8 py-4"
              >
                <MessageSquare className="h-5 w-5" />
                Start talking to Jason, your personal Wingman
              </MagnetizeButton>
            </div>

            <div className="flex items-center justify-center gap-2 py-12">
              <div className="flex -space-x-4">
                {mockProfiles.slice(0, 3).map((profile) => (
                  <div
                    key={profile.id}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="relative w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 px-2 py-1 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {profile.name}
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground ml-2">
                Join Marie, Luna & 1000+ others from Berlin already using the platform
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <FeatureCard
                icon={Brain}
                title="AI-Powered Matching"
                description="Intelligent algorithms that understand your personality"
              />
              <FeatureCard
                icon={MessageSquare}
                title="Natural Conversations"
                description="Talk naturally with your AI wingman Jason"
              />
              <FeatureCard
                icon={Users}
                title="Quality Matches"
                description="Connect with people who truly match your character"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;