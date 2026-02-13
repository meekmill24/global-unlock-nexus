import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
  id: string;
  credit_amount: number;
  price: number;
  currency: string;
  status: string;
  payment_method: string | null;
  description: string | null;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
  pending: { icon: <Clock size={16} />, label: "Pending", className: "text-yellow-400 bg-yellow-400/10" },
  completed: { icon: <CheckCircle size={16} />, label: "Completed", className: "text-green-400 bg-green-400/10" },
  failed: { icon: <XCircle size={16} />, label: "Failed", className: "text-red-400 bg-red-400/10" },
};

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="glass" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            My Orders
          </h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse h-24" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Your credit purchases will appear here once you make an order.
            </p>
            <Button variant="hero" onClick={() => navigate("/#credits")}>
              Buy Credits
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.pending;
              return (
                <div key={order.id} className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-primary">
                        {order.credit_amount} Credits
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.description || "Credit purchase"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      ${order.price.toFixed(2)} <span className="text-sm text-muted-foreground">{order.currency}</span>
                    </p>
                    {order.payment_method && (
                      <p className="text-xs text-muted-foreground">{order.payment_method}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
