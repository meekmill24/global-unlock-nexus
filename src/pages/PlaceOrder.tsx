import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Search, ChevronRight, Tag, Clock, Zap,
  Smartphone, Server, Wifi, FileText, Filter
} from "lucide-react";

interface ServiceItem {
  name: string;
  group: string;
  price: number;
  delivery: string;
  tag?: string;
}

const serviceData: Record<string, { title: string; icon: typeof Smartphone; services: ServiceItem[] }> = {
  imei: {
    title: "Place A New IMEI Order",
    icon: Smartphone,
    services: [
      // OTIX Services
      { name: "OTIX A12+ With Signal - iPhone 11", group: "OTIX A12+ With Signal", price: 24, delivery: "Instant", tag: "HOT" },
      { name: "OTIX A12+ With Signal - iPhone 11 Pro", group: "OTIX A12+ With Signal", price: 28, delivery: "Instant" },
      { name: "OTIX A12+ With Signal - iPhone 11 Pro Max", group: "OTIX A12+ With Signal", price: 32, delivery: "Instant" },
      { name: "OTIX A12+ With Signal - iPhone 12", group: "OTIX A12+ With Signal", price: 36, delivery: "Instant" },
      { name: "OTIX A12+ With Signal - iPhone 12 Pro", group: "OTIX A12+ With Signal", price: 40, delivery: "Instant" },
      // USA T-Mobile
      { name: "USA T-Mobile Premium iPhone Unlock", group: "USA Carrier Unlock", price: 35, delivery: "1-5 Days", tag: "LOW PRICE" },
      { name: "USA T-Mobile / Sprint iPhone Unlock", group: "USA Carrier Unlock", price: 42, delivery: "1-3 Days" },
      { name: "AT&T / Cricket iPhone Unlock – Clean", group: "USA Carrier Unlock", price: 28, delivery: "1-5 Days" },
      { name: "Verizon iPhone Unlock Service", group: "USA Carrier Unlock", price: 30, delivery: "1-3 Days" },
      // Samsung Unlock
      { name: "Samsung Galaxy S24 Unlock – All Carriers", group: "Samsung Unlock", price: 22, delivery: "1-24 Hours" },
      { name: "Samsung Galaxy S23 Unlock – Premium", group: "Samsung Unlock", price: 18, delivery: "1-24 Hours" },
      { name: "Samsung Galaxy A Series Unlock", group: "Samsung Unlock", price: 12, delivery: "Instant", tag: "FAST" },
      // iCloud
      { name: "iCloud Remove – Clean – iPhone 8 to X", group: "iCloud Services", price: 55, delivery: "1-3 Days" },
      { name: "iCloud Remove – Clean – iPhone 11 to 15", group: "iCloud Services", price: 75, delivery: "3-7 Days" },
    ],
  },
  server: {
    title: "Place A New Server Order",
    icon: Server,
    services: [
      // TFM PRO TOOL
      { name: "TFM Tool Pro 1 Year Activation", group: "TFM PRO TOOL", price: 26.775, delivery: "1-5 Minutes" },
      { name: "TFM Tool Pro 2 Year Activation", group: "TFM PRO TOOL", price: 44.625, delivery: "1-5 Minutes" },
      { name: "TFM Tool Pro 3 Months Activation", group: "TFM PRO TOOL", price: 18.375, delivery: "1-5 Minutes" },
      { name: "TFM Tool Pro Credits", group: "TFM PRO TOOL", price: 6.55, delivery: "1-5 Minutes", tag: "New" },
      // MiFrp Tool
      { name: "MiFrp Tool 1 Year License", group: "MiFrp Tool", price: 15, delivery: "1-5 Minutes" },
      { name: "MiFrp Tool 6 Months License", group: "MiFrp Tool", price: 10, delivery: "1-5 Minutes" },
      // UnlockTool
      { name: "UnlockTool 1 Year License", group: "UnlockTool", price: 45, delivery: "Instant", tag: "HOT" },
      { name: "UnlockTool 6 Months License", group: "UnlockTool", price: 28, delivery: "Instant" },
      { name: "UnlockTool 3 Months License", group: "UnlockTool", price: 18, delivery: "Instant" },
      // Chimera Tool
      { name: "Chimera Tool 1 Year License", group: "Chimera Tool", price: 55, delivery: "Instant" },
      { name: "Chimera Tool Credits (Pack of 100)", group: "Chimera Tool", price: 42, delivery: "Instant" },
      // Octoplus
      { name: "Octoplus Server Credits (100 Pack)", group: "Octoplus", price: 38, delivery: "Instant" },
      { name: "Octoplus Samsung 1 Year Activation", group: "Octoplus", price: 32, delivery: "1-5 Minutes" },
    ],
  },
  remote: {
    title: "Place A New Remote Order",
    icon: Wifi,
    services: [
      // GSM Tools Rent
      { name: "Android Multitool Rent (AMT) - 2 Hours", group: "GSM Tools Rent Service – Instant", price: 0.4, delivery: "Instant", tag: "New" },
      { name: "MDM Fix Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 1.4, delivery: "Instant", tag: "New" },
      { name: "TFM Tool Rent [5 Hours]", group: "GSM Tools Rent Service – Instant", price: 0.8, delivery: "Instant", tag: "New" },
      { name: "TSM Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 1.0, delivery: "Instant", tag: "New" },
      { name: "Unlock Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 2.5, delivery: "Instant", tag: "New" },
      // iRemoval Pro
      { name: "iRemoval Pro Premium Hello Bypass – iPad", group: "iRemoval Pro", price: 18, delivery: "1-24 Hours" },
      { name: "iRemoval Pro Premium Hello Bypass – iPhone", group: "iRemoval Pro", price: 25, delivery: "1-24 Hours" },
      // Remote FRP
      { name: "Samsung FRP Remote Service – All Models", group: "Remote FRP Services", price: 8, delivery: "30 Minutes" },
      { name: "Xiaomi FRP Remote Service", group: "Remote FRP Services", price: 6, delivery: "30 Minutes" },
    ],
  },
  file: {
    title: "Place A New File Order",
    icon: FileText,
    services: [
      // Nokia SL3 BruteForce
      { name: "SL3 BRUTEFORCE FAST (1-24 HOURS)", group: "Nokia SL3 BruteForce Service", price: 5.5, delivery: "1-24 Hours" },
      { name: "SL3 BRUTEFORCE - SLOW (1-72 HOURS)", group: "Nokia SL3 BruteForce Service", price: 4.5, delivery: "1-72 Hours" },
      // Firmware Files
      { name: "Samsung Firmware File – Any Model", group: "Firmware Files", price: 3, delivery: "Instant" },
      { name: "Huawei Firmware File – Any Model", group: "Firmware Files", price: 4, delivery: "1-5 Minutes" },
      { name: "Xiaomi Firmware File – Any Model", group: "Firmware Files", price: 3, delivery: "Instant" },
      // Network Files
      { name: "Samsung Network Unlock File", group: "Network Unlock Files", price: 8, delivery: "1-24 Hours" },
      { name: "LG Network Unlock File", group: "Network Unlock Files", price: 6, delivery: "1-24 Hours" },
      // Certificates
      { name: "Samsung EFS/NVM Certificate Backup", group: "Certificates & Backup", price: 10, delivery: "1-3 Hours" },
      { name: "QCN File Service – Qualcomm Devices", group: "Certificates & Backup", price: 12, delivery: "1-24 Hours" },
    ],
  },
};

const PlaceOrder = () => {
  const { type } = useParams<{ type: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Group");
  const [discountedOnly, setDiscountedOnly] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const data = serviceData[type || "imei"];

  const groups = useMemo(() => {
    if (!data) return ["All Group"];
    const unique = [...new Set(data.services.map((s) => s.group))];
    return ["All Group", ...unique];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = data.services;
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
  }, [data, selectedGroup, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, ServiceItem[]>();
    filtered.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    });
    return map;
  }, [filtered]);

  if (loading || !data) return null;

  if (loading) return null;

  const IconComp = data.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Back + Title */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="glass" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} />
          </Button>
          <div className="flex items-center gap-2">
            <IconComp size={22} className="text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{data.title}</h1>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-4 mb-6 space-y-3">
          {/* Group select */}
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

          {/* Search + Discounted */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search Service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={discountedOnly}
                onChange={(e) => setDiscountedOnly(e.target.checked)}
                className="rounded border-border accent-primary"
              />
              Discounted
            </label>
          </div>
        </div>

        {/* Service Listings */}
        <div className="space-y-6">
          {grouped.size === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <Search size={32} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No services found matching your search.</p>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([groupName, items]) => (
              <div key={groupName}>
                {/* Group header */}
                <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                  {groupName}
                </h2>

                {/* Service items */}
                <div className="divide-y divide-border">
                  {items.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left py-4 px-2 hover:bg-secondary/50 transition-colors group flex items-start justify-between gap-3"
                      onClick={() => {/* future: open order form */}}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          {item.tag && (
                            <span className="bg-destructive/20 text-destructive text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{item.group}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded">
                            <Tag size={10} />
                            ${item.price.toFixed(item.price % 1 === 0 ? 0 : item.price < 1 ? 1 : 3)}USD - US Dollar
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
    </div>
  );
};

export default PlaceOrder;
