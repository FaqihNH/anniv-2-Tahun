"use client";

import PopupWindow from "@/components/PopupWindow";
import DomeGallery from "@/components/DomeGallery";

export default function DomeGalleryPage() {
  const images = [
    { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=774&auto=format&fit=crop", alt: "First Date" },
    { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=774&auto=format&fit=crop", alt: "Adventures" },
    { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=774&auto=format&fit=crop", alt: "Beach Vibes" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop", alt: "Smiles" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=774&auto=format&fit=crop", alt: "Sunset" },
    { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=774&auto=format&fit=crop", alt: "Dinner" },
  ];

  return (
    <PopupWindow title="Dome.exe">
      <div className="w-full h-[80vh] bg-[#120F17] rounded-lg overflow-hidden relative">
        <DomeGallery 
          images={images}
          fit={0.5}
          segments={35}
          padFactor={0.25}
          overlayBlurColor="#120F17"
          maxVerticalRotationDeg={5}
          dragSensitivity={20}
          enlargeTransitionMs={300}
        />
        <div className="absolute top-4 left-0 right-0 text-center pointer-events-none z-10">
          <h2 className="font-baloo text-white/50 text-xl tracking-widest uppercase">Drag to explore the dome</h2>
        </div>
      </div>
    </PopupWindow>
  );
}
