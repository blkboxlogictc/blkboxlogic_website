import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/logo";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-black bg-opacity-90 backdrop-filter backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Logo />
                <span className="text-xl font-bold text-white ml-2">
                  <span>Blackbox</span>
                  <span className="text-accent">Logic</span>
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" label="Home" isActive={isActive("/")} />
            <NavLink href="/about" label="About Us" isActive={isActive("/about")} />
            <NavLink href="/services" label="Services" isActive={isActive("/services")} />
            <NavLink href="/blog" label="Blog" isActive={isActive("/blog")} />
            <NavLink href="/why-choose-us" label="Why Choose Us" isActive={isActive("/why-choose-us")} />
            <Button asChild variant="default" className="bg-accent hover:bg-opacity-80 text-black font-semibold">
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden pt-4 pb-2 transition-all duration-300",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <nav className="flex flex-col space-y-3">
            <MobileNavLink href="/" label="Home" onClick={closeMobileMenu} />
            <MobileNavLink href="/about" label="About Us" onClick={closeMobileMenu} />
            <MobileNavLink href="/services" label="Services" onClick={closeMobileMenu} />
            <MobileNavLink href="/blog" label="Blog" onClick={closeMobileMenu} />
            <MobileNavLink href="/why-choose-us" label="Why Choose Us" onClick={closeMobileMenu} />
            <MobileNavLink href="/contact" label="Contact" onClick={closeMobileMenu} isButton />
          </nav>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link href={href}>
      <div className={cn(
        "py-2 transition-colors duration-300 cursor-pointer",
        isActive ? "text-accent" : "text-white hover:text-accent"
      )}>
        {label}
      </div>
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
  isButton?: boolean;
}

function MobileNavLink({ href, label, onClick, isButton = false }: MobileNavLinkProps) {
  return (
    <Link href={href}>
      <div 
        className={cn(
          "py-2 px-3 rounded transition-colors duration-300 cursor-pointer",
          isButton
            ? "text-accent font-semibold"
            : "text-white hover:bg-muted"
        )}
        onClick={onClick}
      >
        {label}
      </div>
    </Link>
  );
}
