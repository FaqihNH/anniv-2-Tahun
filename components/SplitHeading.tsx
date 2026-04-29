"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SplitHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

export default function SplitHeading({ text, className = "", delay = 0, onComplete }: SplitHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Split text by characters but keep words intact for wrapping
  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    
    gsap.fromTo(chars, 
      {
        y: 50,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: delay,
        onComplete: onComplete
      }
    );
  }, { scope: containerRef });

  return (
    <h1 ref={containerRef} className={`${className} flex flex-wrap`} style={{ perspective: "1000px" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-2 overflow-hidden last:mr-0">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="char inline-block" style={{ transformOrigin: "50% 100%" }}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
