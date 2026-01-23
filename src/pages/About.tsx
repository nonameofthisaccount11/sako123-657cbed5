import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import { Users, Award, Target, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type TeamMember = Tables<"team_members">;

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

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      setTeamMembers(data || []);
    } catch (error) {
      console.debug("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback team if no members in database
  const displayTeam = teamMembers.length > 0 ? teamMembers : [
    { id: "1", name: "Atif Mumtaz", role: "Founder & CTO & AI Engineer & Web Scraper", image_url: "" },
    { id: "2", name: "Ali Ahmed", role: "Founder & CEO", image_url: "" },
    { id: "3", name: "Zhaeer Shahzaib", role: "Web Developer", image_url: "" },
    { id: "4", name: "Alamghir Jahanzaib", role: "App Developer", image_url: "" },
    { id: "5", name: "Waqas Khan", role: "Digital Marketer", image_url: "" },
    { id: "6", name: "Faisal Shah", role: "App Developer", image_url: "" },
    { id: "7", name: "Muhammad Arslan", role: "UI/UX Designer", image_url: "" },
    { id: "8", name: "Muhammad Ali", role: "Wordpress Developer", image_url: "" },
  ];

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
                    Founded in 2024, SAKO began with a clear vision: to use artificial intelligence to simplify work and help businesses operate smarter. What started as a small team of forward-thinking engineers and problem solvers has grown into a full-service AI agency focused on automation and intelligent solutions.
                  </p>
                  <p>
                    We believe AI is more than just technology — it’s a tool for eliminating repetitive tasks, optimizing workflows, and enabling teams to focus on what truly matters. Our approach is centered on building practical, reliable AI systems that solve real business problems and deliver measurable impact.
                  </p>
                  <p>
                    Today, we partner with ambitious startups and established enterprises alike, helping them automate processes, improve decision-making, and scale efficiently in an AI-driven world.
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
              {displayTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-900/20 to-yellow-900/20 mb-4 overflow-hidden">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <User className="w-20 h-20 text-amber-400/30" />
                      </div>
                    )}
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
