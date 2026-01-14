import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type SEOSetting = Tables<"seo_settings">;

export function AdminSEO() {
  const [settings, setSettings] = useState<SEOSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    page_path: "",
    title: "",
    description: "",
    keywords: "",
    og_image: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("seo_settings")
        .select("*")
        .order("page_path");

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      toast.error("Failed to fetch SEO settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("seo_settings").insert({
        page_path: formData.page_path,
        title: formData.title,
        description: formData.description,
        keywords: formData.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        og_image: formData.og_image,
      });

      if (error) throw error;
      toast.success("SEO settings added");
      setIsDialogOpen(false);
      resetForm();
      fetchSettings();
    } catch (error) {
      toast.error("Failed to save SEO settings");
    }
  };

  const handleUpdate = async (setting: SEOSetting, field: keyof SEOSetting, value: string | string[]) => {
    try {
      const { error } = await supabase
        .from("seo_settings")
        .update({ [field]: value })
        .eq("id", setting.id);

      if (error) throw error;
      toast.success("Updated");
      fetchSettings();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this SEO setting?")) return;
    try {
      const { error } = await supabase.from("seo_settings").delete().eq("id", id);
      if (error) throw error;
      toast.success("SEO settings deleted");
      fetchSettings();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const resetForm = () => {
    setFormData({
      page_path: "",
      title: "",
      description: "",
      keywords: "",
      og_image: "",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">SEO Settings</h2>
          <p className="text-muted-foreground">Manage meta tags for each page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add SEO Settings</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Page Path</label>
                <Input
                  value={formData.page_path}
                  onChange={(e) => setFormData({ ...formData, page_path: e.target.value })}
                  required
                  placeholder="/"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Page Title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Keywords (comma-separated)</label>
                <Input
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="web design, agency, creative"
                />
              </div>
              <div>
                <label className="text-sm font-medium">OG Image URL</label>
                <Input
                  value={formData.og_image}
                  onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <Button type="submit" className="w-full">Add SEO Settings</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : settings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No SEO settings configured</div>
        ) : (
          settings.map((setting) => (
            <div key={setting.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display font-semibold text-lg">{setting.page_path}</h3>
                  <p className="text-muted-foreground text-sm">Last updated: {new Date(setting.updated_at).toLocaleDateString()}</p>
                </div>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(setting.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Title</label>
                  <Input
                    defaultValue={setting.title || ""}
                    onBlur={(e) => handleUpdate(setting, "title", e.target.value)}
                    placeholder="Page title..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <Textarea
                    defaultValue={setting.description || ""}
                    onBlur={(e) => handleUpdate(setting, "description", e.target.value)}
                    rows={2}
                    placeholder="Meta description..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Keywords</label>
                  <Input
                    defaultValue={setting.keywords?.join(", ") || ""}
                    onBlur={(e) => handleUpdate(setting, "keywords", e.target.value.split(",").map((k) => k.trim()).filter(Boolean))}
                    placeholder="Keywords..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">OG Image</label>
                  <Input
                    defaultValue={setting.og_image || ""}
                    onBlur={(e) => handleUpdate(setting, "og_image", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
