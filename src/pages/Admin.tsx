import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Shield, Zap, Terminal, 
  Database, Users, Layout, Settings, 
  Archive, Wallet, BarChart3, Lock, 
  ShieldCheck, List, Smartphone, Activity
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminPaymentRequests from "@/components/admin/AdminPaymentRequests";
import AdminProfiles from "@/components/admin/AdminProfiles";
import AdminUserRoles from "@/components/admin/AdminUserRoles";
import AdminServices from "@/components/admin/AdminServices";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Checking Permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 space-y-8">
        <div className="w-24 h-24 bg-destructive/5 rounded-[2rem] border border-destructive/20 flex items-center justify-center text-destructive shadow-sm">
          <Lock size={48} />
        </div>
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Access Denied</h1>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm font-bold leading-relaxed px-10">
            You do not have the required administrative permissions to access this management console.
          </p>
        </div>
        <Button 
          onClick={() => navigate("/")} 
          variant="outline"
          className="rounded-xl px-12 h-14 font-bold border-slate-200"
        >
          Return to Hub
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-7xl animate-in fade-in duration-700">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">
               <ShieldCheck size={14} /> Management Console
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">Admin Hub</h1>
            <p className="text-muted-foreground text-sm font-semibold flex items-center gap-2">
               Oversight for Global Unlock Hub operations
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="rounded-xl h-12 px-6 font-bold text-slate-500" onClick={() => navigate("/")}>
               <ArrowLeft size={18} className="mr-2" /> Exit Admin
             </Button>
             <Button className="rounded-xl h-12 px-6 font-bold shadow-xl shadow-primary/20">
               <BarChart3 size={18} className="mr-2" /> Financial Reports
             </Button>
          </div>
        </div>

        {/* Management Navigator */}
        <Tabs defaultValue="overview" className="w-full space-y-10">
          <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 h-auto flex-wrap justify-start inline-flex rounded-2xl shadow-sm">
            {[
              { val: "overview", label: "Overview", icon: BarChart3 },
              { val: "orders", label: "Orders", icon: List },
              { val: "payments", label: "Payments", icon: Wallet },
              { val: "profiles", label: "Users", icon: Users },
              { val: "roles", label: "Access", icon: Shield },
              { val: "services", label: "Services", icon: Smartphone }
            ].map(tab => (
              <TabsTrigger 
                key={tab.val}
                value={tab.val} 
                className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all flex items-center gap-3"
              >
                <tab.icon size={16} strokeWidth={2.5} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <Card className="border-none bg-white dark:bg-slate-900 shadow-2xl min-h-[600px] rounded-[3rem] overflow-hidden">
             <CardContent className="p-10 md:p-14">
                <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus:outline-none"><AdminOverview /></TabsContent>
                <TabsContent value="orders" className="mt-0 focus-visible:outline-none focus:outline-none"><AdminOrders /></TabsContent>
                <TabsContent value="payments" className="mt-0 focus-visible:outline-none focus:outline-none"><AdminPaymentRequests /></TabsContent>
                <TabsContent value="profiles" className="mt-0 focus-visible:outline-none focus:outline-none"><AdminProfiles /></TabsContent>
                <TabsContent value="roles" className="mt-0 focus-visible:outline-none focus:outline-none"><AdminUserRoles /></TabsContent>
                <TabsContent value="services" className="mt-0 focus-visible:outline-none focus:outline-none"><AdminServiceDashboard /></TabsContent>
             </CardContent>
          </Card>
        </Tabs>
      </main>

      {/* Admin Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="container mx-auto px-10 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <span>Global Hub Admin Unit: GH-VER-44.9</span>
          </div>
          <span className="mt-6 md:mt-0 opacity-60">Admin Session Secured via SSL L4 Verification</span>
        </div>
      </footer>
    </div>
  );
};

const AdminOverview = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [profiles, orders, payments] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("payment_requests").select("*", { count: "exact", head: true }).eq("status", "pending")
      ]);
      return {
        users: profiles.count || 0,
        orders: orders.count || 0,
        pendingPayments: payments.count || 0
      };
    }
  });

  const cards = [
    { label: "Total Operatives", value: stats?.users || 0, icon: Users, sub: "Registered accounts" },
    { label: "Ledger Transactions", value: stats?.orders || 0, icon: List, sub: "Total orders processed" },
    { label: "Pending Deposits", value: stats?.pendingPayments || 0, icon: Wallet, sub: "Awaiting verification", alert: (stats?.pendingPayments || 0) > 0 }
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <Card key={i} className="border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] overflow-hidden group hover:border-primary/50 transition-all">
            <CardContent className="p-10 flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-2xl ${card.alert ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'} border border-transparent group-hover:scale-110 transition-transform`}>
                <card.icon size={28} />
              </div>
              <div className="space-y-1">
                 <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{card.value}</p>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{card.label}</p>
                 <p className="text-[9px] font-bold text-slate-400 italic uppercase leading-none mt-2">{card.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-10 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden border-2 border-slate-800 shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-primary/20 rounded-xl text-primary border border-primary/20">
                  <Activity size={24} />
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-bold uppercase tracking-tight italic">System Integrity Active</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Real-time monitoring across all nodes</p>
               </div>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
               Welcome to the Global Unlock Command Center. All operations are being logged and encrypted. 
               Use the navigator above to manage orders, approve deposits, and update the service catalog.
            </p>
         </div>
      </div>
    </div>
  );
};

const AdminServiceDashboard = () => (
  <div className="space-y-10">
     <div className="flex items-center justify-between">
        <div className="space-y-1">
           <h3 className="text-2xl font-bold tracking-tight">Service Management</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Configure IMEI & Software offerings</p>
        </div>
        <Button size="sm" className="rounded-lg h-10 px-6 font-bold">
           Add New Service
        </Button>
     </div>
     <AdminServices />
  </div>
);

export default Admin;
