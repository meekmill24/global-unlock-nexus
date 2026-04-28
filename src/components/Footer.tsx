import { ShieldCheck, Globe, MessageCircle, Mail, MapPin, Zap, ChevronRight, Github, Twitter, Linkedin, Headphones } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#" },
        { label: "Our Services", href: "#services" },
        { label: "Service Catalog", href: "#catalog" },
        { label: "Buy Credits", href: "#credits" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#contact" },
        { label: "WhatsApp Chat", href: "https://wa.me/1234567890" },
        { label: "Email Support", href: "mailto:support@globalunlockhub.com" },
        { label: "Server Status", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Refund Policy", href: "#" },
        { label: "Contact Us", href: "#contact" },
      ]
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 sm:pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16 lg:gap-24 mb-16 sm:mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-md">
                <ShieldCheck className="text-white h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white leading-none">Global Unlock Hub</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3rem] mt-2">Professional Solutions</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
              We are the premier global provider for professional device unlocking and software repair solutions. 
              Trusted by thousands of technicians around the world for speed and security.
            </p>

            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all bg-white dark:bg-slate-900 shadow-sm">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6 sm:space-y-8">
              <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2rem] leading-none">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center group"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800 mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <span>© {currentYear} Global Unlock Hub</span>
            <div className="hidden sm:block w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> All Systems Operational
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2 group cursor-pointer">
               <Globe size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
               <select className="bg-transparent text-[11px] font-bold text-slate-500 uppercase tracking-widest border-none focus:ring-0 p-0 cursor-pointer group-hover:text-primary transition-colors">
                 <option>English (US)</option>
                 <option>Spanish</option>
                 <option>French</option>
               </select>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Server Status: <span className="text-emerald-500 font-extrabold italic bg-emerald-500/5 px-2 py-0.5 rounded">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;