import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Layers, Cloud, Box, Database, Webhook } from 'lucide-react';

interface IntegrationItem {
  name: string;
  desc: string;
}

interface IntegrationsPreviewProps {
  data: {
    title: string;
    desc: string;
    items: IntegrationItem[];
  };
}

const IntegrationsPreview: React.FC<IntegrationsPreviewProps> = ({ data }) => {
  const title = data?.title || "Works With Your Existing Tools";
  const desc = data?.desc || "Connect AI Greentick with your store, CRM and internal tools so your WhatsApp data is never isolated.";
  const items = data?.items || [];

  const getIntegrationIconAndColor = (nameText: string) => {
    const lower = nameText.toLowerCase();
    if (lower.includes('shopify')) {
      return { icon: ShoppingBag, color: "text-[#95BF47] bg-[#95BF47]/10" };
    } else if (lower.includes('zapier')) {
      return { icon: Zap, color: "text-[#FF4F00] bg-[#FF4F00]/10" };
    } else if (lower.includes('hubspot')) {
      return { icon: Layers, color: "text-[#FF7A59] bg-[#FF7A59]/10" };
    } else if (lower.includes('salesforce')) {
      return { icon: Cloud, color: "text-[#00A1E0] bg-[#00A1E0]/10" };
    } else if (lower.includes('woo')) {
      return { icon: Box, color: "text-[#96588a] bg-[#96588a]/10" };
    } else if (lower.includes('google') || lower.includes('sheet') || lower.includes('database')) {
      return { icon: Database, color: "text-[#0F9D58] bg-[#0F9D58]/10" };
    }
    return { icon: Webhook, color: "text-[#8e44ad] bg-[#8e44ad]/10" };
  };

  return (
    <section id="integrations" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(241,245,249,0.5)_0%,transparent_70%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 mb-5 tracking-tight">
            {title.includes("Existing Tools") ? (
              <>
                Works With Your <span className="text-transparent bg-clip-text bg-brand-gradient">Existing Tools</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            {desc}
          </p>
        </motion.div>

        {/* Grid Layout */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {items.map((item, idx) => {
              const { icon: Icon, color } = getIntegrationIconAndColor(item.name);
              return (
                <motion.div 
                  key={idx} 
                  className="bg-white rounded-[2rem] p-8 hover:shadow-premium transition-all duration-300 flex flex-col items-start border border-slate-200/60 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                   {/* Icon Wrapper */}
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 ${color.split(' ')[1]}`}>
                     <Icon className={`w-5 h-5 ${color.split(' ')[0]}`} strokeWidth={2.5} />
                   </div>
                   
                   {/* Content */}
                   <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                   <p className="text-xs text-slate-500 font-light leading-relaxed">
                     {item.desc}
                   </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        <div className="flex justify-center">
          <motion.button 
            className="bg-slate-950 text-white px-8 py-3.5 rounded-full text-xs font-bold hover:bg-slate-800 transition-all shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore All Connections
          </motion.button>
        </div>
         
      </div>
    </section>
  );
};

export default IntegrationsPreview;