import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, RefreshCw } from "lucide-react";

interface Order {
  id: string;
  user_id: string;
  credit_amount: number;
  price: number;
  currency: string;
  status: string;
  payment_method: string | null;
  description: string | null;
  created_at: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdate = async () => {
    if (!editOrder) return;
    const { error } = await supabase
      .from("orders")
      .update({ status: editStatus, description: editDescription })
      .eq("id", editOrder.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: "Order updated successfully." });
      setEditOrder(null);
      fetchOrders();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Order deleted." });
      fetchOrders();
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 flex flex-row items-center justify-between mb-6">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Active Orders</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Live Transaction Monitoring</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchOrders}
          className="rounded-xl border-slate-200 dark:border-slate-800 font-bold hover:bg-primary hover:text-white transition-all h-10 px-6 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh Feed
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Fetching Database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pl-8">Order Hash</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">User Identity</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Capital Flow</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">System Status</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Gateway</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Timestamp</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pr-8 text-right">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-8 py-5">
                       <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">#{order.id.slice(0, 8).toUpperCase()}</span>
                    </TableCell>
                    <TableCell className="font-bold text-xs text-slate-600 dark:text-slate-300">
                       {order.user_id.slice(0, 12)}...
                    </TableCell>
                    <TableCell>
                       <div className="space-y-1">
                          <p className="text-xs font-black text-slate-900 dark:text-white">{order.credit_amount} Credits</p>
                          <p className="text-[10px] font-bold text-primary italic uppercase">{order.currency} {order.price.toFixed(2)}</p>
                       </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${
                        order.status === "completed" ? "bg-emerald-500 text-white" :
                        order.status === "pending" ? "bg-amber-500 text-white" :
                        order.status === "processing" ? "bg-blue-500 text-white" :
                        "bg-rose-500 text-white"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-slate-500 uppercase italic">
                       {order.payment_method || "System Override"}
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400">
                       {new Date(order.created_at).toLocaleDateString()} <br />
                       <span className="opacity-60">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-9 h-9 rounded-lg border-slate-200 dark:border-slate-800 hover:text-primary transition-all"
                              onClick={() => {
                                setEditOrder(order);
                                setEditStatus(order.status);
                                setEditDescription(order.description || "");
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-slate-950 text-white">
                            <div className="bg-slate-900 p-8 border-b border-slate-800">
                               <DialogHeader className="text-left space-y-1">
                                 <DialogTitle className="text-xl font-black text-white uppercase italic tracking-tight">Order Modification</DialogTitle>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hash: {order.id.toUpperCase()}</p>
                               </DialogHeader>
                            </div>
                            <div className="p-8 space-y-8">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-200 tracking-widest uppercase">System Status</label>
                                <Select value={editStatus} onValueChange={setEditStatus}>
                                  <SelectTrigger className="h-12 rounded-xl border-slate-800 bg-slate-900 font-bold text-white"><SelectValue /></SelectTrigger>
                                  <SelectContent className="rounded-xl border-slate-800 bg-slate-900 text-white">
                                    <SelectItem value="pending" className="font-bold">Pending Approval</SelectItem>
                                    <SelectItem value="processing" className="font-bold">Active Processing</SelectItem>
                                    <SelectItem value="completed" className="font-bold text-emerald-500">Order Completed</SelectItem>
                                    <SelectItem value="cancelled" className="font-bold text-rose-500">Void / Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-200 tracking-widest uppercase">Internal Annotation</label>
                                <Input 
                                  value={editDescription} 
                                  onChange={(e) => setEditDescription(e.target.value)}
                                  placeholder="Enter management notes..."
                                  className="h-12 rounded-xl border-slate-800 bg-slate-900 font-bold text-white placeholder:text-slate-600"
                                />
                              </div>
                              <Button onClick={handleUpdate} className="w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">Apply Protocol Updates</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                           variant="outline" 
                           size="icon" 
                           className="w-9 h-9 rounded-lg border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                           onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-20 text-slate-400 font-bold italic">No transactional records found in the current buffer.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
