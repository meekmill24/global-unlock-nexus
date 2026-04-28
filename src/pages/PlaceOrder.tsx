import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft, Search, ChevronRight, Tag, Clock, Zap,
  Filter, Smartphone, Server, Wifi, FileText, Database,
  Terminal, Activity, Shield, Info, CreditCard,
  CheckCircle2, AlertCircle, ShoppingCart
} from "lucide-react";
import { serviceData, ServiceItem } from "@/data/serviceData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ServiceOption = ServiceItem & { id?: string };

const PlaceOrder = () => {
  const { type } = useParams<{ type: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Categories");
  const [dbServices, setDbServices] = useState<ServiceOption[]>([]);

  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [identifierValue, setIdentifierValue] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!type) return;

      const db = supabase as any;
      const { data, error } = await db
        .from("services")
        .select("id, category, name, group_name, price, delivery, tag, is_active")
        .eq("category", type)
        .eq("is_active", true)
        .order("group_name", { ascending: true })
        .order("name", { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        const normalized: ServiceOption[] = data.map((service: any) => ({
          id: service.id,
          name: service.name,
          group: service.group_name,
          price: Number(service.price),
          delivery: service.delivery,
          tag: service.tag || undefined,
        }));
        setDbServices(normalized);
      }
    };

    fetchServices();
  }, [type]);

  const data = serviceData[type || "imei"];
  const services: ServiceOption[] = dbServices.length > 0 ? dbServices : (data?.services ?? []);

  const orderField = useMemo(() => {
    switch (type) {
      case "imei":
        return { label: "IMEI / SERIAL NUMBER", placeholder: "Enter your device IMEI or Serial..." };
      case "server":
        return { label: "EMAIL / USERNAME", placeholder: "Enter account details for activation..." };
      case "remote":
        return { label: "DEVICE MODEL", placeholder: "Enter complete model details..." };
      case "file":
        return { label: "VERSION / BUILD", placeholder: "Enter firmware or file version..." };
      default:
        return { label: "IDENTIFIER", placeholder: "Enter required details..." };
    }
  }, [type]);

  const groups = useMemo(() => {
    const unique = [...new Set(services.map((s) => s.group))];
    return ["All Categories", ...unique];
  }, [services]);

  const filtered = useMemo(() => {
    let items = services;
    if (selectedGroup !== "All Categories") {
      items = items.filter((s) => s.group === selectedGroup);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (s) => s.name.toLowerCase().includes(q) || s.group.toLowerCase().includes(q)
      );
    }
    return items;
  }, [services, selectedGroup, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, ServiceOption[]>();
    filtered.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    });
    return map;
  }, [filtered]);

  const [userCredits, setUserCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("credits")
        .eq("user_id", user.id)
        .single();
      
      if (!error && data) {
        setUserCredits(Number(data.credits));
      }
    };
    fetchCredits();
  }, [user, dialogOpen]);

  const openOrderDialog = (service: ServiceOption) => {
    setSelectedService(service);
    setIdentifierValue("");
    setNote("");
    setDialogOpen(true);
  };

  const handlePlaceOrder = async () => {
    if (!user || !selectedService || userCredits === null) return;

    if (userCredits < Number(selectedService.price)) {
      toast({ 
        title: "Insufficient Credits", 
        description: `You need $${Number(selectedService.price).toFixed(2)} to place this order. Your current balance is $${userCredits.toFixed(2)}.`, 
        variant: "destructive" 
      });
      return;
    }

    if (!identifierValue.trim()) {
      toast({ title: "Validation Error", description: `${orderField.label} is required.`, variant: "destructive" });
      return;
    }

    setSubmitting(true);

    const description = [
      selectedService.name,
      `${orderField.label}: ${identifierValue.trim()}`,
      note.trim() ? `Note: ${note.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      credit_amount: Number(selectedService.price),
      price: Number(selectedService.price),
      currency: "USD",
      status: "pending",
      payment_method: "credits",
      description,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Order Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Order Placed", description: "Your order has been submitted and is processing." });
    setDialogOpen(false);
    navigate("/orders");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-10 text-center">
        <AlertCircle className="text-destructive mb-4" size={48} />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-2">Service Category Not Found</h2>
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="mt-4 font-bold">Return to Dashboard</Button>
      </div>
    );
  }

  const IconComp = data.icon;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-500">
      <Header />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-5xl animate-in fade-in duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
          <div className="space-y-3">
             <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-slate-100 hover:text-primary transition-all mb-2 uppercase tracking-widest bg-white/50 dark:bg-white/5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <ArrowLeft size={16} /> Return to Dashboard
            </button>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-[1.5rem] shadow-xl shadow-primary/20">
                 <IconComp size={32} />
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-none">{data.title}</h1>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic flex items-center gap-2">
                  <Activity size={14} className="text-emerald-500" /> Professional Unlocking Terminal
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase leading-none tracking-widest">Active Services</span>
                <span className="text-sm font-bold dark:text-white uppercase leading-none mt-2">{filtered.length} Services Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <Card className="border-none bg-white dark:bg-slate-900 shadow-lg mb-12 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="relative group">
                <Filter size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors pr-2 border-r border-slate-100" />
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full h-14 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  {groups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                   <ChevronRight size={18} className="rotate-90" />
                </div>
              </div>

              <div className="relative group">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search specifically for your device..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 pl-14 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:ring-1 focus:ring-primary/20 shadow-inner"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Directory */}
        <div className="space-y-14">
          {grouped.size === 0 ? (
            <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
              <Search size={64} className="mx-auto mb-6 text-slate-200" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic mb-6">No matching services found in this category.</p>
              <Button variant="outline" className="rounded-xl font-bold px-8 h-12" onClick={() => {setSearch(""); setSelectedGroup("All Categories");}}>
                See All Services
              </Button>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([groupName, items], catIdx) => (
              <div key={groupName} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${catIdx * 0.05}s` }}>
                <div className="flex items-center gap-6 mb-8 px-4">
                  <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase shrink-0">
                    {groupName}
                  </h2>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 opacity-50"></div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {items.map((item, idx) => (
                    <Card 
                      key={item.id || idx}
                      className="group cursor-pointer hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800 rounded-[1.5rem] overflow-hidden"
                      onClick={() => openOrderDialog(item)}
                    >
                      <CardContent className="p-8 flex items-center justify-between gap-10">
                        <div className="flex-1 min-w-0 space-y-4">
                          <div className="flex items-center gap-4 flex-wrap">
                            <span className="text-xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-primary transition-all leading-tight">
                              {item.name}
                            </span>
                            {item.tag && (
                              <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-2.5 py-1 shadow-sm">
                                {item.tag}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-8 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                 <Tag size={12} strokeWidth={3} />
                              </div>
                              <span className="text-[11px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">
                                PRICE: ${item.price < 1 ? item.price.toFixed(3) : item.price.toFixed(2)} USD
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 group-hover:text-amber-500 transition-colors">
                                 {item.delivery === "Instant" ? <Zap size={12} strokeWidth={3} fill="currentColor" /> : <Clock size={12} strokeWidth={3} />}
                              </div>
                              <span className="text-[11px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest italic underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4 decoration-2">
                                DELIVERY: {item.delivery}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:scale-110 group-hover:rotate-12">
                           <ChevronRight size={24} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Place Order Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl z-[150] max-h-[95vh] flex flex-col">
          <div className="bg-slate-900 p-6 sm:p-8 border-b border-slate-800 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="text-left space-y-4 relative z-10">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 flex items-center justify-center rounded-xl sm:rounded-2xl text-primary border border-slate-700 shadow-xl shrink-0">
                    <ShoppingCart size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-none">Checkout Terminal</DialogTitle>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-950 uppercase tracking-widest italic leading-none truncate max-w-[150px] sm:max-w-none">Service: {selectedService?.name}</span>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white dark:bg-slate-950 overflow-y-auto custom-scrollbar">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-900 dark:text-slate-200 tracking-[0.2rem] uppercase ml-1">{orderField.label}</Label>
                <div className="relative group">
                   <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                   <Input
                    value={identifierValue}
                    onChange={(e) => setIdentifierValue(e.target.value)}
                    placeholder={orderField.placeholder}
                    className="h-16 pl-14 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-base font-bold focus:ring-primary shadow-inner placeholder:text-slate-400 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-900 dark:text-slate-200 tracking-[0.2rem] uppercase ml-1">ADDITIONAL INSTRUCTIONS (OPTIONAL)</Label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter any additional details here..."
                  className="w-full min-h-[120px] p-5 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 placeholder:text-slate-400 text-slate-900 dark:text-white resize-none shadow-inner transition-all"
                />
              </div>

              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Total</p>
                   <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">${selectedService ? Number(selectedService.price).toFixed(2) : "0.00"} <span className="text-[10px] text-slate-400">USD Credits</span></p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Your Balance:</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">${userCredits?.toFixed(2) || "0.00"}</p>
                   </div>
                   <div className={`px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 ${userCredits && selectedService && userCredits < Number(selectedService.price) ? 'bg-rose-500/10 border-rose-500/20' : ''}`}>
                      {userCredits && selectedService && userCredits < Number(selectedService.price) ? (
                        <>
                          <AlertCircle size={16} className="text-rose-500" />
                          <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Insufficient Credits</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Available</span>
                        </>
                      )}
                   </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="ghost"
                onClick={() => setDialogOpen(false)} 
                disabled={submitting}
                className="h-16 flex-1 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all font-mono"
              >
                CANCEL ORDER
              </Button>
              <Button 
                onClick={handlePlaceOrder} 
                disabled={submitting || !selectedService}
                className="h-16 flex-1 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.3rem] bg-primary hover:bg-amber-600 text-slate-950 shadow-xl shadow-primary/20 group relative overflow-hidden transition-all"
              >
                {submitting ? (
                   <div className="flex items-center gap-3">
                     <Loader2 className="animate-spin" size={18} /> PROCESSING...
                   </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" /> PLACE ORDER NOW
                  </div>
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>
  </svg>
)

export default PlaceOrder;
