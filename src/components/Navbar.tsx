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
    { name: "Marketplace", href: "/marketplace" },
    { name: "Startups", href: "/startups" },
  ];

  const resourcesDropdownItems = [
    { name: "Blogs", href: "/blogs" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Courses", href: "/courses" },
    { name: "Course Materials", href: "/course-materials" },
    { name: "Student Discounts", href: "/student-discounts" },
    { name: "Startup Schemes", href: "/startup-schemes" },
  ];

  const isResourcesActive = location.pathname === "/blogs" || location.pathname === "/scholarships" || location.pathname === "/courses" || location.pathname === "/paid-courses" || location.pathname === "/free-courses" || location.pathname === "/course-materials" || location.pathname === "/student-discounts" || location.pathname === "/startup-schemes";

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
      )}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto" style={{ minHeight: 56 }}>
          {/* Logo Holder - Outlined Studlyf Logo */}
          <div className="absolute left-0 top-[60%] -translate-y-1/2 flex items-center z-20">
            <Link to="/home" className="flex items-center">
              <img
                src="/logo2.png"
                alt="Studlyf Logo"
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>
          </div>

          {/* Pages Oval */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10">
            <div
              className="premium-navbar-oval px-14 py-3 flex items-center space-x-2"
              style={{ minWidth: 520, height: 64, justifyContent: 'center' }}
            >
              <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
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

              {/* Resources Dropdown */}
              <div
                onMouseEnter={() => isDesktop && setIsResourcesDropdownOpen(true)}
                onMouseLeave={() => isDesktop && setIsResourcesDropdownOpen(false)}
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
          </div>

          {/* User Actions Oval - Only Sign Up or Profile */}
          <div className="absolute right-0 top-[60%] -translate-y-1/2 flex items-center z-20">
            {!isSignedUp ? (
              <Link to="/signup">
                <InteractiveHoverButton
                  text="Sign Up"
                  className="w-32 text-base"
                  onClick={() => setIsSignedUp(true)}
                />
              </Link>
            ) : (
              <Link to="/profile">
                <button
                  className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center relative overflow-hidden border border-white/20 transition-all duration-500"
                  aria-label="Profile"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Completely Redesigned */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-3 sm:mx-6 z-[55]">
          <div className="bg-black/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-4 w-full max-w-sm mx-auto">
            {/* Main Navigation */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center text-sm",
                    location.pathname === item.href
                      ? "text-white font-bold bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Resources Section */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
                Resources
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {resourcesDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
                      location.pathname === item.href
                        ? "text-white font-bold bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Section */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <Link
                to="/login"
                className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center text-sm"
              >
                Login
              </Link>
              <Link to="/signup" className="block">
                <Button className="bg-gradient-to-r from-brand-purple to-brand-pink w-full rounded-xl shadow-lg py-3 text-sm font-medium">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
