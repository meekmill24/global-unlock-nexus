import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Search, ChevronRight, Tag, Clock, Zap,
  Filter
} from "lucide-react";
import { serviceData } from "@/data/serviceData";

const PlaceOrder = () => {
  const { type } = useParams<{ type: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Group");

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
    const map = new Map<string, typeof filtered>();
    filtered.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    });
    return map;
  }, [filtered]);

  if (loading || !data) return null;

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
            Showing {filtered.length} of {data.services.length} services
          </p>
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
                <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                  {groupName}
                </h2>
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
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                              item.tag === "HOT" ? "bg-destructive/20 text-destructive" :
                              item.tag === "NEW" ? "bg-primary/20 text-primary" :
                              item.tag === "FAST" ? "bg-emerald-500/20 text-emerald-400" :
                              "bg-accent text-accent-foreground"
                            }`}>
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
    </div>
  );
};

export default PlaceOrder;
