import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, MessageSquare, TrendingUp, Rocket } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  desc: string;
}

interface HowItWorksProps {
  data: {
    title: string;
    desc: string;
    steps: Step[];
  };
}

const HowItWorks: React.FC<HowItWorksProps> = ({ data }) => {
  const title = data?.title || "How AI Greentick works";
  const desc = data?.desc || "Getting started with AI Greentick is simple. Your team can start sending campaigns and handling chats in just a few steps.";
  const steps = data?.steps || [];

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return Smartphone;
      case 1: return MessageSquare;
      case 2: return TrendingUp;
      case 3: return Rocket;
      default: return Rocket;
    }
  };

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 tracking-tight">
            {title.includes("works") ? (
              <>
                How AI Greentick <span className="text-transparent bg-clip-text bg-brand-gradient">works</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
            {desc}
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[138px] left-[12%] right-[12%] h-[2px] bg-slate-100 z-0">
            <motion.div 
              className="h-full bg-brand-500 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, idx) => {
              const StepIcon = getIcon(idx);
              return (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center text-center relative z-10 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  
                  {/* Large Icon Circle with Hover Effects */}
                  <motion.div 
                    className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-200/60 shadow-sm group-hover:border-brand-500/30 group-hover:bg-brand-50/20 group-hover:shadow-premium transition-all duration-300"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <StepIcon className="w-8 h-8 text-brand-600 transition-colors group-hover:text-brand-500" strokeWidth={1.5} />
                  </motion.div>

                  {/* Number Badge */}
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm mb-5 shadow-[0_0_0_8px_#ffffff] group-hover:border-brand-500 group-hover:text-brand-600 transition-colors relative z-10">
                    {step.number || (idx + 1).toString()}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 px-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-[220px] mx-auto leading-relaxed font-light">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
