"use client";

import LiquidEther from "@/components/ui/LiquidEther";

export function GlobalFluidBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 pointer-events-auto">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF", "#FBBF24"]}
          mouseForce={15}
          cursorSize={120}
          isViscous={false}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          takeoverDuration={0.3}
          autoResumeDelay={2000}
          autoRampDuration={0.8}
        />
      </div>
      {/* Overlay to soften the effect */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />
    </div>
  );
}
