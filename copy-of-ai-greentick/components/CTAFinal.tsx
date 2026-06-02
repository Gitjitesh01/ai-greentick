import React from 'react';
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
    <section id="cta-final" className="py-20 md:py-32 bg-white">
      <style>{`
        @keyframes custom-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-custom-pulse { animation: custom-pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3.5rem] bg-slate-50 border border-slate-200 overflow-hidden px-8 py-20 md:px-24 md:py-32 text-center">
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#16a34a 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-bold mb-10 shadow-sm border border-brand-100">
              {badge}
            </div>
            <h2 className="text-[24px] md:text-[64px] leading-tight font-bold text-slate-900 mb-10 tracking-tight">
              {title.includes("Growth Channel") ? (
                <>
                  Turn WhatsApp Into Your <br className="hidden md:block" />
                  <span className="bg-[#01B84B] text-white px-4 py-1 rounded-2xl inline-block transform -rotate-1 shadow-xl">Growth Channel</span>
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
            <p className="text-xl md:text-2xl text-slate-600 mb-14 max-w-2xl font-light">
               {desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto items-center">
              {/* Primary CTA */}
              <a href="#pricing" className="shiny-cta transition-transform hover:scale-105 active:scale-95 shadow-xl text-center flex items-center justify-center">
                <span>{primaryCta}</span>
              </a>
              
              {/* Secondary CTA */}
              <a href="#pricing" className="relative inline-flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:ring-brand-500/30 hover:shadow-[0_0_0_1px_rgba(1,184,75,0.1),0_40px_80px_rgba(0,0,0,0.05)] group ring-slate-200/60 ring-1 text-base font-bold text-slate-900 tracking-tight bg-white/70 rounded-full py-4 pr-10 pl-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)] z-10 active:scale-95 backdrop-blur-md">
                <span className="relative z-[1] group-hover:translate-x-1 transition-transform duration-300">{secondaryCta}</span>
                <ArrowRight className="relative z-[1] w-5 h-5 text-slate-900 group-hover:translate-x-2 transition-transform duration-300" />
                
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[linear-gradient(45deg,rgba(1,184,75,0.05)_0%,rgba(1,184,75,0.1)_50%,rgba(1,184,75,0.05)_100%)] animate-custom-pulse"></span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_18px_60px_rgba(0,0,0,0.03)] bg-[radial-gradient(140%_160%_at_50%_-20%,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.2)_35%,rgba(255,255,255,0)_60%)]"></span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(120%_80%_at_50%_-20%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.1)_55%,rgba(255,255,255,0)_60%),radial-gradient(90%_80%_at_50%_120%,rgba(1,184,75,0.03)_0%,rgba(1,184,75,0)_60%)]"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFinal;