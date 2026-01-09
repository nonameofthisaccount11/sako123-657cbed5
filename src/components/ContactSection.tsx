import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nexus.agency",
    href: "mailto:hello@nexus.agency",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

export function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formState);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-glow-indigo/10 via-glow-violet/5 to-glow-rose/10 rounded-full blur-[200px]" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-muted-foreground mb-6">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Let's create something{" "}
            <span className="gradient-text">amazing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your digital presence? We'd love to hear about your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 h-12"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-medium group bg-foreground text-background hover:bg-foreground/90"
              >
                Send Message
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="group flex items-start gap-4 p-6 rounded-2xl glass-card hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-foreground/80" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                      <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-white/[0.05]"
            >
              <h3 className="text-xl font-display font-semibold mb-3">
                Start your project today
              </h3>
              <p className="text-muted-foreground">
                Book a free consultation and let's discuss how we can bring your vision to life.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
