import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex !justify-center",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center gap-1">
            <Image
              src={isDarkMode ? "/light-icon.png" : "/dark-icon.png"}
              alt="vivid-logo"
              className="aspect-auto object-contain"
              width={30}
              height={30}
            />
            <span className="text-2xl font-bold ">Divine</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="font-medium hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="font-medium hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#subscription"
            className="font-medium hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button>Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg py-5">
            <div className="flex flex-col space-y-4 px-6">
              <a
                href="#"
                className="font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#subscription"
                className="font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
