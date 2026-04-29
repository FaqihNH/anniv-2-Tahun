"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopupWindow from "@/components/PopupWindow";
import { Mail, MailOpen, HeartHandshake, Sparkles, Frown, Flame } from "lucide-react";

export default function LettersPage() {
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  const letters = [
    {
      id: 1,
      title: "Open when happy",
      icon: <Sparkles className="text-yellow-500" />,
      content: "I love seeing you happy. Your smile is literally the most beautiful thing in this world. Keep shining, my love. I'm always cheering for you."
    },
    {
      id: 2,
      title: "Open when sad",
      icon: <Frown className="text-blue-400" />,
      content: "Hey baby... take a deep breath. Whatever it is, we will get through it. I'm right here with you. You are so strong, and I love you so much."
    },
    {
      id: 3,
      title: "Open when angry",
      icon: <Flame className="text-red-500" />,
      content: "I know you're mad right now, and maybe it's at me. But please remember that my love for you never changes, even when we fight. Let's talk it out when you're ready."
    },
    {
      id: 4,
      title: "Open when you miss me",
      icon: <HeartHandshake className="text-accent-pink" />,
      content: "I miss you too. So much. Close your eyes and imagine me hugging you really tight right now. I can't wait to see you again."
    },
    {
      id: 5,
      title: "Open today",
      icon: <Mail className="text-purple-500" />,
      content: "Happy 2 Years, baby! Thank you for being my favorite person. Every single day with you is a blessing. Let's make more beautiful memories."
    }
  ];

  return (
    <PopupWindow title="Inbox - Secret Letters.exe">
      <div className="flex flex-col md:flex-row h-full rounded-xl overflow-hidden border border-white/60 shadow-inner bg-white/40">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white/50 border-r border-white/60 p-4 overflow-y-auto">
          <h3 className="font-baloo text-lg text-text-main/70 mb-4 px-2">Secret Inbox</h3>
          <div className="flex flex-col gap-2">
            {letters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => setActiveLetter(letter.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeLetter === letter.id 
                    ? "bg-accent-pink text-white shadow-md" 
                    : "hover:bg-white/60 text-text-main/80"
                }`}
              >
                {activeLetter === letter.id ? <MailOpen size={20} /> : letter.icon}
                <span className="font-quicksand font-semibold text-left">{letter.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/70 p-6 sm:p-10 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeLetter ? (
              <motion.div
                key={activeLetter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl mx-auto mt-4"
              >
                <div className="mb-8 pb-4 border-b border-soft-pink">
                  <h2 className="font-fredoka text-3xl text-accent-pink mb-2">
                    {letters.find(l => l.id === activeLetter)?.title}
                  </h2>
                  <p className="font-poppins text-sm text-text-main/50">To: My Favorite Person</p>
                </div>
                
                <div className="font-quicksand text-lg text-text-main/90 leading-relaxed font-medium">
                  {/* Split text word by word for animation */}
                  {letters.find(l => l.id === activeLetter)?.content.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="inline-block mr-1.5"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-text-main/40">
                <Mail size={48} className="mb-4 opacity-50" />
                <p className="font-quicksand font-medium">Select a letter to open</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </PopupWindow>
  );
}
