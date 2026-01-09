import { useRef } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Navigation } from "@/components/Navigation";
import { WorkSection } from "@/components/WorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const workRef = useRef<HTMLDivElement>(null);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section with 3D Geometric Shapes */}
      <HeroGeometric
        badge="Creative Digital Agency"
        title1="We Build"
        title2="Digital Experiences"
        onScrollClick={scrollToWork}
      />

      {/* Main Content Sections */}
      <div ref={workRef}>
        <WorkSection />
      </div>
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
