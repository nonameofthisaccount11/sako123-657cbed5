import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
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

type Project = Tables<"projects">;

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    full_description: "",
    client_name: "",
    image_url: "",
    project_url: "",
    technologies: "",
    is_featured: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        description: formData.description,
        full_description: formData.full_description,
        client_name: formData.client_name,
        image_url: formData.image_url,
        project_url: formData.project_url,
        technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        is_featured: formData.is_featured,
        display_order: formData.display_order,
      };

      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingProject.id);

        if (error) throw error;
        toast.success("Project updated");
      } else {
        const { error } = await supabase.from("projects").insert(projectData);
        if (error) throw error;
        toast.success("Project created");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description || "",
      full_description: project.full_description || "",
      client_name: project.client_name || "",
      image_url: project.image_url || "",
      project_url: project.project_url || "",
      technologies: project.technologies?.join(", ") || "",
      is_featured: project.is_featured || false,
      display_order: project.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "",
      description: "",
      full_description: "",
      client_name: "",
      image_url: "",
      project_url: "",
      technologies: "",
      is_featured: false,
      display_order: 0,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="my-project"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    placeholder="Web Design"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Client Name</label>
                  <Input
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Short Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Full Description</label>
                <Textarea
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  rows={5}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project URL</label>
                <Input
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Technologies (comma-separated)</label>
                <Input
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Display Order</label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">No projects yet</div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                )}
                {project.is_featured && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Star className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.category}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(project)}>
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4 mr-1 text-destructive" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
