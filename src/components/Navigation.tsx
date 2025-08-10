import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Hide navigation by default, show on hover
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 1000); // Hide after 1 second of no hover
  };

  const navLinks = [
    { href: "/life", label: "Life" },
    { href: "/teachings", label: "Teachings" },
    { href: "/legacy", label: "Legacy" },
    { href: "/engage", label: "Engage" },
  ];

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Links */}
            <div className="flex items-center space-x-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-white/90 hover:text-white transition-colors duration-200 font-medium",
                    location.pathname === link.href && "text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Right Links */}
            <div className="flex items-center space-x-8">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-white/90 hover:text-white transition-colors duration-200 font-medium",
                    location.pathname === link.href && "text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
