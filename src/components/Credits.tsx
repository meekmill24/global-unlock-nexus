import { Zap, Shield, Globe, Cpu, Unlock, Key, Sparkles, ShoppingBag, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const creditTools = [
  {
    icon: Globe,
    name: "Global Unlock Hub",
    tagline: "Universal IMEI Unlock",
    description: "Official factory unlocking for iPhone, Samsung, Huawei and 200+ global network providers.",
    priceRange: "From $1.00/credit",
    features: ["Global Network Support", "Auto-Processing System", "Wholesale Bulk Rates"],
    popular: true,
    badge: "Official Source",
  },
  {
    icon: Unlock,
    name: "T-Mobile USA",
    tagline: "Direct Carrier Unlock",
    description: "Specialized service for US carriers including T-Mobile and MetroPCS with 100% reliability.",
    priceRange: "From $12.00/service",
    features: ["Clean Devices Only", "Fast Turnaround Time", "Premium Service Center"],
    popular: false,
    badge: null,
  },
  {
    icon: Zap,
    name: "Chimera Tool",
    tagline: "Software Licenses",
    description: "Official reseller for Chimera Tool licenses. Activation is instant after payment verification.",
    priceRange: "From $5.00/credit",
    features: ["Instant Refill", "All Brands Supported", "Official Authorized"],
    popular: false,
    badge: null,
  },
  {
    icon: Cpu,
    name: "Samsung Bypass",
    tagline: "FRP & Google Lock",
    description: "Reliable unlocking for all Samsung models. Supports the latest android security patches.",
    priceRange: "From $8.00/service",
    features: ["Latest Models Supported", "Fast Unlock Speed", "99% Success Rate"],
    popular: false,
    badge: "Top Rated",
  },
  {
    icon: Key,
    name: "Unlock Codes",
    tagline: "Network Unlock Codes",
    description: "Instant code generation for Sony, LG, Motorola, and Alcatel network network unlocks.",
    priceRange: "From $2.50/code",
    features: ["Database Retrieval", "Instant Generation", "Global Compatibility"],
    popular: false,
    badge: null,
  },
  {
    icon: Shield,
    name: "Premium Services",
    tagline: "Enterprise Wholesale",
    description: "High-priority services for premium devices. Connect with our primary system for volume.",
    priceRange: "From $15.00/service",
    features: ["Priority Processing", "Dedicated Support", "Custom API Access"],
    popular: false,
    badge: "Enterprise",
  },
];

const Credits = () => {
  return (
    <section id="credits" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6 animate-in fade-in duration-1000">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.25rem] font-black px-5 py-1.5 text-[10px] shadow-sm">
            Pricing & Packages
          </Badge>
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
              Service <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Credits</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Top up your account balance to process orders instantly. 
              We offer competitive wholesale rates for professional technicians.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {creditTools.map((tool, index) => (
            <Card 
              key={index} 
              className={`group hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col rounded-[2.5rem] overflow-hidden ${
                tool.popular ? "ring-2 ring-primary relative scale-[1.02] z-10" : "hover:scale-[1.01]"
              }`}
            >
              {tool.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-bl-[1.5rem] shadow-md">
                    Main Source
                  </div>
                </div>
              )}
              
              <CardHeader className="space-y-6 p-10 pb-6">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 shadow-sm">
                    <tool.icon size={32} />
                  </div>
                  {tool.badge && !tool.popular && (
                    <Badge className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary border-none shadow-none">
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1.5">
                  <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                  <CardDescription className="text-[10px] font-black text-primary uppercase tracking-[0.2rem] opacity-70">
                    {tool.tagline}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-10 p-10 pt-0">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {tool.description}
                </p>
                
                <div className="space-y-4 pt-8 border-t border-slate-50 dark:border-slate-800/50">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                         <CheckCircle2 size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-10 pt-0 block space-y-6">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-800/50 shadow-inner">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Rate</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{tool.priceRange}</span>
                </div>
                <Button className="w-full h-14 rounded-2xl text-xs font-bold uppercase tracking-[0.25rem] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all bg-primary hover:bg-primary/95">
                  Buy Credits <ArrowUpRight size={18} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-24 p-16 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 text-center shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary shadow-inner">
               <ShoppingBag size={40} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Need a Wholesale Account?</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed">
                We provide custom rates for high-volume resellers and direct API users. 
                Contact our accounts team to get verified.
              </p>
            </div>
            <Button variant="outline" className="rounded-2xl px-12 h-16 text-sm font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              Contact Accounts Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credits;
