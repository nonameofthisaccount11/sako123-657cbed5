import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import {
  Palette,
  Code,
  Megaphone,
  Layers,
  Smartphone,
  TrendingUp,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "We create distinctive brand identities that capture your essence and resonate with your audience. From logo design to complete brand systems.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web solutions built with cutting-edge technologies. We create fast, secure, and scalable websites and web applications.",
    features: ["Custom Websites", "E-Commerce", "Web Applications", "CMS Development"],
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "User-centered design that balances aesthetics with functionality. We create intuitive interfaces that delight users.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Strategic digital marketing campaigns that drive growth. We help you reach and engage your target audience effectively.",
    features: ["SEO", "Content Strategy", "Social Media", "Paid Advertising"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences on any device.",
    features: ["iOS Development", "Android Development", "React Native", "App Strategy"],
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description:
      "Data-driven strategies to accelerate your business growth. We help you identify opportunities and optimize performance.",
    features: ["Analytics", "Conversion Optimization", "A/B Testing", "Performance Tracking"],
  },
];

const process = [
  { step: "01", title: "Discovery", description: "Understanding your vision, goals, and challenges" },
  { step: "02", title: "Strategy", description: "Crafting a tailored approach for your project" },
  { step: "03", title: "Design", description: "Creating stunning visuals and user experiences" },
  { step: "04", title: "Development", description: "Building with precision and best practices" },
  { step: "05", title: "Launch", description: "Deploying and optimizing for success" },
];

const Services = () => {
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
                What We Do
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                Our <span className="golden-text">Services</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                Comprehensive digital solutions tailored to elevate your brand and
                accelerate your business growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:border-amber-400/20 transition-all group"
                >
                  <service.icon className="w-12 h-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="pb-32">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Our <span className="golden-text">Process</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A proven approach that delivers exceptional results every time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-5xl font-display font-bold golden-text mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
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
              className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-amber-500/5" />
              <div className="relative z-10">
                <Zap className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to transform your digital presence?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Let's discuss how our services can help achieve your goals.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Services;
