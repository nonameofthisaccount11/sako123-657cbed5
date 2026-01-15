import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Generate or retrieve visitor ID
        let visitorId = localStorage.getItem("visitor_id");
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem("visitor_id", visitorId);
        }

        await supabase.from("page_visits").insert({
          page_path: location.pathname,
          visitor_id: visitorId,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent
        });
      } catch (error) {
        // Silently fail - analytics shouldn't break the app
        console.debug("Page tracking error:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
}
