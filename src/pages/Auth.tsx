import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, ArrowLeft, Loader2, AlertCircle, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left Panel: Branding */}
      <div className="hidden lg:flex flex-col justify-between p-16 xl:p-24 relative overflow-hidden bg-[hsl(157_77%_10%)] border-r border-secondary">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border border-primary/10" />
          <div className="absolute -bottom-52 -left-52 w-[600px] h-[600px] rounded-full border border-primary/5" />
        </div>

        <div
          className="relative z-10 flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-11 h-11 bg-primary flex items-center justify-center rounded-sm">
            <ShieldCheck className="text-primary-foreground h-6 w-6" strokeWidth={2} />
          </div>
          <span className="font-display text-2xl tracking-tight text-primary">GUH</span>
        </div>

        <div className="relative z-10 space-y-8 max-w-md">
          <h2 className="font-display italic text-5xl xl:text-6xl leading-[1.15] text-foreground">
            Access the hub of<br />digital sovereignty.
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Enter your credentials to manage orders, purchase credits, and access the priority firmware repository.
          </p>
        </div>

        <div className="relative z-10 flex gap-3">
          <div className="h-1.5 w-10 bg-primary rounded-full" />
          <div className="h-1.5 w-4 bg-secondary rounded-full" />
          <div className="h-1.5 w-4 bg-secondary rounded-full" />
        </div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-24 bg-[#f5f0e0] relative">
        <div className="lg:hidden mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#064e3b] flex items-center justify-center rounded-sm">
            <ShieldCheck className="text-primary h-5 w-5" />
          </div>
          <span className="font-display text-xl text-[#064e3b]">Global Unlock Hub</span>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h3 className="font-display text-4xl text-[#064e3b] mb-3 tracking-tight">
            {isResetting ? "Recover Access" : isLogin ? "Welcome Back" : "Request Membership"}
          </h3>
          <p className="text-[#064e3b]/70 text-lg mb-10 leading-relaxed">
            {isResetting
              ? "We'll send a secure reset link to your inbox."
              : isLogin
              ? "Sign in to your global professional account."
              : "Create your operator identity to begin unlocking."}
          </p>

          {errorMessage && (
            <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold uppercase tracking-widest text-[11px]">Verification Failed</AlertTitle>
              <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={isResetting ? handleResetPassword : handleSubmit} className="space-y-7">
            {!isLogin && !isResetting && (
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#064e3b]/60 font-black block">
                  Business Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your firm"
                  required
                  className="w-full bg-transparent border-b-2 border-[#064e3b]/20 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors text-[#064e3b] text-lg font-medium placeholder:text-[#064e3b]/30"
                />
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-[0.2em] text-[#064e3b]/60 font-black block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@firm.com"
                required
                className="w-full bg-transparent border-b-2 border-[#064e3b]/20 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors text-[#064e3b] text-lg font-medium placeholder:text-[#064e3b]/30"
              />
            </div>

            {!isResetting && (
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-[#064e3b]/60 font-black">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setIsResetting(true)}
                      className="text-xs text-[#0d7a5f] font-bold hover:text-[#064e3b] underline underline-offset-4 decoration-1"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-transparent border-b-2 border-[#064e3b]/20 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors text-[#064e3b] text-lg font-medium placeholder:text-[#064e3b]/30"
                />
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#064e3b] text-[#f5f0e0] font-bold uppercase tracking-[0.25em] text-xs hover:bg-[#0d7a5f] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing
                  </>
                ) : (
                  <>
                    {isResetting ? "Send Reset Link" : isLogin ? "Authenticate Account" : "Create Account"}
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-14 pt-8 border-t border-[#064e3b]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#064e3b]/70">
              {isResetting ? "Remembered it?" : isLogin ? "New to the Hub?" : "Already a member?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsResetting(false);
                setIsLogin(isResetting ? true : !isLogin);
              }}
              className="text-xs font-black text-[#0d7a5f] uppercase tracking-widest border-b-2 border-[#0d7a5f]/20 pb-1 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              {isResetting ? "Back to sign in" : isLogin ? "Request Membership" : "Sign In Instead"}
            </button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#064e3b]/50 hover:text-[#064e3b] transition-colors mx-auto"
          >
            <ArrowLeft size={12} /> Return to Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
