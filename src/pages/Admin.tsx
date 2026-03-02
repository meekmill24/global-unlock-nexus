import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminPaymentRequests from "@/components/admin/AdminPaymentRequests";
import AdminProfiles from "@/components/admin/AdminProfiles";
import AdminUserRoles from "@/components/admin/AdminUserRoles";
import AdminServices from "@/components/admin/AdminServices";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Shield className="h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground">You do not have admin privileges.</p>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Site
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="roles">User Roles</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="orders"><AdminOrders /></TabsContent>
          <TabsContent value="payments"><AdminPaymentRequests /></TabsContent>
          <TabsContent value="profiles"><AdminProfiles /></TabsContent>
          <TabsContent value="roles"><AdminUserRoles /></TabsContent>
          <TabsContent value="services"><AdminServices /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
