import { Button } from "@/components/ui/button";
import { Star, Zap, Crown } from "lucide-react";

const Credits = () => {
  const creditPackages = [
    {
      icon: Star,
      name: "Chimera Credits",
      description: "Premium unlocking solution for iOS devices and network unlocks.",
      credits: "100 Credits",
      price: "$299",
      features: ["iOS Unlocking", "Network Unlock", "FRP Bypass", "24/7 Support"],
      popular: false
    },
    {
      icon: Zap,
      name: "Octoplus Credits",
      description: "Professional Android unlocking and repair solution with extensive device support.",
      credits: "200 Credits",
      price: "$449",
      features: ["Android Unlock", "Samsung FRP", "LG Unlock", "Priority Support"],
      popular: true
    },
    {
      icon: Crown,
      name: "MTK/NCK Credits",
      description: "MediaTek and NCK unlocking credits for a wide range of devices and carriers.",
      credits: "500 Credits",
      price: "$799",
      features: ["MediaTek Unlock", "NCK Codes", "Huawei FRP", "Bulk Pricing"],
      popular: false
    }
  ];

  return (
    <section id="credits" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Credits Store
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Purchase credits for professional unlocking tools. Competitive pricing with instant delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {creditPackages.map((pkg, index) => (
            <div 
              key={index} 
              className={`glass rounded-xl p-8 transition-all duration-300 hover:scale-105 relative animate-slide-up ${
                pkg.popular ? 'ring-2 ring-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-4">
                  <pkg.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-foreground">{pkg.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{pkg.description}</p>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">{pkg.price}</div>
                  <div className="text-muted-foreground">{pkg.credits}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={pkg.popular ? "hero" : "glow"} 
                  className="w-full"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Need custom packages or bulk pricing?</p>
          <Button variant="glass" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Credits;