"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Light Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-white/60 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-accent-pink/20 rounded-full blur-[100px]" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-soft-pink/30 rounded-full blur-[120px]" />

      {/* Floating Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? (
            <Heart size={16} className="text-pink-300 fill-pink-300/30" />
          ) : i % 3 === 1 ? (
            <Sparkles size={14} className="text-yellow-200" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-white/40 blur-[1px]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
