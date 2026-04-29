"use client";

import { motion } from "framer-motion";
import PopupWindow from "@/components/PopupWindow";
import { Heart, Star, Sparkles, Pin } from "lucide-react";

export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // May 2026 starts on Friday (index 5) and has 31 days.
  // We'll just generate a static calendar view for May.
  const emptyDays = Array(5).fill(null);
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <PopupWindow title="Calendar.exe" height="h-[85vh]">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        
        {/* Left Side: Note & Stickers */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <motion.div 
            initial={{ rotate: -2, x: -20, opacity: 0 }}
            animate={{ rotate: -5, x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="bg-yellow-100 p-6 rounded-lg shadow-md border border-yellow-200 relative mt-4 md:mt-12"
          >
            <Pin className="absolute -top-3 text-red-500 fill-red-500 shadow-sm left-1/2 -translate-x-1/2" />
            <h3 className="font-baloo text-xl text-yellow-900 mb-2">My Favorite Day</h3>
            <p className="font-quicksand text-yellow-800 font-medium text-lg leading-relaxed">
              "May 5 became my favorite day. The day my life changed for the better."
            </p>
          </motion.div>

          <div className="relative flex-1">
            <motion.div animate={{ y: [0, -5, 0], rotate: 10 }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-10 left-10">
              <Star className="text-yellow-400 fill-yellow-200 w-12 h-12" />
            </motion.div>
            <motion.div animate={{ y: [0, 5, 0], rotate: -15 }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="absolute bottom-20 right-10">
              <Sparkles className="text-accent-pink fill-soft-pink w-10 h-10" />
            </motion.div>
          </div>
        </div>

        {/* Right Side: Calendar Grid */}
        <div className="flex-1 bg-white/80 rounded-2xl shadow-xl border border-white p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b-2 border-soft-pink pb-4">
            <h2 className="font-fredoka text-4xl text-accent-pink font-medium">MAY</h2>
            <div className="bg-soft-pink text-accent-pink font-bold px-4 py-1 rounded-full font-poppins">
              2 YEARS
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map(day => (
              <div key={day} className="text-center font-baloo text-text-main/60 font-bold text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="rounded-xl border border-transparent" />
            ))}
            
            {monthDays.map(day => {
              const isAnniversary = day === 5;

              return (
                <motion.div 
                  key={day}
                  whileHover={!isAnniversary ? { scale: 1.05, backgroundColor: "rgba(250, 208, 225, 0.4)" } : {}}
                  className={`rounded-xl border ${isAnniversary ? 'border-accent-pink bg-pink-50 shadow-md relative' : 'border-gray-100 bg-white hover:border-soft-pink hover:shadow-sm transition-all'} flex flex-col items-center justify-center p-2`}
                >
                  {isAnniversary && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-accent-pink/10 rounded-xl"
                    />
                  )}
                  
                  <span className={`font-poppins text-lg ${isAnniversary ? 'font-bold text-accent-pink' : 'font-medium text-text-main'} z-10`}>
                    {day}
                  </span>
                  
                  {isAnniversary && (
                    <motion.div 
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mt-1 z-10"
                    >
                      <Heart className="w-5 h-5 fill-accent-pink text-accent-pink" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PopupWindow>
  );
}
