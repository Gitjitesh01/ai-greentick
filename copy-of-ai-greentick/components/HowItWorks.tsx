import React, { useEffect, useRef, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = data?.title || "How AI Greentick works";
  const desc = data?.desc || "Getting started with AI Greentick is simple. Your team can start sending campaigns and handling chats in just a few steps.";
  const steps = data?.steps || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-[#F7F5ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 tracking-tight">
            {title.includes("works") ? (
              <>
                How AI Greentick <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">works</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {desc}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal Connecting Line (Desktop Only) */}
          <div className={`hidden md:block absolute top-[156px] left-[10%] right-[10%] h-[1px] bg-slate-300 z-0 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4">
            {steps.map((step, idx) => {
              const StepIcon = getIcon(idx);
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center text-center relative z-10 group transition-all duration-700 ease-out`}
                  style={{ 
                    transitionDelay: `${idx * 200}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
                  }}
                >
                  
                  {/* Large Icon Circle with Pop Animation */}
                  <div 
                    className={`w-24 h-24 rounded-full bg-white flex items-center justify-center mb-10 transition-colors duration-300 group-hover:bg-brand-50 border border-slate-200 group-hover:border-brand-200 shadow-sm ${isVisible ? 'animate-pop-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${idx * 200 + 300}ms` }}
                  >
                    <StepIcon className="w-10 h-10 text-brand-800 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  </div>

                  {/* Number Badge */}
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-400 flex items-center justify-center text-slate-600 font-medium text-lg mb-6 shadow-[0_0_0_8px_#F7F5ED] group-hover:border-brand-500 group-hover:text-brand-600 transition-colors relative z-10">
                    {step.number || (idx + 1).toString()}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 px-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-slate-600 mb-6 max-w-[240px] mx-auto leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          80% { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
