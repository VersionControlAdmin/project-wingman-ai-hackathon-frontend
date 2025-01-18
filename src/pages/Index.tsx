import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary/30 to-white">
      <Header />
      
      <main className="flex-1 pt-16">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Find Your Perfect Match with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto">
              Find friends and love based on your unique character
            </p>
            
            <div className="pt-8">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => navigate("/conversation")}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start talking to Jason, your personal Wingman
              </Button>
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;