
import React from 'react';
import { 
  ArrowRight, Heart, Zap, Shield, Users, Globe, Briefcase, 
  Code, Layout, Phone, MessageSquare, CheckCircle2, Lightbulb, User, Headphones
} from 'lucide-react';

interface CareersPageProps {
  data?: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
    culture: {
      title: string;
      desc: string;
      bulletPoints: string[];
    };
    values: { title: string; desc: string }[];
    roles: { title: string; type: string; loc: string; desc: string }[];
    process: { step: string; title: string; desc: string }[];
    benefits: string[];
    faqs: { q: string; a: string }[];
    cta: {
      title: string;
      desc: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
    lifeAt?: {
      desc: string;
    };
  };
}

const CareersPage: React.FC<CareersPageProps> = ({ data }) => {
  const content = data || {
    hero: {
      badge: 'CAREERS',
      title: 'Join Us in Building the Future of WhatsApp Automation',
      subtitle: "At AI Greentick, we’re creating tools that help thousands of businesses communicate better. If you're passionate about product, technology and customer experience — you’ll feel right at home here.",
      primaryBtn: 'View Open Roles',
      secondaryBtn: 'Connect With HR'
    },
    culture: {
      title: 'A Culture Built on Innovation, Ownership & Growth',
      desc: 'We believe great products come from teams who feel empowered, trusted and encouraged to experiment. Everyone at AI Greentick contributes ideas, solves problems and builds with purpose.',
      bulletPoints: [
        "Remote friendly team",
        "Fast paced and collaborative",
        "Ownership over your work",
        "Transparent communication"
      ]
    },
    values: [
      { title: "Simplicity", desc: "We turn complex communication problems into easy solutions." },
      { title: "Customer Focus", desc: "We build tools that solve real problems for real teams." },
      { title: "Innovation", desc: "We move fast, iterate quickly and embrace new ideas." },
      { title: "Integrity", desc: "Honesty, trust and clarity in everything we do." }
    ],
    roles: [
      { title: "Software Engineer (Backend)", type: "Full time", loc: "Remote / On site", desc: "Build scalable backend services and integrations powering WhatsApp automation." },
      { title: "Frontend Developer", type: "Full time", loc: "Remote / On site", desc: "Help create seamless user experiences across our dashboard." },
      { title: "Product Designer", type: "Full time", loc: "Remote / On site", desc: "Design intuitive workflows and UI for teams using the platform daily." },
      { title: "Sales Executive", type: "Full time", loc: "On site / Hybrid", desc: "Manage demos, client onboarding and product walkthroughs." },
      { title: "Customer Support Specialist", type: "Full time", loc: "Remote / On site", desc: "Assist customers with onboarding, troubleshooting and success workflows." }
    ],
    process: [
      { step: "1", title: "Review", desc: "Application & Portfolio Check" },
      { step: "2", title: "Intro", desc: "Quick Goal Alignment Call" },
      { step: "3", title: "Task", desc: "Small Assessment" },
      { step: "4", title: "Technical", "desc": "Functional Discussion" },
      { step: "5", title: "Culture", desc: "Founder / Leadership Chat" },
      { step: "6", title: "Offer", desc: "Welcome to the Team!" }
    ],
    benefits: [
      "Competitive salaries",
      "Remote friendly environment",
      "Flexible hours",
      "Learning & upskilling opportunities",
      "Ownership of impactful work",
      "Fast career growth in a scaling SaaS company"
    ],
    faqs: [
      { q: "Do you hire remotely?", a: "Yes, many of our roles are remote friendly." },
      { q: "Do you require degrees or certifications?", a: "No. Skills, attitude and problem solving matter more." },
      { q: "How long does the hiring process take?", a: "Usually between 1 to 3 weeks, depending on the role." },
      { q: "Can I apply for multiple positions?", a: "Yes, feel free to apply for any relevant role." }
    ],
    cta: {
      title: 'Ready to Build Something Meaningful?',
      desc: "If you're passionate about creating modern communication tools and want to be part of a fast growing SaaS team, we’d love to meet you.",
      primaryBtn: 'View Open Roles',
      secondaryBtn: 'Connect With HR'
    },
    lifeAt: {
      desc: "We work hard, play hard, and always push the boundaries of what's possible in the WhatsApp automation space."
    }
  };

  const getValIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'simplicity': return Lightbulb;
      case 'customer focus':
      case 'customer': return Heart;
      case 'innovation': return Zap;
      case 'integrity': return Shield;
      default: return Lightbulb;
    }
  };

  const getRoleIcon = (title: string) => {
    if (title.toLowerCase().includes('engineer') || title.toLowerCase().includes('developer') || title.toLowerCase().includes('backend') || title.toLowerCase().includes('frontend')) {
      return Code;
    }
    if (title.toLowerCase().includes('designer') || title.toLowerCase().includes('product designer') || title.toLowerCase().includes('ux')) {
      return Zap;
    }
    if (title.toLowerCase().includes('sales') || title.toLowerCase().includes('executive') || title.toLowerCase().includes('marketing')) {
      return Briefcase;
    }
    return Headphones;
  };

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* --- SECTION 1: HERO --- */}
      <section id="careers-hero" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-brand-400 font-bold tracking-widest text-xs uppercase mb-4 block">{content.hero.badge || 'CAREERS'}</span>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            {content.hero.title}
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-1">
              {content.hero.primaryBtn}
            </button>
            <button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-3.5 rounded-full text-base font-semibold transition-all backdrop-blur-sm">
              {content.hero.secondaryBtn}
            </button>
          </div>
        </div>
      </section>
 
      {/* --- SECTION 2: CULTURE --- */}
      <section id="careers-culture" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
                {content.culture.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {content.culture.desc}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {content.culture.bulletPoints.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-8">
                     <div className="h-40 bg-slate-100 rounded-2xl"></div>
                     <div className="h-56 bg-brand-50 rounded-2xl"></div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-56 bg-blue-50 rounded-2xl"></div>
                     <div className="h-40 bg-slate-100 rounded-2xl"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* --- SECTION 3: VALUES --- */}
      <section id="careers-values" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900">
              The <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Values</span> That Guide Us
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {content.values.map((val, i) => {
              const ValIcon = getValIcon(val.title);
              return (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow text-center">
                  <div className={`w-14 h-14 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <ValIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* --- SECTION 4: LIFE AT AI GREENTICK --- */}
      <section id="careers-life" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
            <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Life</span> at AI Greentick
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
            {content.lifeAt.desc}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
             <div className="col-span-2 row-span-2 bg-slate-100 rounded-3xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">Team Event Photo</div>
             </div>
             <div className="bg-brand-50 rounded-3xl overflow-hidden relative"></div>
             <div className="bg-blue-50 rounded-3xl overflow-hidden relative"></div>
             <div className="bg-purple-50 rounded-3xl overflow-hidden relative"></div>
             <div className="bg-slate-100 rounded-3xl overflow-hidden relative"></div>
          </div>
        </div>
      </section>
 
      {/* --- SECTION 5: OPEN ROLES --- */}
      <section id="careers-roles" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">
              <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Open</span> Positions
            </h2>
            <p className="text-slate-600">We’re always looking for talented and driven people.</p>
          </div>
 
          <div className="space-y-4">
            {content.roles.map((role, i) => {
              const RoleIcon = getRoleIcon(role.title);
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-6 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-brand-600 group-hover:bg-brand-50 transition-colors shrink-0">
                    <RoleIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{role.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {role.type}</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {role.loc}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{role.desc}</p>
                  </div>
                  <button className="px-6 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* --- SECTION 6: HIRING PROCESS --- */}
      <section id="careers-process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900">
              What to Expect in Our <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Hiring Process</span>
            </h2>
          </div>
          
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {content.process.map((item, i) => (
                <div key={i} className="text-center bg-white p-4">
                  <div className="w-10 h-10 bg-brand-50 text-brand-600 font-bold rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm ring-1 ring-slate-100">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* --- SECTION 7: BENEFITS --- */}
      <section id="careers-benefits" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold mb-8">
                <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Benefits</span> of Working With Us
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {content.benefits.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
               <div className="bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-md flex items-center justify-center h-64 text-slate-400">
                  Benefits Illustration
               </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* --- SECTION 8: FAQS --- */}
      <section id="careers-faqs" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {content.faqs.map((faq, i) => (
              <div key={i}>
                <h4 className="font-bold text-slate-900 mb-2 text-lg">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* --- SECTION 9: FINAL CTA --- */}
      <section id="careers-cta-final" className="py-24 bg-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
              {content.cta.title}
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              {content.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105">
                {content.cta.primaryBtn}
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600 px-10 py-4 rounded-xl text-lg font-bold transition-all">
                {content.cta.secondaryBtn}
              </button>
            </div>
         </div>
      </section>
 
    </div>
  );
};
 
export default CareersPage;
