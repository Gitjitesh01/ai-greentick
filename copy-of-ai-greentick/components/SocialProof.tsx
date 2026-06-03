import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

const getCompanyLogoUrl = (name: string, urlFromData?: string) => {
  const cleanName = name.trim().toLowerCase();

  // Local uploaded logos
  const localLogos: Record<string, string> = {
    dell: "/logos/dell.jpg",
    vmware: "/logos/vmware.jpg",
    phonepe: "/logos/phonepe.jpg",
    amazon: "/logos/amazon.jpg",
    ibm: "/logos/ibm.jpg",
    microsoft: "/logos/microsoft.jpg"
  };

  if (localLogos[cleanName]) {
    return localLogos[cleanName];
  }

  const domainMap: Record<string, string> = {
    google: "google.com",
    apple: "apple.com",
    meta: "meta.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
    whatsapp: "whatsapp.com",
    shopify: "shopify.com",
    hubspot: "hubspot.com",
    salesforce: "salesforce.com",
    woocommerce: "woocommerce.com",
    zapier: "zapier.com",
    slack: "slack.com",
    zoom: "zoom.us",
    spotify: "spotify.com",
    stripe: "stripe.com",
    paypal: "paypal.com",
    airbnb: "airbnb.com",
    uber: "uber.com"
  };

  if (domainMap[cleanName]) {
    return `https://logo.clearbit.com/${domainMap[cleanName]}`;
  }

  if (urlFromData && urlFromData.trim() !== "" && !urlFromData.includes("wikimedia.org")) {
    return urlFromData;
  }

  // Construct domain fallback
  const domain = cleanName.includes(".") ? cleanName : `${cleanName.replace(/\s+/g, '')}.com`;
  return `https://logo.clearbit.com/${domain}`;
};

const BrandLogo: React.FC<{ logo: Brand }> = ({ logo }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getCompanyLogoUrl(logo.name, logo.url);

  if (imgError || !logoUrl) {
    return (
      <span className="text-slate-400 font-bold text-base opacity-40 group-hover/logo:opacity-90 transition-opacity">
        {logo.name}
      </span>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt={logo.name} 
      onError={() => setImgError(true)}
      className="h-10 w-28 object-contain opacity-80 group-hover/logo:opacity-100 group-hover/logo:scale-105 transition-all duration-350 ease-out"
    />
  );
};

const SocialProof: React.FC<SocialProofProps> = ({ data }) => {
  const heading = data?.heading || "Trusted by Agencies, D2C Brands and Service Companies";
  const desc = data?.desc || "From early stage startups to established brands, teams use AI Greentick to manage WhatsApp conversations at scale.";
  const logos = data?.companies || [];

  if (logos.length === 0) return null;

  // Duplicate logos to create marquee scrolling effect
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <motion.section 
      id="home-social-proof" 
      className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          {heading}
        </h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
         {/* Gradient Masks for fading edges */}
         <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

         {/* Marquee Container */}
         <div className="flex w-max animate-marquee items-center py-4">
            {marqueeLogos.map((logo, index) => (
              <div key={index} className="mx-12 group/logo cursor-pointer flex-shrink-0">
                <BrandLogo logo={logo} />
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
            animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
    </motion.section>
  );
};

export default SocialProof;