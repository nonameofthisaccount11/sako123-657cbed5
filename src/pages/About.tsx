import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import { Users, Award, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "8+", label: "Years Experience" },
  { value: "30+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every project, paying attention to the smallest details.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We're passionate about design and technology, and it shows in our work.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients, treating every project as a partnership.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "We push boundaries and embrace new technologies to deliver cutting-edge solutions.",
  },
];

const team = [
  { name: "Alex Chen", role: "Founder & CEO", image: "" },
  { name: "Sarah Miller", role: "Creative Director", image: "" },
  { name: "James Wilson", role: "Lead Developer", image: "" },
  { name: "Emma Davis", role: "UX Designer", image: "" },
];

const About = () => {
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
                About Us
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                We Are <span className="golden-text">SAKO</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                A creative digital agency dedicated to crafting exceptional experiences
                that transform businesses and captivate audiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-20">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold golden-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="pb-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Our <span className="golden-text">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2016, SAKO began with a simple mission: to create digital
                    experiences that make a real difference. What started as a small team
                    of passionate designers and developers has grown into a full-service
                    creative agency.
                  </p>
                  <p>
                    We believe that great design is about more than aesthetics—it's about
                    solving problems, telling stories, and creating meaningful connections
                    between brands and their audiences.
                  </p>
                  <p>
                    Today, we work with clients ranging from ambitious startups to
                    established enterprises, helping them navigate the digital landscape
                    and achieve their goals.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="aspect-square rounded-2xl bg-gradient-to-br from-amber-900/30 to-yellow-900/30"
              />
            </div>
          </div>
        </section>

        {/* Values */}
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
                Our <span className="golden-text">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 text-center hover:border-amber-400/20 transition-all"
                >
                  <value.icon className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
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
                Meet the <span className="golden-text">Team</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The creative minds behind SAKO
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-900/20 to-yellow-900/20 mb-4 overflow-hidden">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-display font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
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
                Want to work with us?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                We're always looking for new challenges and exciting projects.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 transition-all"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.div>
  );
};

export default About;
