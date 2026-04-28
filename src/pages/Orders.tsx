import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  History, Search, Filter, RefreshCw, ChevronRight, 
  Clock, CheckCircle2, XCircle, AlertCircle, 
  ExternalLink, Smartphone, Tag, List, LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Fetch Error", description: "Your order history could not be retrieved.", variant: "destructive" });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (user) fetchOrders();
  }, [user, authLoading, navigate]);

  const filteredOrders = orders.filter(order => 
    order.description?.toLowerCase().includes(search.toLowerCase()) ||
    order.status?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-3 font-bold uppercase tracking-widest text-[9px]">Success</Badge>;
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600 border-none px-3 font-bold uppercase tracking-widest text-[9px]">Processing</Badge>;
      case "rejected":
      case "cancelled":
        return <Badge className="bg-destructive hover:bg-destructive/90 border-none px-3 font-bold uppercase tracking-widest text-[9px]">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="px-3 font-bold uppercase tracking-widest text-[9px]">{status}</Badge>;
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Header />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-7xl animate-in fade-in duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
          <div className="space-y-3">
             <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary transition-colors mb-2 uppercase tracking-widest"
            >
              <LayoutDashboard size={16} /> Dashboard Overview
            </button>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 flex items-center justify-center rounded-[1.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                 <History size={32} className="text-primary" />
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Order History</h1>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic flex items-center gap-2">
                   Live tracking for your service requests
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={fetchOrders} 
              className="rounded-xl h-12 px-6 font-bold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Updates
            </Button>
            <Button 
              className="rounded-xl h-12 px-6 font-bold shadow-xl shadow-primary/20"
              onClick={() => navigate("/#catalog")}
            >
              New Order
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <Card className="border-none bg-white dark:bg-slate-900 shadow-lg mb-10 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-1 group">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Find orders by IMEI, service name, or status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 pl-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:ring-1 focus:ring-primary/20 shadow-inner"
                />
              </div>
              <div className="flex items-center gap-3 px-6 h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl">
                 <Filter size={16} className="text-slate-400" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2rem]">Sort: Latest First</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="border-none bg-white dark:bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-row items-center justify-between">
             <div>
               <CardTitle className="text-xl font-bold tracking-tight">Recent Activity</CardTitle>
               <CardDescription className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Found {filteredOrders.length} records in your account</CardDescription>
             </div>
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Database Synced</span>
             </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center space-y-4">
                <RefreshCw className="h-10 w-10 text-primary/40 animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Loading Order History...</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-950/30">
                    <TableRow className="hover:bg-transparent border-b border-slate-50 dark:border-slate-800">
                      <TableHead className="py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID / Date</TableHead>
                      <TableHead className="py-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description & Details</TableHead>
                      <TableHead className="py-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</TableHead>
                      <TableHead className="py-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</TableHead>
                      <TableHead className="py-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition-colors border-b border-slate-50 dark:border-slate-800">
                        <TableCell className="py-8 px-10">
                          <div className="space-y-1">
                             <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">#{order.id.slice(0, 8).toUpperCase()}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                               <Clock size={10} /> {new Date(order.created_at).toLocaleDateString()}
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-8 px-4 min-w-[300px]">
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-sm">
                                <Smartphone size={20} />
                              </div>
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-sm line-clamp-2">
                                {order.description || "No description provided."}
                              </p>
                           </div>
                        </TableCell>
                        <TableCell className="py-8 px-4">
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell className="py-8 px-4">
                          <div className="space-y-1">
                             <p className="text-xs font-black text-slate-900 dark:text-white">${Number(order.price).toFixed(2)}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{order.payment_method || "Credits"}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-8 px-10 text-right">
                          <Button variant="ghost" size="sm" className="rounded-lg h-10 w-10 p-0 text-slate-300 hover:text-primary hover:bg-primary/5">
                             <ChevronRight size={20} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-40 flex flex-col items-center justify-center text-center px-10">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 text-slate-200 border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <List size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No orders to display</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                  Your history is currently empty. Visit the catalog to place your first device unlock request.
                </p>
                <Button className="mt-8 rounded-xl font-bold h-12 px-8" onClick={() => navigate("/#catalog")}>
                  Browse Services
                </Button>
              </div>
            )}
          </CardContent>
          <div className="bg-slate-50/50 dark:bg-slate-950/30 p-8 flex items-center justify-center border-t border-slate-50 dark:border-slate-800">
             <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-amber-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-destructive" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rejected</span>
                </div>
             </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Orders;
