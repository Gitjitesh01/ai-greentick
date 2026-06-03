import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
}

interface TestimonialsProps {
  data: {
    title: string;
    desc: string;
    row1: Testimonial[];
    row2: Testimonial[];
  };
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const title = data?.title || "Loved by Businesses Worldwide";
  const desc = data?.desc || "See what over 500+ businesses are saying about their experience with AI Greentick.";
  
  const testimonialsRow1 = data?.row1 || [];
  const testimonialsRow2 = data?.row2 || [];

  if (testimonialsRow1.length === 0 && testimonialsRow2.length === 0) {
    return null;
  }

  return (
    <motion.section 
      id="testimonials" 
      className="py-24 lg:py-32 bg-slate-50 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 mb-5 tracking-tight">
          {title.includes("Loved") ? (
            <>
              <span className="text-transparent bg-clip-text bg-brand-gradient">Loved</span> by Businesses Worldwide
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="relative w-full space-y-6">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        {/* Row 1: Left to Right */}
        {testimonialsRow1.length > 0 && (
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] py-2">
            {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((item, index) => (
              <div key={`row1-${index}`} className="w-[360px] flex-shrink-0">
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 h-full hover:border-brand-500/20 hover:shadow-premium transition-all duration-300">
                    <div className="flex items-center gap-3.5 mb-5">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-100" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-base">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-xs font-light">
                      "{item.text}"
                    </p>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Row 2: Right to Left (Reverse) */}
        {testimonialsRow2.length > 0 && (
          <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused] py-2">
            {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((item, index) => (
              <div key={`row2-${index}`} className="w-[360px] flex-shrink-0">
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 h-full hover:border-brand-500/20 hover:shadow-premium transition-all duration-300">
                    <div className="flex items-center gap-3.5 mb-5">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-100" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-base">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-xs font-light">
                      "{item.text}"
                    </p>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-reverse {
            0% { transform: translateX(-33.33%); }
            100% { transform: translateX(0); }
        }
        .animate-marquee {
            animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
            animation: marquee-reverse 60s linear infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default Testimonials;