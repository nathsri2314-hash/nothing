/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

const BALLOON_COLORS = ['#0d9488', '#fbbf24', '#14b8a6', '#f59e0b', '#d6d3d1'];

const Balloon = ({ color, delay, duration, x }: { color: string, delay: number, duration: number, x: number, key?: number }) => {
  return (
    <motion.div
      className="absolute bottom-[-150px] z-0 opacity-40"
      style={{ left: `${x}%` }}
      animate={{
        y: ['0vh', '-120vh'],
        x: [`0px`, `${Math.random() * 60 - 30}px`, `${Math.random() * 60 - 30}px`],
      }}
      transition={{
        y: { duration: duration, repeat: Infinity, ease: 'linear', delay: delay },
        x: { duration: duration / 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: delay }
      }}
    >
      <div className="relative w-12 h-16 md:w-16 md:h-20 rounded-[50%] flex items-center justify-center shadow-sm" style={{ backgroundColor: color }}>
        {/* Balloon tie */}
        <div className="absolute -bottom-1.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent" style={{ borderBottomColor: color }}></div>
        {/* Balloon string */}
        <div className="absolute -bottom-16 w-[1px] h-16 bg-stone-400/30"></div>
        {/* Highlight */}
        <div className="absolute top-2 left-2 w-3 h-5 rounded-full bg-white/30 rotate-45"></div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const triggerConfetti = () => {
    // Joyful, neutral color palette for confetti: Teal, Amber, White, Light Teal
    const colors = ['#0d9488', '#fbbf24', '#ffffff', '#14b8a6']; 
    
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: colors,
      disableForReducedMotion: true
    });
  };

  useEffect(() => {
    // Trigger confetti shortly after load
    const timer = setTimeout(triggerConfetti, 800);
    return () => clearTimeout(timer);
  }, []);

  // Generate random balloons
  const balloons = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    x: Math.random() * 100
  })), []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-100/40 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-100/40 blur-3xl"></div>
      </div>

      {/* Floating Balloons Background */}
      {balloons.map(b => (
        <Balloon key={b.id} color={b.color} delay={b.delay} duration={b.duration} x={b.x} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center max-w-3xl mx-auto backdrop-blur-sm bg-white/40 p-8 md:p-12 rounded-3xl border border-white/50 shadow-xl shadow-stone-200/50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <Sparkles className="w-8 h-8 text-teal-500" strokeWidth={1.5} />
        </motion.div>

        <h2 className="text-sm md:text-base font-sans tracking-[0.3em] text-teal-600 uppercase mb-4">
          Wishing you a very
        </h2>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-stone-800 mb-2 tracking-tight">
          Happy <br className="md:hidden" />
          <span className="italic text-teal-600">Birthday</span>
        </h1>

        <h1 className="font-serif text-5xl md:text-7xl text-stone-800 mb-10">
          Sabitha
        </h1>

        <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-10"></div>

        <p className="font-sans text-stone-500 text-lg md:text-xl max-w-md mx-auto mb-12 font-light leading-relaxed">
          Wishing you a wonderful birthday and a fantastic year ahead filled with joy and success.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerConfetti}
          className="px-10 py-4 bg-stone-900 text-white rounded-full font-sans text-sm tracking-widest uppercase transition-colors hover:bg-teal-600 shadow-lg shadow-teal-900/10"
        >
          Celebrate
        </motion.button>
      </motion.div>
    </div>
  );
}
