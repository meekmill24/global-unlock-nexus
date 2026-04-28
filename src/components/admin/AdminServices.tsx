import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, RefreshCw, Plus } from "lucide-react";

type ServiceRow = {
  id: string;
  category: string;
  name: string;
  group_name: string;
  price: number;
  delivery: string;
  tag: string | null;
  is_active: boolean;
  created_at: string;
};

type ServiceForm = {
  category: string;
  name: string;
  group_name: string;
  price: string;
  delivery: string;
  tag: string;
  is_active: string;
};

const defaultForm: ServiceForm = {
  category: "imei",
  name: "",
  group_name: "General",
  price: "0.000",
  delivery: "1-5 Minutes",
  tag: "",
  is_active: "true",
};

const AdminServices = () => {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ServiceForm>(defaultForm);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const [editForm, setEditForm] = useState<ServiceForm>(defaultForm);
  const { toast } = useToast();

  const db = supabase as any;

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await db
      .from("services")
      .select("*")
      .order("category", { ascending: true })
      .order("group_name", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setServices((data || []) as ServiceRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast({ title: "Missing service name", variant: "destructive" });
      return;
    }

    const price = Number(form.price);
    if (Number.isNaN(price) || price < 0) {
      toast({ title: "Invalid price", description: "Price must be a positive number.", variant: "destructive" });
      return;
    }

    const { error } = await db.from("services").insert({
      category: form.category,
      name: form.name.trim(),
      group_name: form.group_name.trim() || "General",
      price,
      delivery: form.delivery.trim() || "1-5 Minutes",
      tag: form.tag.trim() || null,
      is_active: form.is_active === "true",
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Service added" });
    setForm(defaultForm);
    fetchServices();
  };

  const openEdit = (service: ServiceRow) => {
    setEditingService(service);
    setEditForm({
      category: service.category,
      name: service.name,
      group_name: service.group_name,
      price: Number(service.price).toFixed(3),
      delivery: service.delivery,
      tag: service.tag || "",
      is_active: service.is_active ? "true" : "false",
    });
  };

  const handleUpdate = async () => {
    if (!editingService) return;

    const price = Number(editForm.price);
    if (Number.isNaN(price) || price < 0) {
      toast({ title: "Invalid price", description: "Price must be a positive number.", variant: "destructive" });
      return;
    }

    const { error } = await db
      .from("services")
      .update({
        category: editForm.category,
        name: editForm.name.trim(),
        group_name: editForm.group_name.trim() || "General",
        price,
        delivery: editForm.delivery.trim() || "1-5 Minutes",
        tag: editForm.tag.trim() || null,
        is_active: editForm.is_active === "true",
      })
      .eq("id", editingService.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Service updated" });
    setEditingService(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    const { error } = await db.from("services").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Service deleted" });
    fetchServices();
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Service Inventory</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Global Catalog Configuration</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchServices}
          className="rounded-xl border-slate-200 dark:border-slate-800 font-bold hover:bg-primary hover:text-white transition-all h-10 px-6 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Sync Database
        </Button>
      </CardHeader>
      <CardContent className="px-0 space-y-12">
        <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-xl space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
             <Plus className="text-primary h-5 w-5" />
             <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Deploy New Service</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</Label>
              <Select value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                  <SelectItem value="imei" className="font-bold uppercase text-[10px]">IMEI Services</SelectItem>
                  <SelectItem value="server" className="font-bold uppercase text-[10px]">Server Services</SelectItem>
                  <SelectItem value="remote" className="font-bold uppercase text-[10px]">Remote Services</SelectItem>
                  <SelectItem value="file" className="font-bold uppercase text-[10px]">File Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Group</Label>
              <Input 
                 placeholder="e.g. iPhone Worldwide"
                 className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                 value={form.group_name} 
                 onChange={(e) => setForm((prev) => ({ ...prev, group_name: e.target.value }))} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</Label>
              <Select value={form.is_active} onValueChange={(value) => setForm((prev) => ({ ...prev, is_active: value }))}>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                  <SelectItem value="true" className="font-bold text-emerald-500">Live / Active</SelectItem>
                  <SelectItem value="false" className="font-bold text-rose-500">Offline / Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Service Designation</Label>
              <Input 
                 placeholder="e.g. USA AT&T iPhone Unlock [CLEAN]"
                 className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                 value={form.name} 
                 onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Price (USD)</Label>
              <Input 
                 type="number" step="0.001" 
                 className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-black text-primary"
                 value={form.price} 
                 onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Time</Label>
              <Input 
                 placeholder="1-5 Minutes"
                 className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold italic text-slate-900 dark:text-white"
                 value={form.delivery} 
                 onChange={(e) => setForm((prev) => ({ ...prev, delivery: e.target.value }))} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marketing Tag</Label>
              <Input 
                 placeholder="HOT / NEW / FAST" 
                 className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-black uppercase italic text-slate-900 dark:text-white"
                 value={form.tag} 
                 onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))} 
              />
            </div>
            <div className="md:col-span-1 flex items-end">
               <Button onClick={handleCreate} className="w-full h-12 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                 Deploy Service
               </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Scanning Catalog...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pl-8">Class</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Service Identity</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Group Path</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Unit Price</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">ETA</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Indicator</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Visibility</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pr-8 text-right">Ops</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-8 py-5">
                       <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-1 rounded uppercase tracking-tighter border border-primary/10">{service.category}</span>
                    </TableCell>
                    <TableCell className="font-bold text-xs text-slate-900 dark:text-white max-w-[200px] truncate">
                       {service.name}
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-500 uppercase italic">
                       {service.group_name}
                    </TableCell>
                    <TableCell className="font-black text-xs text-slate-900 dark:text-white">
                       ${Number(service.price).toFixed(3)}
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400 italic">
                       {service.delivery}
                    </TableCell>
                    <TableCell>
                       {service.tag ? (
                          <span className="text-[8px] font-black bg-slate-900 text-white px-2 py-0.5 rounded tracking-widest italic">{service.tag}</span>
                       ) : (
                          <span className="text-[8px] font-bold text-slate-300 italic">—</span>
                       )}
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${service.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-tight ${service.is_active ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {service.is_active ? 'Live' : 'Offline'}
                          </span>
                       </div>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-slate-200 dark:border-slate-800 hover:text-primary transition-all" onClick={() => openEdit(service)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-slate-950 text-white">
                            <div className="bg-slate-900 p-8 border-b border-slate-800">
                               <DialogHeader className="text-left space-y-1">
                                 <DialogTitle className="text-xl font-black text-white uppercase italic tracking-tight">Service Configuration</DialogTitle>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target ID: {service.id.slice(0, 16).toUpperCase()}...</p>
                               </DialogHeader>
                            </div>
                            <div className="p-8 space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Class</Label>
                                  <Select value={editForm.category} onValueChange={(value) => setEditForm((prev) => ({ ...prev, category: value }))}>
                                    <SelectTrigger className="h-10 rounded-lg border-slate-800 bg-slate-900 font-bold text-white"><SelectValue /></SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-800 bg-slate-900 text-white">
                                      <SelectItem value="imei" className="font-bold text-[10px] uppercase">IMEI</SelectItem>
                                      <SelectItem value="server" className="font-bold text-[10px] uppercase">Server</SelectItem>
                                      <SelectItem value="remote" className="font-bold text-[10px] uppercase">Remote</SelectItem>
                                      <SelectItem value="file" className="font-bold text-[10px] uppercase">File</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</Label>
                                  <Select value={editForm.is_active} onValueChange={(value) => setEditForm((prev) => ({ ...prev, is_active: value }))}>
                                    <SelectTrigger className="h-10 rounded-lg border-slate-800 bg-slate-900 font-bold text-white"><SelectValue /></SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-800 bg-slate-900 text-white">
                                      <SelectItem value="true" className="font-bold text-emerald-500 text-[10px] uppercase">Live</SelectItem>
                                      <SelectItem value="false" className="font-bold text-rose-500 text-[10px] uppercase">Offline</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Service Designation</Label>
                                <Input value={editForm.name} onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))} className="h-10 rounded-lg border-slate-800 bg-slate-900 font-bold text-white placeholder:text-slate-600" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Service Group Path</Label>
                                <Input value={editForm.group_name} onChange={(e) => setEditForm((prev) => ({ ...prev, group_name: e.target.value }))} className="h-10 rounded-lg border-slate-800 bg-slate-900 font-bold italic text-white placeholder:text-slate-600" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Price (USD)</Label>
                                  <Input type="number" step="0.001" value={editForm.price} onChange={(e) => setEditForm((prev) => ({ ...prev, price: e.target.value }))} className="h-10 rounded-lg border-slate-800 bg-slate-900 font-black text-primary" />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Delivery Timeframe</Label>
                                  <Input value={editForm.delivery} onChange={(e) => setEditForm((prev) => ({ ...prev, delivery: e.target.value }))} className="h-10 rounded-lg border-slate-800 bg-slate-900 font-bold italic text-white placeholder:text-slate-600" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Indicator Tag</Label>
                                <Input value={editForm.tag} onChange={(e) => setEditForm((prev) => ({ ...prev, tag: e.target.value }))} className="h-10 rounded-lg border-slate-800 bg-slate-900 font-black uppercase italic text-white placeholder:text-slate-600" />
                              </div>
                              <Button onClick={handleUpdate} className="w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 mt-4">Commit Configuration</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                           variant="outline" 
                           size="icon" 
                           className="w-8 h-8 rounded-lg border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all" 
                           onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {services.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-20 text-slate-400 font-bold italic">No catalog entries detected.</TableCell>
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

export default AdminServices;
