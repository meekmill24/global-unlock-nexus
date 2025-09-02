import { Button } from "@/components/ui/button";
import { Smartphone, Shield, Wrench, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Network Unlock",
      description: "Professional network unlocking for all major carriers and device brands. Fast and permanent solutions.",
      features: ["All Carriers", "Permanent Unlock", "24h Delivery", "Money Back Guarantee"]
    },
    {
      icon: Shield,
      title: "FRP & Passcode Bypass",
      description: "Remove FRP locks and bypass passcodes safely. Expert solutions for locked devices.",
      features: ["Google FRP", "iCloud Bypass", "Pattern/PIN", "Face/Fingerprint"]
    },
    {
      icon: Wrench,
      title: "Flashing & Boot Repair",
      description: "Complete firmware flashing and boot repair services. Revive your bricked devices.",
      features: ["Stock Firmware", "Custom ROMs", "Boot Repair", "Brick Recovery"]
    },
    {
      icon: Users,
      title: "Credits Reselling",
      description: "Become a reseller and offer our services to your customers. Competitive pricing and support.",
      features: ["Bulk Pricing", "White Label", "API Access", "24/7 Support"]
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive phone unlocking and software solutions for professionals and technicians worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="glass" className="w-full">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;