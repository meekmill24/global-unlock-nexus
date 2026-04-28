import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Mail, Lock, User, ArrowLeft, Loader2, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(new URLSearchParams(location.search).get("mode") !== "signup");
  const [isResetting, setIsResetting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  useEffect(() => {
    if (session) navigate("/dashboard");
  }, [session, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });
      if (error) throw error;
      toast({
        title: "Reset link sent",
        description: "Please check your email for the password reset link.",
      });
      setIsResetting(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome Back", description: "You have been logged in successfully." });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName },
          },
        });
        if (error) throw error;
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-950">
      {/* Left Panel: Marketing/Trust (Visible on large screens) */}
      <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-slate-900 border-r border-white/5">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0,transparent_50%)]"></div>
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-2xl group-hover:scale-105 transition-transform">
            <ShieldCheck className="text-white h-7 w-7" />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-white">Global Unlock Hub</span>
        </div>

        <div className="relative z-10 space-y-12 max-w-lg">
          <div className="space-y-4">
             <h2 className="text-5xl font-black text-white leading-tight uppercase italic tracking-tighter">
               High Performance <br />
               <span className="text-primary">Unlock Infrastructure</span>
             </h2>
             <p className="text-lg text-slate-400 font-medium leading-relaxed">
               Join thousands of professional technicians using our automated command center for IMEI and software services.
             </p>
          </div>

          <div className="space-y-8">
             {[
               { icon: Sparkles, title: "Automated Processing", desc: "Instant order execution across all global networks." },
               { icon: CheckCircle2, title: "L4 Secured Network", desc: "Enterprise-grade SSL encryption for all transactions." },
               { icon: ShieldCheck, title: "Operational Oversight", desc: "Real-time dashboard for order tracking and analytics." }
             ].map((feature, i) => (
               <div key={i} className="flex gap-5 group">
                  <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5 group-hover:scale-110 transition-transform h-fit">
                    <feature.icon size={24} />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none">{feature.title}</h4>
                     <p className="text-xs text-slate-500 font-bold leading-relaxed italic uppercase">{feature.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">
           <span>System Build: GH-V4.2</span>
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
           <span>Nodes Online</span>
        </div>
      </div>

      {/* Right Panel: Authentication Form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-slate-950 relative overflow-hidden">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="lg:hidden absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <ShieldCheck className="text-primary h-8 w-8" />
          <span className="font-extrabold text-xl tracking-tighter text-white">Global Unlock Hub</span>
        </div>

        <div className="w-full max-w-md relative z-10 space-y-10">
          <div className="text-center space-y-3">
             <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">
               {isResetting ? "Recovery" : (isLogin ? "Authentication" : "Onboarding")}
             </h1>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">
               {isResetting ? "Secure account recovery terminal" : (isLogin ? "System access for authorized users" : "Establish new operational identity")}
             </p>
          </div>

          <div className="space-y-8">
            {errorMessage && (
              <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 rounded-2xl p-6">
                <AlertCircle className="h-5 w-5" />
                <div className="ml-3 space-y-1">
                   <AlertTitle className="font-black uppercase tracking-widest text-[10px]">Verification Failed</AlertTitle>
                   <AlertDescription className="text-xs font-bold italic uppercase">{errorMessage}</AlertDescription>
                </div>
              </Alert>
            )}

            <form onSubmit={isResetting ? handleResetPassword : handleSubmit} className="space-y-6">
              {!isLogin && !isResetting && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Designation</Label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <Input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter business name..."
                      className="pl-12 h-14 bg-white/5 border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl font-bold text-white placeholder:text-slate-600 transition-all"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Comms Protocol (Email)</Label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ops@nexus-central.com"
                    className="pl-12 h-14 bg-white/5 border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl font-bold text-white placeholder:text-slate-600 transition-all"
                  />
                </div>
              </div>

              {!isResetting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Key (Password)</Label>
                    {isLogin && (
                      <button 
                        type="button" 
                        onClick={() => setIsResetting(true)}
                        className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                      >
                        Lost Key?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <Input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="pl-12 h-14 bg-white/5 border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl font-bold text-white placeholder:text-slate-600 transition-all"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-16 text-sm font-black uppercase tracking-[0.3rem] italic bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 rounded-2xl transition-all active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {isResetting ? "Request Recovery" : (isLogin ? "Initiate Access" : "Create Identity")}
                    <ArrowRight size={18} strokeWidth={3} />
                  </div>
                )}
              </Button>
            </form>

            <div className="space-y-6 pt-4 text-center">
              <button
                onClick={() => {
                  setIsResetting(false);
                  setIsLogin(!isLogin);
                }}
                className="text-[10px] font-black text-slate-500 hover:text-primary transition-all uppercase tracking-widest group"
              >
                {isResetting ? (
                  <>Return to <span className="text-primary group-hover:underline">Access Terminal</span></>
                ) : (
                  isLogin ? (
                    <>No existing identity? <span className="text-primary group-hover:underline">Apply for onboarding</span></>
                  ) : (
                    <>Identity established? <span className="text-primary group-hover:underline">Return to access terminal</span></>
                  )
                )}
              </button>

              <div className="flex items-center gap-4 justify-center">
                 <div className="h-px w-8 bg-white/5" />
                 <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={10} /> Hub Entrance
                  </button>
                  <div className="h-px w-8 bg-white/5" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer info (Always at bottom) */}
        <div className="absolute bottom-10 flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] italic select-none">
          <div className="flex items-center gap-1.5 grayscale opacity-30">
            <ShieldCheck size={14} /> SECURED
          </div>
          <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
          <span>ENCRYPTED NODE GH-A8</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
