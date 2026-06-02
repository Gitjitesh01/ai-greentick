import React, { useState, useEffect } from 'react';
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
    color: "bg-brand-50",
    accent: "text-brand-600",
    chat: {
      sender: "TravelDealz",
      message: "Ready to book your next vacation? ✈️ 30% OFF on Bali trips!",
      cta: "Book Today",
      time: "10:00 AM"
    }
  },
  {
    color: "bg-blue-50",
    accent: "text-blue-600",
    chat: {
      sender: "Star Tuition",
      message: "Hi! Here is the updated timetable and syllabus for next year. 📅",
      cta: "View Timetable",
      time: "12:23 PM"
    }
  },
  {
    color: "bg-amber-50",
    accent: "text-amber-600",
    chat: {
      sender: "Sunshine Salon",
      message: "Hello! Thank you for showing interest in our spa services. 💆‍♀️",
      cta: "Book Appointment",
      time: "1:42 PM"
    }
  },
  {
    color: "bg-purple-50",
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
      }, 3000);
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
    <section id="home-use-cases" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-4 tracking-tight">
            {title.includes("Live") ? (
              <>
                Built For Teams That <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Live</span> on WhatsApp
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {desc}
          </p>
        </div>

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
                        <div key={itemIndex} className="flex-1 min-w-0 animate-in fade-in slide-in-from-right-4 duration-300">
                             <UseCaseCard item={item} />
                        </div>
                    );
                })}
            </div>
          </div>

          {/* Navigation Buttons (Bottom Center) */}
          {cases.length > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-brand-200"
                  aria-label="Previous slide"
              >
                  <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-brand-200"
                  aria-label="Next slide"
              >
                  <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

const UseCaseCard = ({ item }: { item: any }) => {
    return (
        <div className={`h-full rounded-3xl overflow-hidden ${item.color} hover:shadow-xl transition-shadow duration-300 flex flex-col`}>
            <div className={`h-64 relative overflow-hidden p-6 flex items-end justify-center ${item.color} group`}>
                <div className="absolute inset-0 opacity-30" 
                     style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>
                
                <div className="relative w-full max-w-[260px] bg-white rounded-t-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border-[6px] border-b-0 border-slate-900 transform translate-y-8 group-hover:translate-y-4 transition-transform duration-500 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-20"></div>

                    <div className="bg-[#075E54] p-3 pt-7 flex items-center gap-3 text-white relative z-10">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                             <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">{item.chat.sender}</p>
                            <p className="text-[9px] text-white/80 flex items-center gap-1">
                                Business Account <Check className="w-2 h-2" />
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#E5DDD5] p-3 h-40 relative overflow-hidden flex flex-col">
                         <div className="absolute inset-0 opacity-[0.06]" 
                              style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '300px' }}>
                         </div>

                         <div className="self-center bg-[#E1F3FB] text-slate-500 text-[9px] px-2 py-0.5 rounded-lg shadow-sm mb-3 font-medium border border-white/50 z-10">
                            Today
                         </div>

                         <div className="bg-white p-2.5 rounded-lg rounded-tl-none shadow-sm text-[10px] text-slate-800 leading-snug relative z-10 max-w-[90%] self-start mb-2 group-hover:scale-[1.02] transition-transform duration-300 origin-bottom-left">
                             {item.chat.message}
                             <div className="text-[8px] text-slate-400 text-right mt-1 flex items-center justify-end gap-0.5">
                                {item.chat.time}
                             </div>
                         </div>

                         {item.chat.cta && (
                             <div className="self-center w-full max-w-[90%] bg-white rounded-lg shadow-sm overflow-hidden z-10 group-hover:shadow-md transition-shadow duration-300">
                                <div className="p-2 border-b border-slate-100 text-[10px] font-medium text-slate-500 text-center bg-slate-50">
                                   Select an option
                                </div>
                                <div className={`p-2.5 text-center text-[10px] font-bold ${item.accent} hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-center gap-1.5`}>
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

            <div className="p-8 pt-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-base text-slate-600 mb-6 leading-relaxed flex-1">
                    {item.desc}
                </p>
                <div className="mt-auto">
                    <a href="#" className={`inline-flex items-center text-sm font-bold ${item.accent} hover:underline`}>
                        Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UseCases;
