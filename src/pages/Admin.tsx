import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminBlogPosts } from "@/components/admin/AdminBlogPosts";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminMedia } from "@/components/admin/AdminMedia";
import { AdminContacts } from "@/components/admin/AdminContacts";
import { AdminSEO } from "@/components/admin/AdminSEO";
import { AdminSiteContent } from "@/components/admin/AdminSiteContent";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminReviews } from "@/components/admin/AdminReviews";
import { AdminServices } from "@/components/admin/AdminServices";
import { AdminTeam } from "@/components/admin/AdminTeam";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { Loader2 } from "lucide-react";

type AdminView = "dashboard" | "blog" | "projects" | "media" | "contacts" | "seo" | "content" | "settings" | "reviews" | "services" | "team" | "analytics";

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          setTimeout(() => checkAdminRole(session.user.id), 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      if (data && !error) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    navigate("/auth");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
          <button 
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard />;
      case "blog":
        return <AdminBlogPosts />;
      case "projects":
        return <AdminProjects />;
      case "media":
        return <AdminMedia />;
      case "contacts":
        return <AdminContacts />;
      case "seo":
        return <AdminSEO />;
      case "content":
        return <AdminSiteContent />;
      case "settings":
        return <AdminSettings />;
      case "reviews":
        return <AdminReviews />;
      case "services":
        return <AdminServices />;
      case "team":
        return <AdminTeam />;
      case "analytics":
        return <AdminAnalytics />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
