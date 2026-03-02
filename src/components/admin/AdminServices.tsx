import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, RefreshCw, Plus } from "lucide-react";

type ServiceRow = {
  id: string;
  category: string;
  name: string;
  group_name: string;
  price: number;
  delivery: string;
  tag: string | null;
  is_active: boolean;
  created_at: string;
};

type ServiceForm = {
  category: string;
  name: string;
  group_name: string;
  price: string;
  delivery: string;
  tag: string;
  is_active: string;
};

const defaultForm: ServiceForm = {
  category: "imei",
  name: "",
  group_name: "General",
  price: "0.000",
  delivery: "1-5 Minutes",
  tag: "",
  is_active: "true",
};

const AdminServices = () => {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ServiceForm>(defaultForm);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const [editForm, setEditForm] = useState<ServiceForm>(defaultForm);
  const { toast } = useToast();

  const db = supabase as any;

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await db
      .from("services")
      .select("*")
      .order("category", { ascending: true })
      .order("group_name", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setServices((data || []) as ServiceRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast({ title: "Missing service name", variant: "destructive" });
      return;
    }

    const price = Number(form.price);
    if (Number.isNaN(price) || price < 0) {
      toast({ title: "Invalid price", description: "Price must be a positive number.", variant: "destructive" });
      return;
    }

    const { error } = await db.from("services").insert({
      category: form.category,
      name: form.name.trim(),
      group_name: form.group_name.trim() || "General",
      price,
      delivery: form.delivery.trim() || "1-5 Minutes",
      tag: form.tag.trim() || null,
      is_active: form.is_active === "true",
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Service added" });
    setForm(defaultForm);
    fetchServices();
  };

  const openEdit = (service: ServiceRow) => {
    setEditingService(service);
    setEditForm({
      category: service.category,
      name: service.name,
      group_name: service.group_name,
      price: Number(service.price).toFixed(3),
      delivery: service.delivery,
      tag: service.tag || "",
      is_active: service.is_active ? "true" : "false",
    });
  };

  const handleUpdate = async () => {
    if (!editingService) return;

    const price = Number(editForm.price);
    if (Number.isNaN(price) || price < 0) {
      toast({ title: "Invalid price", description: "Price must be a positive number.", variant: "destructive" });
      return;
    }

    const { error } = await db
      .from("services")
      .update({
        category: editForm.category,
        name: editForm.name.trim(),
        group_name: editForm.group_name.trim() || "General",
        price,
        delivery: editForm.delivery.trim() || "1-5 Minutes",
        tag: editForm.tag.trim() || null,
        is_active: editForm.is_active === "true",
      })
      .eq("id", editingService.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Service updated" });
    setEditingService(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    const { error } = await db.from("services").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Service deleted" });
    fetchServices();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services Catalog</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchServices}>
          <RefreshCw className="h-4 w-4 mr-1" /> Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border border-border rounded-lg bg-card/50 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Add New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="imei">IMEI</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Group</Label>
              <Input value={form.group_name} onChange={(e) => setForm((prev) => ({ ...prev, group_name: e.target.value }))} />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Service Name</Label>
              <Input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Price (USD)</Label>
              <Input type="number" step="0.001" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Delivery</Label>
              <Input value={form.delivery} onChange={(e) => setForm((prev) => ({ ...prev, delivery: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Tag</Label>
              <Input placeholder="HOT / NEW / FAST" value={form.tag} onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.is_active} onValueChange={(value) => setForm((prev) => ({ ...prev, is_active: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-1" /> Add Service
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="uppercase text-xs">{service.category}</TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.group_name}</TableCell>
                    <TableCell>${Number(service.price).toFixed(3)}</TableCell>
                    <TableCell>{service.delivery}</TableCell>
                    <TableCell>{service.tag || "—"}</TableCell>
                    <TableCell>{service.is_active ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openEdit(service)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Edit Service</DialogTitle></DialogHeader>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label>Category</Label>
                                <Select value={editForm.category} onValueChange={(value) => setEditForm((prev) => ({ ...prev, category: value }))}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="imei">IMEI</SelectItem>
                                    <SelectItem value="server">Server</SelectItem>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="file">File</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1">
                                <Label>Service Name</Label>
                                <Input value={editForm.name} onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))} />
                              </div>
                              <div className="space-y-1">
                                <Label>Group</Label>
                                <Input value={editForm.group_name} onChange={(e) => setEditForm((prev) => ({ ...prev, group_name: e.target.value }))} />
                              </div>
                              <div className="space-y-1">
                                <Label>Price (USD)</Label>
                                <Input type="number" step="0.001" value={editForm.price} onChange={(e) => setEditForm((prev) => ({ ...prev, price: e.target.value }))} />
                              </div>
                              <div className="space-y-1">
                                <Label>Delivery</Label>
                                <Input value={editForm.delivery} onChange={(e) => setEditForm((prev) => ({ ...prev, delivery: e.target.value }))} />
                              </div>
                              <div className="space-y-1">
                                <Label>Tag</Label>
                                <Input value={editForm.tag} onChange={(e) => setEditForm((prev) => ({ ...prev, tag: e.target.value }))} />
                              </div>
                              <div className="space-y-1">
                                <Label>Status</Label>
                                <Select value={editForm.is_active} onValueChange={(value) => setEditForm((prev) => ({ ...prev, is_active: value }))}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleUpdate} className="w-full">Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {services.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">No services found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminServices;
