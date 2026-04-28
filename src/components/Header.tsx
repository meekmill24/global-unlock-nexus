import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import {
  Menu, X, LogIn, LogOut, LayoutDashboard, Globe, 
  ChevronRight, Smartphone, ShieldCheck, User, Bell,
  Search, Settings, HelpCircle, ShoppingCart, List, Lock,
  Shield, History as HistoryIcon, Zap, Server, Wifi, FileText
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, session } = useAuth();
  const { isAdmin } = useAdminCheck();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/#services" },
    { label: "Catalog", href: "/#catalog" },
    { label: "Pricing", href: "/#credits" },
    { label: "Contact", href: "/#contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-primary rounded-2xl rotate-3 group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20"></div>
            <div className="absolute inset-0 bg-slate-900 dark:bg-slate-800 rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform flex items-center justify-center border border-white/10">
              <div className="relative">
                <Lock className="text-white h-6 w-6" strokeWidth={2.5} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-slate-900 flex items-center justify-center animate-pulse">
                  <Globe className="text-slate-900 h-1.5 w-1.5" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white leading-none">Global Unlock</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2rem]">Hub</span>
              <div className="h-px w-8 bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-bold transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary border-b-2 border-primary pb-1" : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                 <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <Zap size={14} fill="currentColor" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Credits</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-none mt-1">${profile?.credits?.toFixed(2) || "0.00"}</span>
                 </div>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-primary font-black">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-2 p-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl">
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-black leading-none text-slate-900 dark:text-white uppercase tracking-tight">Account Settings</p>
                      <p className="text-[10px] font-bold leading-none text-muted-foreground truncate uppercase mt-1 italic">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer py-4 rounded-xl focus:bg-primary/10 group">
                      <Shield className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-black text-xs uppercase tracking-widest text-primary">Admin Control Panel</span>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer py-4 rounded-xl focus:bg-primary/5 group border-l-4 border-transparent focus:border-primary">
                      <Zap className="mr-3 h-4 w-4 text-primary animate-pulse" />
                      <span className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Place New Order</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-56 p-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl rounded-xl">
                        <DropdownMenuItem onClick={() => navigate("/place-order/imei")} className="cursor-pointer py-3 rounded-lg group focus:bg-slate-100 dark:focus:bg-slate-800">
                          <Smartphone className="mr-3 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                          <span className="font-bold text-[10px] uppercase tracking-widest text-slate-900 dark:text-white">IMEI Service</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/place-order/server")} className="cursor-pointer py-3 rounded-lg group focus:bg-slate-100 dark:focus:bg-slate-800">
                          <Server className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="font-bold text-[10px] uppercase tracking-widest text-slate-900 dark:text-white">Server Service</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/place-order/remote")} className="cursor-pointer py-3 rounded-lg group focus:bg-slate-100 dark:focus:bg-slate-800">
                          <Wifi className="mr-3 h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
                          <span className="font-bold text-[10px] uppercase tracking-widest text-slate-900 dark:text-white">Remote Service</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/place-order/file")} className="cursor-pointer py-3 rounded-lg group focus:bg-slate-100 dark:focus:bg-slate-800">
                          <FileText className="mr-3 h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                          <span className="font-bold text-[10px] uppercase tracking-widest text-slate-900 dark:text-white">File Service</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer py-4 rounded-xl focus:bg-slate-50 dark:focus:bg-slate-800 group">
                    <LayoutDashboard className="mr-3 h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white">Dashboard Overview</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/orders")} className="cursor-pointer py-4 rounded-xl focus:bg-slate-50 dark:focus:bg-slate-800 group">
                    <HistoryIcon className="mr-3 h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white">Order History</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/buy-credits")} className="cursor-pointer py-4 rounded-xl focus:bg-amber-50 dark:focus:bg-amber-900/20 group">
                    <ShoppingCart className="mr-3 h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="font-black text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400">Buy Credits</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  
                  <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer py-4 rounded-xl focus:bg-slate-50 dark:focus:bg-slate-800 group">
                    <Settings className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white">System Settings</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer py-4 rounded-xl text-destructive focus:text-destructive focus:bg-destructive/10 group">
                    <LogOut className="mr-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span className="font-black text-xs uppercase tracking-widest">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="hidden sm:flex text-sm font-bold text-slate-900 dark:text-white"
                onClick={() => navigate("/auth")}
              >
                Log In
              </Button>
              <Button 
                className="rounded-lg px-6 font-bold shadow-md shadow-primary/20"
                onClick={() => navigate("/auth")}
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-50 bg-white dark:bg-slate-950 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg font-bold py-4 border-b border-slate-50 dark:border-slate-900 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <ChevronRight size={18} className="text-slate-300" />
              </a>
            ))}
            {session ? (
              <div className="pt-6 flex flex-col gap-4">
                <Button className="w-full justify-start h-12 font-black uppercase tracking-widest text-xs" variant="outline" onClick={() => { navigate("/dashboard"); setMobileMenuOpen(false); }}>
                  <LayoutDashboard className="mr-3 h-4 w-4 text-primary" /> Dashboard
                </Button>
                
                <div className="py-2 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 mb-2">Direct Order</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="ghost" className="justify-start h-10 text-[10px] font-bold border border-slate-100 dark:border-slate-800" onClick={() => { navigate("/place-order/imei"); setMobileMenuOpen(false); }}>
                      <Smartphone className="mr-2 h-3 w-3 text-blue-500" /> IMEI
                    </Button>
                    <Button variant="ghost" className="justify-start h-10 text-[10px] font-bold border border-slate-100 dark:border-slate-800" onClick={() => { navigate("/place-order/server"); setMobileMenuOpen(false); }}>
                      <Server className="mr-2 h-3 w-3 text-primary" /> SERVER
                    </Button>
                    <Button variant="ghost" className="justify-start h-10 text-[10px] font-bold border border-slate-100 dark:border-slate-800" onClick={() => { navigate("/place-order/remote"); setMobileMenuOpen(false); }}>
                      <Wifi className="mr-2 h-3 w-3 text-purple-500" /> REMOTE
                    </Button>
                    <Button variant="ghost" className="justify-start h-10 text-[10px] font-bold border border-slate-100 dark:border-slate-800" onClick={() => { navigate("/place-order/file"); setMobileMenuOpen(false); }}>
                      <FileText className="mr-2 h-3 w-3 text-emerald-500" /> FILE
                    </Button>
                  </div>
                </div>

                <Button className="w-full justify-start h-12 font-black uppercase tracking-widest text-xs bg-amber-500 hover:bg-amber-600 text-slate-950" onClick={() => { navigate("/buy-credits"); setMobileMenuOpen(false); }}>
                  <ShoppingCart className="mr-3 h-4 w-4" /> Buy Credits
                </Button>
                <Button className="w-full justify-start h-12 text-destructive border-destructive/20 font-black uppercase tracking-widest text-xs" variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-3 h-4 w-4" /> Sign Out
                </Button>
              </div>
            ) : (
              <div className="pt-6 space-y-4">
                <Button className="w-full h-12" onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
                <Button variant="ghost" className="w-full h-12 font-bold" onClick={() => navigate("/auth")}>
                  Log In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
