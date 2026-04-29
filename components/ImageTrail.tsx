"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ImageTrailProps {
  images: string[];
}

export default function ImageTrail({ images }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set initial positions off-screen or zero opacity
    gsap.set(itemsRef.current, { scale: 0, opacity: 0 });

    let currentIndex = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      const el = itemsRef.current[currentIndex];
      if (!el) return;

      // Animate the element to the cursor
      gsap.fromTo(el, 
        { 
          x: clientX, 
          y: clientY, 
          scale: 0, 
          opacity: 1, 
          zIndex: gsap.getProperty(el, "zIndex") as number + 1 
        },
        { 
          x: clientX, 
          y: clientY, 
          scale: 1, 
          duration: 0.4, 
          ease: "power2.out",
          onComplete: () => {
            gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.4, delay: 0.1 });
          }
        }
      );

      currentIndex = (currentIndex + 1) % itemsRef.current.length;
    };

    // Throttle the mousemove slightly so we don't spawn too many
    let lastTime = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 100) {
        handleMouseMove(e);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {images.map((src, i) => (
        <div 
          key={i} 
          ref={(el) => { itemsRef.current[i] = el; }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-lg overflow-hidden border-2 border-white shadow-xl"
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
