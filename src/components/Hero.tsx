import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Users, Star, BarChart3, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  Official
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  Trusted by 10,000+ Technicians Worldwide <ArrowRight size={12} className="text-primary" />
                </div>
              </div>
              
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900 dark:text-white">
              Professional <span className="text-primary">IMEI &</span> <br className="hidden sm:block" />
              <span className="relative">
                Software
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
              </span> Solutions
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
              Global Unlock Hub provides reliable enterprise solutions for network unlocking, FRP bypass, and firmware restoration — for <span className="text-slate-900 dark:text-slate-100 font-bold">all major brands and carriers.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <Button className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-[0.2rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all bg-primary hover:bg-primary/95">
              Get Started Now <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="outline" className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl text-xs sm:text-sm font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm">
               View Price List
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            {[
              { icon: ShieldCheck, label: "Secure Payments", sub: "100% protected" },
              { icon: Zap, label: "Fast Processing", sub: "Lightning fast delivery" },
              { icon: Globe, label: "Global Coverage", sub: "Works worldwide" }
            ].map((item, i) => (
              <div key={i} className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <item.icon size={18} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white block">{item.label}</span>
                  <p className="text-[10px] text-slate-500 font-bold">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="relative lg:block hidden animate-in fade-in slide-in-from-right duration-1000 delay-200">
            {/* Main Tracker Card */}
            <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] z-20">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Order Status</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monitoring Active Orders</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5 text-[9px] font-black">
                  Live Tracking
                </Badge>
              </div>

              <div className="space-y-8">
                {[
                  { id: "IMEI-2490X", progress: 85, status: "processing" },
                  { id: "FRP-8821Z", progress: 60, status: "processing" },
                  { id: "NET-1102A", progress: 100, status: "completed" }
                ].map((order, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-slate-400" />
                        <span className="text-[11px] font-black text-slate-500 tracking-wider">ID: {order.id}</span>
                      </div>
                      <span className="text-[11px] font-black text-primary">{order.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${order.status === 'completed' ? 'bg-emerald-500' : 'bg-primary'}`} 
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                <div>
                   <p className="text-[10px] text-primary font-black uppercase tracking-[0.2rem] mb-1">Global Success Rate</p>
                   <h4 className="text-4xl font-black text-slate-900 dark:text-white italic">99.8%</h4>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Background Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200/50 dark:border-slate-800/50 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-200/30 dark:border-slate-800/20 rounded-full pointer-events-none" />
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-6 rounded-3xl shadow-xl z-30">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                   <Users size={24} className="text-primary" />
                 </div>
                 <div>
                   <p className="text-2xl font-black">10K+</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Users</p>
                 </div>
               </div>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 z-30">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                   <BarChart3 size={24} className="text-primary" />
                 </div>
                 <div>
                   <p className="text-2xl font-black text-slate-900 dark:text-white">180+</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Countries</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;