import React, { useState } from 'react';
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
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[1.2] font-bold text-slate-900 mb-4 tracking-tight">
            Pricing <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Options</span>
          </h2>
          <p className="text-lg text-slate-600">Choose the subscription plan that suits your needs</p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-slate-100 p-1.5 rounded-full inline-flex relative items-center">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1 ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Annually <span className="text-blue-600 ml-1">Save 20% Off 🔥</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col p-8 bg-white border rounded-[2rem] h-full relative transition-all duration-300 ${plan.isPrimary ? 'border-brand-200 shadow-xl z-10 md:-translate-y-4' : 'border-slate-200 shadow-sm hover:shadow-lg'}`}
            >
               {plan.badge && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-lg whitespace-nowrap z-20">
                   {plan.badge}
                 </div>
               )}

               <div className="mb-8">
                 <h3 className="text-xl font-medium text-slate-900 mb-2">{plan.name}</h3>
                 <div className="text-sm text-slate-500 mb-1">Starts at</div>
                 <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-bold text-slate-900">
                        {plan.isCustom ? '' : '₹'}{plan.price}
                    </span>
                    {!plan.isCustom && <span className="text-slate-500 text-sm">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>}
                 </div>
                 <p className="text-slate-600 text-sm leading-relaxed min-h-[60px]">{plan.desc}</p>
               </div>

               {/* Standardized Card Button Size */}
               <button 
                 className={`w-full py-4 rounded-xl font-bold mb-8 transition-all shadow-sm ${
                    plan.isPrimary 
                        ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-brand-500/20 hover:shadow-lg' 
                        : 'bg-white text-slate-900 border border-slate-200 hover:border-brand-500 hover:text-brand-600'
                 }`}
               >
                 {plan.button}
               </button>

               <div className="border-t border-slate-100 pt-8 flex-1">
                 <p className="text-sm font-medium text-slate-900 mb-4">{plan.featuresHeader}</p>
                 <ul className="space-y-4">
                   {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                       <Check className="w-5 h-5 text-slate-900 shrink-0" strokeWidth={1.5} />
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;