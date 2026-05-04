"use client";

import PopupWindow from "@/components/PopupWindow";
import PixelPhoto from "@/components/PixelPhoto";
import CircularGallery from "@/components/CircularGallery";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Heart, X } from "lucide-react";

export default function GalleryPage() {
  const masonryRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const circularImages = [
    { image: "/img/photo-01.jpeg", text: "First Date" },
    { image: "/img/photo-02.jpeg", text: "Adventures" },
    { image: "/img/photo-05.jpeg", text: "Beach Vibes" },
    { image: "/img/photo-09.jpeg", text: "Smiles" },
  ];

  const photos = [
    {
      src1: "/img/photo-12.jpeg",
      src2: "/img/photo-27.jpeg",
      caption: "cutest face ever 🥺",
      rotation: -3
    },
    {
      src1: "/img/photo-22.jpeg",
      src2: "/img/photo-01.jpeg",
      caption: "us being chaotic 😜",
      rotation: 4
    },
    {
      src1: "/img/photo-02.jpeg",
      src2: "/img/photo-05.jpeg",
      caption: "favorite memory 💫",
      rotation: -2
    },
    {
      src1: "/img/photo-09.jpeg",
      src2: "/img/photo-12.jpeg",
      caption: "still choose you 💕",
      rotation: 5
    },
    {
      src1: "/img/photo-27.jpeg",
      src2: "/img/photo-22.jpeg",
      caption: "my safe place 🏠",
      rotation: -4
    }
  ];

  useEffect(() => {
    if (masonryRef.current) {
      const items = masonryRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <PopupWindow title="Gallery.exe">
      <div className="flex flex-col w-full min-h-screen">
        
        {/* Circular Gallery Section */}
        <div className="w-full h-[600px] bg-[#1a1a1a] rounded-t-lg overflow-hidden relative cursor-grab active:cursor-grabbing">
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} items={circularImages} />
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 left-0 right-0 text-center pointer-events-none"
          >
            <h2 className="font-baloo text-white/50 text-xl tracking-widest uppercase">Drag to explore</h2>
          </motion.div>
        </div>

        {/* Masonry Layout Section */}
        <div className="p-8 pb-32 bg-gradient-to-b from-white to-pink-50/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="font-fredoka text-4xl text-accent-pink mb-2">More Memories</h3>
            <p className="font-quicksand text-text-main/50 text-sm">hover to reveal • click to zoom</p>
          </motion.div>
          
          {/* CSS Columns Masonry */}
          <div ref={masonryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 max-w-6xl mx-auto">
            {photos.map((photo, i) => (
              <motion.div 
                key={i} 
                className="break-inside-avoid cursor-pointer"
                whileHover={{ rotate: 0, scale: 1.02 }}
                onClick={() => setSelectedPhoto(photo.src2)}
              >
                <PixelPhoto 
                  src1={photo.src1} 
                  src2={photo.src2} 
                  caption={photo.caption} 
                  rotation={photo.rotation} 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fullscreen Photo Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative max-w-2xl max-h-[80vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedPhoto} 
                  alt="Memory" 
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-text-main/70 hover:text-accent-pink transition-colors"
                >
                  <X size={20} />
                </motion.button>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                >
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md">
                    <Heart size={14} className="text-accent-pink fill-accent-pink" />
                    <span className="font-quicksand text-sm font-semibold text-text-main/70">our moment</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PopupWindow>
  );
}
