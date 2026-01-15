import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Save, Building2, Share2, Phone, FileText } from "lucide-react";

type SiteSetting = {
  id: string;
  setting_key: string;
  setting_value: Record<string, unknown>;
  updated_at: string;
};

export function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [brand, setBrand] = useState({ name: "", tagline: "", logo_url: "" });
  const [socialLinks, setSocialLinks] = useState({
    twitter: "", github: "", linkedin: "", instagram: "", facebook: "", youtube: ""
  });
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "", address: "" });
  const [footer, setFooter] = useState({ copyright: "", terms_url: "", privacy_url: "", cookies_url: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      if (data) {
        setSettings(data as SiteSetting[]);
        data.forEach((setting) => {
          const value = setting.setting_value as Record<string, string>;
          switch (setting.setting_key) {
            case "brand":
              setBrand({ name: value.name || "", tagline: value.tagline || "", logo_url: value.logo_url || "" });
              break;
            case "social_links":
              setSocialLinks({
                twitter: value.twitter || "",
                github: value.github || "",
                linkedin: value.linkedin || "",
                instagram: value.instagram || "",
                facebook: value.facebook || "",
                youtube: value.youtube || ""
              });
              break;
            case "contact_info":
              setContactInfo({ email: value.email || "", phone: value.phone || "", address: value.address || "" });
              break;
            case "footer":
              setFooter({
                copyright: value.copyright || "",
                terms_url: value.terms_url || "",
                privacy_url: value.privacy_url || "",
                cookies_url: value.cookies_url || ""
              });
              break;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({ title: "Error", description: "Failed to load settings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (key: string, value: Record<string, string>) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ setting_value: value })
      .eq("setting_key", key);

    if (error) throw error;
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveSetting("brand", brand),
        saveSetting("social_links", socialLinks),
        saveSetting("contact_info", contactInfo),
        saveSetting("footer", footer)
      ]);
      toast({ title: "Success", description: "All settings saved successfully" });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Site Settings</h2>
          <p className="text-muted-foreground">Manage your website's global settings</p>
        </div>
        <Button onClick={handleSaveAll} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Brand Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold">Brand Settings</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <Label>Brand Name</Label>
              <Input
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                placeholder="Your brand name"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Textarea
                value={brand.tagline}
                onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                placeholder="Your brand tagline"
                rows={2}
              />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input
                value={brand.logo_url}
                onChange={(e) => setBrand({ ...brand, logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Share2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold">Social Media Links</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Twitter/X</Label>
              <Input
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
            <div>
              <Label>Facebook</Label>
              <Input
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <Label>YouTube</Label>
              <Input
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold">Contact Information</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <Label>Email</Label>
              <Input
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Textarea
                value={contactInfo.address}
                onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                placeholder="Your business address"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold">Footer Settings</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <Label>Copyright Text</Label>
              <Input
                value={footer.copyright}
                onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                placeholder="© 2024 Your Company. All rights reserved."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Terms of Service URL</Label>
                <Input
                  value={footer.terms_url}
                  onChange={(e) => setFooter({ ...footer, terms_url: e.target.value })}
                  placeholder="/terms"
                />
              </div>
              <div>
                <Label>Privacy Policy URL</Label>
                <Input
                  value={footer.privacy_url}
                  onChange={(e) => setFooter({ ...footer, privacy_url: e.target.value })}
                  placeholder="/privacy"
                />
              </div>
              <div>
                <Label>Cookies Policy URL</Label>
                <Input
                  value={footer.cookies_url}
                  onChange={(e) => setFooter({ ...footer, cookies_url: e.target.value })}
                  placeholder="/cookies"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
