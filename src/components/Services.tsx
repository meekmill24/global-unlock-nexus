import { 
  Smartphone, Shield, Wrench, Users, 
  Activity, ArrowRight, CheckCircle2, Server,
  Lock, Globe, Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Network Unlocking",
      description: "Official factory unlocking for all major carriers and brands across 200+ countries.",
      features: ["Factory Permanent Unlock", "Global Network Support", "Auto-Processing"],
      stats: "99.8% Success"
    },
    {
      icon: Shield,
      title: "Google FRP Bypass",
      description: "Reliable solutions for FRP removal and account bypass across all security patch levels.",
      features: ["Fast Removal", "Latest Patches Supported", "Safe Processing"],
      stats: "Instant Delivery"
    },
    {
      icon: Wrench,
      title: "Software Repair",
      description: "Complete firmware flashing and software repair services for bricked or disabled devices.",
      features: ["Official Firmware", "Bootloader Repair", "System Recovery"],
      stats: "Professional Tools"
    },
    {
      icon: Users,
      title: "Wholesale & Business",
      description: "Custom solutions for businesses and resellers. Wholesale rates and high-volume discounts.",
      features: ["Full API Integration", "Bulk Processing", "Dealer Dashboard"],
      stats: "Business Ready"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20 sm:mb-24">
          <div className="space-y-8 text-center lg:text-left">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase tracking-widest font-bold px-3 py-1 text-[10px] mx-auto lg:mx-0">
              Our Expertise
            </Badge>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Wholesale <span className="text-primary">Device Solutions</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                We provide professional Grade A unlocking and software solutions for technicians and businesses worldwide. 
                Our platform is engineered for speed, reliability, and security.
              </p>
            </div>
            
            <ul className="space-y-4 inline-block text-left">
               {[
                 "Direct Source for Major Services",
                 "24/7 Fully Automated Processing",
                 "Industry-First Customer Support",
                 "Secure Encrypted Transactions"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                       <CheckCircle2 size={14} />
                    </div>
                    {item}
                 </li>
               ))}
            </ul>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-primary flex items-center justify-center text-[10px] font-black text-white">
                  +15k
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 italic tracking-tight">Active daily users on the platform</p>
            </div>
          </div>

          <div className="relative">
            <div className="p-8 sm:p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl relative z-10">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { label: "Active Servers", val: "54", icon: Server },
                  { label: "Daily Orders", val: "3,500+", icon: Activity },
                  { label: "Uptime", val: "100%", icon: Zap },
                  { label: "Verified Labs", val: "12", icon: Shield }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/40 transition-all shadow-sm group">
                    <stat.icon className="h-5 w-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{stat.val}</p>
                    <p className="text-[10px] text-muted-foreground font-black tracking-widest uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual background flair */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full flex flex-col pt-4 rounded-3xl">
              <CardContent className="flex-1 space-y-6 pt-8">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all border border-primary/10">
                  <service.icon size={28} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 pb-6 border-b border-slate-50 dark:border-slate-800">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="px-8 py-6 flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 border-none">
                  {service.stats}
                </Badge>
                <button className="text-xs font-bold text-primary flex items-center gap-1.5 hover:gap-3 transition-all group-hover:translate-x-1">
                  Details <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;