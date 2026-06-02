import React from 'react';
import { 
  ArrowRight, Check, Play, ShoppingBag, GraduationCap, Home, Stethoscope, 
  BookOpen, Briefcase, TrendingUp, Megaphone, Headphones, Settings, 
  UserCircle, Zap, MessageCircle, BarChart3, Users, Clock, Calendar, Download, CheckCircle2, Truck, Video, FileText 
} from 'lucide-react';

interface SolutionsPageProps {
  data?: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
    overview: {
      title: string;
      desc: string;
      items: string[];
    };
    industries: { title: string; desc: string }[];
    roles: { role: string; title: string; desc: string; items: string[] }[];
    benefits: { title: string; desc: string }[];
  };
}

const SolutionsPage: React.FC<SolutionsPageProps> = ({ data }) => {
  const content = data || {
    hero: {
      badge: 'SOLUTIONS',
      title: 'WhatsApp Solutions for Every Type of Business',
      subtitle: 'Whether you run an ecommerce brand, a coaching centre, a service agency or a real estate business, AI Greentick helps you automate conversations, increase engagement and stay organised — all through WhatsApp.',
      primaryCta: 'Explore Industry Solutions',
      secondaryCta: 'Book a Demo'
    },
    overview: {
      title: 'Tailored WhatsApp Solutions for Your Industry',
      desc: 'Different businesses use WhatsApp differently — sales conversations, order updates, lead qualification, support chats, class reminders, booking confirmations and more. AI Greentick adapts to the workflows that matter most to your team.',
      items: ['Industry focused automation', 'Role based workflows', 'Easy to customise', 'Built for speed & scale']
    },
    industries: [
      {
        title: "Ecommerce & D2C",
        desc: "Send offers, order updates, abandoned cart reminders and re engagement messages."
      },
      {
        title: "Coaching & Training",
        desc: "Handle enquiries, class reminders, assignment updates, and student support."
      },
      {
        title: "Real Estate",
        desc: "Capture leads, schedule visits, share property details and follow up instantly."
      },
      {
        title: "Healthcare",
        desc: "Appointment confirmations, reminders, reports delivery, patient follow ups."
      },
      {
        title: "Education Institutes",
        desc: "Enquiry handling, fee reminders, attendance alerts, parent communication."
      },
      {
        title: "Agencies",
        desc: "Manage multiple clients, run campaigns, track performance and automate workflows."
      }
    ],
    roles: [
      { role: "Sales", desc: "Lead qualification, follow ups, reminders." },
      { role: "Marketing", desc: "Campaigns, segmentation, broadcasts." },
      { role: "Support", desc: "Shared inbox, automated FAQs." },
      { role: "Operations", desc: "Order tracking, internal updates." },
      { role: "Founders", desc: "Team visibility, analytics, automation." }
    ],
    benefits: [
      { title: "Faster replies, more organised chats" },
      { title: "Automated customer workflows" },
      { title: "Higher sales conversions" },
      { title: "Better support experience" },
      { title: "Unified WhatsApp communication" },
      { title: "Real time analytics for smarter decisions" }
    ]
  };

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* --- SECTION 1: HERO --- */}
      <section id="solutions-hero" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Business Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/50"></div>
        </div>

        {/* Background Gradients (Kept for subtle color pops) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <span className="text-brand-400 font-bold tracking-widest text-xs uppercase mb-4 block">{content.hero.badge}</span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.hero.title.split('\n')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-400">
                  {content.hero.title.split('\n')[1] || 'Every Type of Business'}
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  {content.hero.primaryCta} <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-3.5 rounded-full text-base font-semibold transition-all backdrop-blur-sm flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-current" /> {content.hero.secondaryCta}
                </button>
              </div>
            </div>

            {/* Visual: Industry Icons Grid */}
            <div className="flex-1 w-full max-w-lg lg:max-w-xl">
               <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center animate-bounce-slow z-20 shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>

                  {/* Icon Cards */}
                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-brand-500/50 transition-colors group">
                     <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-3"><ShoppingBag className="w-5 h-5" /></div>
                     <h3 className="font-bold text-white text-sm">Ecommerce</h3>
                     <p className="text-xs text-slate-400 mt-1">Order updates & offers</p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-brand-500/50 transition-colors group">
                     <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-3"><GraduationCap className="w-5 h-5" /></div>
                     <h3 className="font-bold text-white text-sm">Education</h3>
                     <p className="text-xs text-slate-400 mt-1">Class reminders</p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-brand-500/50 transition-colors group">
                     <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center mb-3"><Home className="w-5 h-5" /></div>
                     <h3 className="font-bold text-white text-sm">Real Estate</h3>
                     <p className="text-xs text-slate-400 mt-1">Lead capture</p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-brand-500/50 transition-colors group">
                     <div className="w-10 h-10 bg-brand-50/20 text-brand-400 rounded-lg flex items-center justify-center mb-3"><Briefcase className="w-5 h-5" /></div>
                     <h3 className="font-bold text-white text-sm">Agencies</h3>
                     <p className="text-xs text-slate-400 mt-1">Client management</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: OVERVIEW --- */}
      <section id="solutions-overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
                {content.overview.title.split(':')[0]} <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">
                  {content.overview.title.split(':')[1] || 'Tailored Solutions'}
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {content.overview.desc}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {content.overview.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-brand-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
                <div className="aspect-square max-w-[400px] mx-auto bg-slate-50 rounded-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[80%] h-[80%] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col p-6">
                            <div className="flex-1 space-y-4">
                                <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                                <div className="h-16 bg-brand-50 rounded-lg border border-brand-100 flex items-center justify-center text-brand-600 text-sm font-medium">
                                    Custom Workflow
                                </div>
                                <div className="h-16 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                                    Automated Reply
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: INDUSTRY SOLUTIONS --- */}
      <section id="solutions-industry-grid" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">
              Explore Solutions by <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Industry</span>
            </h2>
            <p className="text-lg text-slate-600">
              Choose your industry to see how WhatsApp can power your sales, support or engagement workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.industries.map((item, idx) => {
              const getIndustryVisuals = (index: number) => {
                switch (index % 6) {
                  case 0: return { bg: "bg-green-50", text: "text-green-700", icon: ShoppingBag, sender: "Urban Trends", msg: "Hey! Your order #4402 has been shipped. Track it now! 📦", cta: "Track Order", ctaIcon: Truck };
                  case 1: return { bg: "bg-blue-50", text: "text-blue-600", icon: GraduationCap, sender: "SkillUp Academy", msg: "Reminder: Your 'Mastering React' class starts in 1 hour. 🎓", cta: "Join Class", ctaIcon: Video };
                  case 2: return { bg: "bg-orange-50", text: "text-orange-600", icon: Home, sender: "Prime Estates", msg: "New 3BHK listed in your preferred area. Want to visit? 🏠", cta: "View Listing", ctaIcon: Home };
                  case 3: return { bg: "bg-teal-50", text: "text-teal-600", icon: Stethoscope, sender: "City Care Clinic", msg: "Your appointment with Dr. Sharma is confirmed for tomorrow. 🩺", cta: "Confirm Visit", ctaIcon: CheckCircle2 };
                  case 4: return { bg: "bg-yellow-50", text: "text-yellow-700", icon: BookOpen, sender: "Greenwood High", msg: "Dear Parent, the annual day schedule has been released. 📅", cta: "View Schedule", ctaIcon: Calendar };
                  default: return { bg: "bg-purple-50", text: "text-purple-600", icon: Briefcase, sender: "GrowthLabs", msg: "Client X's weekly performance report is ready for review. 📈", cta: "Download Report", ctaIcon: Download };
                }
              };
              const style = getIndustryVisuals(idx);
              return (
                <div key={idx} className={`${style.bg} rounded-[2.5rem] p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 group`}>
                  
                  {/* Visual / Mock UI Card */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm w-full max-w-[280px] mx-auto mb-8 relative transform group-hover:scale-105 transition-transform duration-500">
                      {/* Mock Header */}
                      <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center shrink-0`}>
                              <style.icon className={`w-5 h-5 ${style.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">{style.sender}</div>
                              <div className={`text-[10px] ${style.text} flex items-center gap-1 font-medium`}>
                                  Business Account <CheckCircle2 className="w-3 h-3" />
                              </div>
                          </div>
                      </div>
                      {/* Mock Body */}
                      <div className="text-xs text-slate-600 leading-relaxed mb-4 p-2">
                          {style.msg}
                      </div>
                      {/* Mock CTA */}
                      <div className="border border-dashed border-slate-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-slate-50">
                          <style.ctaIcon className={`w-3.5 h-3.5 ${style.text}`} /> {style.cta}
                      </div>
                  </div>

                  {/* Card Content */}
                  <div className="mt-auto">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                          {item.desc}
                      </p>
                      <a href="#" className={`inline-flex items-center text-sm font-bold ${style.text} hover:underline`}>
                          Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ROLE BASED SOLUTIONS GRID --- */}
      <section id="solutions-role-grid" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">
              Explore Solutions by <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Team Role</span>
            </h2>
            <p className="text-lg text-slate-600">
              AI Greentick supports every department — each with its own tools, workflows and automation needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {content.roles.map((item, idx) => {
              const getRoleIcon = (roleName: string) => {
                switch (roleName.toLowerCase()) {
                  case 'sales': return TrendingUp;
                  case 'marketing': return Megaphone;
                  case 'support': return Headphones;
                  case 'operations': return Settings;
                  default: return UserCircle;
                }
              };
              const Icon = getRoleIcon(item.role);
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-xl text-center hover:bg-slate-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.role} Teams</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: KEY BENEFITS --- */}
      <section id="solutions-key-benefits" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold mb-8">
                What You Can <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Achieve</span> With AI Greentick
              </h2>
              <div className="grid gap-6">
                {content.benefits.map((benefit, i) => {
                  const getBenefitIcon = (index: number) => {
                    switch (index % 6) {
                      case 0: return Zap;
                      case 1: return Settings;
                      case 2: return TrendingUp;
                      case 3: return Headphones;
                      case 4: return MessageCircle;
                      default: return BarChart3;
                    }
                  };
                  const Icon = getBenefitIcon(i);
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 w-full">
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  {/* Abstract Graph Visual */}
                  <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-white/10 relative">
                     {[40, 60, 45, 70, 55, 85, 65, 95].map((h, i) => (
                       <div key={i} className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-sm relative group" style={{ height: `${h}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-brand-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}%
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="mt-6 flex justify-between text-brand-200 text-sm">
                     <span>Response Rate</span>
                     <span className="text-white font-bold text-xl">+45%</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: HOW BUSINESSES USE WHATSAPP --- */}
      <section id="solutions-how-businesses-use" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">
              How Businesses Use AI Greentick <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Daily</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lead Management",
                desc: "Capture leads, auto reply based on intent and route them to sales instantly.",
                icon: Users
              },
              {
                title: "Customer Support",
                desc: "Assign chats, add notes and use bots for FAQs.",
                icon: Headphones
              },
              {
                title: "Campaign Marketing",
                desc: "Send promotions, reminders and media rich updates with clear analytics.",
                icon: Megaphone
              },
              {
                title: "Transactional Messaging",
                desc: "Order updates, confirmations, schedules and reminders.",
                icon: Clock
              },
              {
                title: "Customer Retention",
                desc: "Feedback flows, win back campaigns and personalised offers.",
                icon:  ShoppingBag
              }
            ].map((useCase, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-brand-600">
                  <useCase.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{useCase.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{useCase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 7: TESTIMONIALS --- */}
      <section id="solutions-testimonials" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 text-center mb-16">
            Teams From Every Industry <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Trust</span> AI Greentick
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "As a coaching centre, WhatsApp is our main channel. AI Greentick organised everything — enquiries, reminders and student communication.",
                author: "Asha, Centre Director",
                bg: "bg-purple-50",
                border: "border-purple-100"
              },
              {
                quote: "Our ecommerce brand uses WhatsApp for updates & offers. Responses improved drastically.",
                author: "Muskan, Brand Manager",
                bg: "bg-blue-50",
                border: "border-blue-100"
              },
              {
                quote: "Real estate follow ups became easier with automated lead replies and reminders.",
                author: "Pawan, Sales Head",
                bg: "bg-orange-50",
                border: "border-orange-100"
              }
            ].map((t, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${t.border} ${t.bg} relative`}>
                <div className="text-4xl text-slate-300 font-serif absolute top-4 left-6">"</div>
                <p className="text-slate-700 italic mb-6 relative z-10 pt-4 leading-relaxed">
                  {t.quote}
                </p>
                <div className="font-bold text-slate-900 text-sm border-t border-slate-200/50 pt-4">
                  {t.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: FINAL CTA --- */}
      <section id="solutions-cta-final" className="py-24 bg-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
              Find the <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Right Solution</span> for Your Business
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Choose your industry or team role and start building your WhatsApp automation journey with AI Greentick.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600 px-10 py-4 rounded-xl text-lg font-bold transition-all">
                Talk to an Expert
              </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default SolutionsPage;