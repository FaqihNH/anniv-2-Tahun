"use client";

import { motion } from "framer-motion";

export default function CalendarIcon() {
  return (
    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden border border-white/60 relative">
      {/* Top Header Bar */}
      <div className="h-5 bg-accent-pink w-full flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-1 h-1 rounded-full bg-white/70"></div>
          <div className="w-1 h-1 rounded-full bg-white/70"></div>
        </div>
      </div>
      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50/30">
        <span className="text-[10px] font-bold text-accent-pink uppercase tracking-widest leading-none mt-1">May</span>
        <span className="text-2xl font-black text-text-main leading-none mt-0.5">5</span>
      </div>
    </div>
  );
}
