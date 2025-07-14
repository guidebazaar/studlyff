import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import "./ui/NavbarPremium.css";
import { Menu, X, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  // Simulate user signup state (replace with real auth logic in production)
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Hide navbar completely on profile page
  if (location.pathname === "/profile") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Finance", href: "/finance" },
    { name: "Events", href: "/events" },
    { name: "Network", href: "/network" },
    { name: "Project Hunt", href: "/project-hunt" },
    { name: "Startups", href: "/startups" },
  ];

  const resourcesDropdownItems = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Courses", href: "/courses" },
    { name: "Student Discounts", href: "/student-discounts" },
  ];

  const isResourcesActive = location.pathname === "/scholarships" || location.pathname === "/courses" || location.pathname === "/paid-courses" || location.pathname === "/free-courses" || location.pathname === "/student-discounts" || location.pathname === "/marketplace";

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
      )}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto min-h-[56px]">
          {/* Extended Oval Background - Now spans the entire navbar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10 w-full">
            <div
              className="premium-navbar-oval px-3 py-2 flex items-center w-full"
              style={{
                width: '100%',
                maxWidth: '100vw',
                height: '56px',
                minWidth: '0',
                boxSizing: 'border-box',
              }}
            >
              {/* Logo Section */}
              <div className="flex items-center z-20 flex-shrink-0">
                <Link to="/home" className="flex items-center">
                  <img
                    src="/logo3.png"
                    alt="Studlyf Logo"
                    style={{
                      height: '32px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </Link>
              </div>
              {/* Navigation Items Section - Centered */}
              <div className="flex-1 flex items-center justify-center">
                <div className="hidden lg:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "premium-navbar-btn relative px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center",
                          location.pathname === item.href && "active"
                        )}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
                {/* Resources Dropdown - Centered with navigation */}
                <div
                  onMouseEnter={() => isDesktop && setIsResourcesDropdownOpen(true)}
                  onMouseLeave={() => isDesktop && setIsResourcesDropdownOpen(false)}
                  className="hidden lg:block"
                >
                  <DropdownMenu open={isDesktop ? isResourcesDropdownOpen : undefined} onOpenChange={setIsResourcesDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "premium-navbar-btn relative px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center",
                          isResourcesActive && "active"
                        )}
                        tabIndex={0}
                      >
                        Resources
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
                      align="center"
                    >
                      {resourcesDropdownItems.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
                              location.pathname === item.href && "text-brand-purple"
                            )}
                          >
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* User Actions Section */}
              <div className="flex items-center z-20 gap-2 flex-shrink-0">
                {/* Login button with underline animation */}
                {!isSignedUp && (
                  <Link to="/login">
                    <button
                      className="relative bg-transparent border-none text-white text-base font-normal px-3 py-1 outline-none shadow-none group"
                      style={{ boxShadow: "none" }}
                      type="button"
                    >
                      <span className="relative z-10">Login</span>
                      {/* Underline animation */}
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>
                  </Link>
                )}
                {/* Sign Up */}
                {!isSignedUp && (
                  <div className="flex flex-col items-end gap-2">
                    <Link to="/signup">
                      <InteractiveHoverButton
                        text="Sign Up"
                        className="w-32 text-base"
                        onClick={() => setIsSignedUp(true)}
                      />
                    </Link>
                  </div>
                )}
                {/* Profile Icon - Always visible with dropdown */}
                <Link to="/profile" aria-label="Profile Dashboard">
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-white/20 bg-black cursor-pointer">
                    <AvatarFallback>
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu - Redesigned for perfect mobile experience */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-1 sm:mx-2 z-[55]">
          <div className="bg-black/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-2 w-full max-w-xs mx-auto overflow-y-auto max-h-[80vh] flex flex-col gap-2">
            {/* Main Navigation */}
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center text-base touch-target",
                    location.pathname === item.href
                      ? "text-white font-bold bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                  style={{ minHeight: 48 }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Resources Section */}
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
                Resources
              </div>
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                {resourcesDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-base touch-target",
                      location.pathname === item.href
                        ? "text-white font-bold bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                    style={{ minHeight: 44 }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
