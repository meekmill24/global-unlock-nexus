import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  CreditCard, Smartphone, Bitcoin, ArrowLeft,
  Zap, Shield, Clock, CheckCircle, Copy, ChevronRight,
  TrendingUp, Star, Sparkles, Terminal, Activity, Database,
  Wallet, ShieldCheck, Info, ArrowRight, CheckCircle2, Plus
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const creditPackages = [
  { credits: 50, price: 50, label: "Starter Package", popular: false },
  { credits: 100, price: 95, label: "Standard Refill", popular: false },
  { credits: 250, price: 225, label: "Professional Pack", popular: true },
  { credits: 500, price: 425, label: "Business Volume", popular: false },
  { credits: 1000, price: 800, label: "Wholesale Enterprise", popular: false },
];

const paymentMethods = [
  {
    id: "paystack",
    name: "Paystack",
    icon: CreditCard,
    description: "Accepts Card, Bank & MoMo",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800",
    fields: ["email"],
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: Zap,
    description: "Global & USSD Payments",
    color: "text-orange-600 bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800",
    fields: ["email", "phone"],
  },
  {
    id: "hubtel",
    name: "Hubtel Money",
    icon: Smartphone,
    description: "MTN, Vodafone & AirtelTigo",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800",
    fields: ["phone"],
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Bitcoin,
    description: "BTC, USDT & ETH (Fast)",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800",
    fields: [],
  },
];

const cryptoAddresses = [
  { currency: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin Network" },
  { currency: "USDT (TRC20)", address: "TJYkJ2ZmR1dG8VaHmFgLqX7pZ3YiXdKnAv", network: "TRON (TRC20) Network" },
  { currency: "ETH", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", network: "Ethereum Network" },
];

const BuyCredits = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState<"package" | "method" | "details" | "confirm">("package");
  const [selectedPackage, setSelectedPackage] = useState<typeof creditPackages[0] | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<typeof paymentMethods[0] | null>(null);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAddresses[0]);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (!user) {
    navigate("/auth");
    return null;
  }

  const effectiveCredits = selectedPackage?.credits || parseInt(customAmount) || 0;
  const effectivePrice = selectedPackage?.price || (parseInt(customAmount) || 0);

  const handleSubmit = async () => {
    if (!selectedMethod || effectiveCredits <= 0) return;
    setSubmitting(true);

    const { error } = await supabase.from("payment_requests").insert({
      user_id: user.id,
      amount: effectivePrice,
      credit_amount: effectiveCredits,
      payment_method: selectedMethod.id,
      payment_reference: reference || null,
      crypto_address: selectedMethod.id === "crypto" ? selectedCrypto.address : null,
      crypto_currency: selectedMethod.id === "crypto" ? selectedCrypto.currency : null,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Submission Failed", description: "Could not process your payment request.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Your payment request is pending review by our team." });
      navigate("/dashboard");
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({ title: "Address Copied", description: "Target wallet address copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-20 max-w-4xl animate-in fade-in duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-1">
            <button 
              onClick={() => step === "package" ? navigate("/dashboard") : setStep(step === "confirm" ? "details" : step === "details" ? "method" : "package")}
              className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-4 uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Previous Step
            </button>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">Buy Credits</h1>
            <p className="text-muted-foreground text-sm font-semibold italic">Refill your account to process new orders.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all border-2 ${
                  ["package", "method", "details", "confirm"].indexOf(step) >= i - 1 
                    ? "bg-primary border-primary text-white shadow-xl shadow-primary/20" 
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300"
                }`}
              >
                {i}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-10">
          {step === "package" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {creditPackages.map((pkg, i) => (
                  <Card 
                    key={pkg.credits}
                    onClick={() => { setSelectedPackage(pkg); setCustomAmount(""); }}
                    className={`cursor-pointer transition-all duration-300 border-2 shadow-md group hover:border-primary rounded-[2rem] overflow-hidden flex flex-col ${
                      selectedPackage?.credits === pkg.credits ? "border-primary bg-primary/5" : "border-white dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <CardHeader className="pb-4 pt-10 px-8">
                      <div className="flex justify-between items-center">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedPackage?.credits === pkg.credits ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-primary"}`}>
                          <Database size={24} />
                        </div>
                        {pkg.popular && (
                          <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 shadow-md">Best Value</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 px-8 flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{pkg.label}</p>
                      <div className="flex items-baseline gap-2">
                         <CardTitle className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{pkg.credits}</CardTitle>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credits</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-8 pb-10 px-8 flex items-center justify-between">
                       <span className="text-2xl font-black text-primary tracking-tight">${pkg.price.toFixed(2)}</span>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedPackage?.credits === pkg.credits ? "bg-primary text-white translate-x-1" : "bg-slate-50 text-slate-200"}`}>
                          <ChevronRight size={18} />
                       </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card className="border-none shadow-lg bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-6 pt-8 px-10 border-b border-slate-50 dark:border-slate-800">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                     <Plus size={18} className="text-primary" /> Want a Custom Amount?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="space-y-4 max-w-md mx-auto text-center">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enter any amount (1 Credit = 1 USD)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 150"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedPackage(null); }}
                      className="h-16 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl text-center text-3xl font-black focus:ring-primary shadow-inner"
                      min={1}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="w-full h-16 rounded-[1.5rem] text-sm font-bold uppercase tracking-[0.3rem] shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all" 
                disabled={effectiveCredits <= 0} 
                onClick={() => setStep("method")}
              >
                Proceed to Payment — ${effectivePrice.toFixed(2)}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === "method" && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((method) => (
                  <Card 
                    key={method.id}
                    onClick={() => { setSelectedMethod(method); setStep("details"); }}
                    className="cursor-pointer group hover:border-primary transition-all duration-300 shadow-lg bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800 rounded-[2rem] p-4"
                  >
                    <CardHeader className="pb-6">
                      <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center transition-all ${method.color} shadow-sm`}>
                         <method.icon size={32} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <CardTitle className="text-xl font-bold tracking-tight uppercase leading-none text-slate-900 dark:text-white">{method.name}</CardTitle>
                      <CardDescription className="text-xs font-bold italic text-slate-400">{method.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="pt-8 mt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-primary">Select Method</span>
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === "details" && selectedMethod && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10">
              <div className="flex items-start gap-5 p-8 bg-primary/5 border-2 border-primary/10 rounded-[2rem]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Info size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">Payment Instructions</p>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                    {selectedMethod.id === "crypto" 
                      ? "Please send the exact total to one of the addresses below, then copy and paste your Transaction ID."
                      : `After completing your ${selectedMethod.name} transfer, please enter your Payment Reference or Transaction ID.`}
                  </p>
                </div>
              </div>

              {selectedMethod.id === "crypto" && (
                <div className="space-y-6">
                  {cryptoAddresses.map((crypto) => (
                    <Card key={crypto.currency} className="border-none shadow-md bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden group">
                      <CardContent className="p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-amber-500/5 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-500/10">
                               <Bitcoin size={32} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{crypto.currency}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2rem]">{crypto.network}</p>
                            </div>
                          </div>
                          
                          <div className="flex-1 max-w-md flex items-center gap-4">
                            <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner flex items-center">
                               <code className="text-[11px] text-slate-500 font-bold truncate flex-1 font-mono">{crypto.address}</code>
                               <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-primary hover:bg-primary/5" onClick={() => copyAddress(crypto.address)}>
                                 <Copy size={18} />
                               </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="p-10 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-inner">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total to Send</p>
                      <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">${effectivePrice.toFixed(2)} USD</h4>
                    </div>
                    <Sparkles className="text-primary/30 h-14 w-14" />
                  </div>
                </div>
              )}

              <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {selectedMethod.fields.includes("email") && (
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Registered Email</Label>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" className="h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold" />
                    </div>
                  )}
                  {selectedMethod.fields.includes("phone") && (
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number (MTN/MoMo)</Label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+000 XX XXX XXXX" className="h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold" />
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    {selectedMethod.id === "crypto" ? "Transaction ID / Hash" : "Payment Reference / Control Number"}
                  </Label>
                  <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Paste your receipt reference here..." className="h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold" />
                </div>
              </Card>

              <Button 
                size="lg" 
                className="w-full h-16 rounded-[1.5rem] text-sm font-bold uppercase tracking-[0.3rem] shadow-xl shadow-primary/20 bg-primary" 
                onClick={() => setStep("confirm")} 
                disabled={!reference.trim()}
              >
                Review Order Details
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === "confirm" && selectedMethod && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10">
              <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden">
                <div className="bg-primary h-3 w-full" />
                <CardHeader className="pt-14 pb-10 px-12 border-b border-slate-50 dark:border-slate-800 text-center space-y-4">
                   <div className="w-16 h-16 bg-primary/10 rounded-[1.2rem] flex items-center justify-center mx-auto text-primary border-2 border-primary/10">
                      <ShieldCheck size={32} />
                   </div>
                   <div>
                      <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Confirm Payment</CardTitle>
                      <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 italic">Please review your submission carefully</CardDescription>
                   </div>
                </CardHeader>
                <CardContent className="p-14 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Credits</p>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tighter">{effectiveCredits} Credits</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount to Pay</p>
                      <p className="text-2xl font-extrabold text-primary tracking-tighter">${effectivePrice.toFixed(2)} USD</p>
                    </div>
                    <div className="space-y-1 col-span-2 md:col-span-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Method</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight uppercase">{selectedMethod.name}</p>
                    </div>
                    <div className="space-y-2 col-span-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference Signature</p>
                       <p className="text-xs font-mono font-bold text-slate-500 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 break-all">{reference}</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex items-start gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-100 dark:border-slate-800 shrink-0">
                       <Clock size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Verification Pending</p>
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed max-w-xl italic">
                        All payments are manually verified by our team. Once confirmed, credits will be added to your balance within 1 to 12 hours.
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pb-14 pt-0 px-14">
                  <Button 
                    className="w-full h-16 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.3rem] shadow-xl shadow-primary/20 bg-primary group relative overflow-hidden" 
                    onClick={handleSubmit} 
                    disabled={submitting}
                  >
                    {submitting ? (
                       <div className="flex items-center gap-3">
                         <Loader2 className="animate-spin h-5 w-5" /> Submitting...
                       </div>
                    ) : (
                      "Confirm & Submit Payment"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
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

export default BuyCredits;
