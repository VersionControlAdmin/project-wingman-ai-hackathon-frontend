import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, User, ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "Conversation", href: "/conversation" },
    { title: "Swipe", href: "/swipe" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/5 supports-[backdrop-filter]:bg-background/10 backdrop-blur-xl" />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity text-white"
          onClick={() => navigate("/")}
        >
          <img
            src="/Boardy for Dating (1).png"
            alt="Logo"
            className="h-full max-h-[72px] w-auto object-contain"
          />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-accent hover:bg-primary/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-accent hover:bg-primary/10">
                  Navigation
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-4 bg-background/80 backdrop-blur-md">
                    {navigationItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className="block p-2 hover:bg-primary/5 hover:text-accent rounded-md transition-colors duration-200"
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
              <div className="flex items-center gap-2 text-white">
                <User className="h-4 w-4" />
                <span className="text-sm">My Profile: Sebastian</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoginClick}
                className="text-white hover:text-accent hover:bg-primary/10"
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
              className="text-white hover:text-accent hover:bg-primary/10"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/80 backdrop-blur-md md:hidden border-b border-primary/10">
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="block p-3 text-black hover:text-accent hover:bg-primary/5 rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-primary/10">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3 text-black">
                        <User className="h-4 w-4" />
                        <span className="text-sm">My Profile: Sebastian</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLoginClick}
                        className="w-full text-black hover:text-accent hover:bg-primary/5"
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
                      className="w-full text-black hover:text-accent hover:bg-primary/5"
                    >
                      Login
                    </Button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
