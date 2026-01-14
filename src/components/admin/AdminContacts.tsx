import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Mail, Check, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type ContactSubmission = Tables<"contact_submissions">;

export function AdminContacts() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      toast.error("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success("Status updated");
      fetchSubmissions();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;
      toast.success("Submission deleted");
      fetchSubmissions();
    } catch (error) {
      toast.error("Failed to delete submission");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400";
      case "read":
        return "bg-yellow-500/20 text-yellow-400";
      case "replied":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold">Contact Submissions</h2>
        <p className="text-muted-foreground">Manage form submissions from visitors</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium">Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Email</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Subject</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Date</th>
              <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No submissions yet
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id} className={submission.status === "new" ? "bg-primary/5" : ""}>
                  <td className="px-6 py-4 font-medium">{submission.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{submission.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{submission.subject || "-"}</td>
                  <td className="px-6 py-4">
                    <select
                      value={submission.status}
                      onChange={(e) => updateStatus(submission.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)} bg-transparent border-0 cursor-pointer`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {new Date(submission.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => setSelectedSubmission(submission)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(submission.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message from {selectedSubmission?.name}</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p>{selectedSubmission.email}</p>
              </div>
              {selectedSubmission.subject && (
                <div>
                  <label className="text-sm text-muted-foreground">Subject</label>
                  <p>{selectedSubmission.subject}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-muted-foreground">Message</label>
                <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Received</label>
                <p>{new Date(selectedSubmission.created_at).toLocaleString()}</p>
              </div>
              <Button
                onClick={() => {
                  window.location.href = `mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject || "Your inquiry"}`;
                }}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" /> Reply via Email
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
