"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import SplitHeading from "@/components/SplitHeading";

export default function FinalPage() {
  const [exploded, setExploded] = useState(false);

  const handleExplode = () => {
    setExploded(true);
  };

  return (
    <main className="min-h-screen bg-text-main flex items-center justify-center relative overflow-hidden">
      {/* Dark/Soft particle background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-soft-pink"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {!exploded && (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="z-10 text-center px-4 max-w-2xl"
          >
            <SplitHeading 
              text="Happy 2nd Anniversary 💗" 
              className="text-4xl md:text-6xl font-fredoka text-accent-pink mb-8 justify-center drop-shadow-lg"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl font-quicksand text-white/90 leading-relaxed mb-6 font-medium"
            >
              Thank you for being<br />
              my favorite person<br />
              for 2 beautiful years.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-lg md:text-xl font-poppins text-soft-pink/80 mb-12"
            >
              May 5 will always be ours.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 121, 176, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExplode}
              className="bg-accent-pink text-white font-baloo text-2xl px-10 py-4 rounded-full border-2 border-white/20 shadow-2xl transition-all"
            >
              [ FOREVER? ]
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion Effect */}
      {exploded && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 20 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="w-32 h-32 bg-accent-pink rounded-full absolute"
          />
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
            className="font-fredoka text-6xl md:text-8xl text-white z-10 text-center drop-shadow-2xl"
          >
            YES, FOREVER.
            <Heart className="inline-block ml-4 w-16 h-16 fill-white text-white animate-pulse" />
          </motion.h1>

          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                rotate: 0 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * window.innerWidth * 1.5, 
                y: (Math.random() - 0.5) * window.innerHeight * 1.5,
                scale: Math.random() * 2 + 0.5,
                rotate: Math.random() * 360,
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 2 + 1.5, 
                ease: "easeOut" 
              }}
            >
              <Heart className="fill-white text-white/50" size={Math.random() * 30 + 10} />
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
