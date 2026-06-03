import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, HelpCircle, FileText, CheckCircle2, Clock, Zap, Users, BarChart3, Globe, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  data?: {
    hero: {
      title: string;
      desc: string;
      primaryBtn: string;
    };
    faqs: { q: string; a: string }[];
  };
}

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    lookingFor: 'Sales Enquiry',
    message: ''
  });

  // Error State
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email address is required.';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required.';
        else if (value.trim().length < 10) error = 'Please enter a valid phone number.';
        break;
      case 'message':
        if (!value.trim()) error = 'Message cannot be empty.';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error as user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) return;

    // Post lead details to the backend Express server
    setIsSubmitting(true);
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        type: formData.lookingFor,
        message: formData.message
      })
    })
    .then(res => {
      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          lookingFor: 'Sales Enquiry',
          message: ''
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to submit message. Please try again later.');
      }
    })
    .catch(() => {
      alert('Error connecting to server. Please check if backend is running.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const faqs = data?.faqs && data.faqs.length > 0 ? data.faqs : [
    {
      q: "Do you offer a free trial?",
      a: "Yes, we offer a 14-day free trial with full access to all features so you can experience the platform before committing."
    },
    {
      q: "How long does verification take?",
      a: "Meta verification usually takes 2-5 business days. We handle the submission process for you to ensure everything goes smoothly."
    },
    {
      q: "Can I integrate AI Greentick with my CRM?",
      a: "Absolutely. We support native integrations with major CRMs like HubSpot and Salesforce, plus 5000+ apps via Zapier."
    },
    {
      q: "What support channels are available?",
      a: "We offer email and chat support on all plans. Priority phone support and dedicated account managers are available on Growth and Enterprise plans."
    }
  ];

  const defaultHeroData = {
    title: 'We’re Here to Help Succeed on WhatsApp',
    desc: 'Build rich customer profiles, automate responses, and manage your team efficiently. Whether you have questions about pricing, onboarding or integrations — our team is ready to assist.',
    primaryBtn: 'Talk to Sales'
  };

  const heroData = {
    title: data?.hero?.title || defaultHeroData.title,
    desc: data?.hero?.desc || defaultHeroData.desc,
    primaryBtn: data?.hero?.primaryBtn || defaultHeroData.primaryBtn
  };

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* Combined Hero & Form Section */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-50 skew-x-12 origin-top transform translate-x-20 -z-10 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Text - Sticky on desktop */}
            <div className="pt-8 lg:sticky lg:top-32 self-start">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.15] tracking-tight">
                {heroData.title}
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                {heroData.desc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <button className="bg-slate-900 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                   {heroData.primaryBtn}
                 </button>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative">
               {isSuccess && (
                 <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 text-center">Thanks for reaching out. Our team will get back to you within 24 working hours.</p>
                    <button 
                        onClick={() => setIsSuccess(false)}
                        className="mt-6 text-brand-600 font-bold hover:underline"
                    >
                        Send another message
                    </button>
                 </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-900 flex justify-between">
                            Full Name*
                            {errors.fullName && <span className="text-[10px] text-red-500 font-medium">Required</span>}
                        </label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="John Doe" 
                          className={`w-full px-4 py-3 rounded-lg border outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-white ${
                            errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                          }`} 
                        />
                        {errors.fullName && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-900 flex justify-between">
                            Email Address*
                            {errors.email && <span className="text-[10px] text-red-500 font-medium">Invalid</span>}
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="john@company.com" 
                          className={`w-full px-4 py-3 rounded-lg border outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-white ${
                            errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                     </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-900 flex justify-between">
                            Phone Number*
                            {errors.phone && <span className="text-[10px] text-red-500 font-medium">Required</span>}
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="+91 98765 43210" 
                          className={`w-full px-4 py-3 rounded-lg border outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-white ${
                            errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                          }`} 
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                      </div>
                       <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-900">Company Name</label>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc." 
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-white" 
                        />
                      </div>
                  </div>

                  {/* Row 3: What are you looking for? */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-900">What are you looking for?</label>
                    <div className="relative">
                      <select 
                        name="lookingFor"
                        value={formData.lookingFor}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-slate-700 bg-white appearance-none cursor-pointer"
                      >
                         <option value="Sales Enquiry">Sales Enquiry</option>
                         <option value="Technical Support">Technical Support</option>
                         <option value="Partnership Opportunities">Partnership Opportunities</option>
                         <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-900 flex justify-between">
                        Message*
                        {errors.message && <span className="text-[10px] text-red-500 font-medium">Empty</span>}
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your requirements..." 
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all min-h-[120px] text-slate-800 placeholder:text-slate-400 resize-none bg-white ${
                        errors.message ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                  </div>

                  {/* Row 5: Submit Button */}
                  <div className="pt-2">
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#00933c] hover:bg-[#007a32] text-white py-4 rounded-lg font-bold text-lg transition-all shadow-md active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                     >
                       {isSubmitting ? (
                         <>
                            <Zap className="w-5 h-5 animate-pulse" />
                            Sending...
                         </>
                       ) : (
                         'Submit Message'
                       )}
                     </button>
                  </div>

                  <p className="text-center text-slate-400 text-sm mt-4">
                    We usually reply within 24 working hours.
                  </p>
               </form>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Bottom Icons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-4 gap-12">
              
              {/* Item 1 */}
              <div className="space-y-3 group">
                 <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-2 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 text-lg">Quick Response</h3>
                 <p className="text-slate-500 leading-relaxed text-sm">
                   Our team typically responds within 24 working hours to all inquiries.
                 </p>
              </div>

              {/* Item 2 */}
              <div className="space-y-3 group">
                 <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-2 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 text-lg">Fast Onboarding</h3>
                 <p className="text-slate-500 leading-relaxed text-sm">
                   We help you get verified and set up on WhatsApp API in days, not weeks.
                 </p>
              </div>

              {/* Item 3 */}
              <div className="space-y-3 group">
                 <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-2 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 text-lg">Dedicated Support</h3>
                 <p className="text-slate-500 leading-relaxed text-sm">
                   Get support from real humans who understand your business goals.
                 </p>
              </div>

              {/* Item 4 */}
              <div className="space-y-3 group">
                 <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-2 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 text-lg">Custom Solutions</h3>
                 <p className="text-slate-500 leading-relaxed text-sm">
                   Need custom integrations? Our engineering team can help build them.
                 </p>
              </div>

           </div>
        </div>
      </section>

      {/* 3. Office & Details Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-start">
                 {/* Office Details */}
                 <div>
                    <h3 className="text-[42px] leading-[50.4px] font-bold text-slate-900 mb-8">
                      Visit Our <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Office</span>
                    </h3>
                     <div className="flex gap-4 items-start mb-8">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-600 shadow-sm shrink-0">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-lg">AI Greentick HQ</p>
                            <p className="text-slate-600 leading-relaxed mt-1">123, Tech Park Avenue, Sector 45<br/>Gurgaon, Haryana, India - 122003</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-600 shadow-sm shrink-0">
                           <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-lg">Call Us</p>
                            <p className="text-slate-600 mt-1">+91 98765 43210</p>
                            <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Mon-Sat, 9 AM - 7 PM</p>
                        </div>
                     </div>
                 </div>
                 
                 {/* Collapsible FAQ */}
                 <div>
                    <h3 className="text-[42px] leading-[50.4px] font-bold text-slate-900 mb-8">
                      Common <span className="bg-[#01B84B] text-white px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">Questions</span>
                    </h3>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                                <button 
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                                >
                                    <span className={`font-bold text-base pr-4 ${openFaq === i ? 'text-brand-600' : 'text-slate-800'}`}>{faq.q}</span>
                                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                                </button>
                                {openFaq === i && (
                                    <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200 border-t border-slate-50">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;