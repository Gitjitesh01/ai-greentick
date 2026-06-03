
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

interface ResourcesProps {
  onNavigate?: (page: any) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onNavigate }) => {
  
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section id="resources" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 mb-5 tracking-tight">
              Learn More About <span className="text-transparent bg-clip-text bg-brand-gradient">WhatsApp Marketing</span>
            </h2>
            <p className="text-base text-slate-500 font-light leading-relaxed">
              Stay ahead with guides, playbooks and practical tips on using WhatsApp for growth.
            </p>
          </div>
          <button 
            onClick={() => handleNavigation('blog')}
            className="hidden md:flex items-center text-brand-600 font-bold hover:text-brand-700 bg-transparent border-none cursor-pointer text-sm"
          >
            <span>View all resources</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Productivity/Campaigns Style */}
          <motion.div 
            onClick={() => handleNavigation('blog')} 
            className="group cursor-pointer border border-slate-200/60 rounded-[2.25rem] p-5 hover:border-brand-500/20 hover:shadow-premium transition-all duration-300 bg-white flex flex-col h-full shadow-sm"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -3 }}
          >
            <div className="aspect-video bg-[#E0F2FE] rounded-[1.75rem] mb-6 relative overflow-hidden p-6 flex items-center justify-center border border-blue-100">
                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-sm p-3 w-4/5 text-[8px] relative z-10">
                   <div className="font-bold text-slate-700 mb-2">Member Productivity Chart</div>
                   {[1, 2, 3, 4, 5].map((i) => (
                       <div key={i} className="flex items-center gap-2 mb-1.5">
                           <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center"><User className="w-2 h-2 text-slate-400" /></div>
                           <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                           </div>
                       </div>
                   ))}
                </div>
                {/* Floating Status Card */}
                <div className="absolute top-4 right-8 bg-white p-2 rounded-lg shadow-md w-24 z-20 animate-bounce-slow">
                     <div className="text-[6px] font-bold text-slate-600 mb-1">AI Status Forecast</div>
                     <div className="flex items-center justify-center relative w-10 h-10 mx-auto">
                         <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fee2e2" strokeWidth="4" />
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="62, 100" />
                         </svg>
                         <div className="absolute text-[8px] font-bold text-slate-800">62%</div>
                     </div>
                </div>
                {/* Connecting lines decoration */}
                <svg className="absolute inset-0 pointer-events-none z-0">
                    <path d="M200 120 L240 120 L240 150" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors px-1 text-left">
              Getting Started With WhatsApp Campaigns
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed px-1 font-light text-left">
              A simple guide to planning your first WhatsApp broadcast, choosing the right audience and measuring results.
            </p>
            <div className="mt-auto px-1 pb-1 text-left">
              <span className="text-brand-600 font-bold text-xs flex items-center">
                <span>Read the guide</span>
                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>

          {/* Card 2: Workflow/Chatbots Style */}
          <motion.div 
            onClick={() => handleNavigation('blog')} 
            className="group cursor-pointer border border-slate-200/60 rounded-[2.25rem] p-5 hover:border-brand-500/20 hover:shadow-premium transition-all duration-300 bg-white flex flex-col h-full shadow-sm"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3 }}
          >
            <div className="aspect-video bg-[#F3E8FF] rounded-[1.75rem] mb-6 relative overflow-hidden p-6 flex items-center justify-center border border-purple-100">
               {/* Nodes */}
               <div className="flex flex-col items-center gap-4 relative z-10 w-full">
                  <div className="flex gap-8">
                      <div className="bg-white px-3 py-1.5 rounded shadow-sm border border-green-100 flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-[8px] font-bold text-slate-700">Review Draft</span>
                      </div>
                  </div>
                  <div className="flex gap-12 relative">
                      {/* Connecting Line SVG */}
                      <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 pointer-events-none overflow-visible">
                          <path d="M16 0 L16 16 L112 16 L112 32" fill="none" stroke="#d8b4fe" strokeWidth="1" />
                          <path d="M16 0 L16 32" fill="none" stroke="#d8b4fe" strokeWidth="1" />
                      </svg>
                      <div className="bg-white px-3 py-1.5 rounded shadow-sm border border-orange-100 flex items-center gap-1.5 mt-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-[8px] font-bold text-slate-700">Update</span>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded shadow-sm border border-purple-100 flex items-center gap-1.5 mt-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-[8px] font-bold text-slate-700">Approve</span>
                      </div>
                  </div>
                  {/* Bottom Chart Card */}
                  <div className="bg-white p-2 rounded shadow-sm w-3/4 mt-2">
                      <div className="text-[6px] font-bold text-blue-800 mb-1">■ Assignment Completion Trends</div>
                      <div className="h-6 w-full flex items-end gap-1">
                          <div className="w-full h-full relative">
                              <svg className="w-full h-full overflow-visible">
                                  <path d="M0 20 L20 15 L40 18 L60 10 L80 5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                                  <circle cx="0" cy="20" r="1.5" fill="#3b82f6" />
                                  <circle cx="20" cy="15" r="1.5" fill="#3b82f6" />
                                  <circle cx="40" cy="18" r="1.5" fill="#3b82f6" />
                                  <circle cx="60" cy="10" r="1.5" fill="#3b82f6" />
                                  <circle cx="80" cy="5" r="1.5" fill="#3b82f6" />
                              </svg>
                          </div>
                      </div>
                  </div>
               </div>
               {/* Big Arrow Overlay */}
               <div className="absolute bottom-0 right-10 text-indigo-500 opacity-20 transform rotate-[-15deg]">
                   <ArrowRight className="w-24 h-24" />
               </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors px-1 text-left">
              Automating Customer Replies With Chatbots
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed px-1 font-light text-left">
              Learn when to use automation, when to hand over to a human and how to keep conversations personal.
            </p>
            <div className="mt-auto px-1 pb-1 text-left">
              <span className="text-brand-600 font-bold text-xs flex items-center">
                <span>Learn more</span>
                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>

          {/* Card 3: Ecommerce/Analytics Style */}
          <motion.div 
            onClick={() => handleNavigation('blog')} 
            className="group cursor-pointer border border-slate-200/60 rounded-[2.25rem] p-5 hover:border-brand-500/20 hover:shadow-premium transition-all duration-300 bg-white flex flex-col h-full shadow-sm"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -3 }}
          >
            <div className="aspect-video bg-[#FCE7F3] rounded-[1.75rem] mb-6 relative overflow-hidden p-6 flex items-center justify-center border border-pink-100">
                <div className="w-full flex flex-col gap-3 relative z-10">
                    {/* Tasks Card */}
                    <div className="bg-white rounded shadow-sm p-3 w-4/5 mx-auto text-[8px] text-left">
                        <div className="flex justify-between font-bold text-slate-700 mb-2 border-b border-slate-100 pb-1">
                            <span>Team Tasks</span>
                            <span>Assignee</span>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center mb-1.5">
                                <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded ${i === 2 ? 'bg-fuchsia-400' : 'bg-slate-200'}`}></div>
                                    <div className="w-16 h-1 bg-slate-100 rounded"></div>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            </div>
                        ))}
                    </div>
                    {/* Weekly Progress Card */}
                    <div className="bg-white rounded shadow-sm p-3 w-4/5 mx-auto text-[8px] text-left">
                        <div className="font-bold text-slate-700 mb-2">Weekly Progress</div>
                        <div className="flex items-end justify-between gap-1 h-6">
                            {[40, 60, 30, 80, 50, 90, 70].map((h, idx) => (
                                <div key={idx} className="w-2 bg-fuchsia-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Line Chart Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    <svg className="w-full h-full overflow-visible opacity-50">
                         <path d="M40 120 L80 80 L140 140 L200 60 L240 100" fill="none" stroke="#d946ef" strokeWidth="2" />
                         <rect x="38" y="118" width="4" height="4" fill="#d946ef" />
                         <rect x="78" y="78" width="4" height="4" fill="#d946ef" />
                         <rect x="138" y="138" width="4" height="4" fill="#d946ef" />
                         <rect x="198" y="58" width="4" height="4" fill="#d946ef" />
                         <rect x="238" y="98" width="4" height="4" fill="#d946ef" />
                    </svg>
                </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors px-1 text-left">
              WhatsApp for D2C and Ecommerce
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed px-1 font-light text-left">
              Use cases, templates and examples for running sales and nurturing customers through WhatsApp.
            </p>
            <div className="mt-auto px-1 pb-1 text-left">
              <span className="text-brand-600 font-bold text-xs flex items-center">
                <span>Explore use cases</span>
                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Resources;
