"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, Heart } from "lucide-react";
import Link from "next/link";

function HugOverlay({ show, hugPhase, onClose }: { show: boolean; hugPhase: number; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const kawaiiFaces = ["(っ˘̩╭╮˘̩)っ", "♡(ŐωŐ人)", "(⊃｡•́‿•̀｡)⊃", "⊂(´・ω・｀⊂)", "(づ￣ ³￣)づ"];
  const floatingEmojis = ["💕", "💗", "💖", "🩷", "✨", "🤍", "💞", "🫶", "💝", "🥰", "😘", "🦋", "🌸", "🧸"];

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={hugPhase >= 2 ? onClose : undefined}
        >
          {/* Backdrop with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(255,150,200,0.5) 0%, rgba(80,10,50,0.6) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Floating emoji rain */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={`float-${i}`}
              initial={{
                opacity: 0,
                y: 100,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: -300,
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                delay: Math.random() * 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 30}%`,
                fontSize: Math.random() * 24 + 16,
              }}
            >
              {floatingEmojis[i % floatingEmojis.length]}
            </motion.div>
          ))}

          {/* Main content */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 150 }}
            className="relative z-10 flex flex-col items-center px-4"
          >
            {/* Two characters hugging animation */}
            <div className="relative w-72 h-52 flex items-center justify-center">
              {/* Left character */}
              <motion.div
                initial={{ x: -140, opacity: 0, rotate: -15 }}
                animate={hugPhase >= 1 ? { x: -18, opacity: 1, rotate: 8 } : {}}
                transition={{ type: "spring", damping: 10, stiffness: 80, delay: 0.2 }}
                className="absolute"
              >
                <motion.div
                  animate={hugPhase >= 1 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-8xl select-none drop-shadow-lg"
                >
                  🧸
                </motion.div>
              </motion.div>

              {/* Right character */}
              <motion.div
                initial={{ x: 140, opacity: 0, rotate: 15 }}
                animate={hugPhase >= 1 ? { x: 18, opacity: 1, rotate: -8 } : {}}
                transition={{ type: "spring", damping: 10, stiffness: 80, delay: 0.2 }}
                className="absolute"
              >
                <motion.div
                  animate={hugPhase >= 1 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.75 }}
                  className="text-8xl select-none drop-shadow-lg"
                  style={{ transform: "scaleX(-1)" }}
                >
                  🧸
                </motion.div>
              </motion.div>

              {/* Big heart that appears when they meet */}
              <AnimatePresence>
                {hugPhase >= 1 && (
                  <motion.div
                    initial={{ scale: 0, y: 20, opacity: 0 }}
                    animate={{
                      scale: [0, 1.8, 1.2, 1.4],
                      y: -50,
                      opacity: 1,
                    }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                    className="absolute z-20"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="text-6xl drop-shadow-xl"
                    >
                      💗
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sparkle burst */}
              <AnimatePresence>
                {hugPhase >= 1 && (
                  <>
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const sparkleEmojis = ["✨", "💫", "⭐", "🌟", "💖", "💕"];
                      return (
                        <motion.div
                          key={`sparkle-${i}`}
                          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1.2, 0],
                            x: Math.cos(angle) * 100,
                            y: Math.sin(angle) * 100 - 25,
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            delay: 0.9 + i * 0.06,
                            type: "tween",
                            duration: 1.2,
                            ease: "easeOut",
                          }}
                          className="absolute text-2xl pointer-events-none"
                        >
                          {sparkleEmojis[i % sparkleEmojis.length]}
                        </motion.div>
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

              {/* Mini hearts popping around */}
              <AnimatePresence>
                {hugPhase >= 1 && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={`mini-heart-${i}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0.8, 1],
                          opacity: 1,
                          y: [0, -15, -10, -20],
                          x: (i - 3) * 35,
                        }}
                        transition={{
                          delay: 1.2 + i * 0.15,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className="absolute text-lg pointer-events-none"
                        style={{ top: -10 }}
                      >
                        🩷
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Kawaii face text */}
            <AnimatePresence>
              {hugPhase >= 1 && hugPhase < 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2"
                >
                  <motion.p
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-fredoka text-2xl text-white/90 text-center drop-shadow-lg"
                  >
                    {kawaiiFaces[Math.floor(Math.random() * kawaiiFaces.length)]}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Love message popup card */}
            <AnimatePresence>
              {hugPhase === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.7, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 150 }}
                  className="mt-2 text-center"
                >
                  <motion.div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] px-8 py-7 sm:px-12 sm:py-9 shadow-2xl border-2 border-pink-200 max-w-sm relative overflow-hidden">
                    {/* Decorative corner hearts */}
                    <div className="absolute top-3 left-3 text-lg opacity-40 select-none">🌸</div>
                    <div className="absolute top-3 right-3 text-lg opacity-40 select-none">🌸</div>
                    <div className="absolute bottom-3 left-3 text-lg opacity-40 select-none">💕</div>
                    <div className="absolute bottom-3 right-3 text-lg opacity-40 select-none">💕</div>

                    {/* Shimmer effect */}
                    <motion.div
                      animate={{ x: [-200, 400] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                    />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                      className="text-5xl mb-3"
                    >
                      🤗💕
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-fredoka text-2xl text-pink-500 mb-2"
                    >
                      *peluk erat-erat* 🫂
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="font-quicksand text-base text-gray-600 font-medium leading-relaxed mb-1"
                    >
                      If only I could hug you right now...
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="font-quicksand text-base text-gray-600 font-medium leading-relaxed"
                    >
                      You mean everything to me, honey 💗
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-5 flex flex-col items-center gap-2"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-3xl"
                      >
                        🧸❤️🧸
                      </motion.div>
                      <p className="font-poppins text-xs text-gray-400 mt-2">
                        tap di mana aja buat nutup 🩷
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function HeroPopup() {
  const [showHugOverlay, setShowHugOverlay] = useState(false);
  const [hugPhase, setHugPhase] = useState(0);

  const handleHug = () => {
    setShowHugOverlay(true);
    setHugPhase(1);
    setTimeout(() => setHugPhase(2), 2000);
  };

  const closeHug = () => {
    setHugPhase(0);
    setShowHugOverlay(false);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="z-30 max-w-sm w-[90%] mx-auto shadow-2xl rounded-3xl overflow-visible relative"
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl -z-10" />

        {/* OS Window Top Bar */}
        <div className="h-10 bg-white/50 border-b border-white/50 flex items-center justify-between px-4 rounded-t-3xl">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
          </div>
          <div className="text-xs font-quicksand font-bold text-text-main/60 tracking-wider">
            LOVE_MESSAGE.exe
          </div>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center relative">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative mb-4"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-accent-pink to-soft-pink rounded-full blur-xl absolute top-0 left-0 opacity-40" />
            <Cat size={72} className="text-accent-pink drop-shadow-md relative z-10" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-2 z-20"
            >
              <Heart className="fill-red-500 text-red-500 w-8 h-8 drop-shadow-sm" />
            </motion.div>
          </motion.div>

          <h2 className="font-fredoka text-2xl font-medium text-text-main mb-2">
            Hello honey 💗
          </h2>
          <p className="font-poppins text-text-main/80 text-sm mb-1 font-medium">
            Happy 2 Years With Me
          </p>
          <p className="font-quicksand text-text-main/60 text-xs mb-8">
            Click a folder below to explore
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/memories" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-accent-pink text-white font-baloo text-sm py-2.5 rounded-full shadow-lg shadow-pink-500/30 hover:bg-pink-500 transition-colors"
              >
                OPEN MEMORIES
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHug}
              className="flex-1 bg-white/80 border border-pink-200 text-accent-pink font-baloo text-sm py-2.5 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              HUG ME 🫂
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Portal-based overlay — renders at body level to bypass transform/overflow clipping */}
      <HugOverlay show={showHugOverlay} hugPhase={hugPhase} onClose={closeHug} />
    </>
  );
}
