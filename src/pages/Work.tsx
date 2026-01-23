import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "GlowGenesis",
    category: "E-Commerce",
    description: "Complete brand overhaul for a luxury fashion house",
    image: "workPic/work1.png",
    gradient: "from-purple-900/40 to-pink-900/40",
    url: "https://glowgenesis.net/", // Add your actual URL here
  },
  {
    id: 2,
    title: "TechFlow App",
    category: "Web Development",
    description: "SaaS platform for workflow automation",
    image: "workPic/work2.png",
    gradient: "from-blue-900/40 to-cyan-900/40",
    url: "https://www.runanalytic.com/", // Add your actual URL here
  },
  {
    id: 3,
    title: "Artisan Co.",
    category: "E-Commerce",
    description: "Premium handcrafted goods marketplace",
    image: "workPic/work1.png",
    gradient: "from-amber-900/40 to-orange-900/40",
    url: "https://example.com/artisan-co", // Add your actual URL here
  },
  {
    id: 4,
    title: "Horizon Finance",
    category: "UI/UX Design",
    description: "Next-gen banking experience redesign",
    image: "workPic/work1.png",
    gradient: "from-emerald-900/40 to-teal-900/40",
    url: "https://example.com/horizon-finance", // Add your actual URL here
  },
  {
    id: 5,
    title: "Pulse Health",
    category: "Mobile App",
    description: "Wellness tracking and meditation app",
    image: "workPic/work1.png",
    gradient: "from-rose-900/40 to-red-900/40",
    url: "https://example.com/pulse-health", // Add your actual URL here
  },
  {
    id: 6,
    title: "Nova Studio",
    category: "Brand Identity",
    description: "Creative agency complete rebrand",
    image: "workPic/work1.png",
    gradient: "from-indigo-900/40 to-violet-900/40",
    url: "https://example.com/nova-studio", // Add your actual URL here
  },
];

const Work = () => {
  return (
    <motion.div
      className="min-h-screen bg-black text-foreground relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GlobalFluidBackground />

      <div className="relative z-10">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-20 relative">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                Featured <span className="golden-text">Work</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                A curated collection of projects that showcase our expertise in creating
                memorable digital experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl aspect-[16/10] bg-gradient-to-br ${project.gradient} mb-4`}
                    >
                      {project.image && (
                        <img
                          src={`/${project.image}`}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      {/* Darker overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                      <div className="absolute inset-0 flex items-end p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <span className="text-amber-400 text-sm font-medium mb-2 block">
                            {project.category}
                          </span>
                          <h3 className="text-2xl font-display font-bold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-32">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Have a project in mind?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's discuss how we can bring your vision to life.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 transition-all"
              >
                Start a Project
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Work;
