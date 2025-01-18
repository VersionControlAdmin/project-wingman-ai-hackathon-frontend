import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessageSquare } from "lucide-react";
import { mockProfiles } from "@/data/mockProfiles";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect } from "react";

const taglines = [
  "Find friends & love—grounded in shared experiences.",
  "Find friends & love—shaped by your story.",
  "Find friends & love—powered by AI."
];

const Index = () => {
  const navigate = useNavigate();
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden">
      <Header />
      
      <main className="flex-1 relative">
        <AuroraBackground className="absolute inset-0 opacity-20" />
        
        <section className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform scale-[0.80] rounded-full blur-3xl" />
              <h1 className="text-4xl md:text-6xl font-bold text-white relative z-10 min-h-[120px]">
                {taglines[currentTagline]}
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Find friends and love based on your unique character
            </p>
            
            <div className="pt-8">
              <MagnetizeButton
                onClick={() => navigate("/conversation")}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start talking to Jason, your personal Wingman
              </MagnetizeButton>
            </div>

            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-semibold text-primary mb-2">AI-Powered Matching</h3>
                <p className="text-muted text-sm">Intelligent algorithms that understand your personality</p>
              </div>
              <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-semibold text-primary mb-2">Natural Conversations</h3>
                <p className="text-muted text-sm">Talk naturally with your AI wingman Jason</p>
              </div>
              <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-semibold text-primary mb-2">Quality Matches</h3>
                <p className="text-muted text-sm">Connect with people who truly match your character</p>
              </div>
            </div>

            <div className="pt-12 flex items-center justify-center gap-2">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
