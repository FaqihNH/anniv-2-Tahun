"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PixelPhotoProps {
  src1: string;
  src2: string;
  caption: string;
  rotation?: number;
}

export default function PixelPhoto({ src1, src2, caption, rotation = 0 }: PixelPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Configuration for the pixel grid
  const cols = 10;
  const rows = 12;
  
  const blocks = useMemo(() => {
    return Array.from({ length: cols * rows }).map((_, i) => i);
  }, []);

  const handleMouseEnter = () => {
    if (!gridRef.current) return;
    const pixels = gridRef.current.querySelectorAll(".pixel-block");
    gsap.to(pixels, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      stagger: {
        amount: 0.5,
        grid: [cols, rows],
        from: "random",
      },
      ease: "power1.inOut"
    });
  };

  const handleMouseLeave = () => {
    if (!gridRef.current) return;
    const pixels = gridRef.current.querySelectorAll(".pixel-block");
    gsap.to(pixels, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: {
        amount: 0.4,
        grid: [cols, rows],
        from: "center",
      },
      ease: "power1.inOut"
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white p-3 pb-10 rounded-sm shadow-xl border border-gray-100 flex flex-col relative group"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-sm">
        {/* Bottom Image (Revealed) */}
        <img src={src2} alt="memory 2" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Top Image (Masked by pixels) */}
        <div ref={gridRef} className="absolute inset-0 z-10 flex flex-wrap" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {blocks.map((i) => (
            <div key={i} className="pixel-block w-full h-full relative overflow-hidden">
              <img 
                src={src1} 
                alt="memory 1" 
                className="absolute max-w-none"
                style={{
                  width: `${cols * 100}%`,
                  height: `${rows * 100}%`,
                  left: `-${(i % cols) * 100}%`,
                  top: `-${Math.floor(i / cols) * 100}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-3 left-0 right-0 text-center font-quicksand font-semibold text-text-main/80 text-sm">
        {caption}
      </div>
    </div>
  );
}
