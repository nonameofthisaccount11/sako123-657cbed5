import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import { FakeVisitorCounter } from "@/components/FakeVisitorCounter";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Target, Palette } from "lucide-react";

// Parallax section wrapper component
const ParallaxSection = ({ 
  children, 
  speed = 0.5,
  className = "" 
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// Floating element for decorative parallax
const FloatingElement = ({ 
  delay = 0, 
  duration = 4,
  className = "" 
}: { 
  delay?: number; 
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

const featuredServices = [
  {
    icon: Sparkles,
    title: "Brand Identity",
    description: "Craft memorable brands that stand out",
  },
  {
    icon: Zap,
    title: "Web Development",
    description: "Build lightning-fast digital experiences",
  },
  {
    icon: Target,
    title: "Digital Strategy",
    description: "Data-driven growth solutions",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces",
  },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-black text-foreground relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GlobalFluidBackground />

        <div className="relative z-10">
          <Navigation />
          <FakeVisitorCounter />
          
          <HeroGeometric
            badge="Creative Digital Agency"
            title1="The Purest Point"
            title2="of Contact."
          />

          {/* Floating Decorative Elements */}
          <FloatingElement 
            delay={0} 
            duration={5}
            className="top-[20%] left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-2xl"
          />
          <FloatingElement 
            delay={1} 
            duration={6}
            className="top-[40%] right-[8%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-2xl"
          />
          <FloatingElement 
            delay={2} 
            duration={4}
            className="bottom-[30%] left-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-2xl"
          />

          {/* Quick Services Section */}
          <section className="section-padding relative overflow-hidden">
            <div className="container-wide">
              <ParallaxSection speed={0.3}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    What We <span className="golden-text">Create</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Transforming ideas into digital masterpieces
                  </p>
                </motion.div>
              </ParallaxSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30, rotateX: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="glass-card p-6 hover:border-amber-400/20 transition-all group cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-10 h-10 text-amber-400 mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-display font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                >
                  Explore All Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Featured Work Preview */}
          <section className="section-padding relative overflow-hidden">
            <div className="container-wide">
              <ParallaxSection speed={0.4}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-12"
                >
                  <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                      Featured <span className="golden-text">Work</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl">
                      A selection of our recent projects that showcase our expertise
                    </p>
                  </div>
                  <Link
                    to="/work"
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                  >
                    View All Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </ParallaxSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((item, index) => (
                  <ParallaxSection key={item} speed={0.2 + index * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-gradient-to-br from-amber-900/20 to-yellow-900/20 mb-4">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                          <motion.span 
                            className="text-sm font-medium"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            View Project →
                          </motion.span>
                        </div>
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-1">Project {item}</h3>
                      <p className="text-muted-foreground text-sm">Brand Identity • Web Design</p>
                    </motion.div>
                  </ParallaxSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding relative overflow-hidden">
            <div className="container-wide">
              <ParallaxSection speed={0.25}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  />
                  
                  {/* Floating orbs */}
                  <motion.div 
                    className="absolute top-10 left-10 w-40 h-40 rounded-full bg-amber-500/5 blur-3xl"
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl"
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 30, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative z-10">
                    <motion.h2 
                      className="text-4xl md:text-6xl font-display font-bold mb-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Ready to <span className="golden-text">Start</span>?
                    </motion.h2>
                    <motion.p 
                      className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Let's create something extraordinary together. Tell us about your project.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                      >
                        Get in Touch
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </ParallaxSection>
            </div>
          </section>

          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
