import { MessageCircle, Mail, Clock, Globe, ArrowRight, Zap, ShieldCheck, MapPin, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@globalunlockhub.com';
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-slate-950 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Content Side */}
          <div className="space-y-12">
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase tracking-[0.2rem] font-bold px-4 py-1 text-[10px] mx-auto lg:mx-0">
                Support Center
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Technical <span className="text-primary underline decoration-primary/10 decoration-8 underline-offset-8">Support</span> & Help
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                Need help with an order or have a question about our services? 
                Our support team is available 24/7 to assist you.
              </p>
            </div>

            <div className="space-y-6">
              <Card 
                className="group hover:border-emerald-500 transition-all duration-300 shadow-sm border-slate-200 dark:border-slate-800 cursor-pointer overflow-hidden rounded-[2rem]"
                onClick={handleWhatsApp}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 sm:gap-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 dark:border-emerald-500/20 group-hover:scale-110 transition-transform shrink-0">
                      <MessageCircle size={28} className="sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold group-hover:text-emerald-600 transition-colors tracking-tight">WhatsApp Support</h3>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">Live Chat Assistance</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                       <ArrowRight size={20} className="group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="group hover:border-primary transition-all duration-300 shadow-sm border-slate-200 dark:border-slate-800 cursor-pointer overflow-hidden rounded-[2rem]"
                onClick={handleEmail}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 sm:gap-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform shrink-0">
                      <Mail size={28} className="sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors tracking-tight">Email Help-Desk</h3>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">Formal Service Inquiry</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                       <ArrowRight size={20} className="group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.5rem]">
              <ShieldCheck className="text-primary h-6 w-6 shrink-0" />
              <p className="text-[11px] font-bold text-slate-500 leading-normal italic">
                All communications are secure and encrypted. Our technicians are standing by to help you with any device unlocking issues.
              </p>
            </div>
          </div>

          {/* Info Side */}
          <Card className="bg-slate-50 border-none dark:bg-slate-900/40 p-8 sm:p-10 lg:p-14 h-full flex flex-col justify-between rounded-[2.5rem] sm:rounded-[3rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <CardHeader className="p-0 mb-12 sm:mb-16 relative z-10">
              <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight">Quick Information</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[9px] sm:text-[10px] tracking-widest mt-2">Essential business details</CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 space-y-8 sm:space-y-12 relative z-10">
              {[
                { icon: Clock, label: "Business Hours", val: "Available 24/7 Daily" },
                { icon: Globe, label: "Service Coverage", val: "Worldwide All Carriers" },
                { icon: Mail, label: "Main Email", val: "support@globalunlockhub.com" },
                { icon: Headphones, label: "Support Speed", val: "Average 15m Response" }
              ].map((item, i) => (
                <div key={i} className="flex items-center sm:items-start gap-5 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary/60 group-hover:text-primary transition-all duration-500 shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2rem]">{item.label}</p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-none">{item.val}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-slate-200 dark:border-slate-800 relative z-10">
               <Button className="w-full h-14 sm:h-16 rounded-[1.2rem] text-xs sm:text-sm font-bold uppercase tracking-[0.2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all" onClick={handleWhatsApp}>
                 Start Chatting Now
               </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;