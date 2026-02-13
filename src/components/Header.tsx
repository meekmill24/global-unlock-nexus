import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Credits", id: "credits" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || mobileMenuOpen ? 'nav-blur shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">GU</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Global Unlock Hub
            </span>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
                <Button variant="glass" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="glow" size="sm" onClick={() => navigate('/auth')} className="hidden md:inline-flex">
                Sign In
              </Button>
            )}

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground hover:text-primary transition-colors text-left py-2 text-lg"
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <div className="pt-2 border-t border-border space-y-2">
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Button variant="glass" size="sm" onClick={() => { signOut(); setMobileMenuOpen(false); }} className="w-full">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="glow" size="sm" onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }} className="w-full mt-2">
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;