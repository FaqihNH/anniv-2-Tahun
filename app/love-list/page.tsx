"use client";

import { motion } from "framer-motion";
import PopupWindow from "@/components/PopupWindow";
import { Heart } from "lucide-react";

export default function LoveListPage() {
  const reasons = [
    "your smile",
    "your patience",
    "your voice",
    "your chaos",
    "your loyalty",
    "your existence",
    "your warm hugs",
    "your silly jokes"
  ];

  return (
    <PopupWindow title="Why I Love You.exe">
      <div className="py-8">
        <h2 className="font-fredoka text-3xl md:text-4xl text-center text-text-main mb-12">
          A few reasons why...
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", bounce: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: Math.random() > 0.5 ? 3 : -3,
                y: -5
              }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-soft-pink flex flex-col items-center justify-center text-center group relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-50 rounded-full group-hover:scale-[3] transition-transform duration-500 ease-out z-0" />
              
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="mb-4 text-accent-pink z-10"
              >
                <Heart className="fill-accent-pink/20" size={32} />
              </motion.div>
              
              <p className="font-baloo text-xl text-text-main z-10">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PopupWindow>
  );
}
