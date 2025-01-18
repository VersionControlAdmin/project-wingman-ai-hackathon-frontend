import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, User, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "Conversation", href: "/conversation" },
    { title: "Swipe", href: "/swipe" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-secondary">Project Wingman</span>
        </div>

        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-secondary hover:text-accent hover:bg-primary/40">
                  Navigation
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-4 bg-primary text-secondary">
                    {navigationItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className="block p-2 hover:bg-primary/40 hover:text-accent rounded-md transition-colors duration-200"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                <span className="text-sm text-secondary">My Profile: Anna</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoginClick}
                className="text-secondary hover:text-accent hover:bg-primary/40"
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
              className="text-secondary hover:text-accent hover:bg-primary/40"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};