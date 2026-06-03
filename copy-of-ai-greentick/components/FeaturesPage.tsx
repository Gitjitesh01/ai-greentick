import React, { useEffect, useState, useRef } from 'react';
import { 
  Play, Megaphone, Bot, LayoutGrid, Zap, Loader2, ChevronDown, ChevronUp, 
  Send, Users, BarChart3, CheckCircle2, ShieldCheck, Globe, MousePointer, 
  Smartphone, Layers, MessageSquare, ArrowRight, Sparkles
} from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface FeaturesPageProps {
  data?: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      showcaseText: string;
    };
    ctaFinal: {
      title: string;
      desc: string;
      buttonText: string;
    };
    faqs: { q: string; a: string }[];
  };
  sharedTeamInbox?: {
    hero?: {
      title?: string;
      desc?: string;
    };
    features?: { title: string; desc: string }[];
  };
  aiChatbotBuilder?: {
    hero?: {
      title?: string;
      desc?: string;
    };
    features?: { title: string; desc: string }[];
  };
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ data, sharedTeamInbox, aiChatbotBuilder }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    document.title = "AI Greentick Features | Everything for WhatsApp Marketing";
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  const spotlightMask = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(1, 184, 75, 0.15), transparent 80%)`;

  const defaultContent = {
    hero: {
      badge: 'WhatsApp Marketing Suite 2.0',
      title: 'Everything You Need To\nGrow on WhatsApp',
      subtitle: "Launch campaigns, build automated flows, and manage team workflows at scale with the world's most intuitive official WhatsApp platform.",
      primaryCta: 'Start Free Trial Today',
      secondaryCta: 'Book A Demo',
      showcaseText: 'Interactive Dashboard Preview'
    },
    ctaFinal: {
      title: 'Ready to Win on WhatsApp?',
      desc: 'Join hundreds of growing brands using AI Greentick to simplify their customer communication.',
      buttonText: 'Get Started Now'
    },
    faqs: [
      { q: "Is AI Greentick an official Meta partner?", a: "Yes, AI Greentick uses the official Cloud API provided by Meta to guarantee safe delivery and ensure your number remains secure." },
      { q: "Can we integrate with our CRM like HubSpot or Salesforce?", a: "Absolutely. We offer native integrations and webhook configurations to sync your contacts and chats seamlessly." }
    ]
  };

  const content = {
    hero: {
      badge: data?.hero?.badge || defaultContent.hero.badge,
      title: data?.hero?.title || defaultContent.hero.title,
      subtitle: data?.hero?.subtitle || defaultContent.hero.subtitle,
      primaryCta: data?.hero?.primaryCta || defaultContent.hero.primaryCta,
      secondaryCta: data?.hero?.secondaryCta || defaultContent.hero.secondaryCta,
      showcaseText: data?.hero?.showcaseText || defaultContent.hero.showcaseText,
    },
    ctaFinal: {
      title: data?.ctaFinal?.title || defaultContent.ctaFinal.title,
      desc: data?.ctaFinal?.desc || defaultContent.ctaFinal.desc,
      buttonText: data?.ctaFinal?.buttonText || defaultContent.ctaFinal.buttonText,
    },
    faqs: data?.faqs || defaultContent.faqs
  };

  const defaultInboxContent = {
    hero: {
      title: "One Number, Infinite Team Members",
      desc: "Scale your customer support and sales without sharing physical phones. Our shared team inbox gives everyone a transparent view of all conversations."
    }
  };

  const inboxContent = {
    hero: {
      title: sharedTeamInbox?.hero?.title || sharedTeamInbox?.title || defaultInboxContent.hero.title,
      desc: sharedTeamInbox?.hero?.desc || sharedTeamInbox?.desc || defaultInboxContent.hero.desc
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 z-50">
        <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading AI Suite...</p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans overflow-hidden">
      
      {/* --- HERO SECTION (LIGHT THEME) --- */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        id="features-hero" 
        className="py-24 lg:py-40 bg-white relative overflow-hidden group"
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-50/50 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[120px]" />
        </div>
        
        <style>{`
          @keyframes orb-float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes grid-scroll {
            from { background-position: 0 0; }
            to { background-position: 40px 40px; }
          }
          .animate-orb-float { animation: orb-float 20s ease-in-out infinite; }
          .animate-grid-scroll { animation: grid-scroll 20s linear infinite; }
        `}</style>

        {/* Layer 2: Scrolling Interactive Grid Overlay (Light) */}
        <div className="absolute inset-0 opacity-[0.4] animate-grid-scroll pointer-events-none" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='%23e2e8f0'%3e%3cpath d='M0 .5H40M.5 0V40' /%3e%3c/svg%3e")`,
               backgroundSize: '40px 40px'
             }}>
        </div>

        {/* Layer 3: Mouse Follow Spotlight (Light) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlightMask }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-50 text-brand-600 text-xs font-bold tracking-widest uppercase mb-8 border border-brand-100 shadow-sm">
            <Zap className="w-3 h-3 fill-brand-600" /> {content.hero.badge}
          </div>
          
          <h1 className="text-5xl lg:text-[84px] font-bold mb-8 leading-[1.1] max-w-5xl mx-auto tracking-tight text-slate-900">
            {content.hero.title.split('\n')[0]} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">
              {content.hero.title.split('\n')[1] || 'Grow on WhatsApp'}
            </span>
          </h1>

          <p className="text-lg lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
             {content.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 items-center">
            {/* Primary CTA */}
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              <span>{content.hero.primaryCta}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Book A Demo */}
            <button className="bg-white text-slate-700 border border-slate-200 hover:border-brand-200 hover:text-brand-600 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              <span>{content.hero.secondaryCta}</span>
            </button>
          </div>

          <div className="relative mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white/50 p-3 shadow-2xl backdrop-blur-xl">
             <div className="aspect-[16/9] w-full rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 relative overflow-hidden group border border-slate-100">
                <div className="absolute inset-0 opacity-30 animate-grid-scroll" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20' fill='none' stroke='%23cbd5e1'%3e%3cpath d='M0 .5H20M.5 0V20' /%3e%3c/svg%3e")` }}></div>
                <LayoutGrid className="w-24 h-24 text-slate-300 group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Sparkles className="w-12 h-12 text-brand-500 animate-pulse mb-4" />
                    <span className="text-xs font-bold tracking-widest text-slate-500 uppercase bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-200">
                      {content.hero.showcaseText}
                    </span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE DEEP DIVE: BROADCASTS --- */}
      <section id="feature-broadcasts" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
                <Megaphone className="w-8 h-8" />
              </div>
              <h2 className="text-[24px] lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                High-Volume <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform -rotate-1 shadow-sm">Broadcasts</span> That Actually Deliver
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Reach thousands of customers instantly. AI Greentick uses the official WhatsApp API to ensure your messages bypass spam filters and land directly in the chat.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Personalized variables for every recipient",
                  "Interactive 'Call-to-Action' buttons",
                  "Template management with quick approval",
                  "Detailed analytics: Sent, Delivered, Read, Clicked"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-2 font-bold text-blue-600 group">
                Learn more about campaigns <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-50 rounded-[3rem] p-8 border border-slate-100 flex items-center justify-center min-h-[400px]">
               <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-600"><Send className="w-5 h-5" /></div>
                    <div className="font-bold">Campaign Status</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 w-[92%]"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="text-xs text-slate-400 mb-1">SENT</div>
                        <div className="text-xl font-bold">12,400</div>
                      </div>
                      <div className="p-4 bg-brand-50 rounded-xl">
                        <div className="text-xs text-brand-600 mb-1">READ</div>
                        <div className="text-xl font-bold text-brand-700">92.4%</div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE DEEP DIVE: TEAM INBOX --- */}
      <section id="feature-inbox" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="flex-1">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 text-purple-600">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-[24px] lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                {inboxContent.hero.title.split(',')[0]}, <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform rotate-1 shadow-sm">
                  {inboxContent.hero.title.split(',')[1] || 'Infinite Team Members'}
                </span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {inboxContent.hero.desc}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Assign chats to specific agents automatically",
                  "Add private internal notes for collaboration",
                  "Tag conversations for easy filtering",
                  "Set up automatic out-of-office replies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-white rounded-[3rem] p-8 border border-slate-200 flex items-center justify-center min-h-[400px] shadow-sm">
                <div className="w-full max-w-sm space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${i === 2 ? 'bg-purple-50 border-purple-100 shadow-md' : 'bg-white border-slate-100 opacity-60'}`}>
                      <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-slate-300 rounded mb-2"></div>
                        <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                      </div>
                      {i === 2 && <div className="text-[10px] font-bold text-purple-600 bg-white px-2 py-1 rounded-full shadow-sm">Assigned</div>}
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ALL FEATURES GRID --- */}
      <section id="all-features" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[24px] md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need In <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform -rotate-1 shadow-sm">One Place</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Powerful tools built into a single, unified interface.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Automation", desc: "Trigger personalized events based on customer actions.", color: "text-yellow-500" },
              { icon: Globe, title: "Official API", desc: "Official Meta partner ensuring high compliance and safety.", color: "text-blue-500" },
              { icon: ShieldCheck, title: "Data Security", desc: "Enterprise-grade encryption for all customer data.", color: "text-green-500" },
              { icon: BarChart3, title: "Analytics", desc: "Real-time dashboards for team and campaign performance.", color: "text-purple-500" },
              { icon: Layers, title: "Integrations", desc: "Connect with Shopify, Zapier, Hubspot and more.", color: "text-orange-500" },
              { icon: Smartphone, title: "Mobile App", desc: "Manage your inbox on the go with our dedicated apps.", color: "text-brand-600" }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">
                Frequently Asked <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform -rotate-1 shadow-sm">Questions</span>
              </h2>
              <p className="text-slate-600 font-medium">Have questions about our WhatsApp Marketing Suite? We've got answers.</p>
            </div>
            
            <div className="space-y-4">
              {content.faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-lg">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="p-5 pt-0 bg-white text-slate-600 text-base leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FINAL CTA --- */}
      <section id="features-cta-final" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[4rem] bg-[#F0FDF4] border border-[#DCFCE7] overflow-hidden px-8 py-28 md:px-24 md:py-36 text-center">
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#16a34a 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0FDF4]/40 to-[#F0FDF4] pointer-events-none"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="text-[24px] md:text-[72px] leading-tight font-bold mb-10 tracking-tight text-slate-900">
                      {content.ctaFinal.title.split('?')[0]}<span className="bg-[#01B84B] text-white px-4 py-1 rounded-2xl inline-block transform -rotate-2 shadow-xl">Win</span> <br/> on WhatsApp?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed">{content.ctaFinal.desc}</p>
                    <button className="shiny-cta hover:scale-105 active:scale-95 transition-transform">
                        <span>{content.ctaFinal.buttonText}</span>
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;