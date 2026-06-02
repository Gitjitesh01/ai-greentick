import React from 'react';
import { BadgeCheck, Twitter, Linkedin, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: any) => void;
  data: {
    desc: string;
    copyright: string;
    twitterUrl: string;
    linkedinUrl: string;
    facebookUrl: string;
  };
}

const Footer: React.FC<FooterProps> = ({ onNavigate, data }) => {
  const desc = data?.desc || "The complete WhatsApp Marketing Suite for modern teams. Broadcasts, Chatbots, and Shared Inbox in one place.";
  const copyright = data?.copyright || `© ${new Date().getFullYear()} AI Greentick. All rights reserved.`;
  const twitterUrl = data?.twitterUrl || "#";
  const linkedinUrl = data?.linkedinUrl || "#";
  const facebookUrl = data?.facebookUrl || "#";

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
             <div className="flex items-center gap-1.5 mb-4 group cursor-default" onClick={() => handleNav('home')}>
                <div className="relative">
                  <BadgeCheck className="w-8 h-8 text-white fill-brand-600" />
                </div>
                <span className="font-bold text-xl text-slate-900">
                  <span className="text-brand-600">ai</span>Greentick
                </span>
             </div>
             <p className="text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
               {desc}
             </p>
             <div className="flex gap-4">
               <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600 transition-colors"><Twitter className="w-5 h-5" /></a>
               <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
               <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600 transition-colors"><Facebook className="w-5 h-5" /></a>
             </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-base">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button onClick={() => handleNav('features')} className="hover:text-brand-600 text-left">Features Overview</button></li>
              <li><button onClick={() => handleNav('features')} className="hover:text-brand-600 text-left">Shared Inbox</button></li>
              <li><button onClick={() => handleNav('broadcasts')} className="hover:text-brand-600 text-left">Broadcasts</button></li>
              <li><button onClick={() => handleNav('features')} className="hover:text-brand-600 text-left">Chatbots</button></li>
              <li><button onClick={() => handleNav('features')} className="hover:text-brand-600 text-left">Automations</button></li>
              <li><button onClick={() => handleNav('pricing')} className="hover:text-brand-600 text-left">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-base">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button onClick={() => handleNav('about')} className="hover:text-brand-600 text-left">About Us</button></li>
              <li><button onClick={() => handleNav('solutions')} className="hover:text-brand-600 text-left">Solutions</button></li>
              <li><button onClick={() => handleNav('home')} className="hover:text-brand-600 text-left">Customers</button></li>
              <li><button onClick={() => handleNav('careers')} className="hover:text-brand-600 text-left">Careers</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-brand-600 text-left">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-base">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button onClick={() => handleNav('blog')} className="hover:text-brand-600 text-left">Blog</button></li>
              <li><button onClick={() => handleNav('compare')} className="hover:text-brand-600 text-left font-medium text-brand-600">Compare vs WATI</button></li>
              <li><a href="#" className="hover:text-brand-600">Playbooks</a></li>
              <li><a href="#" className="hover:text-brand-600">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-600">API Docs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            {copyright}
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-brand-600">Privacy Policy</a>
            <a href="#" className="hover:text-brand-600">Terms of Service</a>
            <a href="http://localhost:4000" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 font-semibold transition-colors">Admin Panel</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;