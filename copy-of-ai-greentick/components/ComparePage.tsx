
import React, { useEffect } from 'react';
import { 
  ArrowRight, Check, X, CheckCircle2, Shield, Zap, LayoutGrid, Users, 
  DollarSign, Globe, Repeat, MoveRight, Star, Play, Clock, Phone, FileText, Layers
} from 'lucide-react';

interface ComparePageProps {
  data?: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    overview: {
      title: string;
      desc: string;
      highlights: string[];
    };
    differences: { title: string; desc: string }[];
    comparisonGrid: { feature: string; aigreentick: boolean; wati: boolean }[];
    migration: string[];
  };
}

const ComparePage: React.FC<ComparePageProps> = ({ data }) => {
  
  // Implement SEO Metadata
  useEffect(() => {
    document.title = "AI Greentick vs WATI | Which WhatsApp Platform Should You Choose?";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Compare AI Greentick and WATI across pricing, automation, broadcasts, shared inbox, chatbot features and support quality. Choose the best WhatsApp platform for your business.");
    }
  }, []);

  const content = data || {
    hero: {
      badge: 'Comparison',
      title: 'AI Greentick vs WATI\nA Clear, Honest Comparison',
      subtitle: 'Both AI Greentick and WATI help businesses communicate on WhatsApp. But the way they handle broadcasts, automation, inbox management and pricing is very different. Here’s a simple breakdown to help you choose.'
    },
    overview: {
      title: 'Quick Summary: Differences Between Platforms',
      desc: 'WATI is a well known WhatsApp marketing tool with a strong presence in the industry. AI Greentick focuses on simplicity, speed, automation and affordability — especially for Indian and Southeast Asian businesses.',
      highlights: ['Easier onboarding', 'Cleaner UI', 'Lower pricing', 'Stronger automation', 'Faster support']
    },
    differences: [
      { title: "Simplicity & Ease of Use", desc: "WATI has a lot of legacy features which makes the interface feel complex and cluttered. AI Greentick is built from the ground up for speed. You can start broadcasts or set up bots with zero learning curve." },
      { title: "Pricing & Hidden Fees", desc: "WATI charges high base subscription fees and additional platform markup fees for messages. AI Greentick offers direct Meta billing rates with simple tiers and zero hidden percentage cuts." },
      { title: "Customer Support Response Time", desc: "AI Greentick offers 24/7 dedicated support via WhatsApp and Slack. WATI support can often take days via email support tickets." }
    ],
    comparisonGrid: [
      { feature: "Meta Approved API", aigreentick: true, wati: true },
      { feature: "Unlimited Agents / Seats", aigreentick: true, wati: false },
      { feature: "No-Code Flow Builder", aigreentick: true, wati: true },
      { feature: "Direct Meta API Rates", aigreentick: true, wati: false },
      { feature: "Priority Chat Support", aigreentick: true, wati: false },
      { feature: "Indian / Local Support", aigreentick: true, wati: true }
    ],
    migration: [
      "Migrate in 24 hours",
      "Keep your number",
      "Move templates",
      "Rebuild leads & flows"
    ]
  };

  const migrationSteps = content.migration.map((text, i) => {
    const iconInfo = getMigColors(i);
    return {
      text,
      icon: getMigIcon(i),
      bg: iconInfo.bg,
      color: iconInfo.color
    };
  });

  const testimonialsRow1 = [
    {
      name: "Robert Fox",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "AI Greentick transformed how we handle customer support. The shared inbox is a game changer for our remote team."
    },
    {
      name: "Jenny Wilson",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Our response rates doubled within the first week. The automated broadcasts allow us to reach thousands instantly."
    },
    {
      name: "Kristin Watson",
      role: "Operations Head",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Finally, a WhatsApp tool that actually works for teams. The analytics help us understand exactly what our customers want."
    }
  ];

  const testimonialsRow2 = [
    {
      name: "Darrell Steward",
      role: "Support Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Highly recommended for any business looking to scale their WhatsApp communication without losing the personal touch."
    },
    {
      name: "Guy Hawkins",
      role: "CEO, TechStart",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "We test and compare the best project management software for collaborating with a team, hitting deadlines."
    },
    {
      name: "Courtney Henry",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "The chatbot builder is incredibly intuitive. We set up our FAQ bot in under an hour without any coding knowledge."
    }
  ];

  const getMigIcon = (index: number) => {
    switch (index) {
      case 0: return Clock;
      case 1: return Phone;
      case 2: return FileText;
      default: return Layers;
    }
  };

  const getMigColors = (index: number) => {
    switch (index) {
      case 0: return { color: "text-blue-500", bg: "bg-blue-50" };
      case 1: return { color: "text-brand-600", bg: "bg-brand-50" };
      case 2: return { color: "text-amber-500", bg: "bg-amber-50" };
      default: return { color: "text-purple-600", bg: "bg-purple-50" };
    }
  };

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* --- SECTION 1: HERO --- */}
      <section id="compare-hero" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold tracking-widest uppercase mb-6 border border-brand-100">
            {content.hero.badge || 'Comparison'}
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight max-w-4xl mx-auto">
            {content.hero.title}
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Try AI Greentick Free <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 hover:border-brand-200 hover:text-brand-600 px-8 py-3.5 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: OVERVIEW --- */}
      <section id="compare-overview" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
             <div className="flex-1">
                <h2 className="text-[24px] md:text-[42px] leading-tight font-bold text-slate-900 mb-6">
                  {content.overview.title}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {content.overview.desc}
                </p>
             </div>
             <div className="flex-1 w-full">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-6">AI Greentick Highlights</h3>
                   <div className="grid sm:grid-cols-2 gap-4">
                       {content.overview.highlights.map((item, i) => (
                         <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                            <span className="text-slate-700 font-medium">{item}</span>
                         </div>
                       ))}
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: KEY DIFFERENCES --- */}
      <section id="compare-key-differences" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[24px] md:text-[42px] font-bold text-slate-900 mb-4">
              Key <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Differences</span> at a Glance
            </h2>
            <p className="text-lg text-slate-600">Why businesses are choosing AI Greentick over WATI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {content.differences.map((item, i) => {
               const getDiffIcon = (title: string) => {
                 const t = title.toLowerCase();
                 if (t.includes('simplicity') || t.includes('use')) return LayoutGrid;
                 if (t.includes('automation') || t.includes('zap') || t.includes('capabilities')) return Zap;
                 if (t.includes('inbox') || t.includes('team') || t.includes('shared')) return Users;
                 if (t.includes('pricing') || t.includes('value') || t.includes('cost')) return DollarSign;
                 if (t.includes('local') || t.includes('market') || t.includes('global')) return Globe;
                 return LayoutGrid;
               };
               const getDiffColors = (index: number) => {
                 switch (index % 5) {
                   case 0: return "bg-blue-50 text-blue-600";
                   case 1: return "bg-amber-50 text-amber-600";
                   case 2: return "bg-green-50 text-green-600";
                   case 3: return "bg-purple-50 text-purple-600";
                   default: return "bg-rose-50 text-rose-600";
                 }
               };
               const Icon = getDiffIcon(item.title);
               return (
                 <div key={i} className="p-8 border border-slate-100 rounded-3xl hover:shadow-lg transition-shadow bg-white">
                    <div className={`w-12 h-12 rounded-xl ${getDiffColors(i)} flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: COMPARISON TABLE --- */}
      <section id="compare-table" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[36px] font-bold text-slate-900">
              Feature <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Comparison</span>
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 p-6 border-b border-slate-200 text-sm font-bold text-slate-500 uppercase tracking-wider">
               <div>Feature</div>
               <div className="text-center text-brand-600">AI Greentick</div>
               <div className="text-center text-slate-900">WATI</div>
            </div>
            
            {content.comparisonGrid.map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors items-center">
                 <div className="font-semibold text-slate-900 text-sm md:text-base">{row.feature}</div>
                 <div className="text-center flex justify-center items-center gap-2">
                    {row.aigreentick ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span className="font-bold text-slate-800 text-sm md:text-base">{row.aigreentick ? "Yes" : "No"}</span>
                 </div>
                 <div className="text-center flex justify-center items-center gap-2">
                    {row.wati ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span className="text-slate-600 text-sm md:text-base">{row.wati ? "Yes" : "No"}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: VALUE & PRICING --- */}
      <section id="compare-value" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-[24px] md:text-[42px] font-bold text-slate-900">
               <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Value</span> for Money
             </h2>
           </div>

           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* AI Greentick Card */}
              <div className="bg-[#F0FDF4] border border-green-200 rounded-3xl p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">BEST VALUE</div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white"><Check className="w-5 h-5" /></div>
                    AI Greentick
                 </h3>
                 <ul className="space-y-4">
                    {["Lower cost", "All core features included", "Affordable for small teams", "No hidden fees"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-slate-700 font-medium">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>

              {/* WATI Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 opacity-90">
                 <h3 className="text-2xl font-bold text-slate-900 mb-6 text-slate-400 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-300 flex items-center justify-center text-white font-serif">W</div>
                    WATI
                 </h3>
                 <ul className="space-y-4">
                    {["More expensive plans", "Additional charges for certain features", "Not as flexible for small businesses", "Complex tiered pricing"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500"><X className="w-3 h-3" /></div>
                          <span className="text-slate-500">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION 6: BEST FOR --- */}
      <section id="compare-best-for" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-[24px] md:text-[36px] font-bold mb-8">
                   Who Each Platform Is <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Best For</span>
                 </h2>
                 
                 <div className="mb-10">
                    <h3 className="text-xl font-bold text-brand-400 mb-3 flex items-center gap-2">
                       <CheckCircle2 className="w-5 h-5" /> AI Greentick is best for:
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed border-l-2 border-brand-500/30 pl-4">
                       Ecommerce brands, coaching institutes, real estate, agencies and businesses needing automation + a team inbox.
                    </p>
                 </div>

                 <div>
                    <h3 className="text-xl font-bold text-slate-400 mb-3">WATI is best for:</h3>
                    <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-slate-700 pl-4">
                       Businesses that need basic broadcast and chatbot functionality without heavy team workflows.
                    </p>
                 </div>
              </div>
              <div className="hidden md:flex justify-center">
                 <div className="w-80 h-80 bg-brand-500/10 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-brand-500/20 rounded-full animate-ping-slow"></div>
                    <div className="w-64 h-64 bg-brand-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand-500/30">
                       <div className="text-center">
                          <div className="text-4xl font-bold text-white mb-1">98%</div>
                          <div className="text-brand-200 text-sm uppercase tracking-widest">Satisfaction</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION 7: MIGRATION --- */}
      <section id="compare-migration" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-6">
              <Repeat className="w-8 h-8" />
           </div>
           <h2 className="text-[24px] md:text-[42px] font-bold text-slate-900 mb-4">
             <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Switching</span> From WATI to AI Greentick
           </h2>
           <p className="text-lg text-slate-600 mb-12">
              Our team helps you migrate safely without losing templates or customer data.
           </p>

           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
              {migrationSteps.map((step, i) => (
                <div key={i} className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-500/5 transition-all flex flex-col items-center text-center gap-4">
                   <div className={`w-12 h-12 ${step.bg} ${step.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      <step.icon className="w-6 h-6" />
                   </div>
                   <span className="font-bold text-slate-800 text-sm leading-tight">{step.text}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- SECTION 8: TESTIMONIALS (MARQUEE) --- */}
      <section id="compare-testimonials" className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
           <h2 className="text-[24px] md:text-[42px] font-bold text-slate-900 text-center">
             Why Businesses <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Switched</span>
           </h2>
        </div>
           
        <div className="relative w-full space-y-8">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            {/* Row 1: Left to Right */}
            <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
                {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((item, index) => (
                    <div key={`row1-${index}`} className="w-[400px] flex-shrink-0">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-14 h-14 rounded-full object-cover shrink-0" 
                                />
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

            {/* Row 2: Right to Left */}
            <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused]">
                {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((item, index) => (
                    <div key={`row2-${index}`} className="w-[400px] flex-shrink-0">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-14 h-14 rounded-full object-cover shrink-0" 
                                />
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
        </div>

        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-25%); }
            }
            @keyframes marquee-reverse {
                0% { transform: translateX(-25%); }
                100% { transform: translateX(0); }
            }
            .animate-marquee {
                animation: marquee 40s linear infinite;
            }
            .animate-marquee-reverse {
                animation: marquee-reverse 40s linear infinite;
            }
        `}</style>
      </section>

      {/* --- SECTION 9: FINAL CTA --- */}
      <section id="compare-cta-final" className="py-24 bg-white text-center border-t border-slate-200">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
              Switch to a <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Simpler, Faster</span> Platform
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Try AI Greentick and see the difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600 px-10 py-4 rounded-xl text-lg font-bold transition-all">
                Book a Demo
              </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default ComparePage;
