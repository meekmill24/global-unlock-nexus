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
  Zap, Shield, Clock, CheckCircle, Copy, ChevronRight
} from "lucide-react";

const creditPackages = [
  { credits: 50, price: 50, label: "Starter", popular: false },
  { credits: 100, price: 95, label: "Standard", popular: false },
  { credits: 250, price: 225, label: "Pro", popular: true },
  { credits: 500, price: 425, label: "Business", popular: false },
  { credits: 1000, price: 800, label: "Enterprise", popular: false },
];

const paymentMethods = [
  {
    id: "paystack",
    name: "Paystack",
    icon: CreditCard,
    description: "Cards, Bank Transfer, Mobile Money",
    color: "from-blue-500 to-blue-600",
    fields: ["email"],
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: Zap,
    description: "Cards, Mobile Money, Bank, USSD",
    color: "from-orange-500 to-yellow-500",
    fields: ["email", "phone"],
  },
  {
    id: "hubtel",
    name: "Hubtel",
    icon: Smartphone,
    description: "MTN MoMo, Vodafone Cash, AirtelTigo",
    color: "from-green-500 to-emerald-600",
    fields: ["phone"],
  },
  {
    id: "crypto",
    name: "Crypto",
    icon: Bitcoin,
    description: "BTC, USDT (TRC20), ETH",
    color: "from-amber-500 to-orange-600",
    fields: [],
  },
];

const cryptoAddresses = [
  { currency: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin" },
  { currency: "USDT (TRC20)", address: "TJYkJ2ZmR1dG8VaHmFgLqX7pZ3YiXdKnAv", network: "Tron" },
  { currency: "ETH", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", network: "Ethereum" },
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
      toast({ title: "Error", description: "Failed to submit payment request.", variant: "destructive" });
    } else {
      toast({ title: "Payment Request Submitted!", description: "Your request is pending admin approval. Credits will be added once confirmed." });
      navigate("/dashboard");
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({ title: "Copied!", description: "Wallet address copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
        {/* Back + Title */}
        <button onClick={() => step === "package" ? navigate("/dashboard") : setStep(step === "confirm" ? "details" : step === "details" ? "method" : "package")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={18} /> Back
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Package", "Payment", "Details", "Confirm"].map((label, i) => {
            const steps = ["package", "method", "details", "confirm"];
            const isActive = steps.indexOf(step) >= i;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</span>
                {i < 3 && <ChevronRight size={14} className="text-muted-foreground" />}
              </div>
            );
          })}
        </div>

        {/* Step 1: Select Package */}
        {step === "package" && (
          <div className="animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground mb-2">Buy Credits</h1>
            <p className="text-muted-foreground mb-6">Select a credit package or enter a custom amount.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {creditPackages.map((pkg) => (
                <button
                  key={pkg.credits}
                  onClick={() => { setSelectedPackage(pkg); setCustomAmount(""); }}
                  className={`glass rounded-xl p-5 text-left transition-all hover:scale-[1.02] relative ${selectedPackage?.credits === pkg.credits ? "ring-2 ring-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : ""}`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">BEST VALUE</span>
                  )}
                  <p className="text-xs text-muted-foreground mb-1">{pkg.label}</p>
                  <p className="text-2xl font-bold text-foreground">{pkg.credits}</p>
                  <p className="text-xs text-muted-foreground">credits</p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-lg font-bold text-primary">${pkg.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">USD</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="glass rounded-xl p-5 mb-6">
              <Label className="text-foreground text-sm mb-2 block">Custom Amount (credits = USD)</Label>
              <Input
                type="number"
                placeholder="Enter custom credit amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedPackage(null); }}
                className="bg-background/50 border-border"
                min={1}
              />
            </div>

            <Button variant="hero" size="lg" className="w-full" disabled={effectiveCredits <= 0} onClick={() => setStep("method")}>
              Continue — {effectiveCredits} Credits (${effectivePrice})
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === "method" && (
          <div className="animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment Method</h1>
            <p className="text-muted-foreground mb-6">Choose how you'd like to pay for {effectiveCredits} credits (${effectivePrice}).</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => { setSelectedMethod(method); setStep("details"); }}
                  className="glass rounded-xl p-5 text-left hover:scale-[1.02] transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3`}>
                    <method.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{method.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === "details" && selectedMethod && (
          <div className="animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment Details</h1>
            <p className="text-muted-foreground mb-6">
              {selectedMethod.id === "crypto"
                ? "Send the exact amount to the wallet address below, then paste your transaction hash."
                : `Complete your ${selectedMethod.name} payment and enter the reference/transaction ID.`}
            </p>

            {/* Crypto addresses */}
            {selectedMethod.id === "crypto" && (
              <div className="space-y-3 mb-6">
                <Label className="text-foreground text-sm">Select Cryptocurrency</Label>
                {cryptoAddresses.map((crypto) => (
                  <button
                    key={crypto.currency}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`w-full glass rounded-xl p-4 text-left transition-all ${selectedCrypto.currency === crypto.currency ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{crypto.currency}</p>
                        <p className="text-xs text-muted-foreground">{crypto.network}</p>
                      </div>
                      <CheckCircle size={18} className={selectedCrypto.currency === crypto.currency ? "text-primary" : "text-muted"} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded break-all flex-1">{crypto.address}</code>
                      <button onClick={(e) => { e.stopPropagation(); copyAddress(crypto.address); }} className="p-1.5 hover:bg-primary/10 rounded transition-colors">
                        <Copy size={14} className="text-primary" />
                      </button>
                    </div>
                  </button>
                ))}

                <div className="glass rounded-xl p-4 border-l-4 border-l-primary">
                  <p className="text-sm font-medium text-primary mb-1">Amount to send</p>
                  <p className="text-2xl font-bold text-foreground">${effectivePrice} <span className="text-sm text-muted-foreground">USD equivalent</span></p>
                </div>
              </div>
            )}

            {/* Contact fields */}
            <div className="space-y-4 mb-6">
              {selectedMethod.fields.includes("email") && (
                <div>
                  <Label className="text-foreground text-sm">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-background/50 border-border mt-1" />
                </div>
              )}
              {selectedMethod.fields.includes("phone") && (
                <div>
                  <Label className="text-foreground text-sm">Phone Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 XX XXX XXXX" className="bg-background/50 border-border mt-1" />
                </div>
              )}
              <div>
                <Label className="text-foreground text-sm">
                  {selectedMethod.id === "crypto" ? "Transaction Hash / TX ID" : "Payment Reference / Transaction ID"}
                </Label>
                <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Paste your reference here" className="bg-background/50 border-border mt-1" />
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={() => setStep("confirm")} disabled={!reference.trim()}>
              Review Payment
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === "confirm" && selectedMethod && (
          <div className="animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground mb-6">Confirm Payment</h1>

            <div className="glass rounded-2xl p-6 mb-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Credits</span>
                <span className="text-foreground font-bold text-lg">{effectiveCredits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Amount</span>
                <span className="text-primary font-bold text-lg">${effectivePrice} USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Method</span>
                <span className="text-foreground font-medium">{selectedMethod.name}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground text-sm">Reference</span>
                <span className="text-foreground text-sm text-right max-w-[200px] break-all">{reference}</span>
              </div>
              {selectedMethod.id === "crypto" && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Crypto</span>
                  <span className="text-foreground font-medium">{selectedCrypto.currency}</span>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <div className="flex items-start gap-3 text-xs text-muted-foreground">
                  <Shield size={16} className="text-primary shrink-0 mt-0.5" />
                  <p>Your payment will be reviewed by our team. Credits are typically added within 1-24 hours after verification.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 glass rounded-xl p-4 mb-6">
              <Clock size={20} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Admin Approval Required</p>
                <p className="text-xs text-muted-foreground">Credits will be added after payment verification.</p>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Payment Request"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCredits;
