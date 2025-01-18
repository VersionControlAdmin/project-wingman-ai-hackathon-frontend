import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-6 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Heart className="h-4 w-4 text-accent" />
            <span>Made with love by Project Wingman</span>
          </div>
          <div className="text-xs text-gray-400">© 2024 All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};