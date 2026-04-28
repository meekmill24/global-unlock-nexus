import { useMemo, useState } from "react";
import { 
  Smartphone, Lock, Key, Shield, Cpu, Server, 
  MonitorSmartphone, Wrench, Crown, Zap, 
  Search, ArrowRight, Filter, ChevronRight,
  Info, Tag, Activity, List
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    {
      id: "featured",
      title: "Featured Services",
      badge: "Top Rated",
      items: [
        { icon: Lock, name: "UnlockTool License", subtitle: "Official Digital License", price: "$0.00", tag: "HOT" },
        { icon: Shield, name: "iRemove iCloud Bypass", subtitle: "Exclusive Bypass Service", price: "$0.00", tag: "INSTANT" },
        { icon: Key, name: "Pandora Tool Activation", subtitle: "Full Activation Bundle", price: "$0.00", tag: null },
        { icon: Wrench, name: "Z3X Samsung Tool", subtitle: "Samsung Repair Pro", price: "$0.00", tag: null },
      ]
    },
    {
      id: "imei",
      title: "IMEI Unlocking",
      badge: "Auto Processing",
      items: [
        { icon: Smartphone, name: "USA T-Mobile iPhone", subtitle: "Network Unlock Service", price: "$0.00", tag: "SECURE" },
        { icon: Smartphone, name: "USA T-Mobile / Sprint", subtitle: "Android Unlock Service", price: "$0.00", tag: null },
        { icon: Smartphone, name: "AT&T / Cricket iPhone", subtitle: "Standard Unlock", price: "$0.00", tag: null },
        { icon: Smartphone, name: "Verizon iPhone Unlock", subtitle: "Premium All Models", price: "$0.00", tag: null },
      ]
    },
    {
      id: "tools",
      title: "Software Tools",
      badge: "Instant Active",
      items: [
        { icon: Cpu, name: "TFM PRO TOOL", subtitle: "Multi-Brand Flasher", price: "$0.00", tag: null },
        { icon: Server, name: "Phoenix Service Tool", subtitle: "Support for Nokia, OnePlus", price: "$0.00", tag: null },
        { icon: MonitorSmartphone, name: "iKeyPro Services", subtitle: "Bypass & Hello Services", price: "$0.00", tag: null },
        { icon: Wrench, name: "TSM Tool", subtitle: "Official Activation Service", price: "$0.00", tag: null },
      ]
    },
    {
      id: "remote",
      title: "Remote & Cloud",
      badge: "Expert Support",
      items: [
        { icon: Server, name: "GSM Tools Rental", subtitle: "Server Hub Rental", price: "$0.00", tag: "INSTANT" },
        { icon: Shield, name: "iRemoval Pro Premium", subtitle: "Premium Hello Bypass", price: "$0.00", tag: null },
        { icon: Crown, name: "Dhru Fusion Pro", subtitle: "Wholesale API Access", price: "$0.00", tag: "OFFICIAL" },
        { icon: Key, name: "XiaomiPaid Service", subtitle: "Official Auth Service", price: "$0.00", tag: null },
      ]
    },
  ];

  const filteredCategories = useMemo(() => {
    let result = categories;
    if (activeTab !== "all") {
      result = result.filter(cat => cat.id === activeTab);
    }
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.map(cat => ({
        ...cat,
        items: cat.items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.subtitle.toLowerCase().includes(query)
        )
      })).filter(cat => cat.items.length > 0);
    }
    return result;
  }, [searchTerm, activeTab]);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase tracking-widest font-bold px-3 py-1 text-[10px]">
              Service Marketplace
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Service <span className="text-primary underline decoration-primary/20 underline-offset-8">Catalog</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
              Browse our extensive list of professional unlocking tools and software services. 
              Search by brand or tool name to find exactly what you need.
            </p>
          </div>
          
          <div className="w-full md:w-auto md:min-w-[320px]">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors h-4 w-4" />
              <Input 
                placeholder="Search services or tools..." 
                className="pl-12 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary shadow-sm rounded-xl font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 h-auto flex-wrap rounded-xl justify-start sm:justify-center">
            <TabsTrigger value="all" className="rounded-lg px-4 sm:px-8 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm flex-1 sm:flex-none">All Services</TabsTrigger>
            <TabsTrigger value="featured" className="rounded-lg px-4 sm:px-8 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm flex-1 sm:flex-none">Featured</TabsTrigger>
            <TabsTrigger value="imei" className="rounded-lg px-4 sm:px-8 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm flex-1 sm:flex-none">IMEI Unlock</TabsTrigger>
            <TabsTrigger value="tools" className="rounded-lg px-4 sm:px-8 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm flex-1 sm:flex-none">Software</TabsTrigger>
            <TabsTrigger value="remote" className="rounded-lg px-4 sm:px-8 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm flex-1 sm:flex-none">Remote</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Catalog Grid */}
        <div className="space-y-20">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
              <Info className="h-16 w-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold">No services found</h3>
              <p className="text-muted-foreground font-medium">Try adjusting your search query or filter.</p>
              <Button variant="outline" className="mt-8 rounded-lg font-bold" onClick={() => {setSearchTerm(""); setActiveTab("all");}}>Clear Filters</Button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-6">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">{category.title}</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-bold px-3 py-0.5 border-none">
                    {category.badge}
                  </Badge>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((item, idx) => (
                    <Card key={idx} className="group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all border border-slate-100 dark:border-slate-700 group-hover:border-primary/20">
                            <item.icon size={22} strokeWidth={2.5} />
                          </div>
                          {item.tag && (
                            <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5 shadow-sm">
                              {item.tag}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 flex-1">
                        <CardTitle className="text-lg font-bold leading-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">{item.name}</CardTitle>
                        <p className="text-xs text-muted-foreground font-semibold leading-relaxed line-clamp-2">{item.subtitle}</p>
                      </CardContent>
                      <CardFooter className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 p-5">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                          <Activity size={12} className="text-emerald-500" />
                          Online Now
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-xs group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                          Order Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
