import React from 'react';

interface MetricItem {
  value: string;
  label: string;
  desc: string;
}

interface MetricsProps {
  data: {
    title: string;
    desc: string;
    items: MetricItem[];
  };
}

const Metrics: React.FC<MetricsProps> = ({ data }) => {
  const title = data?.title || "See The Difference on Your Metrics";
  const desc = data?.desc || "Teams using AI Greentick report better response times and higher engagement on WhatsApp compared to using manual methods.";
  const items = data?.items || [];

  return (
    <section id="home-metrics" className="py-20 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-4 tracking-tight">
            {title.includes("Difference") ? (
              <>
                See The <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Difference</span> on Your Metrics
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm overflow-hidden group">
              <h3 className="text-4xl font-extrabold text-brand-600 mb-2">{item.value}</h3>
              <p className="text-xl font-bold text-slate-900 mb-2">{item.label}</p>
              <p className="text-sm text-slate-600 relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
