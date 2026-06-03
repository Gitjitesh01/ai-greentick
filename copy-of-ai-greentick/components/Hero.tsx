import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Bot, Layers, BarChart3, 
  Send, Users, Sparkles, ShoppingBag, HelpCircle, ArrowUpRight
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

  // Framer Motion Scroll-Linked Parallax transforms
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 180]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 80]);
  const textY = useTransform(scrollY, [0, 1000], [0, -20]);
  const visualY = useTransform(scrollY, [0, 1000], [0, 20]);
  const blob1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section id="home-hero" className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden bg-slate-950 text-white">
      
      {/* Parallax Background gradients */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 -z-10 pointer-events-none"
      />
      
      {/* Floating Futuristic Blur Blobs */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10"
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* Parallax Grid Overlay */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Column: Text Area (Left Aligned Side-by-Side) */}
        <motion.div 
          style={{ y: textY }}
          className="w-full lg:w-[40%] flex flex-col items-start text-left z-20 shrink-0"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Glowing Accent Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{badgeText}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6">
            {firstLine}
            {titleLines.length > 1 && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-emerald-300 to-teal-400">
                  {restLines}
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mb-10 max-w-xl leading-relaxed font-light">
            {subtitleText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
            <motion.button 
              onClick={() => {
                const pricingSec = document.querySelector('#pricing');
                if (pricingSec) pricingSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all shadow-lg shadow-brand-500/20 text-sm"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(1, 184, 75, 0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSec = document.querySelector('#home-problem-solution');
                if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-700 bg-slate-900/50 text-white font-bold transition-all hover:bg-slate-900 hover:border-slate-600 backdrop-blur-sm text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{secondaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </motion.a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>Official Meta API Suite</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Connected Graphic Section (Phone surrounded by 6 Cards) */}
        <motion.div 
          style={{ y: visualY }}
          className="w-full lg:w-[60%] relative flex flex-col lg:flex-row items-center justify-between gap-6 z-20 scale-[0.92] lg:scale-[0.98] origin-right"
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Animated Connecting SVG Paths Behind (Large Screen Only) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible" viewBox="0 0 1150 600">
            {/* Left Top Connection */}
            <path d="M 280 120 C 400 120, 480 200, 480 300" stroke="rgba(1, 184, 75, 0.15)" strokeWidth="2" fill="none" />
            <circle r="3.5" fill="#01B84B">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 480 300 C 480 200, 400 120, 280 120" />
            </circle>

            {/* Left Mid Connection */}
            <path d="M 280 300 L 480 300" stroke="rgba(1, 184, 75, 0.15)" strokeWidth="2" fill="none" />
            <circle r="3.5" fill="#01B84B">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 480 300 L 280 300" />
            </circle>

            {/* Left Bottom Connection */}
            <path d="M 280 480 C 400 480, 480 400, 480 300" stroke="rgba(1, 184, 75, 0.15)" strokeWidth="2" fill="none" />
            <circle r="3.5" fill="#01B84B">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 480 300 C 480 400, 400 480, 280 480" />
            </circle>

            {/* Right Top Connection */}
            <path d="M 870 120 C 750 120, 670 200, 670 300" stroke="rgba(1, 184, 75, 0.15)" strokeWidth="2" fill="none" />
            <circle r="3.5" fill="#01B84B">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 670 300 C 670 200, 750 120, 870 120" />
            </circle>

            {/* Right Mid Connection */}
            <path d="M 870 300 L 670 300" stroke="rgba(1, 184, 75, 0.15)" strokeWidth="2" fill="none" />
            <circle r="3.5" fill="#01B84B">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 670 300 L 870 300" />
            </circle>

            {/* Right Bottom Connection */}
            <path d="M 870 480 C 750 480, 670 400, 670 300" stroke="rgba(1, 184, 75, 0.15)" strokeWidth="2" fill="none" />
            <circle r="3.5" fill="#01B84B">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 670 300 C 670 400, 750 480, 870 480" />
            </circle>
          </svg>

          {/* Left Feature Column (3 Cards) */}
          <div className="w-full lg:w-[28%] flex flex-col gap-6 z-10 text-left">
            
            {/* Card 1: Workflow Automation */}
            <div className="glass-card bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Workflow Automation</h4>
              </div>
              <div className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-xl border border-slate-900 text-[10px] text-slate-400">
                <span className="bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">Trigger</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                <span className="bg-brand-500/15 text-brand-400 px-2 py-0.5 rounded border border-brand-500/10">Action</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                <span className="bg-teal-500/15 text-teal-400 px-2 py-0.5 rounded border border-teal-500/10">Result</span>
              </div>
            </div>

            {/* Card 2: AI Chatbot 24/7 */}
            <div className="glass-card bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">AI Chatbot 24/7</h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed pl-1">
                Instant Responses. Custom AI intent matching. Seamless agent routing.
              </p>
            </div>

            {/* Card 3: WhatsApp Rich Cards */}
            <div className="glass-card bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">RCS & Template Rich Cards</h4>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-950/40 border border-slate-900 rounded-lg p-1.5 flex flex-col gap-1 items-center">
                  <div className="w-full h-8 bg-slate-800/80 rounded" />
                  <span className="text-[7px] text-slate-300 font-bold scale-95 origin-center">New Arrivals</span>
                  <span className="text-[6px] text-white bg-brand-500 rounded px-1.5 py-0.5 mt-0.5 scale-90">Shop Now</span>
                </div>
                <div className="flex-1 bg-slate-950/40 border border-slate-900 rounded-lg p-1.5 flex flex-col gap-1 items-center">
                  <div className="w-full h-8 bg-slate-800/80 rounded" />
                  <span className="text-[7px] text-slate-300 font-bold scale-95 origin-center">Hot Sales</span>
                  <span className="text-[6px] text-white bg-brand-500 rounded px-1.5 py-0.5 mt-0.5 scale-90">View Deal</span>
                </div>
              </div>
            </div>

          </div>

          {/* Central 3D Tilted WhatsApp Phone Mockup */}
          <div 
            className="w-full lg:w-[38%] shrink-0 relative flex justify-center z-20 group"
            style={{ perspective: 1200 }}
          >
            {/* Ambient Backlight Glow behind Phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[110%] bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none -z-10" />

            <motion.div 
              className="relative w-full max-w-[280px] h-[510px] bg-slate-900 rounded-[2.5rem] p-2 border-[6px] border-slate-800 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col"
              style={{ transform: 'rotateY(-12deg) rotateX(6deg)' }}
              whileHover={{ transform: 'rotateY(0deg) rotateX(0deg) scale(1.02)' }}
            >
              {/* Phone Dynamic Island notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-30" />

              {/* Chat Window Screen */}
              <div className="flex-1 flex flex-col bg-[#efeae2] text-slate-900 overflow-hidden relative rounded-[2rem] pt-6">
                
                {/* Header */}
                <div className="h-12 bg-[#075e54] text-white flex items-center px-3 gap-2 justify-between shrink-0 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
                      JD
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-[10px] leading-tight">AI Greentick Live</div>
                      <span className="text-[8px] text-emerald-100 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        Online via Meta API
                      </span>
                    </div>
                  </div>
                  <HelpCircle className="w-4 h-4 text-emerald-100" />
                </div>

                {/* Simulated Chat bubbles */}
                <div className="flex-1 p-3 flex flex-col justify-end gap-3 text-[10px] pb-4">
                  
                  {/* User message */}
                  <div className="bg-white p-2.5 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start text-left">
                    <p className="font-bold text-[8px] text-slate-400 mb-0.5">Customer</p>
                    <p className="leading-snug">Hi, is my order #1234 confirmed? 🚚</p>
                    <span className="block text-[6px] text-slate-400 text-right mt-1">10:41 AM</span>
                  </div>

                  {/* AI Bot Message */}
                  <div className="bg-[#dcf8c6] p-2.5 rounded-lg rounded-tr-none shadow-sm max-w-[85%] self-end text-left relative">
                    <p className="font-bold text-[8px] text-brand-600 mb-0.5">AI Agent</p>
                    <p className="leading-snug">Yes Sarah! Order #1234 is confirmed and shipped via FedEx. Arriving tomorrow before 2 PM.</p>
                    
                    <div className="mt-2 bg-white/70 border border-emerald-100 rounded p-1.5 flex items-center justify-between cursor-pointer">
                      <span className="font-bold text-[7px] text-emerald-800">Track Packages</span>
                      <ArrowRight className="w-2.5 h-2.5 text-emerald-600" />
                    </div>
                    <span className="block text-[6px] text-slate-400 text-right mt-1">10:42 AM</span>
                  </div>

                  {/* Bottom Interactive Quick Actions */}
                  <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-300/40">
                    <div className="bg-white border border-slate-300 rounded-md py-1 text-center font-bold text-[8px] text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm">
                      Support
                    </div>
                    <div className="bg-white border border-slate-300 rounded-md py-1 text-center font-bold text-[8px] text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm">
                      Sales Desk
                    </div>
                    <div className="bg-white border border-slate-300 rounded-md py-1 text-center font-bold text-[8px] text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm">
                      More Info
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Feature Column (3 Cards) */}
          <div className="w-full lg:w-[28%] flex flex-col gap-6 z-10 text-left">
            
            {/* Card 4: Broadcast Campaigns */}
            <div className="glass-card bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Send className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Broadcast Campaigns</h4>
              </div>
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[7px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Audience Segment</span>
                  <span className="text-[10px] text-slate-300 font-bold">D2C VIP Clients</span>
                </div>
                <span className="text-[9px] bg-brand-500 text-white font-bold px-2 py-0.5 rounded shadow-sm cursor-pointer scale-95 hover:bg-brand-600 transition-colors">Send Now</span>
              </div>
            </div>

            {/* Card 5: Analytics Dashboard */}
            <div className="glass-card bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Analytics Dashboard</h4>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center flex flex-col justify-center">
                  <span className="text-[6px] text-slate-500 font-bold block mb-0.5">Read Rate</span>
                  <span className="text-[11px] font-extrabold text-emerald-400">+98%</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center flex flex-col justify-center">
                  <span className="text-[6px] text-slate-500 font-bold block mb-0.5">Click rate</span>
                  <span className="text-[11px] font-extrabold text-teal-400">+45%</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center flex flex-col justify-center">
                  <span className="text-[6px] text-slate-500 font-bold block mb-0.5">Replies</span>
                  <span className="text-[11px] font-extrabold text-brand-400">12k</span>
                </div>
              </div>
            </div>

            {/* Card 6: Team Inbox Collaboration */}
            <div className="glass-card bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Team Collaboration</h4>
              </div>
              <div className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[6px] text-slate-500 uppercase font-bold tracking-wider leading-none">Shared Inbox</span>
                  <span className="text-[9px] text-slate-300 font-medium">Assign & Add Notes</span>
                </div>
                <div className="flex -space-x-1.5 scale-90">
                  <div className="w-5 h-5 rounded-full bg-pink-100 border border-slate-900 flex items-center justify-center text-[7px] text-pink-700 font-bold shrink-0">E</div>
                  <div className="w-5 h-5 rounded-full bg-blue-100 border border-slate-900 flex items-center justify-center text-[7px] text-blue-700 font-bold shrink-0">S</div>
                  <div className="w-5 h-5 rounded-full bg-purple-100 border border-slate-900 flex items-center justify-center text-[7px] text-purple-700 font-bold shrink-0">M</div>
                </div>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;