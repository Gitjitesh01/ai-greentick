import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Calendar, Check, Star } from 'lucide-react';

interface UseCaseItem {
  tag: string;
  title: string;
  desc: string;
}

interface UseCasesProps {
  data: {
    title: string;
    desc: string;
    useCases: UseCaseItem[];
  };
}

const METADATA = [
  {
    color: "bg-brand-50/40 border-brand-100",
    accent: "text-brand-600",
    chat: {
      sender: "TravelDealz",
      message: "Ready to book your next vacation? ✈️ 30% OFF on Bali trips!",
      cta: "Book Today",
      time: "10:00 AM"
    }
  },
  {
    color: "bg-blue-50/40 border-blue-100",
    accent: "text-blue-600",
    chat: {
      sender: "Star Tuition",
      message: "Hi! Here is the updated timetable and syllabus for next year. 📅",
      cta: "View Timetable",
      time: "12:23 PM"
    }
  },
  {
    color: "bg-amber-50/40 border-amber-100",
    accent: "text-amber-600",
    chat: {
      sender: "Sunshine Salon",
      message: "Hello! Thank you for showing interest in our spa services. 💆‍♀️",
      cta: "Book Appointment",
      time: "1:42 PM"
    }
  },
  {
    color: "bg-purple-50/40 border-purple-100",
    accent: "text-purple-600",
    chat: {
      sender: "GrowthAgency",
      message: "Your campaign report for this week is ready. ROI is up by 15%! 🚀",
      cta: "Download Report",
      time: "09:15 AM"
    }
  }
];

const UseCases: React.FC<UseCasesProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const title = data?.title || "Built For Teams That Live on WhatsApp";
  const desc = data?.desc || "Whether you are an agency handling many brands, a D2C business running campaigns or a service company managing leads, AI Greentick gives you the tools to stay organised and responsive.";
  const rawCases = data?.useCases || [];

  const cases = rawCases.map((item, idx) => {
    const meta = METADATA[idx % METADATA.length];
    return {
      role: item.title,      // maps to visual role
      title: item.tag,       // maps to card title
      desc: item.desc,       // maps to description
      color: meta.color,
      accent: meta.accent,
      chat: meta.chat
    };
  });

  // Auto-scroll logic
  useEffect(() => {
    let interval: any;
    if (isAutoPlaying && cases.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cases.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, cases.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  if (cases.length === 0) return null;

  return (
    <section id="home-use-cases" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 mb-5 tracking-tight">
            {title.includes("Live") ? (
              <>
                Built For Teams That <span className="text-transparent bg-clip-text bg-brand-gradient">Live</span> on WhatsApp
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            {desc}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Cards Track */}
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-stretch transition-all duration-300 ease-in-out">
            
            {/* Mobile View: Show only current */}
            <div className="md:hidden w-full">
               <UseCaseCard item={cases[currentIndex]} />
            </div>

            {/* Desktop View: Show 3 items starting from currentIndex */}
            <div className="hidden md:flex w-full gap-6">
                {[0, 1, 2].map((offset) => {
                    if (cases.length === 0) return null;
                    const itemIndex = (currentIndex + offset) % cases.length;
                    const item = cases[itemIndex];
                    return (
                        <motion.div 
                          key={itemIndex} 
                          className="flex-1 min-w-0"
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: offset * 0.1 }}
                        >
                             <UseCaseCard item={item} />
                        </motion.div>
                    );
                })}
            </div>
          </div>

          {/* Navigation Buttons (Bottom Center) */}
          {cases.length > 1 && (
            <motion.div 
              className="flex justify-center items-center gap-4 mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button 
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Previous slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button 
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Next slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

const UseCaseCard = ({ item }: { item: any }) => {
    return (
        <div className={`h-full rounded-[2.25rem] overflow-hidden border ${item.color.split(' ')[1]} ${item.color.split(' ')[0]} hover:shadow-premium transition-all duration-300 flex flex-col group`}>
            <div className="h-64 relative overflow-hidden p-6 flex items-end justify-center">
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>
                
                <div className="relative w-full max-w-[240px] bg-white rounded-t-[2.25rem] shadow-premium border-[5px] border-b-0 border-slate-950 transform translate-y-8 group-hover:translate-y-4 transition-transform duration-500 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-b-xl z-20"></div>

                    <div className="bg-[#075E54] p-3 pt-6 flex items-center gap-2.5 text-white relative z-10">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                             <MessageCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] font-bold truncate leading-tight">{item.chat.sender}</p>
                            <p className="text-[8px] text-white/80 flex items-center gap-0.5 leading-none">
                                Verified <Check className="w-2.5 h-2.5" />
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#E5DDD5] p-3 h-36 relative overflow-hidden flex flex-col justify-end">
                         <div className="absolute inset-0 opacity-[0.05]" 
                              style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '300px' }}>
                         </div>

                         <div className="self-center bg-[#E1F3FB] text-slate-500 text-[8px] px-2 py-0.5 rounded-lg shadow-sm mb-3 font-medium border border-white/50 z-10 uppercase tracking-wide">
                            Today
                         </div>

                         <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-[9px] text-slate-800 leading-relaxed text-left relative z-10 max-w-[90%] self-start mb-2 transition-transform duration-300 origin-bottom-left">
                             {item.chat.message}
                             <div className="text-[7px] text-slate-400 text-right mt-1">
                                {item.chat.time}
                             </div>
                         </div>

                         {item.chat.cta && (
                             <div className="self-center w-full max-w-[90%] bg-white rounded-lg shadow-sm overflow-hidden z-10 group-hover:shadow-md transition-shadow duration-300">
                                <div className="p-1.5 border-b border-slate-100 text-[8px] font-bold text-slate-400 text-center bg-slate-50 uppercase tracking-wide">
                                   Interactive Button
                                </div>
                                <div className={`p-2 text-center text-[9px] font-bold ${item.accent} hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-center gap-1.5`}>
                                   {item.role === "Travel & Hospitality" && <Calendar className="w-3 h-3" />}
                                   {item.role === "Education & EdTech" && <Star className="w-3 h-3" />}
                                   {item.role === "Spa & Salons" && <Calendar className="w-3 h-3" />}
                                   {item.role === "Agencies & B2B" && <ArrowRight className="w-3 h-3" />}
                                   {item.chat.cta}
                                </div>
                             </div>
                         )}
                    </div>
                </div>
            </div>

            <div className="p-8 pt-6 flex-1 flex flex-col bg-white text-left">
                <span className={`text-[10px] font-extrabold tracking-widest uppercase mb-2 ${item.accent}`}>{item.title}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.role}</h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed flex-1 font-light">
                    {item.desc}
                </p>
                <div className="mt-auto">
                    <a href="#" className={`inline-flex items-center text-xs font-bold ${item.accent} hover:underline`}>
                        <span>Learn more</span> 
                        <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UseCases;
