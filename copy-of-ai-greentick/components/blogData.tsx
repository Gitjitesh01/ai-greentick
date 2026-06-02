
import React from 'react';
import { User, Zap, ListFilter, ArrowRight, BarChart3, Check } from 'lucide-react';

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  theme: 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'rose';
  visualType: string;
  author?: string;
  readTime?: string;
  image?: string; // For actual image URL if needed
  content?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Key to Aligning Teams and Boosting Efficiency",
    excerpt: "Discover strategies to streamline communication and ensure everyone is on the same page using advanced productivity tools.",
    category: "Business Growth",
    date: "2023-10-24",
    theme: "blue",
    visualType: "productivity",
    author: "Sarah Jenkins",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "How Dynamic Workflows Keep Teams Moving Forward",
    excerpt: "Learn how to adapt your processes in real-time to meet changing project demands and keep your team agile.",
    category: "Automation",
    date: "2023-10-20",
    theme: "purple",
    visualType: "workflow",
    author: "Mike Chen",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Mastering Task Prioritization in Fast-Paced Teams",
    excerpt: "Tips and tricks for identifying what matters most when everything feels urgent, ensuring focused execution.",
    category: "Productivity",
    date: "2023-10-15",
    theme: "pink",
    visualType: "prioritization",
    author: "Jessica Lee",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "How Adaptive Workflows Empower Modern Teams",
    excerpt: "Flexibility is key. See how adaptive tools can help your team scale effectively without breaking processes.",
    category: "Business Growth",
    date: "2023-10-10",
    theme: "green",
    visualType: "adaptive",
    author: "David Wilson",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Unlocking Transparency for Effective Teamwork",
    excerpt: "Building trust through clear visibility into project status and team responsibilities, removing bottlenecks.",
    category: "Customer Engagement",
    date: "2023-10-05",
    theme: "orange",
    visualType: "transparency",
    author: "Emily Watson",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Keeping Teams Focused in a Distracted World",
    excerpt: "Practical advice for minimizing interruptions and maximizing deep work time for your team.",
    category: "Productivity",
    date: "2023-09-28",
    theme: "rose",
    visualType: "focus",
    author: "Robert Chang",
    readTime: "8 min read"
  },
  {
    id: 7,
    title: "WhatsApp Marketing 101: Getting Started",
    excerpt: "A complete guide to setting up your first broadcast list and understanding the WhatsApp Business API.",
    category: "WhatsApp Marketing",
    date: "2023-09-20",
    theme: "blue",
    visualType: "productivity",
    author: "Sarah Jenkins",
    readTime: "10 min read"
  },
  {
    id: 8,
    title: "Automating Customer Support with AI Chatbots",
    excerpt: "Reduce response times by 80% by implementing smart flows for common customer queries.",
    category: "Automation",
    date: "2023-09-15",
    theme: "purple",
    visualType: "workflow",
    author: "Mike Chen",
    readTime: "6 min read"
  },
  {
    id: 9,
    title: "E-commerce Strategies for the Holiday Season",
    excerpt: "How to leverage WhatsApp broadcasts to drive sales during peak shopping periods.",
    category: "Business Growth",
    date: "2023-09-10",
    theme: "pink",
    visualType: "prioritization",
    author: "Jessica Lee",
    readTime: "5 min read"
  }
];

export const CATEGORIES = ['All', 'WhatsApp Marketing', 'Business Growth', 'Customer Engagement', 'Automation', 'Productivity'];

export const renderVisual = (type: string, isLarge = false) => {
  const containerClass = isLarge 
    ? "rounded-2xl mb-8 relative overflow-hidden p-12 flex items-center justify-center border aspect-video w-full"
    : "rounded-xl mb-6 relative overflow-hidden p-6 flex items-center justify-center border aspect-video";
    
  switch (type) {
    case 'productivity':
      return (
        <div className={`bg-[#E0F2FE] border-blue-100 ${containerClass}`}>
            <div className="bg-white rounded-lg shadow-sm p-4 w-[85%] text-[8px] md:text-xs relative z-10">
               <div className="font-bold text-slate-700 mb-4">Member Productivity Chart</div>
               {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="flex items-center gap-2 mb-2">
                       <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center"><User className="w-2 h-2 text-slate-400" /></div>
                       <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                       </div>
                   </div>
               ))}
            </div>
            <div className="absolute top-6 right-8 bg-white p-2 rounded shadow-md w-24 z-20">
                <div className="text-[7px] md:text-[9px] font-bold text-slate-600 mb-1">AI Status Forecast</div>
                <div className="flex items-center justify-center relative w-12 h-12 mx-auto">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fee2e2" strokeWidth="4" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="62, 100" />
                    </svg>
                    <div className="absolute text-[8px] md:text-[10px] font-bold text-slate-800">62%</div>
                </div>
            </div>
            <div className="absolute bottom-6 right-6 bg-blue-500 p-2 rounded text-white shadow-sm"><Zap className="w-4 h-4" /></div>
        </div>
      );
    case 'workflow':
      return (
        <div className={`bg-[#F3E8FF] border-purple-100 ${containerClass}`}>
           <div className="flex flex-col items-center gap-3 relative z-10 w-full scale-90">
              <div className="flex gap-4">
                  <div className="bg-white px-3 py-1.5 rounded shadow-sm border border-green-100 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-[8px] md:text-[10px] font-bold text-slate-700">Review Draft</span>
                  </div>
              </div>
              <div className="flex gap-8 relative my-2">
                  <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 pointer-events-none overflow-visible">
                      <path d="M12 0 L12 12 L84 12 L84 24" fill="none" stroke="#d8b4fe" strokeWidth="1.5" />
                      <path d="M12 0 L12 24" fill="none" stroke="#d8b4fe" strokeWidth="1.5" />
                  </svg>
                  <div className="bg-white px-3 py-1.5 rounded shadow-sm border border-orange-100 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-[8px] md:text-[10px] font-bold text-slate-700">Update</span>
                  </div>
                  <div className="bg-white p-1.5 rounded shadow-sm border border-purple-100">
                      <ListFilter className="w-4 h-4 text-purple-500" />
                  </div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm w-[80%]">
                  <div className="text-[8px] md:text-[10px] font-bold text-blue-800 mb-1">■ Assignment Trends</div>
                  <div className="h-6 w-full flex items-end gap-1">
                       <div className="w-full h-full relative">
                          <svg className="w-full h-full overflow-visible">
                              <path d="M0 20 L20 16 L40 18 L60 10 L80 5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                              <circle cx="0" cy="20" r="1.5" fill="#3b82f6" />
                              <circle cx="20" cy="16" r="1.5" fill="#3b82f6" />
                              <circle cx="40" cy="18" r="1.5" fill="#3b82f6" />
                          </svg>
                      </div>
                  </div>
              </div>
           </div>
           <div className="absolute bottom-4 right-8 text-indigo-500 opacity-40">
               <ArrowRight className="w-16 h-16 stroke-[3] -rotate-45" />
           </div>
        </div>
      );
    case 'prioritization':
      return (
        <div className={`bg-[#FCE7F3] border-pink-100 ${containerClass}`}>
            <div className="w-full flex flex-col gap-3 relative z-10 scale-90">
                <div className="bg-white rounded shadow-sm p-3 w-[90%] mx-auto">
                    <div className="flex justify-between text-[8px] md:text-[10px] font-bold text-slate-700 mb-2 border-b border-slate-100 pb-1">
                        <span>Team Tasks</span>
                        <span>Assignee</span>
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center mb-1.5">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded ${i === 2 ? 'bg-fuchsia-400' : 'bg-slate-200'}`}></div>
                                <div className="w-16 h-1 bg-slate-100 rounded"></div>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded shadow-sm p-3 w-[90%] mx-auto">
                    <div className="text-[8px] md:text-[10px] font-bold text-slate-700 mb-2">Weekly Progress</div>
                    <div className="flex items-end justify-between gap-1 h-6">
                        {[40, 60, 30, 80, 50, 90, 70].map((h, idx) => (
                            <div key={idx} className="w-2 bg-fuchsia-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none z-20">
                <svg className="w-full h-full overflow-visible opacity-50">
                     <path d="M40 120 L80 60 L140 140 L200 40 L240 80" fill="none" stroke="#d946ef" strokeWidth="2" />
                </svg>
            </div>
        </div>
      );
    case 'adaptive':
      return (
        <div className={`bg-[#DCFCE7] border-green-100 ${containerClass}`}>
            <div className="bg-white rounded shadow-sm p-3 w-[80%] mx-auto relative z-10 border border-green-50">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white"><BarChart3 className="w-3 h-3" /></div>
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-700">Advanced Insights</span>
                </div>
                <div className="flex items-end justify-between h-10 gap-1 px-1">
                    <div className="w-3 bg-slate-800 rounded-t h-[60%]"></div>
                    <div className="w-3 bg-green-600 rounded-t h-[30%]"></div>
                    <div className="w-3 bg-green-500 rounded-t h-[80%]"></div>
                    <div className="w-3 bg-green-200 rounded-t h-[40%]"></div>
                </div>
            </div>
            <div className="absolute top-8 left-8 bg-white p-1.5 rounded shadow-sm z-20 border border-red-100">
                <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-red-400 rounded flex items-center justify-center"><BarChart3 className="w-2 h-2 text-white" /></div>
                    <div>
                        <div className="text-[8px] font-bold text-slate-800">+8%</div>
                        <div className="text-[6px] text-slate-400">Performance</div>
                    </div>
                </div>
            </div>
        </div>
      );
    case 'transparency':
      return (
        <div className={`bg-[#FFEDD5] border-orange-100 ${containerClass}`}>
            <div className="bg-white rounded shadow-sm p-4 w-[85%] mx-auto relative z-10">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                    <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center"><User className="w-2 h-2 text-orange-500" /></div>
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-700">Project Sprint</span>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                        <div className="text-[6px] text-slate-500 w-10">Research</div>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[80%]"></div></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                        <div className="text-[6px] text-slate-500 w-10">Design</div>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[60%]"></div></div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 right-10 bg-orange-500 text-white p-2 rounded shadow-sm z-20">
                <div className="text-[10px] font-bold">+8%</div>
                <div className="text-[6px]">Efficiency Boost</div>
            </div>
            <div className="absolute top-1/2 right-6 text-orange-500"><Check className="w-5 h-5" /></div>
        </div>
      );
    case 'focus':
      return (
        <div className={`bg-[#FFE4E6] border-rose-100 ${containerClass}`}>
            <div className="bg-white rounded shadow-sm p-4 w-[85%] mx-auto relative z-10 border border-rose-50">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-700">User Activity</span>
                    <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white"><User className="w-2 h-2" /></div>
                </div>
                <div className="space-y-2">
                    <div className="h-6 border-l-2 border-rose-200 pl-2">
                        <div className="text-[6px] md:text-[8px] font-bold text-slate-700">Optimize Workflow</div>
                        <div className="text-[5px] text-slate-400">Finish tasks</div>
                    </div>
                    <div className="h-6 border-l-2 border-rose-200 pl-2">
                        <div className="text-[6px] md:text-[8px] font-bold text-slate-700">Enhance Collab</div>
                        <div className="text-[5px] text-slate-400">Clear comms</div>
                    </div>
                </div>
            </div>
            <div className="absolute top-1/2 right-6 bg-white p-1.5 rounded-full shadow-sm text-rose-500">
                <Zap className="w-4 h-4" />
            </div>
            <div className="absolute top-12 right-12 w-10 h-10 bg-rose-500 rounded-full opacity-10 animate-ping"></div>
        </div>
      );
    default:
      return null;
  }
};
