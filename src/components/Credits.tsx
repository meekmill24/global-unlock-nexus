import { Button } from "@/components/ui/button";
import { Zap, Shield, Globe, Cpu, Unlock, Key, Sparkles } from "lucide-react";

const creditTools = [
  {
    icon: Globe,
    name: "Global Unlock Credits",
    tagline: "Universal IMEI Unlock",
    description: "Premium credits for worldwide carrier unlocking. Supports iPhone, Samsung, Huawei and 200+ device brands.",
    priceRange: "From $2.50/credit",
    features: ["All Carriers Worldwide", "iPhone & Android", "Instant to 72h Delivery", "Bulk Discounts"],
    popular: true,
    badge: "MOST USED",
  },
  {
    icon: Unlock,
    name: "SIMUnlocker Credits",
    tagline: "Fast SIM Network Unlock",
    description: "Rapid SIM unlock credits for all major networks. Direct database integration for fastest results.",
    priceRange: "From $1.80/credit",
    features: ["AT&T / T-Mobile / Sprint", "UK & EU Networks", "Fast Turnaround", "99% Success Rate"],
    popular: false,
    badge: null,
  },
  {
    icon: Zap,
    name: "Chimera Credits",
    tagline: "Pro iOS & Android Tool",
    description: "Professional-grade credits for Chimera Tool. Supports FRP bypass, unlock, IMEI repair and more.",
    priceRange: "From $3.00/credit",
    features: ["iOS Unlocking", "FRP Bypass", "IMEI Repair", "24/7 Support"],
    popular: false,
    badge: null,
  },
  {
    icon: Cpu,
    name: "Octoplus Credits",
    tagline: "Samsung & LG Specialist",
    description: "Dedicated Octoplus/Octopus credits for Samsung, LG, and other Android device servicing.",
    priceRange: "From $2.00/credit",
    features: ["Samsung FRP/Unlock", "LG Full Support", "Firmware Write", "Priority Queue"],
    popular: false,
    badge: "HOT",
  },
  {
    icon: Key,
    name: "MTK / NCK Credits",
    tagline: "MediaTek & NCK Codes",
    description: "MediaTek and NCK unlock credits covering a massive range of budget and mid-tier devices.",
    priceRange: "From $1.50/credit",
    features: ["MediaTek Devices", "NCK Code Gen", "Huawei FRP", "Bulk Pricing"],
    popular: false,
    badge: null,
  },
  {
    icon: Shield,
    name: "Server Credits",
    tagline: "Remote Server Unlock",
    description: "Server-based unlock credits for direct carrier database queries. Premium speed and reliability.",
    priceRange: "From $4.00/credit",
    features: ["Direct DB Query", "Carrier Premium", "Enterprise SLA", "API Access"],
    popular: false,
    badge: "PRO",
  },
];

const Credits = () => {
  return (
    <section id="credits" className="py-24 relative">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4">
            <Sparkles size={14} />
            CREDIT STORE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Unlock Tool Credits
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Purchase credits for the industry's most trusted unlocking tools. Competitive pricing, instant delivery, and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {creditTools.map((tool, index) => (
            <div
              key={index}
              className={`group glass rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] relative animate-slide-up ${
                tool.popular ? "ring-2 ring-primary shadow-[0_0_30px_hsl(var(--primary)/0.2)]" : ""
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Badge */}
              {(tool.badge || tool.popular) && (
                <div className="absolute -top-3 right-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    tool.popular
                      ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground"
                      : "bg-muted text-primary"
                  }`}>
                    {tool.badge || "POPULAR"}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <tool.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-0.5 font-display">{tool.name}</h3>
              <p className="text-xs font-medium text-primary/80 mb-2 tracking-wide uppercase">{tool.tagline}</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>

              {/* Price */}
              <div className="mb-5 py-3 px-4 rounded-lg bg-background/40 border border-border/50">
                <span className="text-lg font-bold text-primary">{tool.priceRange}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={tool.popular ? "hero" : "glow"}
                className="w-full"
                size="lg"
              >
                Buy Credits
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-muted-foreground mb-4 text-sm">Need custom packages, bulk pricing, or reseller rates?</p>
          <Button variant="glass" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Credits;
