import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tech.jpg";
import { ShieldCheck, Zap, Globe, ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden mt-20 pt-8 sm:pt-0">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Global Unlock Hub - Professional Phone Unlocking Services" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/80"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">Trusted by 10,000+ Technicians Worldwide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Your One-Stop </span>
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Phone Unlocking
            </span>
            <br />
            <span className="text-foreground">& GSM Solutions Hub</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            IMEI unlocking, iCloud bypass, FRP removal, GSM tool activations, and software licenses — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => scrollToSection('catalog')}
              className="text-lg px-8 py-4 h-auto animate-glow-pulse"
            >
              Browse Catalog
            </Button>
            <Button 
              variant="glow" 
              size="lg" 
              onClick={() => scrollToSection('credits')}
              className="text-lg px-8 py-4 h-auto"
            >
              Buy Credits
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-1">
              <Zap size={22} className="text-primary" />
              <span className="text-xs text-muted-foreground">Instant Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={22} className="text-primary" />
              <span className="text-xs text-muted-foreground">99% Success Rate</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Globe size={22} className="text-primary" />
              <span className="text-xs text-muted-foreground">24/7 Support</span>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('catalog')} 
            className="mt-10 animate-float text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to catalog"
          >
            <ArrowDown size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;