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

interface PaymentRequest {
  id: string;
  user_id: string;
  amount: number;
  credit_amount: number;
  currency: string;
  payment_method: string;
  status: string;
  admin_notes: string | null;
  payment_reference: string | null;
  crypto_address: string | null;
  crypto_currency: string | null;
  created_at: string;
}

const AdminPaymentRequests = () => {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editReq, setEditReq] = useState<PaymentRequest | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const { toast } = useToast();

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("payment_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleUpdate = async () => {
    if (!editReq) return;
    const { error } = await supabase
      .from("payment_requests")
      .update({ status: editStatus, admin_notes: editNotes })
      .eq("id", editReq.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: "Payment request updated." });
      setEditReq(null);
      fetchRequests();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("payment_requests").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetchRequests();
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Capital Deposits</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Verification of User Credit Inbound</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchRequests}
          className="rounded-xl border-slate-200 dark:border-slate-800 font-bold hover:bg-primary hover:text-white transition-all h-10 px-6 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Update Ledger
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Validating Assets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pl-8">User ID</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Fiat Value</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Credit Yield</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Method</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Ledger Status</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Reference</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Date</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pr-8 text-right">Ops</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-8 py-5">
                       <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">#{req.user_id.slice(0, 8).toUpperCase()}</span>
                    </TableCell>
                    <TableCell className="font-black text-xs text-slate-900 dark:text-white uppercase italic">
                       {req.currency} {req.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="font-bold text-xs text-primary">
                       +{req.credit_amount} CREDITS
                    </TableCell>
                    <TableCell className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                       {req.payment_method}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${
                        req.status === "approved" ? "bg-emerald-500 text-white" :
                        req.status === "pending" ? "bg-amber-500 text-white" :
                        "bg-rose-500 text-white"
                      }`}>
                        {req.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400 truncate max-w-[120px]">
                       {req.payment_reference || "—"}
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400">
                       {new Date(req.created_at).toLocaleDateString()}
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
                                setEditReq(req);
                                setEditStatus(req.status);
                                setEditNotes(req.admin_notes || "");
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-slate-950 text-white">
                            <div className="bg-slate-900 p-8 border-b border-slate-800">
                               <DialogHeader className="text-left space-y-1">
                                 <DialogTitle className="text-xl font-black text-white uppercase italic tracking-tight">Deposit Verification</DialogTitle>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {req.id.toUpperCase()}</p>
                               </DialogHeader>
                            </div>
                            <div className="p-8 space-y-8">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-200 tracking-widest uppercase">Ledger Action</label>
                                <Select value={editStatus} onValueChange={setEditStatus}>
                                  <SelectTrigger className="h-12 rounded-xl border-slate-800 bg-slate-900 font-bold text-white"><SelectValue /></SelectTrigger>
                                  <SelectContent className="rounded-xl border-slate-800 bg-slate-900 text-white">
                                    <SelectItem value="pending" className="font-bold">Pending Review</SelectItem>
                                    <SelectItem value="approved" className="font-bold text-emerald-500 text-[10px] uppercase tracking-widest">Approve & Fund</SelectItem>
                                    <SelectItem value="rejected" className="font-bold text-rose-500 text-[10px] uppercase tracking-widest">Reject & Void</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-200 tracking-widest uppercase">Admin Verification Notes</label>
                                <Input 
                                   value={editNotes} 
                                   onChange={(e) => setEditNotes(e.target.value)} 
                                   placeholder="Enter reason for approval/rejection..."
                                   className="h-12 rounded-xl border-slate-800 bg-slate-900 font-bold text-white placeholder:text-slate-600"
                                />
                              </div>
                              <Button onClick={handleUpdate} className="w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">Commit Ledger Update</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all" onClick={() => handleDelete(req.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {requests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-20 text-slate-400 font-bold italic">No deposit requests detected in the current ledger.</TableCell>
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

export default AdminPaymentRequests;
