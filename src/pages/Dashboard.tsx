import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Wallet, ShoppingCart, DollarSign, Receipt,
  Smartphone, Server, Wifi, FileText, 
  ArrowRight, TrendingUp, Clock, CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  const orderTypes = [
    { icon: Smartphone, label: "IMEI Order", path: "/place-order/imei", color: "from-blue-500 to-blue-600" },
    { icon: Server, label: "Server Order", path: "/place-order/server", color: "from-emerald-500 to-emerald-600" },
    { icon: Wifi, label: "Remote Order", path: "/place-order/remote", color: "from-purple-500 to-purple-600" },
    { icon: FileText, label: "File Order", path: "/place-order/file", color: "from-orange-500 to-orange-600" },
  ];

  const stats = [
    { icon: Receipt, label: "Total Receipts", value: "$0.00", sub: "USD" },
    { icon: ShoppingCart, label: "Total Orders", value: "0", sub: "orders" },
    { icon: CheckCircle, label: "Completed", value: "0", sub: "orders" },
    { icon: Clock, label: "Pending", value: "0", sub: "orders" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        {/* Page title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Client Area Dashboard
        </h1>

        {/* Balance Card */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Current Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">$0.00</span>
                <span className="text-muted-foreground text-sm">USD - US Dollar</span>
              </div>
            </div>
            <Button variant="hero" size="lg" onClick={() => navigate("/#credits")} className="shrink-0">
              <ShoppingCart size={18} />
              Buy Credit
            </Button>
          </div>
        </div>

        {/* Unpaid Balance */}
        <div className="glass rounded-2xl p-5 mb-8 border-l-4 border-l-primary">
          <p className="text-sm font-medium text-primary mb-1">Unpaid Balance</p>
          <span className="text-2xl font-bold text-primary">$0.00</span>
          <span className="text-muted-foreground text-sm ml-2">USD - US Dollar</span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <stat.icon size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Place an Order Section */}
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Place an Order
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {orderTypes.map((type, i) => (
            <button
              key={i}
              onClick={() => navigate(type.path)}
              className="glass rounded-xl p-5 hover:scale-[1.03] transition-all duration-300 group text-left"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}>
                <type.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                {type.label}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                Place Order <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </div>

        {/* Recent Orders */}
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
        <div className="glass rounded-2xl p-8 text-center">
          <Wallet size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No recent orders. Place your first order above!</p>
          <Button variant="glow" size="sm" className="mt-4" onClick={() => navigate("/orders")}>
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
