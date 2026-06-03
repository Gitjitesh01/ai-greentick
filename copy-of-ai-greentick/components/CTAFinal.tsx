import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAFinalProps {
  data: {
    badge: string;
    title: string;
    desc: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

const CTAFinal: React.FC<CTAFinalProps> = ({ data }) => {
  const badge = data?.badge || "Ready to scale?";
  const title = data?.title || "Turn WhatsApp Into Your Growth Channel";
  const desc = data?.desc || "Join hundreds of high-growth brands using AI Greentick to simplify their WhatsApp strategy.";
  const primaryCta = data?.primaryCta || "Start Free Trial Today";
  const secondaryCta = data?.secondaryCta || "Explore Plans";

  return (
    <section id="cta-final" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="relative rounded-[3rem] bg-slate-50 border border-slate-200/60 overflow-hidden px-8 py-16 md:px-20 md:py-24 text-center shadow-premium"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#01B84B 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-bold uppercase tracking-wider mb-8">
              {badge}
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-extrabold text-slate-900 mb-8 tracking-tight">
              {title.includes("Growth Channel") ? (
                <>
                  Turn WhatsApp Into Your <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-brand-gradient">Growth Channel</span>
                </>
              ) : (
                title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))
              )}
            </h2>
            
            <p className="text-base md:text-lg text-slate-500 mb-10 max-w-xl font-light leading-relaxed">
               {desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
              {/* Primary CTA */}
              <motion.a 
                href="#pricing" 
                className="shiny-cta w-full sm:w-auto text-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{primaryCta}</span>
              </motion.a>
              
              {/* Secondary CTA */}
              <motion.a 
                href="#pricing" 
                className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-800 font-bold rounded-full py-4 px-10 shadow-sm text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{secondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinal;