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
  Filter
} from "lucide-react";
import { serviceData, ServiceItem } from "@/data/serviceData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ServiceOption = ServiceItem & { id?: string };

const PlaceOrder = () => {
  const { type } = useParams<{ type: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Group");
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
        return { label: "IMEI / Serial / Email", placeholder: "Enter IMEI, Serial Number, or Email" };
      case "server":
        return { label: "Email / Username", placeholder: "Enter account email or username" };
      case "remote":
        return { label: "Device Details", placeholder: "Enter model and details" };
      case "file":
        return { label: "Model / Build", placeholder: "Enter model and firmware/build details" };
      default:
        return { label: "Details", placeholder: "Enter order details" };
    }
  }, [type]);

  const groups = useMemo(() => {
    const unique = [...new Set(services.map((s) => s.group))];
    return ["All Group", ...unique];
  }, [services]);

  const filtered = useMemo(() => {
    let items = services;
    if (selectedGroup !== "All Group") {
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

  const openOrderDialog = (service: ServiceOption) => {
    setSelectedService(service);
    setIdentifierValue("");
    setNote("");
    setDialogOpen(true);
  };

  const handlePlaceOrder = async () => {
    if (!user || !selectedService) return;

    if (!identifierValue.trim()) {
      toast({ title: "Missing required details", description: `Please enter ${orderField.label}.`, variant: "destructive" });
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
      credit_amount: 1,
      price: Number(selectedService.price),
      currency: "USD",
      status: "pending",
      payment_method: "manual",
      description,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Order failed", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Order placed", description: "Your order has been submitted successfully." });
    setDialogOpen(false);
    navigate("/orders");
  };

  if (loading || !data) return null;

  const IconComp = data.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="glass" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} />
          </Button>
          <div className="flex items-center gap-2">
            <IconComp size={22} className="text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{data.title}</h1>
          </div>
        </div>

        <div className="glass rounded-xl p-4 mb-6 space-y-3">
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full bg-secondary text-foreground rounded-lg pl-10 pr-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              {groups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {services.length} services
          </p>
        </div>

        <div className="space-y-6">
          {grouped.size === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <Search size={32} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No services found matching your search.</p>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([groupName, items]) => (
              <div key={groupName}>
                <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                  {groupName}
                </h2>
                <div className="divide-y divide-border">
                  {items.map((item, idx) => (
                    <button
                      key={item.id || idx}
                      className="w-full text-left py-4 px-2 hover:bg-secondary/50 transition-colors group flex items-start justify-between gap-3"
                      onClick={() => openOrderDialog(item)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          {item.tag && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded">
                            <Tag size={10} />
                            ${item.price < 1 ? item.price.toFixed(3) : item.price.toFixed(2)} USD
                          </span>
                          <span className="inline-flex items-center gap-1 bg-secondary text-muted-foreground text-xs font-medium px-2 py-0.5 rounded">
                            {item.delivery === "Instant" ? <Zap size={10} /> : <Clock size={10} />}
                            {item.delivery}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground mt-1 shrink-0 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place order</DialogTitle>
            <DialogDescription>{selectedService?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label>{orderField.label}</Label>
              <Input
                value={identifierValue}
                onChange={(e) => setIdentifierValue(e.target.value)}
                placeholder={orderField.placeholder}
              />
            </div>
            <div className="space-y-1">
              <Label>Optional Note</Label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add extra instructions"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Price: <span className="text-foreground font-medium">${selectedService ? Number(selectedService.price).toFixed(3) : "0.000"} USD</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handlePlaceOrder} disabled={submitting || !selectedService}>
              {submitting ? "Placing..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlaceOrder;
