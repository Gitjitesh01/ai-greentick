import React from 'react';
import { 
  ArrowRight, LayoutGrid, MessageSquare, User, Send, Bot, 
  CreditCard, FileText, Shield, Users, Settings, Search, 
  Filter, ChevronRight, CheckCircle2, Globe, Truck, ExternalLink
} from 'lucide-react';

interface HeroProps {
  content?: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const badgeText = content?.badge || "WHATSAPP MARKETING SUITE FOR MODERN TEAMS";
  const titleText = content?.title || "Grow Faster With\nSmarter WhatsApp Conversations";
  const subtitleText = content?.subtitle || "Send high-delivery broadcasts, manage every chat in a shared inbox and automate replies with AI chatbots. Built for agencies and D2C brands.";
  const primaryCtaText = content?.primaryCta || "Start Free Trial";
  const secondaryCtaText = content?.secondaryCta || "Book A Demo";

  // Split title: first line is white, subsequent lines are gradient
  const titleLines = titleText.split('\n');
  const firstLine = titleLines[0];
  const restLines = titleLines.slice(1).join(' ');

  return (
    <section id="home-hero" className="relative pt-32 pb-0 lg:pt-48 lg:pb-0 overflow-hidden bg-[#0A0A0A]">
      {/* Page Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#001a0d] via-[#050505] to-black"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] pointer-events-none"></div>
      
      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          20%, 100% { transform: translateX(250%) skewX(-25deg); }
        }
        .animate-subtle-float { animation: subtle-float 4s ease-in-out infinite; }
        .animate-shimmer-sweep { animation: shimmer-sweep 4s infinite linear; }
        .dotted-bg {
          background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
        /* Dashboard specific glow effect */
        .premium-dashboard-glow {
          background: radial-gradient(circle at center, rgba(1, 184, 75, 0.4) 0%, rgba(1, 184, 75, 0.15) 35%, rgba(1, 184, 75, 0.05) 60%, transparent 80%);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-widest uppercase mb-10 backdrop-blur-md">
            {badgeText}
          </div>
          <h1 className="text-5xl lg:text-[84px] lg:leading-[1.1] font-bold text-white mb-10 tracking-tight">
            {firstLine}
            {titleLines.length > 1 && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">{restLines}</span>
              </>
            )}
          </h1>
          <p className="text-lg lg:text-2xl text-slate-400 mb-14 max-w-4xl mx-auto leading-relaxed font-light">
            {subtitleText}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 items-center">
            {/* Primary CTA with subtle shimmer effect */}
            <button className="shiny-cta relative group overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-brand-500/30 shadow-2xl">
              <span className="relative z-10">{primaryCtaText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none z-0" />
            </button>
            
            {/* Outline CTA with distinct hover state */}
            <a href="#contact" 
               className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full border-2 border-white/20 text-white font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group backdrop-blur-sm">
              <span>{secondaryCtaText}</span>
              <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>

        {/* --- DASHBOARD WITH HOVER POP EFFECT --- */}
        <div className="relative group w-full max-w-6xl mx-auto mt-8 z-20 transition-all duration-700 ease-out hover:scale-[1.015] hover:-translate-y-3">
          
          {/* Enhanced Background Glow Layer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] premium-dashboard-glow blur-[120px] -z-10 pointer-events-none opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-500/10 blur-[80px] -z-10 pointer-events-none"></div>
          
          {/* Main Dashboard Container */}
          <div className="relative overflow-hidden rounded-t-[2.5rem] border-[10px] border-b-0 border-[#0F172A] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-shadow duration-700 group-hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)]">
            {/* Browser Header Bar */}
            <div className="h-12 bg-[#F8F9FA] border-b border-slate-200 flex items-center px-4 gap-4">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
               </div>
               <div className="flex-1 max-w-md mx-auto">
                  <div className="bg-[#EBEDF0] h-7 rounded-md flex items-center px-3 gap-2 justify-center">
                     <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                     <span className="text-[10px] text-slate-500 font-medium tracking-tight">dashboard.aigreentick.com</span>
                  </div>
               </div>
            </div>

            <div className="relative bg-white flex h-[650px] md:h-[750px] text-left">
              
              {/* Sidebar */}
              <div className="w-[72px] bg-slate-50 border-r border-slate-200 flex flex-col items-center py-6 gap-6 shrink-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 cursor-pointer mb-2">
                     <div className="border-2 border-slate-300 rounded p-0.5"><ChevronRight className="w-3 h-3" /></div>
                  </div>
                  <LayoutGrid className="w-6 h-6 text-slate-400 hover:text-brand-600 transition-colors cursor-pointer" />
                  <div className="w-12 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 cursor-pointer">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <User className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <Send className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <Bot className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <CreditCard className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <FileText className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <Shield className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <Users className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                  <div className="mt-auto flex flex-col items-center gap-6">
                    <Settings className="w-6 h-6 text-slate-400 hover:text-brand-600 cursor-pointer" />
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xs shadow-md">AA</div>
                  </div>
              </div>

              {/* Chat List Column */}
              <div className="w-80 bg-white border-r border-slate-200 hidden md:flex flex-col">
                  <div className="p-6 pb-2 flex justify-between items-center">
                    <h2 className="font-bold text-xl text-slate-900">All Messages</h2>
                    <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar pt-4">
                      {[
                        { name: "Sarah Miller", msg: "When will my order arrive?", time: "2m", tag: "SUPPORT", selected: true, avatar: "S" },
                        { name: "Apex Solutions", msg: "Thanks for the quick reply!", time: "15m", tag: "SALES", avatar: "A" },
                        { name: "John Doe", msg: "Can I get a custom quote?", time: "1h", tag: "LEAD", avatar: "J" },
                        { name: "Emily Chen", msg: "Payment failed, help needed.", time: "2h", tag: "URGENT", avatar: "E" },
                        { name: "Design Studio", msg: "Campaign looks great.", time: "3h", tag: "CLIENT", avatar: "D" }
                      ].map((chat, i) => (
                          <div key={i} className={`px-6 py-5 border-l-4 transition-all cursor-pointer flex items-start gap-4 ${chat.selected ? 'bg-[#F0FDF4] border-brand-500' : 'bg-white border-transparent hover:bg-slate-50'}`}>
                             <div className="w-10 h-10 rounded-full bg-[#F1F5F9] shrink-0 flex items-center justify-center font-bold text-slate-500 text-sm">
                               {chat.avatar}
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="flex justify-between items-center mb-0.5">
                                 <span className="font-bold text-slate-900 text-sm truncate">{chat.name}</span>
                                 <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                               </div>
                               <p className="text-xs text-slate-500 truncate mb-2">{chat.msg}</p>
                               <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm border ${chat.tag === 'URGENT' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                  {chat.tag}
                               </span>
                             </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Chat Content Window */}
              <div className="flex-1 bg-white flex flex-col">
                  {/* Chat Header */}
                  <div className="h-20 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        SM
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">Sarah Miller</div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                          <span className="text-[11px] text-slate-400 font-medium">Online via WhatsApp</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg"><Filter className="w-5 h-5" /></button>
                       <div className="px-3 py-1.5 bg-[#F0FDF4] text-brand-600 text-[11px] font-bold rounded-lg border border-brand-100">
                          24hr window
                       </div>
                    </div>
                  </div>

                  {/* Messages Area with Dotted Background */}
                  <div className="flex-1 p-8 space-y-8 overflow-y-auto no-scrollbar dotted-bg relative">
                      <div className="flex justify-center">
                         <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Today, 10:23 AM</span>
                      </div>

                      {/* Sarah Message 1 */}
                      <div className="flex items-start gap-3 max-w-[70%]">
                        <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-blue-600 font-bold text-[10px]">SM</div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 text-sm text-slate-800 leading-relaxed font-medium">
                          Hi! I ordered the wireless headphones yesterday. Order #9921.
                        </div>
                      </div>

                      {/* AI Bot Message */}
                      <div className="flex flex-col items-end gap-1 ml-auto max-w-[80%]">
                         <div className="bg-[#F0FDF4] p-4 rounded-2xl rounded-tr-none shadow-sm border border-brand-100 text-sm text-slate-800 leading-relaxed font-medium">
                            Hello Sarah! 👋 Let me check the status of your order #9921 for you.
                         </div>
                         <div className="flex items-center gap-1 text-[10px] text-brand-600 font-bold">
                            AI Bot <CheckCircle2 className="w-3 h-3" />
                         </div>
                      </div>

                      {/* Sarah Message 2 */}
                      <div className="flex items-start gap-3 max-w-[70%]">
                        <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-blue-600 font-bold text-[10px]">SM</div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 text-sm text-slate-800 leading-relaxed font-medium">
                          Great, thank you! Just wanted to know when it arrives.
                        </div>
                      </div>

                      {/* Tracking Card Message */}
                      <div className="flex flex-col items-end gap-1 ml-auto w-full max-w-[480px]">
                          <div className="bg-brand-500 rounded-2xl p-6 text-white shadow-xl shadow-brand-500/20 relative w-full overflow-hidden">
                              <p className="text-base font-bold mb-6">Good news! It has been shipped and is scheduled for delivery by tomorrow, 2 PM. 🚚</p>
                              
                              <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between border border-white/20">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                       <ArrowRight className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                       <p className="text-sm font-bold">Track Package</p>
                                       <p className="text-xs text-white/70">fedex.com/track/9921</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="mt-4 text-[10px] text-white/70 font-medium text-right">10:25 AM</div>
                          </div>
                      </div>

                      {/* Status Toast */}
                      <div className="absolute top-4 right-4 bg-[#1E293B] text-white p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500 z-30">
                         <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center text-white">
                            <CheckCircle2 className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold">Message Delivered</p>
                            <p className="text-[9px] text-slate-400">Read by Sarah just now</p>
                         </div>
                      </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-6 bg-white border-t border-slate-200 shrink-0">
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                       <div className="flex gap-4 text-slate-400 shrink-0">
                          <Users className="w-5 h-5 cursor-pointer hover:text-slate-600" />
                       </div>
                       <input type="text" placeholder="Type a message or / for templates..." className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400" />
                       <div className="shrink-0">
                          <button className="bg-brand-500 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                    <div className="mt-3 flex justify-between px-1">
                       <span className="text-[10px] text-slate-400 font-medium">Markdown supported</span>
                       <span className="text-[10px] text-slate-400 font-medium">Press Enter to send</span>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;