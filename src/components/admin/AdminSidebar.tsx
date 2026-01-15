import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Image, 
  Mail, 
  Search, 
  Settings, 
  LogOut,
  Home,
  BarChart3,
  Star,
  Briefcase,
  Users,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";

type AdminView = "dashboard" | "blog" | "projects" | "media" | "contacts" | "seo" | "content" | "settings" | "reviews" | "services" | "team" | "analytics";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
}

const menuItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
  { id: "blog" as const, label: "Blog Posts", icon: FileText },
  { id: "projects" as const, label: "Projects", icon: FolderOpen },
  { id: "services" as const, label: "Services", icon: Briefcase },
  { id: "reviews" as const, label: "Reviews", icon: Star },
  { id: "team" as const, label: "Team", icon: Users },
  { id: "media" as const, label: "Media Library", icon: Image },
  { id: "contacts" as const, label: "Messages", icon: Mail },
  { id: "seo" as const, label: "SEO Settings", icon: Search },
  { id: "content" as const, label: "Site Content", icon: Settings },
  { id: "settings" as const, label: "Settings", icon: Sliders },
];

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-display font-bold text-sidebar-foreground">
          <span className="text-primary">SAKO</span> Admin
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
              currentView === item.id
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
