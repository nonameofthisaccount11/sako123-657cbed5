import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, FolderOpen, Image, Mail } from "lucide-react";

interface Stats {
  blogPosts: number;
  projects: number;
  media: number;
  contacts: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ blogPosts: 0, projects: 0, media: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogRes, projectsRes, mediaRes, contactsRes] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("media_library").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);

      setStats({
        blogPosts: blogRes.count || 0,
        projects: projectsRes.count || 0,
        media: mediaRes.count || 0,
        contacts: contactsRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-blue-400" },
    { label: "Projects", value: stats.projects, icon: FolderOpen, color: "text-green-400" },
    { label: "Media Files", value: stats.media, icon: Image, color: "text-purple-400" },
    { label: "New Messages", value: stats.contacts, icon: Mail, color: "text-amber-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to the SAKO admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-3xl font-display font-bold">
                {loading ? "-" : stat.value}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left">
            <FileText className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm font-medium">New Blog Post</span>
          </button>
          <button className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left">
            <FolderOpen className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm font-medium">Add Project</span>
          </button>
          <button className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left">
            <Image className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm font-medium">Upload Media</span>
          </button>
          <button className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left">
            <Mail className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm font-medium">View Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
}
