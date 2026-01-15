import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export function FakeVisitorCounter() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 50) + 120);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate realistic visitor fluctuation
    const interval = setInterval(() => {
      setCount((prev) => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newCount = prev + change;
        // Keep count between 80 and 200
        return Math.max(80, Math.min(200, newCount));
      });
    }, 3000 + Math.random() * 2000); // Random interval 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-24 right-4 z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
        <div className="relative">
          <Eye className="w-4 h-4 text-green-400" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium text-white"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-muted-foreground">viewing</span>
      </div>
    </motion.div>
  );
}
