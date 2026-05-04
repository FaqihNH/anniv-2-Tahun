"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopupWindow from "@/components/PopupWindow";
import { Heart, Star, Sparkles, Pin, PartyPopper, Gift, Calendar } from "lucide-react";

const specialDates: Record<number, { emoji: string; note: string; color: string }> = {
  5: { emoji: "💗", note: "Our Anniversary! 2 Years of Love", color: "bg-accent-pink" },
  14: { emoji: "🌹", note: "Valentine vibes every month with you honey~", color: "bg-red-400" },
  1: { emoji: "🌸", note: "Start of a new month together", color: "bg-pink-300" },
  25: { emoji: "🎁", note: "Gift day? 🤭", color: "bg-purple-400" },
};

export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [clickedDay, setClickedDay] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [sparkleDay, setSparkleDay] = useState<number | null>(null);
  
  // May 2026 starts on Friday (index 5) and has 31 days.
  const emptyDays = Array(5).fill(null);
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDayClick = (day: number) => {
    setClickedDay(day);
    setSparkleDay(day);
    setTimeout(() => setSparkleDay(null), 1000);
  };

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
              &quot;May 5 became my favorite day. The day my life changed for the better because of you, honey.&quot;
            </p>
          </motion.div>

          {/* Clicked day info card */}
          <AnimatePresence mode="wait">
            {clickedDay && (
              <motion.div
                key={clickedDay}
                initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", damping: 15 }}
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-pink-200 relative"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="absolute -top-3 -right-3 w-10 h-10 bg-accent-pink rounded-full flex items-center justify-center text-white font-bold font-poppins text-sm shadow-lg"
                >
                  {clickedDay}
                </motion.div>
                <p className="font-fredoka text-lg text-accent-pink mb-1">May {clickedDay}</p>
                {specialDates[clickedDay] ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-quicksand text-text-main/80 font-medium"
                  >
                    {specialDates[clickedDay].emoji} {specialDates[clickedDay].note}
                  </motion.p>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-quicksand text-text-main/60 font-medium"
                  >
                    {clickedDay < 5 ? "Almost there... counting down! 🥰" : 
                     clickedDay === 6 ? "The day after... still on cloud 9 ☁️" :
                     "Another day loving you, honey 💭"}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

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
        <div className="flex-1 bg-white/80 rounded-2xl shadow-xl border border-white p-4 md:p-6 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-4 md:mb-6 border-b-2 border-soft-pink pb-3">
            <h2 className="font-fredoka text-3xl md:text-4xl text-accent-pink font-medium">MAY</h2>
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-soft-pink text-accent-pink font-bold px-3 py-1 text-sm md:text-base rounded-full font-poppins"
            >
              2 YEARS 💗
            </motion.div>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {days.map(day => (
              <div key={day} className="text-center font-baloo text-text-main/60 font-bold text-xs md:text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 flex-1 grid-rows-6 min-h-0">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="rounded-xl border border-transparent min-h-0" />
            ))}
            
            {monthDays.map((day, idx) => {
              const isAnniversary = day === 5;
              const isSpecial = specialDates[day] !== undefined;
              const isHovered = hoveredDay === day;
              const isClicked = clickedDay === day;
              const isSparkling = sparkleDay === day;

              return (
                <motion.div 
                  key={day}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02, type: "spring", stiffness: 300 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -4,
                    zIndex: 10,
                    boxShadow: isAnniversary 
                      ? "0 8px 25px rgba(255, 121, 176, 0.4)" 
                      : "0 4px 15px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDayClick(day)}
                  onHoverStart={() => setHoveredDay(day)}
                  onHoverEnd={() => setHoveredDay(null)}
                  className={`rounded-xl border cursor-pointer relative ${
                    isAnniversary 
                      ? 'border-accent-pink bg-gradient-to-br from-pink-50 to-pink-100 shadow-lg' 
                      : isClicked
                        ? 'border-accent-pink/50 bg-pink-50 shadow-md'
                        : isSpecial
                          ? 'border-pink-200 bg-pink-50/50'
                          : 'border-gray-100 bg-white hover:border-soft-pink'
                  } flex flex-col items-center justify-center p-1 min-h-0 transition-colors`}
                >
                  {/* Anniversary pulsing glow */}
                  {isAnniversary && (
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-accent-pink/20 rounded-xl"
                    />
                  )}

                  {/* Hover sparkle ring */}
                  <AnimatePresence>
                    {isHovered && !isAnniversary && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: 180 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 rounded-xl border-2 border-dashed border-accent-pink/30"
                      />
                    )}
                  </AnimatePresence>

                  {/* Click sparkle burst */}
                  <AnimatePresence>
                    {isSparkling && (
                      <>
                        {[...Array(6)].map((_, si) => (
                          <motion.div
                            key={`s-${si}`}
                            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                            animate={{ 
                              scale: [0, 1, 0], 
                              opacity: [1, 1, 0],
                              x: Math.cos((si / 6) * Math.PI * 2) * 30,
                              y: Math.sin((si / 6) * Math.PI * 2) * 30
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute text-xs pointer-events-none z-20"
                          >
                            ✨
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                  
                  <span className={`font-poppins text-sm md:text-base ${
                    isAnniversary ? 'font-bold text-accent-pink' : 
                    isClicked ? 'font-bold text-accent-pink' :
                    'font-medium text-text-main'
                  } z-10`}>
                    {day}
                  </span>
                  
                  {isAnniversary && (
                    <motion.div 
                      animate={{ y: [0, -3, 0], scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="mt-0.5 z-10"
                    >
                      <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 fill-accent-pink text-accent-pink" />
                    </motion.div>
                  )}

                  {/* Special date emoji indicator */}
                  {isSpecial && !isAnniversary && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[10px] leading-none mt-0.5"
                    >
                      {specialDates[day].emoji}
                    </motion.div>
                  )}

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {isHovered && isSpecial && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-text-main text-white text-[10px] px-2 py-1 rounded-lg font-quicksand font-semibold shadow-lg z-30 pointer-events-none"
                      >
                        {specialDates[day].note}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-text-main rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PopupWindow>
  );
}
