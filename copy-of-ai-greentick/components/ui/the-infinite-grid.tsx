
import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils.ts';
import { MousePointer2, Zap } from 'lucide-react';

interface InfiniteGridProps {
  className?: string;
}

export const TheInfiniteGrid: React.FC<InfiniteGridProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Grid scroll motion value
  const gridOffset = useMotionValue(0);

  // Infinite scroll animation loop
  useAnimationFrame((time, delta) => {
    // Move the grid by 0.02px per millisecond (adjust speed here)
    const newOffset = gridOffset.get() + delta * 0.02;
    // Reset to 0 after 40px (grid size) to prevent large numbers, though CSS handles repeating well
    gridOffset.set(newOffset % 40);
  });

  // Create the background position template for the scrolling effect
  // We move the grid diagonally for a more dynamic feel
  const backgroundPosition = useMotionTemplate`-${gridOffset}px ${gridOffset}px`;

  // Create the mask image template for the spotlight effect
  // This creates a hole in the mask where the mouse is
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950",
        className
      )}
    >
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

      {/* --- Layer 1: The Faint Base Grid (Always Visible) --- */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='%23e2e8f0'%3e%3cpath d='M0 .5H40M.5 0V40' /%3e%3c/svg%3e")`,
          backgroundPosition,
        }}
      />

      {/* --- Layer 2: The Spotlight Grid (Revealed by Mouse) --- */}
      <motion.div
        className="absolute inset-0 z-10 opacity-100 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='%233b82f6'%3e%3cpath d='M0 .5H40M.5 0V40' stroke-width='2' /%3e%3c/svg%3e")`,
          backgroundPosition,
          maskImage,
          WebkitMaskImage: maskImage, // For Safari support
        }}
      />

      {/* --- Layer 3: Interactive Content --- */}
      <div className="relative z-20 flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            The Infinite Grid
          </h2>
          <p className="max-w-md text-slate-400">
            A performant, GPU-accelerated infinite scroll pattern with a reactive flashlight effect.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount((c) => c + 1)}
          className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-slate-900/80 px-8 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-slate-800 hover:ring-blue-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            {count % 2 === 0 ? <MousePointer2 className="h-4 w-4 text-blue-400" /> : <Zap className="h-4 w-4 text-yellow-400" />}
            <span>Clicks: {count}</span>
          </span>
          
          {/* Button Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </motion.button>
      </div>
      
      {/* Decorative overlaid gradient for depth at edges */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(transparent_40%,#020617_100%)]" />
    </div>
  );
};
