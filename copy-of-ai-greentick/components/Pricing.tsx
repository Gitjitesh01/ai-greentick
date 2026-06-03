import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingProps {
  plans?: any[];
}

const Pricing: React.FC<PricingProps> = ({ plans: propPlans }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const defaultPlans = [
    {
      name: "Starter",
      priceMonthly: "2,499",
      priceYearly: "23,999",
      desc: "Good for individuals and small businesses who are just starting out with WhatsApp marketing.",
      button: "Get started",
      isPrimary: false,
      featuresHeader: "Key features", 
      features: [
        "1 WhatsApp Number",
        "Shared Inbox (3 users)",
        "Basic Broadcasts",
        "Template Manager",
        "Basic Automation",
        "Basic Reporting"
      ]
    },
    {
      name: "Growth",
      priceMonthly: "5,999",
      priceYearly: "57,999",
      desc: "Highly recommended for small teams who seek to upgrade their time & performance.",
      button: "Get started",
      isPrimary: true,
      badge: "30 days free trial",
      featuresHeader: "Free plan features, plus:",
      features: [
        "10 Users Included",
        "Advanced Segmentation",
        "Unlimited Automation",
        "AI Chatbot Builder",
        "CRM Integrations",
        "Full Analytics",
        "Priority Support"
      ]
    },
    {
      name: "Scale",
      priceMonthly: "Custom",
      priceYearly: "Custom",
      isCustom: true,
      desc: "Robust scheduling for larger teams looking to have more control, privacy & security.",
      button: "Contact us",
      isPrimary: false,
      featuresHeader: "Organization plan features, plus:",
      features: [
        "Unlimited Users",
        "Dedicated CSM",
        "Custom API Setup",
        "SLA Support",
        "Enterprise Security",
        "Custom Reporting",
        "Multi-brand Support"
      ]
    }
  ];

  const plansList = propPlans && propPlans.length > 0 ? propPlans : defaultPlans;

  const plans = plansList.map(plan => {
    const isCustom = plan.isCustom || plan.priceMonthly === 'Custom';
    return {
      ...plan,
      price: isCustom ? "Custom" : (billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly),
      isCustom
    };
  });

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-brand-glow blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight font-extrabold text-slate-900 mb-5 tracking-tight">
              Pricing <span className="text-transparent bg-clip-text bg-brand-gradient">Options</span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-md mx-auto leading-relaxed">
              Choose the subscription plan that suits your needs
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-slate-200/60 border border-slate-300/40 p-1 rounded-full inline-flex relative items-center">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 z-10 ${
                  billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {billingCycle === 'monthly' && (
                  <motion.div 
                    layoutId="active-pricing-pill" 
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-slate-200/50" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 z-10 flex items-center gap-1 ${
                  billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {billingCycle === 'yearly' && (
                  <motion.div 
                    layoutId="active-pricing-pill" 
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-slate-200/50" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Annually <span className="text-brand-600 bg-brand-50 border border-brand-100 rounded px-1.5 py-0.5 text-[9px] font-extrabold ml-1">Save 20% 🔥</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`flex flex-col p-8 bg-white border rounded-[2.5rem] relative transition-all duration-300 ${
                plan.isPrimary 
                  ? 'border-brand-500 shadow-premium z-10 md:-translate-y-4' 
                  : 'border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-premium'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
               {plan.badge && (
                 <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white border border-brand-400 px-5 py-1 rounded-full text-[10px] font-extrabold shadow-md uppercase tracking-wider whitespace-nowrap z-20">
                   {plan.badge}
                 </div>
               )}

               <div className="mb-8">
                 <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                 <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Starts at</div>
                 <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {plan.isCustom ? '' : '₹'}{plan.price}
                    </span>
                    {!plan.isCustom && <span className="text-slate-400 text-xs font-semibold">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>}
                 </div>
                 <p className="text-slate-500 text-xs leading-relaxed min-h-[50px] font-light">{plan.desc}</p>
               </div>

               <motion.button 
                 className={`w-full py-3.5 rounded-xl font-bold text-xs mb-8 transition-all ${
                    plan.isPrimary 
                        ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20' 
                        : 'bg-slate-50 text-slate-800 border border-slate-200 hover:border-brand-500 hover:bg-white hover:text-brand-600'
                 }`}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
               >
                 {plan.button}
               </motion.button>

               <div className="border-t border-slate-100 pt-8 flex-1">
                 <p className="text-xs font-bold text-slate-900 mb-4 uppercase tracking-wider">{plan.featuresHeader}</p>
                 <ul className="space-y-3.5">
                   {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-3 text-xs text-slate-500 font-light leading-relaxed">
                       <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;