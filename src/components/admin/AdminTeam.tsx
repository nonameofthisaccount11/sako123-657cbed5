import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, User } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type TeamMember = Tables<"team_members">;

type SocialLinks = {
  [key: string]: string | undefined;
  twitter?: string;
  linkedin?: string;
  github?: string;
  email?: string;
};

export function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    social_links: { twitter: "", linkedin: "", github: "", email: "" } as SocialLinks,
    display_order: 0,
    is_published: true
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast({ title: "Error", description: "Failed to load team members", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        image_url: formData.image_url,
        social_links: formData.social_links,
        display_order: formData.display_order,
        is_published: formData.is_published
      };

      if (editingMember) {
        const { error } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingMember.id);
        if (error) throw error;
        toast({ title: "Success", description: "Team member updated successfully" });
      } else {
        const { error } = await supabase
          .from("team_members")
          .insert([payload]);
        if (error) throw error;
        toast({ title: "Success", description: "Team member added successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast({ title: "Error", description: "Failed to save team member", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Team member deleted" });
      fetchMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({ title: "Error", description: "Failed to delete team member", variant: "destructive" });
    }
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    const socialLinks = (member.social_links || {}) as SocialLinks;
    setFormData({
      name: member.name,
      role: member.role || "",
      bio: member.bio || "",
      image_url: member.image_url || "",
      social_links: {
        twitter: socialLinks.twitter || "",
        linkedin: socialLinks.linkedin || "",
        github: socialLinks.github || "",
        email: socialLinks.email || ""
      },
      display_order: member.display_order || 0,
      is_published: member.is_published ?? true
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      image_url: "",
      social_links: { twitter: "", linkedin: "", github: "", email: "" },
      display_order: 0,
      is_published: true
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading team members...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Team Members</h2>
          <p className="text-muted-foreground">Manage your team for the About page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Team Member</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="CEO & Founder"
                  />
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief bio about this team member..."
                  rows={3}
                />
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div className="space-y-3">
                <Label>Social Links</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={formData.social_links.twitter}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, twitter: e.target.value }
                    })}
                    placeholder="Twitter URL"
                  />
                  <Input
                    value={formData.social_links.linkedin}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, linkedin: e.target.value }
                    })}
                    placeholder="LinkedIn URL"
                  />
                  <Input
                    value={formData.social_links.github}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, github: e.target.value }
                    })}
                    placeholder="GitHub URL"
                  />
                  <Input
                    value={formData.social_links.email}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social_links: { ...formData.social_links, email: e.target.value }
                    })}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Published</Label>
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={!formData.name}>
                {editingMember ? "Update Member" : "Add Member"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No team members yet. Add your first team member!
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(member)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{member.name}</h3>
                {!member.is_published && (
                  <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">Draft</span>
                )}
              </div>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
