"use client";

import { motion } from "framer-motion";

import DesktopIcon from "@/components/DesktopIcon";
import ScrollMarquee from "@/components/ScrollMarquee";
import BackgroundEffects from "@/components/BackgroundEffects";
import HeroPopup from "@/components/HeroPopup";
import BottomDock from "@/components/BottomDock";
import CalendarIcon from "@/components/CalendarIcon";

export default function HomePage() {
  const icons = [
    { href: "/memories", icon: <img src="/img/memoris.jpg" alt="Our Memories" className="w-14 h-14 object-cover rounded-xl shadow-sm" />, label: "Our Memories", delay: 0.1 },
    { href: "/gallery", icon: <img src="/icon/pink-camera-icon.jpg" alt="Cute Gallery" className="w-14 h-14 object-cover rounded-xl shadow-sm" />, label: "Cute Gallery", delay: 0.2 },
    { href: "/calendar", icon: <img src="/icon/download-22.jpg" alt="Special Dates" className="w-14 h-14 object-cover rounded-xl shadow-sm" />, label: "Special Dates", delay: 0.3 },
    { href: "/letters", icon: <img src="/icon/download-23.jpg" alt="Secret Letters" className="w-14 h-14 object-cover rounded-xl shadow-sm" />, label: "Secret Letters", delay: 0.4 },
    { href: "/final", icon: <img src="/icon/download-24.jpg" alt="Final Surprise" className="w-14 h-14 object-cover rounded-xl shadow-sm" />, label: "Final Surprise", delay: 0.5 },
    { href: "/love-list", icon: <img src="/icon/cat-icon.jpg" alt="Bonus Folder" className="w-14 h-14 object-cover rounded-xl shadow-sm" />, label: "Bonus Folder", delay: 0.6 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFEAF4] via-[#FDEBF2] to-[#FDE2F3] flex flex-col relative overflow-hidden">
      
      {/* Background Particles and Blobs */}
      <BackgroundEffects />

      {/* Marquee Banner */}
      <div className="pt-6 sm:pt-10 z-20 opacity-80 mix-blend-multiply">
        <ScrollMarquee text="2 YEARS OF LOVE • MAY 5 • MY FAVORITE PERSON • FOREVER US •" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col xl:flex-row items-center justify-center p-4 sm:p-8 xl:p-24 gap-8 xl:gap-24 z-10 w-full max-w-[1440px] mx-auto h-full">
        
        {/* Left Side: Center Hero Area (Popup) */}
        <div className="w-full xl:w-1/2 flex items-center justify-center xl:justify-end">
          <HeroPopup />
        </div>

        {/* Right Side: Desktop Icon Grid Area */}
        <div className="w-full xl:w-1/2 flex items-center justify-center xl:justify-start">
          <div className="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-10 sm:gap-x-12 sm:gap-y-12">
            {icons.map((item, idx) => (
              <DesktopIcon 
                key={idx} 
                href={item.href} 
                icon={item.icon} 
                label={item.label} 
                delay={item.delay} 
              />
            ))}
          </div>
        </div>
        
      </div>

      {/* Bottom Taskbar */}
      <BottomDock />
      
    </main>
  );
}
