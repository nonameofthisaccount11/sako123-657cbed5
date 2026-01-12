import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalFluidBackground } from "@/components/GlobalFluidBackground";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "The Future of Web Design: Trends to Watch in 2024",
    excerpt: "Explore the emerging design trends that are shaping the future of digital experiences.",
    category: "Design",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    gradient: "from-purple-900/40 to-pink-900/40",
  },
  {
    id: 2,
    title: "Building Scalable Web Applications with Modern Architecture",
    excerpt: "Best practices for creating web applications that can grow with your business.",
    category: "Development",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    gradient: "from-blue-900/40 to-cyan-900/40",
  },
  {
    id: 3,
    title: "The Psychology of Color in Brand Design",
    excerpt: "How color choices impact perception and drive consumer behavior.",
    category: "Branding",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    gradient: "from-amber-900/40 to-orange-900/40",
  },
  {
    id: 4,
    title: "Optimizing User Experience for Mobile-First Design",
    excerpt: "Key strategies for creating seamless mobile experiences that convert.",
    category: "UX Design",
    date: "Dec 28, 2023",
    readTime: "7 min read",
    gradient: "from-emerald-900/40 to-teal-900/40",
  },
  {
    id: 5,
    title: "The Role of Animation in Modern Web Interfaces",
    excerpt: "Using motion design to enhance usability and delight users.",
    category: "Design",
    date: "Dec 20, 2023",
    readTime: "5 min read",
    gradient: "from-rose-900/40 to-red-900/40",
  },
  {
    id: 6,
    title: "SEO Best Practices for 2024",
    excerpt: "Stay ahead of the curve with these proven SEO strategies.",
    category: "Marketing",
    date: "Dec 15, 2023",
    readTime: "10 min read",
    gradient: "from-indigo-900/40 to-violet-900/40",
  },
];

const categories = ["All", "Design", "Development", "Branding", "UX Design", "Marketing"];

const Blog = () => {
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
                Our Blog
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                Insights & <span className="golden-text">Ideas</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                Thoughts, tutorials, and insights from our team on design,
                development, and digital strategy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-12">
          <div className="container-wide">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    category === "All"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl aspect-[16/10] bg-gradient-to-br ${post.gradient} mb-4`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
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
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Stay Updated
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Subscribe to our newsletter for the latest insights and updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-400/50"
                  />
                  <button className="px-6 py-3 font-medium rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Blog;
