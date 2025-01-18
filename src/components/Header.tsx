import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-primary">Project Wingman</span>
        </div>
        
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm text-gray-600">My Profile: Anna</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoginClick}
              className="text-muted hover:text-primary"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLoginClick}
            className="text-muted hover:text-primary"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};