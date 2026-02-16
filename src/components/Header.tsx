import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, ChevronRight, Smartphone, Server, Wifi, FileText,
  ShoppingCart, CreditCard, Gift, ClipboardList, History,
  User, Plus, Mail, Settings, LogOut
} from "lucide-react";

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

  const placeOrderItems = [
    { icon: Smartphone, label: "IMEI Service", action: () => { navigate('/place-order/imei'); setMobileMenuOpen(false); } },
    { icon: Server, label: "Server Services", action: () => { navigate('/place-order/server'); setMobileMenuOpen(false); } },
    { icon: Wifi, label: "Remote Service", action: () => { navigate('/place-order/remote'); setMobileMenuOpen(false); } },
    { icon: FileText, label: "File Services", action: () => { navigate('/place-order/file'); setMobileMenuOpen(false); } },
  ];

  const orderHistoryItems = [
    { icon: ClipboardList, label: "IMEI Orders", action: () => { navigate('/orders'); setMobileMenuOpen(false); } },
    { icon: FileText, label: "File Orders", action: () => { navigate('/orders'); setMobileMenuOpen(false); } },
    { icon: Server, label: "Server Orders", action: () => { navigate('/orders'); setMobileMenuOpen(false); } },
    { icon: Wifi, label: "Remote Orders", action: () => { navigate('/orders'); setMobileMenuOpen(false); } },
  ];

  const accountItems = [
    { icon: User, label: "My Profile", action: () => { navigate('/dashboard'); setMobileMenuOpen(false); } },
    { icon: Plus, label: "Add Funds", action: () => { navigate('/buy-credits'); setMobileMenuOpen(false); } },
    { icon: Mail, label: "My Mail", action: () => scrollToSection('contact') },
    { icon: Gift, label: "Reward Points", action: () => { navigate('/buy-credits'); setMobileMenuOpen(false); } },
    { icon: Settings, label: "Service Status", action: () => scrollToSection('services') },
  ];

  const MenuSection = ({ title, items }: { title: string; items: typeof placeOrderItems }) => (
    <div className="py-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 mb-2">{title}</p>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.action}
          className="w-full flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent/10 transition-colors"
        >
          <span className="flex items-center gap-3">
            <item.icon size={18} className="text-primary" />
            <span className="text-sm">{item.label}</span>
          </span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      ))}
    </div>
  );

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
                <Button variant="glass" size="sm" onClick={() => navigate('/dashboard')} className="hidden md:inline-flex">
                  Dashboard
                </Button>
                <Button variant="glass" size="sm" onClick={() => navigate('/orders')} className="hidden md:inline-flex">
                  My Orders
                </Button>
                <Button variant="glass" size="sm" onClick={signOut} className="hidden md:inline-flex">
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

      {/* Mobile menu - full categorized sidebar-style */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* User info header */}
          {user && (
            <div className="bg-gradient-to-r from-primary/20 to-primary-glow/10 px-4 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <User size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{user.email?.split('@')[0]}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Client Area */}
          <div className="py-2 border-b border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 mb-2">Client Area</p>
            <button
              onClick={() => { navigate('/buy-credits'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent/10 transition-colors"
            >
              <span className="flex items-center gap-3">
                <CreditCard size={18} className="text-primary" />
                <span className="text-sm font-medium">Buy Credit - Add Funds</span>
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Place an Order */}
          <div className="border-b border-border">
            <MenuSection title="Place an Order" items={placeOrderItems} />
          </div>

          {/* Order History */}
          <div className="border-b border-border">
            <MenuSection title="Order History" items={orderHistoryItems} />
          </div>

          {/* My Account */}
          {user && (
            <div className="border-b border-border">
              <MenuSection title="My Account" items={accountItems} />
            </div>
          )}

          {/* Auth actions */}
          <div className="p-4">
            {user ? (
              <Button
                variant="glass"
                size="sm"
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="w-full"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="hero"
                size="sm"
                onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}
                className="w-full"
              >
                Sign In / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
