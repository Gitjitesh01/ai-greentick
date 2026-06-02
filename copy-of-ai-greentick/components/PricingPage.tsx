
import React, { useState } from 'react';
import { 
  Check, X, ChevronDown, ChevronUp, Play, ExternalLink, MessageSquare, 
  Shield, HelpCircle, ArrowRight, Percent, UserCheck, Bot, Server, ShieldCheck 
} from 'lucide-react';

interface PricingPageProps {
  plans?: any[];
}

const PricingPage: React.FC<PricingPageProps> = ({ plans: propPlans }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="w-5 h-5 text-brand-600" strokeWidth={2.5} />;
    if (value === false) return <X className="w-5 h-5 text-slate-300" strokeWidth={2.5} />;
    return <span className="font-semibold text-slate-700">{value}</span>;
  };

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
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* --- SECTION 1: HERO --- */}
      <section id="pricing-hero" className="pt-24 pb-12 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Pricing That Grows With You
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that works for you — upgrade anytime as your team and projects evolve, so you're always ready for what's next.
          </p>

          <div className="flex justify-center mb-8">
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
      </section>

      {/* --- SECTION 3: PRICING PLANS --- */}
      <section id="pricing-plans" className="pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`flex flex-col p-8 bg-white border rounded-[2rem] h-full relative transition-all duration-300 ${
                  plan.isPrimary 
                    ? 'border-brand-200 shadow-xl z-10 md:-translate-y-4' 
                    : 'border-slate-200 shadow-sm hover:shadow-lg'
                }`}
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
                     {plan.features.map((feature: string, i: number) => (
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

      {/* --- SECTION 4: FEATURE COMPARISON TABLE --- */}
      <section id="pricing-features-compare" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-8 px-6 align-bottom w-[30%]">
                    <span className="text-3xl font-bold text-slate-900">Features</span>
                  </th>
                               <th className="text-center py-8 px-6 align-bottom w-[23%]">
                    <div className="flex flex-col items-center gap-4 mb-2">
                      <span className="text-xl font-bold text-slate-900">{plansList[0]?.name || "Starter"} Plan</span>
                      <button className="w-full max-w-[140px] py-3 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 bg-white transition-all shadow-sm">
                        {plansList[0]?.button || "Get Started"}
                      </button>
                    </div>
                  </th>

                  <th className="text-center py-8 px-6 align-bottom w-[23%] bg-brand-50/30 rounded-t-3xl relative">
                    <div className="flex flex-col items-center gap-4 mb-2">
                      <span className="text-xl font-bold text-slate-900">{plansList[1]?.name || "Growth"} Plan</span>
                      <button className="w-full max-w-[140px] py-3 rounded-full bg-[#1e1b4b] text-sm font-bold text-white hover:bg-brand-600 shadow-md transition-all">
                        {plansList[1]?.button || "Get Started"}
                      </button>
                    </div>
                  </th>

                  <th className="text-center py-8 px-6 align-bottom w-[23%]">
                    <div className="flex flex-col items-center gap-4 mb-2">
                      <span className="text-xl font-bold text-slate-900">{plansList[2]?.name || "Enterprise"} Plan</span>
                      <button className="w-full max-w-[140px] py-3 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 bg-white transition-all shadow-sm">
                        {plansList[2]?.button || "Contact Us"}
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: "WhatsApp Number", s: "1", g: "1", e: "Multiple" },
                  { label: "Users Included", s: "3", g: "10", e: "Unlimited" },
                  { label: "Broadcasts", s: true, g: true, e: true },
                  { label: "Automation", s: false, g: true, e: true },
                  { label: "Chatbots", s: false, g: true, e: true },
                  { label: "Integrations", s: "Basic", g: "CRM + Zapier", e: "All + Custom" },
                  { label: "Support", s: "Standard", g: "Priority", e: "Dedicated CSM" },
                  { label: "API Access", s: false, g: true, e: true },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 px-6 text-slate-600 font-medium text-base">{row.label}</td>
                    <td className="py-6 px-6 text-center">
                      <div className="flex justify-center">
                        {renderCell(row.s)}
                      </div>
                    </td>
                    <td className={`py-6 px-6 text-center ${i === 7 ? 'rounded-b-3xl' : ''} bg-brand-50/30`}>
                      <div className="flex justify-center">
                         {renderCell(row.g)}
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <div className="flex justify-center">
                         {renderCell(row.e)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* --- SECTION 5: WHATSAPP API CHARGES --- */}
      <section id="pricing-credits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F9F9F7] rounded-lg border border-[#E5E5E0] p-8 md:p-12">
                <div className="mb-10">
                    <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-[#38332E] mb-2">WhatsApp Business API <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Conversational Cost Pricing</span></h2>
                    <p className="text-[#645D55] text-lg">WhatsApp charges additional charges per conversation</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-10">
                    <div>
                        <h3 className="text-lg font-bold text-[#38332E] mb-3">User initiated conversation</h3>
                        <p className="text-[#645D55] leading-relaxed">
                            Whenever a business replies to a user within the 24 hour customer service window, that message initiates a user-initiated conversation
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#38332E] mb-3">Business initiated conversation</h3>
                        <p className="text-[#645D55] leading-relaxed">
                            A conversation that initiates from a business sending a user a message outside the 24-hour customer service window.
                        </p>
                    </div>
                </div>

                <div>
                    <a href="#" className="inline-flex items-center text-[#15803D] font-bold hover:underline hover:text-[#166534] text-lg transition-colors">
                        View pricing by country <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 6: ENTERPRISE (Moved above FAQs) --- */}
      <section id="pricing-enterprise" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">
                Looking for <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Enterprise Pricing?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                We offer custom pricing for large teams, agencies managing multiple brands or businesses needing advanced automation and custom integrations.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                  {/* Feature 1 */}
                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Percent className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 mb-1">Volume Discounts</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">Better rates for high message volumes.</p>
                      </div>
                  </div>
                   {/* Feature 2 */}
                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                          <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 mb-1">Dedicated Onboarding</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">Personal setup & team training.</p>
                      </div>
                  </div>
                   {/* Feature 3 */}
                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                          <Bot className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 mb-1">Custom Chatbot Flows</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">Tailored automation for your needs.</p>
                      </div>
                  </div>
                   {/* Feature 4 */}
                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                          <Server className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 mb-1">Private API Setup</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">Secure, isolated infrastructure.</p>
                      </div>
                  </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-auto flex-shrink-0 lg:min-w-[450px]">
              <div className="bg-[#0f172a] p-10 rounded-3xl shadow-2xl text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Let's build a custom plan</h3>
                  <p className="text-slate-400 mb-8">Get a solution tailored to your scale.</p>
                  
                  <button className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-50 transition-colors mb-6 text-lg">
                      Talk to Sales
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                      <ShieldCheck className="w-4 h-4" /> Priority Support Included
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 7: FAQS --- */}
      <section id="pricing-faqs" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-4">Frequently Asked <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Questions</span></h2>
            <p className="text-slate-600">Have questions about our pricing? We have answers.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is the WhatsApp API included in the plan?", a: "No. WhatsApp charges conversation fees separately. You only pay us for platform usage." },
              { q: "Can I upgrade or downgrade anytime?", a: "Yes, you can change your plan whenever needed." },
              { q: "Do I need a verified Facebook Business account?", a: "Yes, for WhatsApp API onboarding we guide you through the process." },
              { q: "Is there a free trial?", a: "Yes, you can explore the platform with sample credits." },
              { q: "Do unused conversations carry over?", a: "No, WhatsApp charges per conversation category and usage." }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-lg">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {openFaq === i && (
                  <div className="p-5 pt-0 bg-white text-slate-600 text-base leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: FINAL CTA --- */}
      <section id="pricing-cta-final" className="py-24 bg-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-[24px] md:text-[42px] leading-tight md:leading-[50.4px] font-bold text-slate-900 mb-6">Start Your WhatsApp <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Journey</span> Today</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Choose a plan, connect your WhatsApp number and start sending campaigns in minutes. No setup fee. No commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600 px-10 py-4 rounded-xl text-lg font-bold transition-all">
                Book a Demo
              </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default PricingPage;
