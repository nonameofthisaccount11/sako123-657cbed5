import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Brand Identity", href: "/services" },
      { name: "Web Development", href: "/services" },
      { name: "Digital Marketing", href: "/services" },
      { name: "UI/UX Design", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Work", href: "/work" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Case Studies", href: "/work" },
      { name: "Process", href: "/about" },
      { name: "FAQs", href: "/contact" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

interface BrandSettings {
  name: string;
  tagline: string;
  logo_url: string;
}

interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

interface FooterSettings {
  copyright: string;
  terms_url: string;
  privacy_url: string;
  cookies_url: string;
}

export function Footer() {
  const [brand, setBrand] = useState<BrandSettings>({ name: "SAKO", tagline: "", logo_url: "" });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    twitter: "#", github: "#", linkedin: "#", instagram: "#", facebook: "#", youtube: "#"
  });
  const [footer, setFooter] = useState<FooterSettings>({
    copyright: "© 2026 SAKO Agency. All rights reserved.",
    terms_url: "#",
    privacy_url: "#",
    cookies_url: "#"
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from("site_settings")
        .select("*");

      if (data) {
        data.forEach((setting) => {
          const value = setting.setting_value as Record<string, string>;
          switch (setting.setting_key) {
            case "brand":
              setBrand({
                name: value.name || "SAKO",
                tagline: value.tagline || "",
                logo_url: value.logo_url || ""
              });
              break;
            case "social_links":
              setSocialLinks({
                twitter: value.twitter || "#",
                github: value.github || "#",
                linkedin: value.linkedin || "#",
                instagram: value.instagram || "#",
                facebook: value.facebook || "#",
                youtube: value.youtube || "#"
              });
              break;
            case "footer":
              setFooter({
                copyright: value.copyright || "© 2026 SAKO Agency. All rights reserved.",
                terms_url: value.terms_url || "#",
                privacy_url: value.privacy_url || "#",
                cookies_url: value.cookies_url || "#"
              });
              break;
          }
        });
      }
    } catch (error) {
      console.debug("Error fetching footer settings:", error);
    }
  };

  // Filter social links that have actual URLs (not just #)
  const activeSocialLinks = Object.entries(socialLinks)
    .filter(([_, url]) => url && url !== "#")
    .map(([platform, url]) => ({
      platform,
      url,
      icon: iconMap[platform]
    }))
    .filter(link => link.icon);

  // If no active links, show default placeholders
  const displaySocialLinks = activeSocialLinks.length > 0 ? activeSocialLinks : [
    { platform: "twitter", url: "#", icon: Twitter },
    { platform: "github", url: "#", icon: Github },
    { platform: "linkedin", url: "#", icon: Linkedin },
    { platform: "instagram", url: "#", icon: Instagram },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-black">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-amber-500/5 to-transparent blur-[100px]" />

      <div className="container-wide relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block text-3xl font-display font-black mb-4 golden-text tracking-wider">
              {brand.name}
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              {brand.tagline || "We craft exceptional digital experiences that transform businesses and captivate audiences."}
            </p>
            <div className="flex items-center gap-4">
              {displaySocialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-amber-400/30 transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display font-semibold text-foreground mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link to={footer.terms_url} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to={footer.privacy_url} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to={footer.cookies_url} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
