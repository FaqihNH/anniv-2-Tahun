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
    <Link href={href} className="flex flex-col items-center gap-3 group outline-none w-[110px] sm:w-[130px]">
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: delay,
        }}
        whileHover={{
          scale: 1.08,
          y: -5,
          transition: { type: "spring", stiffness: 400, damping: 15 }
        }}
        whileTap={{ scale: 0.95 }}
        className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center drop-shadow-xl group-hover:drop-shadow-2xl transition-all relative"
      >
        <div className="text-pink-500 drop-shadow-sm w-full h-full flex items-center justify-center">
          {icon}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="w-full"
      >
        <div className="bg-white/70 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white shadow-sm flex items-center justify-center min-h-[44px] group-hover:bg-white/90 group-hover:shadow-md transition-all">
          <span className="text-text-main font-poppins font-semibold text-[11px] sm:text-xs text-center leading-tight line-clamp-2">
            {label}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
