import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code, Megaphone, LineChart, Sparkles, Layers } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "We craft distinctive visual identities that capture your essence and resonate with your audience.",
    gradient: "from-glow-rose/20 to-glow-violet/20",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and applications built with cutting-edge technology for exceptional performance.",
    gradient: "from-glow-indigo/20 to-glow-cyan/20",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Strategic campaigns that amplify your message and drive meaningful engagement.",
    gradient: "from-glow-amber/20 to-glow-rose/20",
  },
  {
    icon: LineChart,
    title: "Analytics & Growth",
    description: "Data-driven insights and strategies to accelerate your business growth.",
    gradient: "from-glow-cyan/20 to-glow-indigo/20",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description: "Intuitive interfaces and seamless experiences that delight users at every interaction.",
    gradient: "from-glow-violet/20 to-glow-rose/20",
  },
  {
    icon: Layers,
    title: "Product Strategy",
    description: "End-to-end product development from ideation to launch and beyond.",
    gradient: "from-glow-indigo/20 to-glow-violet/20",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card p-8 h-full transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.1]">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
          <Icon className="w-7 h-7 text-foreground/80" />
        </div>
        <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-glow-indigo/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-glow-rose/5 rounded-full blur-[150px]" />

      <div className="container-wide relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-muted-foreground mb-6">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Services that{" "}
            <span className="gradient-text">transform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine creativity with technology to deliver solutions that make a lasting impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
