import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Navigation } from "@/components/Navigation";
import { WorkSection } from "@/components/WorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const workRef = useRef<HTMLDivElement>(null);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background text-foreground relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Global Fluid Background */}
        <GlobalFluidBackground />

        {/* Content */}
        <div className="relative z-10">
          <Navigation />
          
          {/* Hero Section with 3D Geometric Shapes */}
          <HeroGeometric
            badge="Creative Digital Agency"
            title1="The Purest Point"
            title2="of Contact."
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
      </motion.div>
    </>
  );
};

export default Index;
