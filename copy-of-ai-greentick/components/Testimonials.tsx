import React from 'react';

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
    <section id="testimonials" className="py-24 bg-[#F8F9FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-4 tracking-tight">
          {title.includes("Loved") ? (
            <>
              <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Loved</span> by Businesses Worldwide
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {desc}
        </p>
      </div>

      <div className="relative w-full space-y-8">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#F8F9FF] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#F8F9FF] to-transparent z-10 pointer-events-none"></div>

        {/* Row 1: Left to Right */}
        {testimonialsRow1.length > 0 && (
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
            {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((item, index) => (
              <div key={`row1-${index}`} className="w-[400px] flex-shrink-0">
                 <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[15px]">
                      {item.text}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Row 2: Right to Left (Reverse) */}
        {testimonialsRow2.length > 0 && (
          <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused]">
            {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((item, index) => (
              <div key={`row2-${index}`} className="w-[400px] flex-shrink-0">
                 <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[15px]">
                      {item.text}
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
            animation: marquee 50s linear infinite;
        }
        .animate-marquee-reverse {
            animation: marquee-reverse 50s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;