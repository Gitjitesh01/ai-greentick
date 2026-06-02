
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils.ts";

export const BackgroundGradientAnimation = ({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden bg-slate-950",
        containerClassName
      )}
    >
      <div className={cn("absolute inset-0 z-0", className)}>
        {/* Moving Gradient 1 - Brand Green */}
        <motion.div
          animate={{
            x: ["-25%", "25%", "-25%"],
            y: ["-20%", "20%", "-20%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-brand-500/20 blur-[100px] mix-blend-screen"
        />
        
        {/* Moving Gradient 2 - Teal/Blue */}
        <motion.div
          animate={{
            x: ["25%", "-25%", "25%"],
            y: ["10%", "-10%", "10%"],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen"
        />

        {/* Moving Gradient 3 - Center Glow */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-[80px] mix-blend-screen"
        />
      </div>
      
      {/* Noise Texture Overlay (Optional, distinct look) */}
      <div className="absolute inset-0 bg-slate-950/40" />
      
      {/* Gradient Overlay to fade into bottom if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
    </div>
  );
};
