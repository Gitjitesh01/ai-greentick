import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Clock, Zap, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface InfoItem {
  title: string;
  desc: string;
}

interface ProblemSolutionProps {
  data: {
    probTitle: string;
    probDesc: string;
    solTitle: string;
    solDesc: string;
    problems: InfoItem[];
    solutions: InfoItem[];
  };
}

const ProblemSolution: React.FC<ProblemSolutionProps> = ({ data }) => {
  const probTitle = data?.probTitle || "The Usual Problems with WhatsApp";
  const probDesc = data?.probDesc || "Most businesses struggle with manual processes that don't scale.";
  const solTitle = data?.solTitle || "How AI Greentick Helps Your Team Win";
  const solDesc = data?.solDesc || "Turn WhatsApp into your most profitable revenue channel with tools built for growth.";
  
  const problems = data?.problems || [];
  const solutions = data?.solutions || [];

  const getProblemIcon = (idx: number) => {
    switch (idx) {
      case 0: return Users;
      case 1: return BarChart3;
      case 2: return Clock;
      default: return Clock;
    }
  };

  const getSolutionIcon = (idx: number) => {
    switch (idx) {
      case 0: return Users;
      case 1: return BarChart3;
      case 2: return Zap;
      default: return Zap;
    }
  };

  return (
    <section id="home-problem-solution" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Accent vector grid in background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- SECTION 1: THE USUAL PROBLEMS --- */}
        <div className="mb-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div 
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Challenge</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
                  {probTitle.includes("Problems") ? (
                    <>
                      The Usual <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Problems</span> <br className="hidden md:inline" />
                      with WhatsApp Business
                    </>
                  ) : (
                    probTitle
                  )}
                </h2>
                <p className="text-base text-slate-500 max-w-xl font-light leading-relaxed">
                  {probDesc}
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {problems.map((item, idx) => {
                  const Icon = getProblemIcon(idx);
                  return (
                    <motion.div 
                      key={idx} 
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:border-red-500/20 hover:shadow-premium transition-all duration-300 group"
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div 
              className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full max-w-[460px] group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-100/40 rounded-full blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src="https://industrial-green-zh9bzmnb9r.edgeone.app/1771830276962-2f8b54d2-17c8-4223-a3ba-98589bf027d2%20(1).png" 
                  alt="Problems with WhatsApp" 
                  className="w-full h-auto object-contain max-h-[380px] drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-500 relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- SECTION 2: THE SOLUTION --- */}
        <div>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Image */}
            <motion.div 
              className="w-full lg:w-1/2 flex justify-center lg:justify-start relative z-10 order-2 lg:order-1 mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full max-w-[460px] group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-100/40 rounded-full blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src="https://real-apricot-apxbcvxabq.edgeone.app/WhatsApp_Problems_Girl_Version%201-1.png" 
                  alt="AI Greentick Inbox" 
                  className="w-full h-auto object-contain max-h-[380px] rounded-2xl drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-500 relative z-10"
                />
              </div>
            </motion.div>

            {/* Right Side Content */}
            <motion.div 
              className="flex-1 w-full relative z-10 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-bold uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>The Solution</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
                  {solTitle.includes("Helps") ? (
                    <>
                      How AI Greentick <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-emerald-600">Helps</span> <br className="hidden md:inline" />
                      Your Team Scale & Win
                    </>
                  ) : (
                    solTitle
                  )}
                </h2>
                <p className="text-base text-slate-500 max-w-xl font-light leading-relaxed">
                  {solDesc}
                </p>
              </div>

              <div className="flex flex-col gap-5 mb-10">
                {solutions.map((item, idx) => {
                  const Icon = getSolutionIcon(idx);
                  return (
                    <motion.div 
                      key={idx} 
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:border-brand-500/20 hover:shadow-premium transition-all duration-300 group"
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 border border-brand-100 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.button 
                onClick={() => {
                  const pricingSec = document.querySelector('#pricing');
                  if (pricingSec) pricingSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#01B84B] hover:bg-brand-600 text-white font-bold transition-all shadow-lg shadow-brand-500/20 text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Start for FREE</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </motion.button>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;