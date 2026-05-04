"use client";

import { motion } from "framer-motion";
import { X, Minus, Square, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PopupWindowProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export default function PopupWindow({ title, children, width = "max-w-4xl", height = "h-[80vh]" }: PopupWindowProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 z-10 relative">
      
      {/* Floating Back Button */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2"
      >
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/80 px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-white/90 transition-all"
        >
          <motion.div
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowLeft size={16} className="text-accent-pink" />
          </motion.div>
          <span className="font-quicksand text-sm font-bold text-text-main/80">Back</span>
        </motion.button>

        <Link href="/home">
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 bg-accent-pink/10 backdrop-blur-xl border border-accent-pink/20 px-3 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-accent-pink/20 transition-all"
          >
            <Home size={16} className="text-accent-pink" />
            <span className="font-quicksand text-sm font-bold text-accent-pink hidden sm:inline">Home</span>
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`w-full ${width} ${height} glass-panel rounded-3xl flex flex-col overflow-hidden shadow-2xl relative`}
      >
        {/* Title Bar */}
        <div className="h-12 bg-white/50 border-b border-white/60 flex items-center justify-between px-4 shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/home")} className="w-3.5 h-3.5 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center group transition-colors">
              <X size={10} className="text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3.5 h-3.5 rounded-full bg-yellow-400 flex items-center justify-center group transition-colors">
              <Minus size={10} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3.5 h-3.5 rounded-full bg-green-400 flex items-center justify-center group transition-colors">
              <Square size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          
          <h2 className="font-fredoka text-text-main font-medium text-sm tracking-wide absolute left-1/2 -translate-x-1/2">
            {title}
          </h2>
          
          <div className="w-16" /> {/* Spacer for centering title */}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white/20 p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
