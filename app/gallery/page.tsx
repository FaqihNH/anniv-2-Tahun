"use client";

import PopupWindow from "@/components/PopupWindow";
import PixelPhoto from "@/components/PixelPhoto";
import CircularGallery from "@/components/CircularGallery";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GalleryPage() {
  const masonryRef = useRef<HTMLDivElement>(null);

  const circularImages = [
    { image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&fit=crop", text: "First Date" },
    { image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&fit=crop", text: "Adventures" },
    { image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&fit=crop", text: "Beach Vibes" },
    { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop", text: "Smiles" },
  ];

  const photos = [
    {
      src1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
      src2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
      caption: "cutest face ever",
      rotation: -3
    },
    {
      src1: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
      src2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      caption: "us being chaotic",
      rotation: 4
    },
    {
      src1: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
      src2: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
      caption: "favorite memory",
      rotation: -2
    },
    {
      src1: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
      src2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
      caption: "still choose you",
      rotation: 5
    },
    {
      src1: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=500&fit=crop",
      src2: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop",
      caption: "my safe place",
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
          <div className="absolute top-4 left-0 right-0 text-center pointer-events-none">
            <h2 className="font-baloo text-white/50 text-xl tracking-widest uppercase">Drag to explore</h2>
          </div>
        </div>

        {/* Masonry Layout Section */}
        <div className="p-8 pb-32 bg-white">
          <h3 className="font-fredoka text-4xl text-accent-pink text-center mb-12">More Memories</h3>
          
          {/* CSS Columns Masonry */}
          <div ref={masonryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 max-w-6xl mx-auto">
            {photos.map((photo, i) => (
              <div key={i} className="break-inside-avoid">
                <PixelPhoto 
                  src1={photo.src1} 
                  src2={photo.src2} 
                  caption={photo.caption} 
                  rotation={photo.rotation} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </PopupWindow>
  );
}
