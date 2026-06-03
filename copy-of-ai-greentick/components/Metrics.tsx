import React from 'react';
import { motion } from 'framer-motion';

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
    <section id="home-metrics" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(1,184,75,0.05)_0%,_transparent_70%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 mb-5 tracking-tight">
            {title.includes("Difference") ? (
              <>
                See The <span className="text-transparent bg-clip-text bg-brand-gradient">Difference</span> on Your Metrics
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            {desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm overflow-hidden group hover:border-brand-500/20 hover:shadow-premium transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <h3 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-brand-gradient mb-3 tracking-tight">{item.value}</h3>
              <p className="text-base font-bold text-slate-900 mb-2">{item.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
