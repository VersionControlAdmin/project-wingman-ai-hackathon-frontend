import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Project Wingman
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Find friends and love based on your unique character
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          onClick={() => navigate("/conversation")}
        >
          Start talking to Jason, your personal Wingman
        </Button>
      </div>
      <footer className="fixed bottom-0 w-full p-4 text-center text-sm text-gray-500">
        © 2024 Project Wingman. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;