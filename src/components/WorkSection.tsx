import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Aurora Finance",
    category: "Fintech Platform",
    description: "A revolutionary banking experience",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    gradient: "from-glow-indigo/30 to-glow-violet/30",
  },
  {
    title: "Pulse Health",
    category: "Healthcare App",
    description: "Wellness tracking reimagined",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    gradient: "from-glow-cyan/30 to-glow-indigo/30",
  },
  {
    title: "Velo Motors",
    category: "E-commerce",
    description: "Premium automotive marketplace",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    gradient: "from-glow-rose/30 to-glow-amber/30",
  },
  {
    title: "Zenith Studios",
    category: "Creative Agency",
    description: "Digital storytelling platform",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    gradient: "from-glow-violet/30 to-glow-rose/30",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl mb-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 z-10`} />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center"
          >
            <ArrowUpRight className="w-6 h-6 text-background" />
          </motion.div>
        </div>
      </div>
      <span className="text-sm text-muted-foreground tracking-wide">
        {project.category}
      </span>
      <h3 className="text-2xl font-display font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground">{project.description}</p>
    </motion.div>
  );
}

export function WorkSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-glow-violet/5 rounded-full blur-[180px]" />
      
      <div className="container-wide relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-muted-foreground mb-6">
              Featured Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Projects that{" "}
              <span className="gradient-text">inspire</span>
            </h2>
          </div>
          <motion.a
            href="#"
            whileHover={{ x: 10 }}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
