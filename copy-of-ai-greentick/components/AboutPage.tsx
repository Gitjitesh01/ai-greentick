import React from 'react';
import { 
  Target, History, Users, Zap, Heart, Shield, Lightbulb, 
  ArrowRight, CheckCircle2, BarChart3, Globe, MessageSquare 
} from 'lucide-react';

interface AboutPageProps {
  data?: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    mission: {
      title: string;
      quote: string;
    };
    story: {
      title: string;
      paragraphs: string[];
    };
    values: { title: string; desc: string }[];
    stats: { label: string; value: string }[];
    cta: {
      title: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
  };
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const defaultContent = {
    hero: {
      badge: 'About AI Greentick',
      title: 'We’re making WhatsApp work for business.',
      subtitle: 'Simplifying communication for teams everywhere. Faster replies, smarter automation, and better customer relationships.'
    },
    mission: {
      title: 'Our Mission',
      quote: 'To empower businesses with simple, powerful WhatsApp tools that automate communication and organize teams — without the complexity.'
    },
    story: {
      title: 'Our Story',
      paragraphs: [
        "It started with a simple observation: WhatsApp is where customers are, but businesses were struggling to keep up. Personal phones, scattered chats, and manual replies just weren't scaling.",
        "We built AI Greentick to solve this. A single platform where teams can manage conversations, automate responses, and grow their business efficiently."
      ]
    },
    values: [
      { title: "Simplicity", desc: "Tools should be easy to use, not complex.", icon: Lightbulb },
      { title: "Customers", desc: "We build for real business needs.", icon: Heart },
      { title: "Transparency", desc: "Honest pricing and clear communication.", icon: Shield },
      { title: "Innovation", desc: "Constantly improving how you chat.", icon: Zap }
    ],
    stats: [
      { label: "Active Businesses", value: "5,000+" },
      { label: "Messages Sent", value: "10M+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Countries", value: "12+" }
    ],
    cta: {
      title: 'Ready to get started?',
      primaryBtn: 'Start Free Trial',
      secondaryBtn: 'Contact Sales'
    }
  };

  const content = {
    hero: {
      badge: data?.hero?.badge || defaultContent.hero.badge,
      title: data?.hero?.title || defaultContent.hero.title,
      subtitle: data?.hero?.subtitle || defaultContent.hero.subtitle,
    },
    mission: {
      title: data?.mission?.title || defaultContent.mission.title,
      quote: data?.mission?.quote || defaultContent.mission.quote,
    },
    story: {
      title: data?.story?.title || defaultContent.story.title,
      paragraphs: data?.story?.paragraphs || defaultContent.story.paragraphs,
    },
    values: data?.values || defaultContent.values,
    stats: data?.stats || defaultContent.stats,
    cta: {
      title: data?.cta?.title || defaultContent.cta.title,
      primaryBtn: data?.cta?.primaryBtn || defaultContent.cta.primaryBtn,
      secondaryBtn: data?.cta?.secondaryBtn || defaultContent.cta.secondaryBtn,
    }
  };

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'simplicity': return Lightbulb;
      case 'customers': return Heart;
      case 'transparency': return Shield;
      case 'innovation': return Zap;
      default: return Lightbulb;
    }
  };

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="py-20 lg:py-32 max-w-5xl mx-auto px-6 text-center">
        <span className="text-[#01B84B] font-semibold tracking-wider text-sm uppercase mb-6 block">{content.hero.badge}</span>
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-slate-900">
          {content.hero.title}
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          {content.hero.subtitle}
        </p>
      </section>

      {/* --- MISSION SECTION (Lite) --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-sm border border-slate-100">
            <Target className="w-8 h-8 text-[#01B84B]" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-slate-900">{content.mission.title}</h2>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
            "{content.mission.quote}"
          </p>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100 relative">
               <History className="w-10 h-10 text-slate-300 absolute top-6 right-6" />
               <div className="space-y-4 opacity-50">
                  <div className="h-3 w-1/3 bg-slate-300 rounded-full"></div>
                  <div className="h-3 w-2/3 bg-slate-300 rounded-full"></div>
                  <div className="h-3 w-1/2 bg-slate-300 rounded-full"></div>
               </div>
               <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="text-slate-500 font-medium">Founded in 2023</p>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">{content.story.title}</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              {content.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION (Lite Cards) --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">What We Value</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">The core principles that guide every product we build.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((value, i) => {
              const ValueIcon = getIcon(value.title);
              return (
                <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#01B84B]/30 transition-colors group">
                  <ValueIcon className="w-8 h-8 text-slate-400 group-hover:text-[#01B84B] mb-6 transition-colors" />
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- IMPACT SECTION (Minimal) --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {content.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-[#01B84B] mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-white text-center">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-slate-900">{content.cta.title}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#01B84B] hover:bg-[#01933c] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-green-500/20">
                {content.cta.primaryBtn}
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 hover:border-slate-300 px-8 py-4 rounded-xl text-lg font-bold transition-all">
                {content.cta.secondaryBtn}
              </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default AboutPage;
