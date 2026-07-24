import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 lg:py-24 px-4 sm:px-6 lg:px-16 bg-background">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/40 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-7xl grid lg:grid-cols-2 min-h-[720px] border border-secondary shadow-2xl overflow-hidden bg-background rounded-sm">
        {/* Copy Left */}
        <div className="flex flex-col justify-center p-10 sm:p-14 lg:p-24 text-foreground">
          <span className="uppercase tracking-[0.4em] text-primary font-bold text-[10px] mb-8 block">
            Premier Device Solutions
          </span>
          <h1 className="font-display text-5xl lg:text-7xl xl:text-[5.5rem] mb-10 leading-[1.05] tracking-tight">
            Unlock Your <br />
            <span className="italic">Global</span> Potential.
          </h1>
          <p className="text-lg lg:text-xl text-foreground/85 mb-12 max-w-md leading-[1.7]">
            The definitive marketplace for professional IMEI unlocking, FRP bypass, and enterprise firmware services. Prestige performance, delivered instantly.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              to="/auth?mode=signup"
              className="px-10 py-5 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:brightness-110 hover:shadow-2xl transition-all duration-500 inline-flex items-center gap-3"
            >
              Explore Services
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              to="/buy-credits"
              className="px-10 py-5 border border-primary/40 text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              View Credits
            </Link>
          </div>
        </div>

        {/* Visual Right */}
        <div className="relative overflow-hidden hidden lg:flex items-center justify-center border-l border-secondary bg-[hsl(157_77%_10%)]">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.4),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Vault mark */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border border-primary/40 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-primary/60 flex items-center justify-center bg-primary/5 backdrop-blur-sm">
                  <ShieldCheck className="w-16 h-16 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 p-8 border border-primary/20 backdrop-blur-xl bg-black/40">
            <div className="flex items-center gap-6">
              <div className="w-16 h-px bg-primary shrink-0" />
              <p className="font-display italic text-foreground text-sm leading-relaxed">
                Trusted by 50,000+ technicians worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
