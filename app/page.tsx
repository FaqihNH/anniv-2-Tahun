"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Cat } from "lucide-react";
import SplitHeading from "@/components/SplitHeading";
import FloatingHearts from "@/components/FloatingHearts";

export default function BootPage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800); // Wait a bit after 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden selection:bg-accent-pink selection:text-white">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center z-10"
          >
            <Cat size={64} className="text-accent-pink mb-6 animate-pulse drop-shadow-md" />
            <SplitHeading 
              text="Loading Love System..." 
              className="text-text-main font-baloo text-3xl font-bold mb-8"
            />
            
            {/* Loading Bar */}
            <div className="w-64 h-3 bg-white/50 rounded-full overflow-hidden shadow-inner border border-white/60">
              <motion.div 
                className="h-full bg-accent-pink"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-sm font-quicksand text-text-main/70 font-semibold">
              {progress}%
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.2 }}
            className="glass-panel p-10 rounded-3xl flex flex-col items-center max-w-md w-[90%] z-10 border border-white/80 shadow-2xl relative overflow-hidden"
          >
            {/* Window Top Bar Deco */}
            <div className="absolute top-0 left-0 w-full h-8 bg-white/40 flex items-center px-4 gap-1.5 border-b border-white/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="mt-6 mb-4 relative">
              <Cat size={80} className="text-accent-pink drop-shadow-lg" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 text-red-500"
              >
                <Heart className="fill-red-500 w-8 h-8" />
              </motion.div>
            </div>

            <h1 className="font-fredoka text-3xl font-medium text-text-main text-center mb-2">
              Hello honey 💗
            </h1>
            <p className="font-poppins text-text-main/80 text-center mb-8 font-medium">
              Ready to celebrate 2 years with me? 🥺
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/home")}
              className="bg-accent-pink hover:bg-pink-500 text-white font-baloo text-xl px-8 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2 group"
            >
              OPEN WEBSITE
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ➔
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
