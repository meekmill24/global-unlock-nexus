import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw, UserPlus } from "lucide-react";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

const AdminUserRoles = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState<string>("user");
  const { toast } = useToast();

  const fetchRoles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select("*");

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRoles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAdd = async () => {
    if (!newUserId.trim()) {
      toast({ title: "Error", description: "Please enter a user ID.", variant: "destructive" });
      return;
    }
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: newUserId.trim(), role: newRole as any });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Role Added" });
      setNewUserId("");
      fetchRoles();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Role Removed" });
      fetchRoles();
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Access Control</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Protocol Assignment & Security Clearance</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchRoles}
          className="rounded-xl border-slate-200 dark:border-slate-800 font-bold hover:bg-primary hover:text-white transition-all h-10 px-6 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Sync Permissions
        </Button>
      </CardHeader>
      <CardContent className="px-0 space-y-10">
        {/* Add Role Form */}
        <div className="flex flex-col md:flex-row gap-4 p-8 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-xl">
          <div className="flex-1 space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target User ID (UUID)</label>
             <Input
               placeholder="00000000-0000-0000-0000-000000000000"
               value={newUserId}
               onChange={(e) => setNewUserId(e.target.value)}
               className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold text-xs"
             />
          </div>
          <div className="w-full md:w-[200px] space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clearance Level</label>
             <Select value={newRole} onValueChange={setNewRole}>
               <SelectTrigger className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold uppercase text-[10px] tracking-widest">
                 <SelectValue />
               </SelectTrigger>
               <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                 <SelectItem value="admin" className="font-bold text-primary uppercase text-[10px] tracking-widest">Level 4: Admin</SelectItem>
                 <SelectItem value="moderator" className="font-bold text-blue-500 uppercase text-[10px] tracking-widest">Level 2: Moderator</SelectItem>
                 <SelectItem value="user" className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Level 1: Standard</SelectItem>
               </SelectContent>
             </Select>
          </div>
          <div className="flex items-end">
             <Button onClick={handleAdd} className="w-full md:w-auto h-12 px-8 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
               Authorize Access
             </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Auditing Clearances...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pl-8">Authorization Handle</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Security Protocol</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pr-8 text-right">Revocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-8 py-5">
                       <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">#{role.user_id.toUpperCase()}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        role.role === "admin" ? "bg-primary text-white" :
                        role.role === "moderator" ? "bg-blue-500 text-white" :
                        "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}>
                        {role.role}
                      </span>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <Button 
                         variant="outline" 
                         size="icon" 
                         className="w-9 h-9 rounded-lg border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                         onClick={() => handleDelete(role.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {roles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-20 text-slate-400 font-bold italic">No specialized access protocols detected.</TableCell>
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

export default AdminUserRoles;
