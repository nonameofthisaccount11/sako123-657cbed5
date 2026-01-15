import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

export function useRealtimeVisitors() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create a unique visitor ID
    const visitorId = localStorage.getItem("visitor_id") || crypto.randomUUID();
    if (!localStorage.getItem("visitor_id")) {
      localStorage.setItem("visitor_id", visitorId);
    }

    const channel = supabase.channel("online-visitors", {
      config: {
        presence: {
          key: visitorId,
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setVisitorCount(count);
      })
      .on("presence", { event: "join" }, () => {
        const state = channel.presenceState();
        setVisitorCount(Object.keys(state).length);
      })
      .on("presence", { event: "leave" }, () => {
        const state = channel.presenceState();
        setVisitorCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
          await channel.track({
            visitor_id: visitorId,
            online_at: new Date().toISOString(),
            page: window.location.pathname,
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { visitorCount, isConnected };
}

interface LiveVisitorCounterProps {
  variant?: "admin" | "homepage";
}

export function LiveVisitorCounter({ variant = "homepage" }: LiveVisitorCounterProps) {
  const { visitorCount, isConnected } = useRealtimeVisitors();

  if (variant === "admin") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
        <div className="relative">
          <Users className="w-5 h-5 text-green-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-400">
            {isConnected ? visitorCount : "..."} Live Visitors
          </p>
          <p className="text-xs text-muted-foreground">Currently on site</p>
        </div>
      </div>
    );
  }

  return null;
}
