import React from 'react';
import { ArrowRight, Send, Layers, Zap, MessageSquare, BarChart3, Bot, ShoppingBag, Database, Webhook, Check, CheckCircle2, Clock, TrendingUp, Filter } from 'lucide-react';

interface FeatureCard {
  title: string;
  desc: string;
}

interface KeyFeaturesProps {
  onNavigate?: (page: 'home' | 'pricing' | 'blog' | 'solutions' | 'about' | 'contact' | 'careers' | 'broadcasts' | 'features' | 'compare') => void;
  data: {
    title: string;
    desc: string;
    features: FeatureCard[];
  };
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ onNavigate, data }) => {
  const title = data?.title || "Everything You Need To Win on WhatsApp";
  const desc = data?.desc || "AI Greentick bundles the key tools your team needs to turn WhatsApp into a serious growth channel.";
  const features = data?.features || [];

  const handleNavigation = (page: 'home' | 'pricing' | 'blog' | 'solutions' | 'about' | 'contact' | 'careers' | 'broadcasts' | 'features' | 'compare', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo(0, 0);
    }
  };

  const renderVisual = (idx: number, titleText: string) => {
    const titleLower = titleText.toLowerCase();
    
    // Broadcasts Visual
    if (idx === 0 || titleLower.includes('broadcast')) {
      return (
        <div className="mt-auto relative h-60 w-full bg-slate-50 border-t border-slate-100 rounded-t-xl overflow-hidden group-hover:bg-brand-50/20 transition-colors">
           <div className="absolute inset-0 flex items-center justify-center pt-6">
              <div className="relative w-64">
                  <div className="absolute -inset-2 bg-slate-900 rounded-[2rem] opacity-5"></div>
                  
                  <div className="bg-[#dcf8c6] p-4 rounded-2xl rounded-tr-sm shadow-sm border border-green-100 mb-3 transform group-hover:-translate-y-2 transition-transform duration-500 relative z-10 ml-auto w-[90%]">
                      <div className="text-[11px] text-slate-800 leading-snug mb-2">
                         Hey Sarah! 👋 Our Summer Sale is finally here. Get <span className="font-bold">40% OFF</span> on your wishlist items!
                      </div>
                      <div className="w-full h-24 bg-white rounded-lg mb-2 overflow-hidden relative border border-green-100">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center opacity-90"></div>
                         <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-[9px] font-medium backdrop-blur-sm">
                            Summer Collection 2024
                         </div>
                      </div>
                      <div className="flex justify-between items-center">
                         <div className="bg-white/80 px-2 py-1 rounded text-[9px] font-bold text-green-800 shadow-sm">Shop Now</div>
                         <div className="flex items-center gap-1">
                            <span className="text-[9px] text-slate-500">10:42 AM</span>
                            <CheckCircle2 className="w-3 h-3 text-[#53bdeb] fill-white" />
                         </div>
                      </div>
                  </div>
                  
                  <div className="absolute -left-2 -bottom-4 bg-white text-slate-900 p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-2 group-hover:-rotate-3 transition-transform duration-500 z-20 border border-slate-100 w-36">
                      <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-slate-700">Campaign Live</span>
                         </div>
                         <span className="text-[9px] text-slate-400">Just now</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <div className="text-[9px] text-slate-400 mb-0.5">Sent</div>
                            <div className="text-xs font-bold text-slate-900">12.5k</div>
                         </div>
                         <div className="bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                            <div className="text-[9px] text-emerald-600 mb-0.5">ROI</div>
                            <div className="text-xs font-bold text-emerald-700">18x</div>
                         </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      );
    }

    // Shared Team Inbox Visual
    if (idx === 1 || titleLower.includes('inbox') || titleLower.includes('shared')) {
      return (
        <div className="mt-auto relative h-60 w-full bg-slate-100 border-t border-slate-200 rounded-t-xl overflow-hidden px-4 pt-4">
           <div className="bg-white w-full h-full rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col overflow-hidden">
              <div className="h-9 border-b border-slate-100 flex items-center px-3 gap-3 bg-white">
                 <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                 </div>
                 <div className="h-4 w-[1px] bg-slate-100"></div>
                 <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <Filter className="w-2.5 h-2.5 text-slate-400" />
                    <span className="text-[9px] font-medium text-slate-500">Unassigned</span>
                 </div>
                 <div className="ml-auto flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-pink-100 border border-white flex items-center justify-center text-[8px] text-pink-600 font-bold">S</div>
                    <div className="w-4 h-4 rounded-full bg-blue-100 border border-white flex items-center justify-center text-[8px] text-blue-600 font-bold">M</div>
                 </div>
              </div>
              <div className="flex-1 flex">
                 <div className="w-1/3 border-r border-slate-50 bg-slate-50/50 p-2 space-y-1.5">
                    <div className="h-8 bg-white rounded border border-slate-100 shadow-sm"></div>
                    <div className="h-8 bg-slate-100/50 rounded border border-transparent"></div>
                    <div className="h-8 bg-slate-100/50 rounded border border-transparent"></div>
                 </div>
                 <div className="flex-1 p-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                       <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-[9px]">JD</div>
                       <div>
                          <div className="text-[10px] font-bold text-slate-800">John Doe</div>
                          <div className="text-[8px] text-slate-400">Online via WhatsApp</div>
                       </div>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                       <div className="bg-slate-50 p-2 rounded-lg rounded-tl-none border border-slate-100 self-start max-w-[85%]">
                          <div className="text-[9px] text-slate-600">Hi, do you have enterprise pricing?</div>
                       </div>
                       <div className="bg-brand-50 p-2 rounded-lg rounded-tr-none border border-brand-100 self-end ml-auto max-w-[85%]">
                          <div className="text-[9px] text-slate-700">Yes! Let me connect you with our sales team.</div>
                       </div>
                    </div>

                    <div className="mt-2 h-6 bg-slate-50 rounded border border-slate-100 flex items-center px-2">
                       <div className="text-[8px] text-slate-400">Type a message...</div>
                       <Send className="w-2.5 h-2.5 text-brand-500 ml-auto" />
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 text-white px-3 py-1.5 rounded-full text-[10px] font-medium shadow-xl backdrop-blur-md flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-8">
              <Filter className="w-3 h-3 text-brand-400" />
              John assigned to Sarah
           </div>
        </div>
      );
    }

    // AI Chatbot Builder Visual
    if (idx === 2 || titleLower.includes('chatbot') || titleLower.includes('bot')) {
      return (
        <div className="mt-auto relative h-60 w-full bg-slate-50 border-t border-slate-100 rounded-t-xl overflow-hidden">
            <div className="absolute inset-0 opacity-40" 
                 style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[280px] h-[180px]">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-xl shadow-sm p-2.5 w-36 z-10 flex items-center gap-2.5 group-hover:border-brand-400 group-hover:shadow-md transition-all duration-300">
                        <div className="w-7 h-7 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                           <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <div>
                           <div className="text-[9px] font-bold text-slate-800">Incoming Message</div>
                           <div className="text-[8px] text-slate-500 font-medium">Contains "Pricing"</div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-slate-300 rounded-full z-20"></div>
                    </div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        <path d="M140 50 L140 80" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                        <path d="M140 80 C 140 90, 80 90, 80 110" stroke="#cbd5e1" strokeWidth="2" fill="none" className="group-hover:stroke-brand-300 transition-colors duration-500" />
                        <path d="M140 80 C 140 90, 200 90, 200 110" stroke="#cbd5e1" strokeWidth="2" fill="none" className="group-hover:stroke-brand-300 transition-colors duration-500" />
                        
                        <circle r="3" fill="#01B84B" className="opacity-0 group-hover:opacity-100">
                           <animateMotion dur="1.5s" repeatCount="indefinite" path="M140 50 L140 80 C 140 90, 80 90, 80 110" />
                        </circle>
                        <circle r="3" fill="#01B84B" className="opacity-0 group-hover:opacity-100">
                           <animateMotion dur="1.5s" begin="0.2s" repeatCount="indefinite" path="M140 50 L140 80 C 140 90, 200 90, 200 110" />
                        </circle>
                    </svg>

                    <div className="absolute top-[110px] left-2 bg-white border border-slate-200 rounded-xl shadow-sm p-2 w-32 z-10 flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-slate-300 rounded-full z-20"></div>
                        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                           <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div>
                           <div className="text-[9px] font-bold text-slate-800">Send Menu</div>
                           <div className="text-[8px] text-slate-500">PDF Catalogue</div>
                        </div>
                    </div>

                    <div className="absolute top-[110px] right-2 bg-white border border-slate-200 rounded-xl shadow-sm p-2 w-32 z-10 flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-slate-300 rounded-full z-20"></div>
                        <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                           <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                           <div className="text-[9px] font-bold text-slate-800">Assign Agent</div>
                           <div className="text-[8px] text-slate-500">Sales Team</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }

    // Analytics / Campaign Manager Visual
    if (idx === 3 || titleLower.includes('campaign') || titleLower.includes('analytics') || titleLower.includes('manager')) {
      return (
        <div className="mt-auto relative h-60 w-full bg-slate-50 border-t border-slate-100 rounded-t-xl overflow-hidden p-5">
           <div className="bg-white w-full h-full rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-slate-100 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-slate-900 flex items-end gap-2 leading-none">
                       $12,450 
                       <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full flex items-center mb-1">
                          <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                       </span>
                    </div>
                 </div>
                 <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                    <BarChart3 className="w-4 h-4" />
                 </div>
              </div>
              
              <div className="flex-1 relative">
                  <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="w-full h-[1px] bg-slate-50"></div>
                      <div className="w-full h-[1px] bg-slate-50"></div>
                      <div className="w-full h-[1px] bg-slate-50"></div>
                      <div className="w-full h-[1px] bg-slate-50"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-end justify-between gap-2 px-1 z-10">
                     {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div key={i} className="w-full bg-slate-100 rounded-t-sm relative group-hover:bg-brand-50 transition-colors duration-300 h-full flex items-end overflow-hidden">
                           <div 
                              className={`w-full rounded-t-sm transition-all duration-1000 ease-out ${i === 5 ? 'bg-brand-500' : 'bg-brand-300'}`}
                              style={{ height: `${h}%`, opacity: 0.8 + (i * 0.02) }}
                           ></div>
                        </div>
                     ))}
                  </div>
                  
                  <div className="absolute top-[10%] left-[65%] bg-slate-800 text-white text-[9px] py-1.5 px-2.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2 z-20">
                     <div className="font-bold">$2,840</div>
                     <div className="text-[8px] text-slate-400">Highest Day</div>
                     <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                  </div>
              </div>
           </div>
        </div>
      );
    }

    // WhatsApp Automation Visual
    if (idx === 4 || titleLower.includes('automation') || titleLower.includes('trigger')) {
      return (
        <div className="mt-auto relative h-60 w-full bg-slate-50 border-t border-slate-100 rounded-t-xl overflow-hidden p-5 flex items-center justify-center">
           <div className="absolute inset-0 opacity-50" 
                style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
           </div>

           <div className="relative w-full max-w-[220px] flex flex-col items-center">
              <div className="absolute top-8 bottom-8 left-8 w-0.5 bg-slate-200 z-0"></div>
              <div className="absolute top-8 left-8 w-0.5 bg-brand-500 z-0 transition-all duration-1000 h-0 group-hover:h-[calc(100%-4rem)] delay-100"></div>

              <div className="w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative z-10 flex items-center gap-3 mb-4 group-hover:border-brand-300 transition-colors">
                 <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-slate-700">Order Placed</div>
                    <div className="text-[9px] text-slate-400">Shopify Store</div>
                 </div>
                 <div className="absolute -right-1 -top-1">
                    <div className="bg-green-500 text-white rounded-full p-0.5 shadow-sm transform scale-0 group-hover:scale-100 transition-transform duration-300">
                       <Check className="w-2 h-2" />
                    </div>
                 </div>
              </div>

              <div className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 relative z-10 flex items-center gap-1.5 mb-4 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-200 transition-colors delay-300">
                 <Clock className="w-3 h-3" />
                 <span className="text-[9px] font-medium">Wait 24 Hours</span>
              </div>

              <div className="w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative z-10 flex items-center gap-3 group-hover:border-brand-300 transition-colors delay-500">
                 <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                    <Send className="w-4 h-4 ml-0.5" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-slate-700">Send Recovery</div>
                    <div className="text-[9px] text-slate-400">WhatsApp Template</div>
                 </div>
                 <div className="absolute right-3 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-700 animate-pulse"></div>
              </div>
           </div>
        </div>
      );
    }

    // Integrations / Tech stack Visual
    return (
      <div className="mt-auto relative h-60 w-full bg-slate-50 border-t border-slate-100 rounded-t-xl overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative z-20 w-16 h-16 bg-white rounded-2xl shadow-xl shadow-brand-500/10 border border-slate-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-brand-50 rounded-2xl transform rotate-6 scale-90 -z-10"></div>
                <Layers className="w-8 h-8" />
             </div>

             <div className="absolute inset-0 animate-[spin_20s_linear_infinite] group-hover:animate-[spin_10s_linear_infinite]">
                <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200"></div>
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="bg-white p-2.5 rounded-xl shadow-md border border-slate-100 animate-[spin_20s_linear_infinite_reverse] group-hover:animate-[spin_10s_linear_infinite_reverse]">
                      <ShoppingBag className="w-5 h-5 text-[#95BF47]" />
                   </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                   <div className="bg-white p-2.5 rounded-xl shadow-md border border-slate-100 animate-[spin_20s_linear_infinite_reverse] group-hover:animate-[spin_10s_linear_infinite_reverse]">
                      <Database className="w-5 h-5 text-[#336791]" />
                   </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="bg-white p-2.5 rounded-xl shadow-md border border-slate-100 animate-[spin_20s_linear_infinite_reverse] group-hover:animate-[spin_10s_linear_infinite_reverse]">
                      <Zap className="w-5 h-5 text-[#FF4F00]" />
                   </div>
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                   <div className="bg-white p-2.5 rounded-xl shadow-md border border-slate-100 animate-[spin_20s_linear_infinite_reverse] group-hover:animate-[spin_10s_linear_infinite_reverse]">
                      <Webhook className="w-5 h-5 text-[#8e44ad]" />
                   </div>
                </div>
             </div>

             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-brand-100 rounded-full animate-ping opacity-20"></div>
             </div>
         </div>
      </div>
    );
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-[#ecfff4] to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#a5b4fc 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px',
             maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
           }}>
      </div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-[radial-gradient(ellipse_at_top,_white_0%,_transparent_70%)] opacity-80 pointer-events-none blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-4 tracking-tight">
            {title.includes("Win") ? (
              <>
                Everything You Need To <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Win</span> on WhatsApp
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 pb-0 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-base text-slate-600 mb-6 leading-relaxed">
                  {feature.desc}
                </p>
                <a href="#" onClick={(e) => handleNavigation(idx === 0 ? 'broadcasts' : 'features', e)} className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 group-hover:underline">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
              {renderVisual(idx, feature.title)}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button onClick={(e) => handleNavigation('features', e)} className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-full text-base font-bold shadow-lg shadow-brand-500/20 transition-all hover:scale-105 flex items-center gap-2">
            Explore More <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
