import React from 'react';
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
      return { icon: ShoppingBag, color: "text-[#95BF47]" };
    } else if (lower.includes('zapier')) {
      return { icon: Zap, color: "text-[#FF4F00]" };
    } else if (lower.includes('hubspot')) {
      return { icon: Layers, color: "text-[#FF7A59]" };
    } else if (lower.includes('salesforce')) {
      return { icon: Cloud, color: "text-[#00A1E0]" };
    } else if (lower.includes('woo')) {
      return { icon: Box, color: "text-[#96588a]" };
    } else if (lower.includes('google') || lower.includes('sheet') || lower.includes('database')) {
      return { icon: Database, color: "text-[#0F9D58]" };
    }
    return { icon: Webhook, color: "text-[#8e44ad]" };
  };

  return (
    <section id="integrations" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-4 tracking-tight">
            {title.includes("Existing Tools") ? (
              <>
                Works With Your <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Existing Tools</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-slate-600">
            {desc}
          </p>
        </div>

        {/* Grid Layout */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {items.map((item, idx) => {
              const { icon: Icon, color } = getIntegrationIconAndColor(item.name);
              return (
                <div key={idx} className="bg-white rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col items-start border border-slate-100/50">
                   {/* Icon */}
                   <div className="mb-6">
                     <Icon className={`w-10 h-10 ${color}`} strokeWidth={2} />
                   </div>
                   
                   {/* Content */}
                   <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                   <p className="text-base text-slate-500 leading-relaxed">
                     {item.desc}
                   </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
            Load More
          </button>
        </div>
         
      </div>
    </section>
  );
};

export default IntegrationsPreview;