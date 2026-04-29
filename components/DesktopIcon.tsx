"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface DesktopIconProps {
  href: string;
  icon: ReactNode;
  label: string;
  delay?: number;
}

export default function DesktopIcon({ href, icon, label, delay = 0 }: DesktopIconProps) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center gap-2 group outline-none">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: delay,
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { rotate: { repeat: Infinity, duration: 0.5 } }
        }}
        whileTap={{ scale: 0.95 }}
        className="w-20 h-20 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/60 group-hover:bg-white/60 transition-colors"
      >
        <div className="text-pink-500 drop-shadow-sm">
          {icon}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="text-text-main font-poppins font-medium text-sm text-center bg-white/50 px-2 py-1 rounded-md backdrop-blur-sm"
      >
        {label}
      </motion.span>
    </Link>
  );
}
