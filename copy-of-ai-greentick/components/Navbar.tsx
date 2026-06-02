import React, { useState, useEffect } from 'react';
import { Menu, X, BadgeCheck, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'pricing' | 'blog' | 'solutions' | 'about' | 'contact' | 'careers' | 'broadcasts' | 'features' | 'compare' | 'admin';
  onNavigate?: (page: 'home' | 'pricing' | 'blog' | 'solutions' | 'about' | 'contact' | 'careers' | 'broadcasts' | 'features' | 'compare' | 'admin') => void;
  onBookDemo?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onBookDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page: any, hash?: string) => {
    if (onNavigate) onNavigate(page);
    setMobileMenuOpen(false);
    
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, hash.startsWith('#') && page === currentPage ? 0 : 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDarkHero = ['home', 'solutions', 'careers'].includes(currentPage);
  const useDarkText = isScrolled || !isDarkHero;

  const navClass = isScrolled 
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200' 
    : 'bg-transparent border-b border-transparent';
    
  const textClass = useDarkText ? 'text-slate-700 hover:text-brand-600' : 'text-slate-200 hover:text-white';
  const logoClass = useDarkText ? 'text-slate-900' : 'text-white';

  const dropdownItemClass = "block px-5 py-2.5 text-sm text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors cursor-pointer font-medium";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center gap-1.5 cursor-pointer" onClick={() => handleNavigation('home')}>
            <BadgeCheck className="w-9 h-9 text-white fill-brand-500" strokeWidth={2.5} />
            <span className={`font-bold text-2xl tracking-tight transition-colors ${logoClass}`}>
              <span className="text-brand-500">ai</span>Greentick
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-9">
            <div className="relative group">
              <button className={`flex items-center gap-1 text-base font-semibold transition-colors ${textClass}`} onClick={() => handleNavigation('features')}>
                Features <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-4 w-64 bg-white shadow-2xl border border-slate-100 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="py-2">
                  <a onClick={() => handleNavigation('features')} className={dropdownItemClass}>Features Overview</a>
                  <a onClick={() => handleNavigation('broadcasts')} className={dropdownItemClass}>WhatsApp Broadcasts</a>
                  <a onClick={() => handleNavigation('features', '#features-detailed-overview')} className={dropdownItemClass}>Shared Team Inbox</a>
                  <a onClick={() => handleNavigation('features', '#features-detailed-overview')} className={dropdownItemClass}>AI Chatbot Builder</a>
                </div>
              </div>
            </div>
            <button onClick={() => handleNavigation('solutions')} className={`text-base font-semibold transition-colors ${textClass}`}>Solutions</button>
            <button onClick={() => handleNavigation('pricing')} className={`text-base font-semibold transition-colors ${textClass}`}>Pricing</button>
            <button onClick={() => handleNavigation('blog')} className={`text-base font-semibold transition-colors ${textClass}`}>Blog</button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={onBookDemo} className={`text-base font-bold transition-colors ${textClass} px-4`}>Login</button>
            <button onClick={() => handleNavigation('home', '#pricing')} className="bg-brand-500 hover:bg-brand-600 text-white px-7 py-3 rounded-full text-base font-bold transition-all shadow-md active:scale-95">
              Try for Free
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={useDarkText ? 'text-slate-600' : 'text-white'}>
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white absolute w-full shadow-2xl border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-12 space-y-2">
            <button onClick={() => handleNavigation('features')} className="block w-full text-left px-4 py-4 text-xl font-bold text-slate-800">Features</button>
            <button onClick={() => handleNavigation('solutions')} className="block w-full text-left px-4 py-4 text-xl font-bold text-slate-800 border-t border-slate-50">Solutions</button>
            <button onClick={() => handleNavigation('pricing')} className="block w-full text-left px-4 py-4 text-xl font-bold text-slate-800 border-t border-slate-50">Pricing</button>
            <button onClick={() => handleNavigation('blog')} className="block w-full text-left px-4 py-4 text-xl font-bold text-slate-800 border-t border-slate-50">Blog</button>
            <div className="pt-8 flex flex-col gap-4">
              <button onClick={() => handleNavigation('home', '#pricing')} className="w-full bg-brand-500 text-white py-4 rounded-xl font-bold text-lg">Try for Free</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;