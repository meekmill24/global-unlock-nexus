import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tech.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Global Unlock Hub - Professional Phone Unlocking Services" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Unlock. Flash. Bypass.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional phone unlocking and software solutions. Fast, reliable, and secure services for technicians worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => scrollToSection('services')}
              className="text-lg px-8 py-4 h-auto animate-glow-pulse"
            >
              View Services
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass rounded-lg p-6">
              <h3 className="text-2xl font-bold text-primary mb-2">10K+</h3>
              <p className="text-muted-foreground">Devices Unlocked</p>
            </div>
            <div className="glass rounded-lg p-6">
              <h3 className="text-2xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
            <div className="glass rounded-lg p-6">
              <h3 className="text-2xl font-bold text-primary mb-2">99%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;