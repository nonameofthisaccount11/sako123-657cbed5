import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type MediaFile = Tables<"media_library">;

export function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from("media_library")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      toast.error("Failed to fetch media");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("media_library").insert({
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_type: file.type,
        file_size: file.size,
      });

      if (dbError) throw dbError;

      toast.success("File uploaded successfully");
      fetchFiles();
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      // Extract file path from URL
      const urlParts = file.file_url.split("/");
      const filePath = urlParts.slice(-2).join("/");

      await supabase.storage.from("media").remove([filePath]);

      const { error } = await supabase.from("media_library").delete().eq("id", file.id);
      if (error) throw error;

      toast.success("File deleted");
      fetchFiles();
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Media Library</h2>
          <p className="text-muted-foreground">Manage your uploaded files</p>
        </div>
        <div className="relative">
          <Input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
            accept="image/*,video/*,application/pdf"
          />
          <label htmlFor="file-upload">
            <Button asChild disabled={uploading}>
              <span className="cursor-pointer gap-2">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload File"}
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">Loading...</div>
        ) : files.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No files uploaded yet</p>
          </div>
        ) : (
          files.map((file) => (
            <div key={file.id} className="bg-card border border-border rounded-lg overflow-hidden group">
              <div className="aspect-square bg-muted relative">
                {file.file_type.startsWith("image/") ? (
                  <img src={file.file_url} alt={file.file_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => copyUrl(file.file_url)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(file)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs truncate" title={file.file_name}>{file.file_name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
