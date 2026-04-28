import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Wallet, ShoppingCart, DollarSign, Receipt,
  Smartphone, Server, Wifi, FileText, 
  ArrowRight, TrendingUp, Clock, CheckCircle,
  Zap, Shield, Globe, Activity, Layout,
  MoreVertical, Bell, Plus, List, User, ChevronRight,
  ShieldCheck, History
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch Profile for Credits
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch Orders for Stats
  const { data: orders } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  const orderTypes = [
    { icon: Smartphone, label: "IMEI Unlocking", path: "/place-order/imei", desc: "Network unlocks via IMEI", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800" },
    { icon: Server, label: "Server Services", path: "/place-order/server", desc: "Digital licenses & auths", color: "text-primary bg-primary/5 border-primary/10" },
    { icon: Wifi, label: "Remote Support", path: "/place-order/remote", desc: "Technician session help", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800" },
    { icon: FileText, label: "Firmware / Data", path: "/place-order/file", desc: "Firmware & system files", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800" },
  ];

  const totalSpent = orders?.reduce((acc, curr) => acc + Number(curr.price), 0) || 0;
  const activeOrders = orders?.filter(o => o.status === "pending" || o.status === "processing").length || 0;
  const successRate = orders?.length ? Math.round((orders.filter(o => o.status === "completed").length / orders.length) * 100) : 100;

  const stats = [
    { icon: Receipt, label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, sub: "Lifetime spend", trend: "0%" },
    { icon: ShoppingCart, label: "Active Orders", value: activeOrders.toString(), sub: "Currently processing", trend: "Stable" },
    { icon: CheckCircle, label: "Success Rate", value: `${successRate}%`, sub: "Order completion", trend: "High" },
    { icon: Clock, label: "Avg. Delivery", value: "Instant", sub: "Processing time", trend: "Fast" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Header />
      
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-7xl animate-in fade-in duration-700">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.3em]">
              <Layout size={14} className="text-primary" /> User Portal <ChevronRight size={10} /> Dashboard
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Account Overview</h1>
            <div className="flex items-center gap-3 mt-2">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <p className="text-slate-900 dark:text-slate-100 text-sm font-black uppercase tracking-tight">
                 Technician Identity: <span className="text-primary underline decoration-primary/30 decoration-2 underline-offset-4 ml-1">{user?.email}</span>
               </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button 
               variant="default" 
               size="lg" 
               className="rounded-xl h-12 px-6 font-black shadow-lg bg-slate-950 text-white hover:bg-slate-900 transition-all border-2 border-slate-800 flex items-center group" 
               onClick={() => navigate("/orders")}
             >
               <History size={18} className="mr-2 text-primary group-hover:scale-110 transition-transform" strokeWidth={3} /> 
               <span className="uppercase tracking-widest text-[11px]">Order History</span>
             </Button>
             <Button 
               size="lg" 
               className="rounded-xl h-12 px-6 font-black shadow-xl shadow-amber-500/20 bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all flex items-center group" 
               onClick={() => navigate("/buy-credits")}
             >
               <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform" strokeWidth={3} /> 
               <span className="uppercase tracking-[0.2em] text-[11px]">Add Credits</span>
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Balance Card */}
          <Card className="lg:col-span-2 border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden relative group rounded-[2rem]">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-10 px-10">
              <div className="space-y-1 relative z-10">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Available Balance</CardTitle>
                <CardDescription className="text-sm font-bold text-slate-900 dark:text-slate-300">Funds ready for service checkout</CardDescription>
              </div>
              <div className="p-3.5 bg-primary/10 rounded-2xl text-primary relative z-10 border border-primary/20">
                <Wallet size={24} />
              </div>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10 pt-6">
                <div className="space-y-2 relative z-10">
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                      ${profile?.credits?.toFixed(2) || "0.00"}
                    </span>
                    <span className="text-slate-500 text-lg font-black uppercase tracking-widest">USD</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">
                    <ShieldCheck size={14} /> Account Verified & Secure
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 min-w-[240px] relative z-10">
                  <Button className="w-full h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2rem] shadow-xl shadow-amber-500/20 bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all" onClick={() => navigate("/buy-credits")}>
                    Top Up Credits
                  </Button>
                  <Button variant="ghost" className="w-full h-12 text-[11px] font-black uppercase tracking-[0.3rem] text-slate-900 dark:text-slate-100 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" onClick={() => navigate("/orders")}>
                    Transaction Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick System Info */}
          <Card className="shadow-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden rounded-[2rem]">
            <CardHeader className="pb-4 pt-8 px-8 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Service Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 px-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-slate-900 dark:text-white">API Connection</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gateway Status</p>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-black">ONLINE</Badge>
              </div>
              <Separator className="bg-slate-100 dark:bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-slate-900 dark:text-white">Processing Time</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Latency</p>
                </div>
                <span className="text-xs font-black text-primary italic">INSTANT</span>
              </div>
              <Separator className="bg-slate-100 dark:bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-slate-900 dark:text-white">Active Users</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Platform</p>
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white">12,482 LIVE</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase flex items-center gap-3">
              <Zap className="text-primary h-6 w-6" /> Place New Order
            </h2>
            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800 ml-8"></div>
          </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderTypes.map((type, i) => (
              <Card 
                key={i} 
                className="group cursor-pointer hover:border-primary/50 transition-all duration-500 shadow-md hover:shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-[1.5rem] overflow-hidden border-b-4 border-b-transparent hover:border-b-primary"
                onClick={() => navigate(type.path)}
              >
                <CardHeader className="pb-6">
                   <div className={`w-14 h-14 rounded-2xl ${type.color} border border-transparent shadow-sm flex items-center justify-center group-hover:scale-110 transition-all duration-500`}>
                      <type.icon size={28} />
                   </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight uppercase leading-none">{type.label}</CardTitle>
                  <CardDescription className="text-xs font-bold italic text-slate-600 dark:text-slate-400">{type.desc}</CardDescription>
                </CardContent>
                <CardFooter className="pt-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-300 uppercase tracking-[0.2em] group-hover:text-primary transition-all">Start Order</span>
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:shadow-md transition-all">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-all" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <Card key={i} className="shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-[2rem] pt-4">
              <CardContent className="pt-8 flex flex-col items-center text-center p-8">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl font-black tracking-tighter mb-1 text-slate-900 dark:text-white uppercase">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">{stat.label}</p>
                <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-tighter">{stat.sub}</p>
                <Badge variant="outline" className="mt-6 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5">
                   {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Card */}
        <Card className="shadow-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-[2rem] overflow-hidden">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800 flex flex-row items-center justify-between p-10">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">Recent Order Activity</CardTitle>
              <CardDescription className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-primary" /> Live status updates from our global server
              </CardDescription>
            </div>
            <Button variant="ghost" className="text-xs font-bold text-primary uppercase tracking-widest px-6" onClick={() => navigate("/orders")}>
               View All Orders <ArrowRight size={14} className="ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-28 px-8 text-center bg-slate-50/50 dark:bg-slate-900/30">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8 text-slate-200 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse">
                <ShoppingCart size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">No activity found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto font-medium leading-relaxed">
                You haven't placed any orders yet. Select a service above to get started with your first device unlock.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
