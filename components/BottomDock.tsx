"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

function DockHugPopup({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1200);
      return () => clearTimeout(t);
    } else {
      setPhase(0);
    }
  }, [show]);

  if (!mounted) return null;

  const cuteMessages = [
    { text: "I miss you honey! 🥺", sub: "virtual hug sent~" },
    { text: "Have you eaten yet, honey? 🍙", sub: "don't forget to eat~" },
    { text: "I love you honey! 💗", sub: "always and forever~" },
    { text: "You're so cute honey! 🧸", sub: "so adorable~" },
    { text: "Thank you for always being there 🌸", sub: "you're the best, honey~" },
  ];

  const randomMsg = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={phase >= 2 ? onClose : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 60%, rgba(255,180,220,0.45) 0%, rgba(60,10,40,0.55) 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* Floating emojis */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`e-${i}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: [0, 0.7, 0],
                y: -250,
              }}
              transition={{
                duration: Math.random() * 2.5 + 2.5,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 20}%`,
                fontSize: Math.random() * 18 + 14,
              }}
            >
              {["💕", "💗", "🩷", "✨", "🌸", "💝", "🫶", "🧸"][i % 8]}
            </motion.div>
          ))}

          {/* Popup card */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 13, stiffness: 160 }}
            className="relative z-10"
          >
            <motion.div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] px-8 py-8 sm:px-10 sm:py-10 shadow-2xl border-2 border-pink-200 max-w-xs relative overflow-hidden">
              {/* Shimmer */}
              <motion.div
                animate={{ x: [-180, 350] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                className="absolute inset-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
              />

              {/* Corner deco */}
              <div className="absolute top-2 left-3 text-sm opacity-30 select-none">🌷</div>
              <div className="absolute top-2 right-3 text-sm opacity-30 select-none">🌷</div>

              {/* Bouncing hug emoji */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                className="text-center mb-3"
              >
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="text-6xl select-none inline-block"
                >
                  🤗
                </motion.div>
              </motion.div>

              {/* Message */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="text-center"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="font-fredoka text-xl text-pink-500 mb-1.5"
                    >
                      {randomMsg.text}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="font-quicksand text-sm text-gray-500 font-medium"
                    >
                      {randomMsg.sub}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="text-2xl inline-block"
                      >
                        💗
                      </motion.div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="font-poppins text-[10px] text-gray-400 mt-3"
                    >
                      tap di mana aja buat nutup~
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function BottomDock() {
  const [showHug, setShowHug] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.8 }}
        whileHover={{ y: -5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-xl border border-white/60 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 sm:gap-4 z-40 transition-transform"
      >
        <div className="font-quicksand font-bold text-accent-pink/90 flex items-center gap-2 text-sm tracking-wide">
          <Heart size={16} className="fill-accent-pink/90 animate-pulse" />
          <span className="hidden sm:inline">SYSTEM_LOVE_OS</span>
          <span className="sm:hidden">LOVE_OS</span>
        </div>
        <div className="w-px h-5 bg-white/60" />
        <div className="font-poppins text-xs text-text-main/70 font-medium hidden sm:block">
          Ver 2.0 (May 5 Edition)
        </div>
        <div className="w-px h-5 bg-white/60" />
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowHug(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-baloo text-xs px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🫂
          </motion.span>
          <span>HUG ME</span>
        </motion.button>
      </motion.div>

      <DockHugPopup show={showHug} onClose={() => setShowHug(false)} />
    </>
  );
}
