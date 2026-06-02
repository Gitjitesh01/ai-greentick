import React from 'react';

interface Brand {
  name: string;
  url: string;
  h?: string;
}

interface SocialProofProps {
  data: {
    heading: string;
    desc?: string;
    companies: Brand[];
  };
}

const SocialProof: React.FC<SocialProofProps> = ({ data }) => {
  const heading = data?.heading || "Trusted by Agencies, D2C Brands and Service Companies";
  const desc = data?.desc || "From early stage startups to established brands, teams use AI Greentick to manage WhatsApp conversations at scale.";
  const logos = data?.companies || [];

  if (logos.length === 0) return null;

  // Duplicate logos to create marquee scrolling effect
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section id="home-social-proof" className="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-[24px] md:text-[32px] font-bold text-slate-900 mb-4">
          {heading}
        </h2>
        <p className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
         {/* Gradient Masks for fading edges */}
         <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

         {/* Marquee Container */}
         <div className="flex w-max animate-marquee items-center">
            {marqueeLogos.map((logo, index) => (
              <div key={index} className="mx-8 md:mx-12 group/logo cursor-pointer">
                {logo.url ? (
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className={`${logo.h || 'h-8'} w-auto object-contain max-w-[140px] opacity-70 group-hover/logo:opacity-100 group-hover/logo:-translate-y-1 transition-all duration-300 ease-in-out`}
                  />
                ) : (
                  <span className="text-slate-400 font-bold text-lg opacity-70 group-hover/logo:opacity-100 transition-opacity">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
         </div>
      </div>

      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SocialProof;