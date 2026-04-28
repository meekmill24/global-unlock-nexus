import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, RefreshCw } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  credits: number;
  created_at: string;
}

const AdminProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const [editName, setEditName] = useState("");
  const [editCredits, setEditCredits] = useState<number>(0);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const handleUpdate = async () => {
    if (!editProfile) return;
    const { error } = await supabase
      .from("profiles")
      .update({ 
        display_name: editName,
        credits: Number(editCredits)
      })
      .eq("id", editProfile.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated" });
      setEditProfile(null);
      fetchProfiles();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetchProfiles();
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">User Registry</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Identity Management & Security Auditing</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchProfiles}
          className="rounded-xl border-slate-200 dark:border-slate-800 font-bold hover:bg-primary hover:text-white transition-all h-10 px-6 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Sync Profiles
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Indexing Database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pl-8">Access Token</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Public Identity</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Credit Asset</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6">Registered</TableHead>
                  <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-widest py-6 pr-8 text-right">Ops</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-8 py-5">
                       <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">#{profile.user_id.slice(0, 12).toUpperCase()}</span>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/10">
                             {profile.display_name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <span className="font-bold text-xs text-slate-900 dark:text-white">{profile.display_name || "Anonymous Operative"}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900 dark:text-white">${Number(profile.credits).toFixed(2)}</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">USD Credits</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400 italic">
                       {new Date(profile.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-9 h-9 rounded-lg border-slate-200 dark:border-slate-800 hover:text-primary transition-all"
                              onClick={() => {
                                setEditProfile(profile);
                                setEditName(profile.display_name || "");
                                setEditCredits(profile.credits || 0);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-slate-950 text-white">
                            <div className="bg-slate-900 p-8 border-b border-slate-800">
                               <DialogHeader className="text-left space-y-1">
                                 <DialogTitle className="text-xl font-black text-white uppercase italic tracking-tight">Identity Modification</DialogTitle>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User ID: {profile.user_id.toUpperCase()}</p>
                               </DialogHeader>
                            </div>
                            <div className="p-8 space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                  <label className="text-[10px] font-black text-slate-200 tracking-widest uppercase ml-1">Display Alias</label>
                                  <Input 
                                     value={editName} 
                                     onChange={(e) => setEditName(e.target.value)} 
                                     placeholder="Enter new public name..."
                                     className="h-12 rounded-xl border-slate-800 bg-slate-900 font-bold text-white placeholder:text-slate-600"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-[10px] font-black text-slate-200 tracking-widest uppercase ml-1">Credit Asset Balance</label>
                                  <Input 
                                     type="number"
                                     value={editCredits} 
                                     onChange={(e) => setEditCredits(Number(e.target.value))} 
                                     placeholder="0.00"
                                     className="h-12 rounded-xl border-slate-800 bg-slate-900 font-bold text-white placeholder:text-slate-600"
                                  />
                                </div>
                              </div>
                              <Button onClick={handleUpdate} className="w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">Commit Account Update</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all" onClick={() => handleDelete(profile.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {profiles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-slate-400 font-bold italic">No operative profiles detected in the current buffer.</TableCell>
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

export default AdminProfiles;
