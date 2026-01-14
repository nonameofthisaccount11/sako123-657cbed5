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

type SiteContent = Tables<"site_content">;

export function AdminSiteContent() {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    page_key: "",
    section_key: "",
    content: "",
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page_key");

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      toast.error("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedContent;
      try {
        parsedContent = JSON.parse(formData.content);
      } catch {
        parsedContent = { text: formData.content };
      }

      const { error } = await supabase.from("site_content").insert({
        page_key: formData.page_key,
        section_key: formData.section_key,
        content: parsedContent,
      });

      if (error) throw error;
      toast.success("Content added");
      setIsDialogOpen(false);
      resetForm();
      fetchContents();
    } catch (error) {
      toast.error("Failed to save content");
    }
  };

  const handleUpdateContent = async (content: SiteContent, newContent: string) => {
    try {
      let parsedContent;
      try {
        parsedContent = JSON.parse(newContent);
      } catch {
        parsedContent = { text: newContent };
      }

      const { error } = await supabase
        .from("site_content")
        .update({ content: parsedContent })
        .eq("id", content.id);

      if (error) throw error;
      toast.success("Content updated");
      fetchContents();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    try {
      const { error } = await supabase.from("site_content").delete().eq("id", id);
      if (error) throw error;
      toast.success("Content deleted");
      fetchContents();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const resetForm = () => {
    setFormData({
      page_key: "",
      section_key: "",
      content: "",
    });
  };

  const groupedContents = contents.reduce((acc, content) => {
    if (!acc[content.page_key]) {
      acc[content.page_key] = [];
    }
    acc[content.page_key].push(content);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Site Content</h2>
          <p className="text-muted-foreground">Edit text and content across the site</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Content
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Site Content</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Page Key</label>
                <Input
                  value={formData.page_key}
                  onChange={(e) => setFormData({ ...formData, page_key: e.target.value })}
                  required
                  placeholder="home"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Section Key</label>
                <Input
                  value={formData.section_key}
                  onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                  required
                  placeholder="hero"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content (JSON or plain text)</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                  placeholder='{"title": "Welcome", "subtitle": "..."}'
                />
              </div>
              <Button type="submit" className="w-full">Add Content</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : Object.keys(groupedContents).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No content configured yet</div>
        ) : (
          Object.entries(groupedContents).map(([pageKey, pageContents]) => (
            <div key={pageKey} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-muted px-6 py-4">
                <h3 className="font-display font-semibold capitalize">{pageKey} Page</h3>
              </div>
              <div className="divide-y divide-border">
                {pageContents.map((content) => (
                  <div key={content.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-sm text-primary font-medium">{content.section_key}</span>
                        <p className="text-xs text-muted-foreground">
                          Updated: {new Date(content.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(content.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <Textarea
                      defaultValue={JSON.stringify(content.content, null, 2)}
                      onBlur={(e) => handleUpdateContent(content, e.target.value)}
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
