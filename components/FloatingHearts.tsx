"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: "heart" | "sparkle";
}

export default function FloatingHearts() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate initial floating items
    const generateItems = () => {
      const newItems: FloatingItem[] = [];
      for (let i = 0; i < 20; i++) {
        newItems.push({
          id: i,
          x: Math.random() * 100, // random percentage for left
          size: Math.random() * 20 + 10, // between 10px and 30px
          duration: Math.random() * 10 + 10, // 10s to 20s
          delay: Math.random() * 10,
          type: Math.random() > 0.7 ? "sparkle" : "heart",
        });
      }
      setItems(newItems);
    };

    generateItems();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bottom-[-50px]"
          style={{ left: `${item.x}%` }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "-120vh",
            opacity: [0, 0.8, 0],
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.type === "heart" ? (
            <Heart
              size={item.size}
              className="text-white/60 fill-white/30"
              strokeWidth={1.5}
            />
          ) : (
            <Sparkles
              size={item.size}
              className="text-yellow-300/60"
              strokeWidth={1.5}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
