import React from 'react';
import { Users, BarChart3, Clock, Zap, ArrowRight } from 'lucide-react';

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
    <section id="home-problem-solution" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION 1: THE USUAL PROBLEMS --- */}
        <div className="relative rounded-[3rem] p-0 bg-white mb-0">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="flex-1 w-full">
              <div className="mb-12">
                <h2 className="text-[24px] md:text-[42px] font-bold text-slate-900 mb-6 leading-tight md:leading-[1.2] tracking-tight">
                  {probTitle.includes("Problems") ? (
                    <>
                      The Usual <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Problems</span> <br />
                      with WhatsApp
                    </>
                  ) : (
                    probTitle
                  )}
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl leading-relaxed">
                  {probDesc}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {problems.map((item, idx) => {
                  const Icon = getProblemIcon(idx);
                  return (
                    <div key={idx} className="flex items-start gap-5 group">
                      <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100 shadow-sm transition-transform group-hover:scale-110">
                        <Icon className="w-7 h-7 text-green-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end relative mt-8 lg:mt-0">
              <div className="relative w-full max-w-[500px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-50/50 rounded-full blur-3xl -z-10"></div>
                <img 
                  src="https://industrial-green-zh9bzmnb9r.edgeone.app/1771830276962-2f8b54d2-17c8-4223-a3ba-98589bf027d2%20(1).png" 
                  alt="Problems with WhatsApp" 
                  className="w-full max-w-[500px] h-auto lg:w-[500px] lg:h-[416px] object-contain hover:scale-105 transition-transform duration-500 relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE SOLUTION --- */}
        <div className="relative mt-24 lg:mt-32">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Image */}
            <div className="flex-1 w-full flex justify-center lg:justify-start relative z-10 order-2 lg:order-1 mt-8 lg:mt-0">
                <div className="relative w-full max-w-[500px]">
                    <img 
                      src="https://real-apricot-apxbcvxabq.edgeone.app/WhatsApp_Problems_Girl_Version%201-1.png" 
                      alt="AI Greentick Inbox" 
                      className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 relative z-10 rounded-2xl"
                    />
                </div>
            </div>

            {/* Right Side Content */}
            <div className="flex-1 w-full relative z-10 order-1 lg:order-2">
                <h2 className="text-[24px] md:text-[42px] font-bold text-slate-900 mb-6 leading-tight md:leading-[1.2] tracking-tight">
                    {solTitle.includes("Helps") ? (
                      <>
                        How AI Greentick <span className="bg-[#01B84B] text-white px-2 py-0.5 rounded-md transform -rotate-2 inline-block shadow-sm">Helps</span> <br />
                        Your Team Win
                      </>
                    ) : (
                      solTitle
                    )}
                </h2>
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
                    {solDesc}
                </p>

                <div className="flex flex-col gap-8 mb-10">
                    {solutions.map((item, idx) => {
                      const Icon = getSolutionIcon(idx);
                      return (
                        <div key={idx} className="flex items-start gap-5 group">
                          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100 shadow-sm transition-transform group-hover:scale-110">
                            <Icon className="w-7 h-7 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <a href="#pricing" className="inline-block bg-[#01B84B] hover:bg-[#01933c] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:-translate-y-1 flex items-center w-fit gap-2 text-base">
                    Start for FREE <ArrowRight className="w-5 h-5" />
                </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;