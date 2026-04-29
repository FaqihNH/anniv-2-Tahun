"use client";

import { motion } from "framer-motion";
import { FolderHeart, CalendarHeart, Camera, Mail, List, Gift, Heart } from "lucide-react";
import DesktopIcon from "@/components/DesktopIcon";
import ScrollMarquee from "@/components/ScrollMarquee";

import Folder from "@/components/Folder";

export default function HomePage() {
  const icons = [
    { href: "/memories", icon: <FolderHeart size={36} />, label: "Our Memories", delay: 0.1 },
    { href: "/calendar", icon: <CalendarHeart size={36} />, label: "Special Dates", delay: 0.2 },
    { href: "/gallery", icon: <Camera size={36} />, label: "Cute Gallery", delay: 0.3 },
    { href: "/letters", icon: <Mail size={36} />, label: "Secret Letters", delay: 0.4 },
    { href: "/love-list", icon: <List size={36} />, label: "Why I Love You", delay: 0.5 },
    { href: "/final", icon: <Gift size={36} />, label: "Final Surprise", delay: 0.6 },
    { href: "/dome", icon: <Camera size={36} />, label: "Dome Gallery", delay: 0.7 },
  ];

  const group1 = icons.slice(0, 3).map((item, idx) => (
    <div key={idx} className="pointer-events-auto">
      <DesktopIcon href={item.href} icon={item.icon} label={item.label} delay={item.delay} />
    </div>
  ));
  
  const group2 = icons.slice(3, 6).map((item, idx) => (
    <div key={idx} className="pointer-events-auto">
      <DesktopIcon href={item.href} icon={item.icon} label={item.label} delay={item.delay} />
    </div>
  ));

  const group3 = icons.slice(6, 9).map((item, idx) => (
    <div key={idx} className="pointer-events-auto">
      <DesktopIcon href={item.href} icon={item.icon} label={item.label} delay={item.delay} />
    </div>
  ));

  return (
    <main className="min-h-screen bg-gradient-to-br from-soft-pink via-background to-lavender flex flex-col relative overflow-hidden">
      
      {/* Decorative dreamy clouds/stars background (CSS based) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-accent-pink rounded-full blur-3xl opacity-30" />
      </div>

      {/* Marquee Banner */}
      <div className="pt-12 z-10">
        <ScrollMarquee text="2 YEARS OF LOVE • MAY 5 • MY FAVORITE PERSON • FOREVER CUTE •" />
      </div>

      {/* Desktop Grid with Folders */}
      <div className="flex-1 p-8 z-10 flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-24">
        <div className="flex flex-col items-center gap-4">
          <Folder color="#FAD0E1" size={1.2} items={group1} />
          <p className="font-poppins font-medium text-text-main/80 bg-white/50 px-4 py-1 rounded-full border border-white backdrop-blur-md">
            Memories
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <Folder color="#D9C2FF" size={1.2} items={group2} />
          <p className="font-poppins font-medium text-text-main/80 bg-white/50 px-4 py-1 rounded-full border border-white backdrop-blur-md">
            Surprises
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Folder color="#FFB6C1" size={1.2} items={group3} />
          <p className="font-poppins font-medium text-text-main/80 bg-white/50 px-4 py-1 rounded-full border border-white backdrop-blur-md">
            Extras
          </p>
        </div>
      </div>

      {/* OS Bottom Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-lg border border-white/60 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-4 z-20"
      >
        <div className="font-quicksand font-bold text-accent-pink/80 flex items-center gap-2">
          <Heart size={16} className="fill-accent-pink/80" />
          SYSTEM_LOVE_OS
        </div>
        <div className="w-px h-6 bg-white/50" />
        <div className="font-poppins text-sm text-text-main/70 font-medium">
          Ver. 2.0 (May 5 Edition)
        </div>
      </motion.div>
      
    </main>
  );
}
