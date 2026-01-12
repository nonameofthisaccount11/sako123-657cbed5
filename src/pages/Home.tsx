import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Target, Palette } from "lucide-react";

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
          
          <HeroGeometric
            badge="Creative Digital Agency"
            title1="The Purest Point"
            title2="of Contact."
          />

          {/* Quick Services Section */}
          <section className="section-padding relative">
            <div className="container-wide">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-card p-6 hover:border-amber-400/20 transition-all group cursor-pointer"
                  >
                    <service.icon className="w-10 h-10 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
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
          <section className="section-padding relative">
            <div className="container-wide">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: item * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-gradient-to-br from-amber-900/20 to-yellow-900/20 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-sm font-medium">View Project →</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-1">Project {item}</h3>
                    <p className="text-muted-foreground text-sm">Brand Identity • Web Design</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding relative">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-amber-500/5" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    Ready to <span className="golden-text">Start</span>?
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                    Let's create something extraordinary together. Tell us about your project.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 transition-all"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
