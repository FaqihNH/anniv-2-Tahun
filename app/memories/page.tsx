"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PopupWindow from "@/components/PopupWindow";
import SplitHeading from "@/components/SplitHeading";
import { MessageCircleHeart, Coffee, Flower2, HeartHandshake, Infinity, Stars } from "lucide-react";

export default function MemoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const timelineData = [
    { title: "First Chat", date: "Where it all started", icon: <MessageCircleHeart />, text: "That simple hello that changed my entire life. I still smile reading those old texts." },
    { title: "First Meet", date: "Nervous but excited", icon: <Coffee />, text: "My heart was beating so fast. You looked even more beautiful than I imagined." },
    { title: "First Date", date: "Sparks flying", icon: <Flower2 />, text: "Everything felt so natural. I knew right then I wanted to keep going on dates with you." },
    { title: "First Fight + Made Up", date: "Growing stronger", icon: <HeartHandshake />, text: "We learned how to communicate. Even when mad, I still loved you." },
    { title: "1 Year Together", date: "A milestone", icon: <Infinity />, text: "365 days of you being my favorite person. It flew by so fast because I was happy." },
    { title: "Today = 2 Years", date: "May 5th", icon: <Stars />, text: "Still deeply in love. Still choosing you. Here's to forever, my baby." },
  ];

  return (
    <PopupWindow title="Our Memories.exe">
      <div className="relative pt-10 pb-32 pl-4 sm:pl-12 pr-4 h-full" ref={containerRef}>
        
        {/* Parallax Line */}
        <div className="absolute left-[38px] sm:left-[70px] top-0 bottom-0 w-1 bg-white/40 shadow-inner rounded-full overflow-hidden">
          <motion.div 
            className="w-full bg-accent-pink origin-top"
            style={{ scaleY: scrollYProgress }}
          />
        </div>

        <div className="max-w-2xl mx-auto space-y-24">
          {timelineData.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </PopupWindow>
  );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="relative flex gap-6 sm:gap-10 items-start"
    >
      {/* Timeline Node */}
      <div className="w-14 h-14 shrink-0 rounded-full bg-white shadow-xl flex items-center justify-center text-accent-pink border-4 border-soft-pink z-10 relative">
        <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
          {item.icon}
        </motion.div>
      </div>

      {/* Content Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg border border-white flex-1 hover:bg-white/80 transition-colors">
        <div className="text-sm font-poppins text-accent-pink font-semibold mb-1">
          {item.date}
        </div>
        <SplitHeading text={item.title} className="text-xl sm:text-2xl font-fredoka text-text-main mb-3" />
        <p className="font-quicksand text-text-main/80 font-medium leading-relaxed">
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}
