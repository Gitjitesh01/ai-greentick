import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, Send, Zap, BarChart3, CheckCircle2, 
  Play, Layers, Megaphone, Globe, MessageSquare, Calendar, CreditCard, MousePointer, Bot, Bell, ChevronDown, ChevronUp, ShieldCheck, UserCheck, Phone, Share2
} from 'lucide-react';

interface BroadcastsPageProps {
  data?: {
    hero: {
      title: string;
      desc: string;
      primaryCta: string;
      secondaryCta: string;
      badgeText: string;
      deliveryText: string;
    };
    smartAutomation: {
      badge: string;
      title: string;
      desc: string;
      items: string[];
      buttonText: string;
    };
    features: { title: string; desc: string }[];
    faqs: { q: string; a: string }[];
    ctaFinal: {
      title: string;
      desc: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
}

const BroadcastsPage: React.FC<BroadcastsPageProps> = ({ data }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  // Implement SEO Metadata
  useEffect(() => {
    document.title = "WhatsApp Broadcasts | Send Bulk WhatsApp Campaigns with AI Greentick";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Send high delivery WhatsApp broadcasts with segmentation, personalization and real time analytics. Reach thousands instantly using AI Greentick’s official WhatsApp Business API platform.");
    }
  }, []);

  const logos = [
    { name: "Dell", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png", h: "h-8" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png", h: "h-8" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", h: "h-8" },
    { name: "VMware", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/2560px-Vmware.svg.png", h: "h-6" },
    { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png", h: "h-8" },
    { name: "PhonePe", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png", h: "h-10" },
  ];

  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  const content = data || {
    hero: {
      title: 'Send High Delivery\nWhatsApp Campaigns',
      desc: "Reach thousands instantly with personalised WhatsApp broadcasts equipped with interactive buttons (e.g. 'Call Now', 'Visit Website'). Promote offers, send reminders, share updates and drive conversions with better delivery.",
      primaryCta: 'Start Sending Broadcasts',
      secondaryCta: 'Book a Demo',
      badgeText: 'Campaign Sent!',
      deliveryText: '98% Delivery Rate'
    },
    smartAutomation: {
      badge: 'Smart Automation',
      title: "Don't Let Broadcast Replies Overwhelm You",
      desc: 'Sending a campaign to 5,000 customers? You might get hundreds of replies in minutes. Instead of manual handling, let our AI Chatbot instantly answer FAQs, qualify leads, and schedule appointments 24/7.',
      items: [
        'Auto-reply to common questions (Price, Location, etc.)',
        'Qualify interested leads before human handover',
        'Book meetings or collect details automatically'
      ],
      buttonText: 'Explore Chatbot Builder'
    },
    features: [
      { title: "Higher Engagement Rates", desc: "90%+ open rates vs 20% email marketing" },
      { title: "Cost-Effective", desc: "Lower cost per message than SMS or email" },
      { title: "Global Reach", desc: "Reach customers in 180+ countries" },
      { title: "Compliance Guaranteed", desc: "Official WhatsApp Business API ensures compliance" },
      { title: "Interactive Buttons", desc: "Add 'Call Now', 'Visit Website' or 'Quick Reply' buttons to boost click-through rates." },
      { title: "Reduced Efforts", desc: "Automate sales & support on WhatsApp with a chatbot, saving your team time and effort." }
    ],
    faqs: [
      { q: "Is there a limit on how many messages I can send?", a: "The daily message limit depends on your WhatsApp Business API tier. It typically starts at 1,000 customers per day and scales to 10k, 100k, and unlimited as you maintain a good quality score." },
      { q: "Do I need to get templates approved before sending?", a: "Yes, WhatsApp requires template approval for business-initiated messages (broadcasts) to prevent spam. AI Greentick helps you create and submit templates for quick approval." },
      { q: "Can I import contacts from Excel or CSV?", a: "Absolutely. You can import contacts via CSV or Excel files. You can also segment them using tags (e.g., 'New Customer', 'VIP') for targeted campaigns." },
      { q: "Does AI Greentick support media in broadcasts?", a: "Yes! You can send images, videos, PDFs, and documents in your broadcast campaigns to make them more engaging." },
      { q: "How do I track campaign performance?", a: "Our dashboard provides real-time analytics including Sent, Delivered, Read, and Replied rates. You can also track button clicks if your template includes interactive buttons." }
    ],
    ctaFinal: {
      title: 'Start Sending Smarter Broadcasts',
      desc: 'Join thousands of businesses engaging their customers on WhatsApp with AI Greentick.',
      primaryCta: 'Start Free Trial',
      secondaryCta: 'Book a Demo'
    }
  };

  const getFeatureIcon = (index: number) => {
    switch (index % 6) {
      case 0: return Share2;
      case 1: return ShieldCheck;
      case 2: return UserCheck;
      case 3: return Globe;
      case 4: return MousePointer;
      default: return Calendar;
    }
  };

  const getFeatureColors = (index: number) => {
    switch (index % 6) {
      case 0: return "text-yellow-500";
      case 1: return "text-red-500";
      case 2: return "text-purple-600";
      case 3: return "text-emerald-500";
      case 4: return "text-blue-500";
      default: return "text-orange-500";
    }
  };

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* --- SECTION 1: HERO --- */}
      <section id="broadcasts-hero" className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-slate-50/50 skew-x-12 transform origin-top translate-x-32 -z-10 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                {content.hero.title.split('\n')[0]} <br />
                {content.hero.title.split('\n')[1] || 'WhatsApp Campaigns'}
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {content.hero.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#01B84B] hover:bg-[#01933c] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-green-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2">
                  {content.hero.primaryCta} <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white border border-slate-200 text-slate-800 hover:border-slate-300 px-8 py-4 rounded-full text-base font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm">
                  <Play className="w-4 h-4 fill-current" /> {content.hero.secondaryCta}
                </button>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="flex-1 w-full relative max-w-xl lg:max-w-2xl mt-12 lg:mt-0 flex justify-center lg:justify-end">
               <div className="relative">
                   {/* Main Image (Woman) */}
                   <div className="relative z-10 rounded-full circle-mask">
                       <img 
                          src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                          alt="Happy Marketer" 
                          className="w-auto h-[460px] object-cover mask-image-blob" 
                          style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
                       />
                   </div>

                   {/* Floating Chat Interface 1 (Main Broadcast) */}
                   <div className="absolute top-0 -left-4 lg:-left-24 bg-white p-4 rounded-3xl rounded-bl-none shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 z-20 w-[280px] sm:w-[320px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                      {/* Chat Header */}
                      <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                          <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs">F</div>
                              <div>
                                 <div className="text-xs font-bold text-slate-900 flex items-center gap-1">F Store.com <CheckCircle2 className="w-3 h-3 text-blue-500 fill-white" /></div>
                              </div>
                          </div>
                          <div className="text-[10px] text-slate-400">11:26</div>
                      </div>
                      
                      {/* Message Bubble */}
                      <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tl-none text-xs text-slate-800 leading-relaxed mb-2 relative">
                          <p className="font-bold mb-1">Super Flash Sale! ⚡️</p>
                          <p>Don't miss out Tommy. Today, you can get discounts of up to 50% on all products at 5 PM. Mark it on your calendar.</p>
                          <div className="text-[9px] text-slate-500 text-right mt-1 flex items-center justify-end gap-1">11:26 <span className="text-blue-500">✓✓</span></div>
                      </div>

                      {/* Reply Bubble */}
                      <div className="bg-white border border-slate-100 p-2 rounded-lg text-xs text-slate-600 mb-2 shadow-sm">
                          Wow, this is great! Thank you, I'll mark it.
                      </div>
                      
                      {/* Interactive Buttons Group */}
                      <div className="flex flex-col gap-1.5 mt-2">
                          <button className="w-full bg-white border border-slate-200 text-blue-600 font-semibold text-xs py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                              <Globe className="w-3.5 h-3.5" /> Visit Website
                          </button>
                          <button className="w-full bg-white border border-slate-200 text-blue-600 font-semibold text-xs py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                              <Phone className="w-3.5 h-3.5" /> Call Now
                          </button>
                      </div>
                   </div>

                   {/* Floating Notification Element */}
                   <div className="absolute bottom-20 -left-8 lg:-left-16 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 z-30 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-1000 delay-500">
                       <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                           <Send className="w-5 h-5" />
                       </div>
                       <div>
                           <p className="text-xs font-bold text-slate-900">{content.hero.badgeText}</p>
                           <p className="text-[10px] text-slate-500">{content.hero.deliveryText}</p>
                       </div>
                   </div>

                   {/* Decorative Blob */}
                   <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100/50 to-green-100/50 rounded-full blur-3xl opacity-60"></div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 1.5: SOCIAL PROOF --- */}
      <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
            <h2 className="text-[24px] font-bold text-slate-900 mb-4">
              <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform rotate-1 shadow-sm">Trusted</span> by Agencies, D2C Brands and Service Companies
            </h2>
            <p className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed">
            From early stage startups to established brands, teams use AI Greentick to manage WhatsApp conversations at scale.
            </p>
        </div>

        <div className="relative w-full overflow-hidden">
            {/* Gradient Masks for fading edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Marquee Container */}
            <div className="flex w-max animate-marquee items-center">
                {marqueeLogos.map((logo, index) => (
                <div key={index} className="mx-8 md:mx-12">
                    <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className={`${logo.h} w-auto object-contain max-w-[140px]`}
                    />
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

      {/* --- SECTION 1.75: NEW FEATURES GRID --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row: 2 Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Import Card */}
                <div className="border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-300 group">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Import & <span className="text-[#01B84B]">Broadcast</span> Instantly</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">Send WhatsApp Campaigns to all your contacts in seconds without getting blocked.</p>
                    <div className="bg-[#E8F5E9] rounded-2xl p-6 h-64 relative overflow-hidden flex flex-col justify-end border border-[#C8E6C9]">
                        {/* Mock Dashboard UI */}
                        <div className="bg-white rounded-t-xl shadow-lg p-4 w-full h-[90%] relative transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex gap-2 mb-4 border-b border-slate-100 pb-2">
                                <div className="h-2 w-2 rounded-full bg-red-400"></div>
                                <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-8 bg-slate-50 rounded border border-slate-100 w-full mb-4"></div>
                                <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50">
                                    <div className="w-8 h-8 text-green-500 mb-1"><Layers className="w-full h-full" /></div>
                                    <div className="h-2 w-20 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            {/* CSV Icon */}
                            <div className="absolute bottom-4 right-4 bg-green-100 p-2 rounded-lg text-green-700 font-bold text-xs border border-green-200">CSV</div>
                        </div>
                    </div>
                </div>

                {/* Payments Card */}
                <div className="border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-300 group">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Collect <span className="text-[#01B84B]">Payments</span> On WhatsApp</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">Yes, collect payments seamlessly on WhatsApp via WhatsApp Pay, UPI, Net banking and cards.</p>
                    <div className="bg-[#F3E8FF] rounded-2xl p-6 h-64 relative overflow-hidden flex flex-col justify-end border border-[#E9D5FF]">
                        {/* Mock Chat UI */}
                        <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-[320px] mx-auto relative transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">AB</div>
                                <div>
                                    <div className="h-2 w-24 bg-slate-800 rounded mb-1"></div>
                                    <div className="h-2 w-16 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                                <div className="text-xs text-slate-500 mb-1">Headway 225 Headphones</div>
                                <div className="text-lg font-bold text-slate-900">₹1,500.00</div>
                                <div className="text-[10px] text-green-600 font-medium">Paid with UPI</div>
                            </div>
                            <button className="w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-lg">Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: 3 Cards */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Ads Card */}
                <div className="border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Run <span className="text-[#01B84B]">Click to WhatsApp Ads</span></h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Create ads that click directly to WhatsApp, capture leads instantly, and boost conversions.</p>
                        <p className="text-xs text-slate-505 font-medium">See 3-5X more leads & slash your cost per lead.</p>
                    </div>
                    <div className="mt-auto bg-slate-50 rounded-2xl h-64 relative overflow-hidden flex items-end justify-center border border-slate-100">
                        {/* Mock Mobile Ad */}
                        <div className="w-[80%] h-[90%] bg-white rounded-t-2xl shadow-xl border border-slate-200 relative p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                                <div className="h-2 w-20 bg-slate-200 rounded"></div>
                            </div>
                            <div className="bg-slate-100 h-24 rounded-lg mb-2 flex items-center justify-center text-slate-300">Ad Visual</div>
                            <div className="bg-green-50 text-green-700 text-[10px] font-bold py-1.5 px-3 rounded text-center border border-green-100 flex items-center justify-center gap-1">
                                <MessageSquare className="w-3 h-3" /> WhatsApp
                            </div>
                        </div>
                        <div className="absolute top-1/2 -right-4 w-12 h-12 bg-white rounded-full shadow-lg z-10 flex items-center justify-center text-blue-500">
                            <MousePointer className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Chatbots Card */}
                <div className="border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Build <span className="text-[#01B84B]">No-code WhatsApp Chatbots</span> in Minutes</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Build no-code chatbots that drive sales, answer up to 85% queries effectively and qualify leads while you sleep.</p>
                    </div>
                    <div className="mt-auto bg-slate-50 rounded-2xl h-64 relative overflow-hidden flex items-end justify-center border border-slate-100">
                        {/* Mock Phone Chatbot */}
                        <div className="w-[80%] h-[90%] bg-white rounded-t-2xl shadow-xl border border-slate-200 relative p-3 space-y-2">
                            <div className="flex justify-start"><div className="bg-slate-100 p-2 rounded-lg rounded-tl-none text-[8px] text-slate-600 max-w-[80%]">Welcome to Urban Studioz! Select an option below.</div></div>
                            <div className="flex flex-col gap-1">
                                <div className="bg-white border border-blue-100 text-blue-600 text-[8px] font-bold p-1.5 rounded text-center">Track Order</div>
                                <div className="bg-white border border-blue-100 text-blue-600 text-[8px] font-bold p-1.5 rounded text-center">Talk to Agent</div>
                            </div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                <Bot className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications Card */}
                <div className="border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Send <span className="text-[#01B84B]">Automated</span> CTA Based Notifications</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Trigger automated messages for abandoned carts, order updates, or exclusive offers. Connect your CRM or eCommerce store like Shopify, WooCommerce & more</p>
                    </div>
                    <div className="mt-auto bg-[#FFF7ED] rounded-2xl h-64 relative overflow-hidden flex items-end justify-center border border-orange-100">
                        {/* Mock Notification */}
                        <div className="w-[80%] h-[90%] bg-white rounded-t-2xl shadow-xl border border-slate-200 relative p-3">
                            <div className="bg-orange-50 text-orange-600 text-[8px] font-bold px-2 py-1 rounded-full inline-block mb-2">Abandoned Cart Flow</div>
                            <div className="text-[9px] text-slate-600 mb-2 leading-relaxed">
                                <strong>Hey Samantha 👋</strong><br/>
                                Pickup where you left? 🛒 Continue shopping or check out with the items in your cart.
                            </div>
                            <button className="w-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-bold py-1.5 rounded mb-1">Go to Cart</button>
                            <button className="w-full bg-slate-50 text-slate-600 border border-slate-100 text-[9px] font-bold py-1.5 rounded">Contact Support</button>
                            
                            <div className="absolute -right-2 top-10 w-8 h-8 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center">
                                <Bell className="w-4 h-4 text-orange-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 3: FEATURES GRID --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
              Why Choose <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform -rotate-1 shadow-sm">GreenTick</span> Broadcasting?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Powerful broadcasting tools that ensure your messages reach the right audience at the right time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feat, i) => {
              const Icon = getFeatureIcon(i);
              const color = getFeatureColors(i);
              return (
                <div key={i} className="p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all text-left group">
                  <div className="mb-6"><Icon className={`w-10 h-10 ${color} group-hover:scale-110 transition-transform`} /></div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{feat.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION 3.2: AI CHATBOT INTEGRATION --- */}
      <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6">
                <Bot className="w-3 h-3" /> {content.smartAutomation.badge}
              </div>
              <h2 className="text-[24px] md:text-5xl font-bold mb-6 leading-tight">
                {content.smartAutomation.title.split(' Overwhelm ')[0]} <br />
                <span className="bg-[#01B84B] text-white px-4 py-1 rounded-2xl inline-block transform rotate-1 shadow-sm">
                  {content.smartAutomation.title.split(' Smart Automation ')[1] || 'Overwhelm You'}
                </span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {content.smartAutomation.desc}
              </p>
              
              <div className="space-y-4 mb-10">
                {content.smartAutomation.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                {content.smartAutomation.buttonText} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual */}
            <div className="flex-1 w-full">
               <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm">
                  {/* Flow Visualization */}
                  <div className="flex flex-col gap-4 relative">
                      {/* Step 1: Broadcast */}
                      <div className="flex justify-end">
                          <div className="bg-[#005c4b] p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-[#007a63]">
                              <p className="text-xs text-brand-100 font-bold mb-1">Broadcast Sent 📢</p>
                              <p className="text-sm text-white">Hey! Our summer sale is live. Want to see the catalog?</p>
                          </div>
                      </div>

                      {/* Step 2: User Reply */}
                      <div className="flex justify-start">
                          <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none max-w-[80%] border border-slate-600">
                              <p className="text-sm text-white">Yes, show me the sneakers.</p>
                          </div>
                      </div>

                      {/* Step 3: Bot Reply */}
                      <div className="flex justify-end">
                          <div className="bg-[#202c33] p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-slate-700 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                              <div className="flex items-center gap-2 mb-2">
                                  <Bot className="w-4 h-4 text-brand-400" />
                                  <span className="text-xs text-brand-400 font-bold">AI Auto-Reply</span>
                              </div>
                              <p className="text-sm text-white mb-3">Here are our top 3 sneakers on sale! 👇</p>
                              <div className="flex gap-2 overflow-x-auto pb-1">
                                  <div className="w-16 h-16 bg-slate-600 rounded-lg shrink-0"></div>
                                  <div className="w-16 h-16 bg-slate-600 rounded-lg shrink-0"></div>
                                  <div className="w-16 h-16 bg-slate-600 rounded-lg shrink-0"></div>
                              </div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3.5: FAQ SECTION --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">
              Frequently Asked <span className="bg-[#01B84B] text-white px-3 py-1 rounded-xl inline-block transform -rotate-1 shadow-sm">Questions</span>
            </h2>
            <p className="text-slate-600">Have questions about sending broadcasts? We've got answers.</p>
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

      {/* --- SECTION 4: CTA --- */}
      <section id="broadcasts-cta-final" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[2.5rem] bg-[#F0FDF4] border border-[#DCFCE7] overflow-hidden px-6 py-16 md:px-20 md:py-24 text-center">
                
                {/* Background Dot Pattern */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(#16a34a 1.5px, transparent 1.5px)', 
                        backgroundSize: '24px 24px' 
                    }}>
                </div>
                
                {/* Gradient Overlay for Fade Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0FDF4]/40 to-[#F0FDF4] pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-6 tracking-tight">
                        {content.ctaFinal.title.split(' Smarter ')[0]} <span className="bg-[#01B84B] text-white px-4 py-1 rounded-2xl inline-block transform rotate-1 shadow-sm">
                          {content.ctaFinal.title.split(' Send ')[1] || 'Smarter'}
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                        {content.ctaFinal.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
                        <button className="bg-[#01B84B] hover:bg-[#01933c] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105">
                            {content.ctaFinal.primaryCta}
                        </button>
                        <button className="bg-white text-slate-700 border border-slate-200 hover:border-green-300 hover:text-green-600 px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-sm">
                            {content.ctaFinal.secondaryCta}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default BroadcastsPage;