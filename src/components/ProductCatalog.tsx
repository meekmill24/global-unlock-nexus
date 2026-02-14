import { Button } from "@/components/ui/button";
import { 
  Smartphone, Lock, Key, Shield, Cpu, Server, 
  MonitorSmartphone, Wrench, Crown, Zap, Star,
  ChevronRight
} from "lucide-react";

const ProductCatalog = () => {
  const categories = [
    {
      title: "🔥 Popular Services",
      items: [
        { icon: Lock, name: "UnlockTool License", subtitle: "Official Reseller", tag: "HOT" },
        { icon: Shield, name: "iRemove Tools A12+ iCloud Bypass", subtitle: "Windows & MacOS Tool", tag: "INSTANT" },
        { icon: Key, name: "Pandora Tool Activation", subtitle: "Official Resellers", tag: null },
        { icon: Wrench, name: "Z3X SAMS Tool", subtitle: "Official Reseller", tag: null },
      ]
    },
    {
      title: "📱 IMEI Unlock Services",
      items: [
        { icon: Smartphone, name: "USA T-Mobile Premium iPhone Unlock", subtitle: "No Relock Warranty", tag: "LOW PRICE" },
        { icon: Smartphone, name: "USA T-Mobile / Sprint Unlock", subtitle: "Premium IMEI Service", tag: null },
        { icon: Smartphone, name: "AT&T / Cricket iPhone Unlock", subtitle: "Clean & Premium IMEI", tag: null },
        { icon: Smartphone, name: "Verizon iPhone Unlock Service", subtitle: "All Models Supported", tag: null },
      ]
    },
    {
      title: "🛠️ GSM Tools & Activations",
      items: [
        { icon: Cpu, name: "TFM PRO TOOL", subtitle: "Professional Flashing Tool", tag: null },
        { icon: Server, name: "Phoenix Service Tool", subtitle: "Samsung, Nokia, HMD, OnePlus, Realme", tag: null },
        { icon: MonitorSmartphone, name: "iKeyPro All Service", subtitle: "Complete iKey Solutions", tag: null },
        { icon: Wrench, name: "TSM Tool", subtitle: "Official Worldwide Reseller", tag: null },
      ]
    },
    {
      title: "☁️ Server & Remote Services",
      items: [
        { icon: Server, name: "GSM Tools Rent Service", subtitle: "Instant Auto API", tag: "INSTANT" },
        { icon: Shield, name: "iRemoval Pro Premium Hello Bypass", subtitle: "No Signal – iPad iOS 18.6–26", tag: null },
        { icon: Crown, name: "Dhru Fusion Pro", subtitle: "Official Distributor", tag: "OFFICIAL" },
        { icon: Key, name: "XiaomiPaid", subtitle: "Official Distributor", tag: null },
      ]
    },
    {
      title: "💻 Software & License Keys",
      items: [
        { icon: MonitorSmartphone, name: "Microsoft Product License Key", subtitle: "Official Worldwide Reseller", tag: "VERIFIED" },
        { icon: Zap, name: "Pixel Unlock Tool Credits", subtitle: "Official Server", tag: null },
        { icon: Star, name: "Chimera Tool Credits", subtitle: "Premium Unlocking Solution", tag: null },
        { icon: Cpu, name: "Octoplus Credits", subtitle: "Android Professional Solution", tag: null },
      ]
    },
  ];

  return (
    <section id="catalog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Product Catalog
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete range of professional unlocking tools, credits, and services.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="animate-slide-up" style={{ animationDelay: `${catIdx * 0.08}s` }}>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass rounded-xl p-5 hover:scale-[1.03] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    {item.tag && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {item.tag}
                      </span>
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <Button variant="glass" size="sm" className="w-full mt-4 text-xs">
                      View Details <ChevronRight size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
