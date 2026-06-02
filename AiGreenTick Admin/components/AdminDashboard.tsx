import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Sliders, Image, AlertCircle, CheckSquare, 
  HelpCircle, Briefcase, BarChart3, CreditCard, MessageSquare, 
  Link, FileText, Award, Compass, Users, LogOut, Save, 
  RefreshCw, Eye, ArrowLeft, Mail, Phone, Building, AlertTriangle,
  ChevronDown, ChevronUp, Trash2, ClipboardList
} from 'lucide-react';

// Import Modular Editors
import HeroEditor from './editors/HeroEditor.tsx';
import SocialProofEditor from './editors/SocialProofEditor.tsx';
import ProblemSolutionEditor from './editors/ProblemSolutionEditor.tsx';
import KeyFeaturesEditor from './editors/KeyFeaturesEditor.tsx';
import HowItWorksEditor from './editors/HowItWorksEditor.tsx';
import UseCasesEditor from './editors/UseCasesEditor.tsx';
import MetricsEditor from './editors/MetricsEditor.tsx';
import PricingEditor from './editors/PricingEditor.tsx';
import TestimonialsEditor from './editors/TestimonialsEditor.tsx';
import IntegrationsEditor from './editors/IntegrationsEditor.tsx';
import BlogEditor from './editors/BlogEditor.tsx';
import CTAFinalEditor from './editors/CTAFinalEditor.tsx';
import FooterEditor from './editors/FooterEditor.tsx';
import LeadsViewer from './editors/LeadsViewer.tsx';

// New Editors
import FeaturesPageEditor from './editors/FeaturesPageEditor.tsx';
import BroadcastsPageEditor from './editors/BroadcastsPageEditor.tsx';
import SharedTeamInboxEditor from './editors/SharedTeamInboxEditor.tsx';
import AiChatbotBuilderEditor from './editors/AiChatbotBuilderEditor.tsx';
import SolutionsPageEditor from './editors/SolutionsPageEditor.tsx';
import AboutPageEditor from './editors/AboutPageEditor.tsx';
import CareersPageEditor from './editors/CareersPageEditor.tsx';
import ContactPageEditor from './editors/ContactPageEditor.tsx';
import ComparePageEditor from './editors/ComparePageEditor.tsx';
import ImageLibrary from './editors/ImageLibrary.tsx';

interface AdminDashboardProps {
  siteData: {
    hero: any;
    plans: any[];
    blogPosts: any[];
    socialProof?: any;
    problemSolution?: any;
    keyFeatures?: any;
    howItWorks?: any;
    useCases?: any;
    metrics?: any;
    testimonials?: any;
    integrations?: any;
    ctaFinal?: any;
    footer?: any;
    [key: string]: any;
  };
  onRefreshData: () => Promise<void>;
  onNavigateHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteData, onRefreshData, onNavigateHome }) => {
  const apiBase = import.meta.env.VITE_API_URL || '';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('admin@aigreentick.com');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [leads, setLeads] = useState<any[]>([]);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | 'saving' | null; message: string }>({ type: null, message: '' });
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    homePage: true,
    featuresSuite: false,
    solutions: false,
    pricing: false,
    blog: false,
    companyPages: false,
    globalSettings: false
  });

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Validate session token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch(`${apiBase}/api/auth/validate`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setIsAuthenticated(true);
          fetchLeads(token);
        } else {
          localStorage.removeItem('admin_token');
        }
      })
      .catch(() => localStorage.removeItem('admin_token'));
    }
  }, []);

  const fetchLeads = async (token: string) => {
    try {
      const res = await fetch(`${apiBase}/api/leads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchLeads(data.token);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Could not connect to backend server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  const showToast = (type: 'success' | 'error' | 'saving', message: string, duration = 3000) => {
    setSaveStatus({ type, message });
    if (type !== 'saving') {
      setTimeout(() => setSaveStatus({ type: null, message: '' }), duration);
    }
  };

  // Generic Save API for all sections
  const handleSaveSection = async (sectionKey: string, sectionData: any) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    showToast('saving', `Saving ${sectionKey} changes to server...`);
    try {
      const res = await fetch(`${apiBase}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [sectionKey]: sectionData
        })
      });

      if (res.ok) {
        showToast('success', 'Changes saved successfully and live on website!');
        await onRefreshData();
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Failed to save updates.');
      }
    } catch (err) {
      showToast('error', 'Error connecting to backend database.');
    }
  };

  const handleDeleteLead = async (id: string) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    if (!confirm('Are you sure you want to delete this lead from the inbox?')) return;

    try {
      const res = await fetch(`${apiBase}/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
        showToast('success', 'Lead removed from database.');
      } else {
        showToast('error', 'Failed to remove lead.');
      }
    } catch (err) {
      showToast('error', 'Network communication error.');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#001c0c] via-[#050505] to-black -z-10"></div>
        
        <button 
          onClick={onNavigateHome}
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Go to Website
        </button>

        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 font-bold text-2xl text-white mb-2">
              <span className="text-emerald-500">ai</span>Greentick
            </div>
            <h2 className="text-xl font-bold text-white">Admin Control Center</h2>
            <p className="text-xs text-slate-400 mt-1">Authorized access only. Sign in with Email & Password.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aigreentick.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl outline-none focus:border-emerald-500 text-white transition-all text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl outline-none focus:border-emerald-500 text-white transition-all text-sm font-mono tracking-widest"
                required
                autoFocus
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-98"
            >
              Sign In to Admin
            </button>
          </form>
          
          <div className="text-center mt-6 text-[10px] text-slate-500">
            Secure connection: admin@aigreentick.com / admin123
          </div>
        </div>
      </div>
    );
  }

  // Accordion Sidebar Groups Config
  const sidebarGroups = [
    {
      id: 'homePage',
      label: 'Home',
      items: [
        { id: 'hero', label: 'Hero Section', icon: Sliders },
        { id: 'socialProof', label: 'Social Proof', icon: Image },
        { id: 'problemSolution', label: 'Problem & Solution', icon: AlertTriangle },
        { id: 'keyFeatures', label: 'Key Features', icon: CheckSquare },
        { id: 'howItWorks', label: 'How It Works', icon: HelpCircle },
        { id: 'useCases', label: 'Use Cases', icon: Briefcase },
        { id: 'metrics', label: 'Metrics', icon: BarChart3 },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
        { id: 'integrations', label: 'Integrations', icon: Link },
        { id: 'ctaFinal', label: 'CTA Section', icon: Award }
      ]
    },
    {
      id: 'featuresSuite',
      label: 'Feature',
      items: [
        { id: 'featuresPage', label: 'Features Overview', icon: ClipboardList },
        { id: 'broadcastsPage', label: 'WhatsApp Broadcasts', icon: Sliders },
        { id: 'sharedTeamInbox', label: 'Shared Team Inbox', icon: Users },
        { id: 'aiChatbotBuilder', label: 'AI Chatbot Builder', icon: MessageSquare }
      ]
    },
    {
      id: 'solutions',
      label: 'Solutions',
      items: [
        { id: 'solutionsPage', label: 'Solutions Page', icon: Compass }
      ]
    },
    {
      id: 'pricing',
      label: 'Pricing',
      items: [
        { id: 'plans', label: 'Pricing Plans', icon: CreditCard }
      ]
    },
    {
      id: 'blog',
      label: 'Blog',
      items: [
        { id: 'blogPosts', label: 'Blog Articles', icon: FileText }
      ]
    },
    {
      id: 'companyPages',
      label: 'Company',
      items: [
        { id: 'aboutPage', label: 'About Us', icon: Building },
        { id: 'careersPage', label: 'Careers', icon: Briefcase },
        { id: 'contactPage', label: 'Contact Us', icon: Mail },
        { id: 'comparePage', label: 'Compare Page', icon: AlertCircle }
      ]
    },
    {
      id: 'globalSettings',
      label: 'Global Settings',
      items: [
        { id: 'footer', label: 'Footer Settings', icon: Compass },
        { id: 'images', label: 'Image Library', icon: Image },
        { id: 'leads', label: 'Leads Inbox', icon: Users, badge: leads.length }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col pt-6 shrink-0 h-screen overflow-y-auto">
        <div className="px-6 mb-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-lg text-white">
            <span className="text-emerald-500">ai</span>Greentick 
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-1.5 py-0.5 text-[9px] uppercase tracking-wider ml-1">Admin</span>
          </div>
        </div>

        <nav className="flex-1 space-y-3 px-3 mb-6">
          {/* Overview Tab (Pinned to top) */}
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'overview' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/15' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Overview Dashboard</span>
          </button>

          {/* Collapsible Groups */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800/50">
            {sidebarGroups.map((group) => {
              const isExpanded = expandedSections[group.id];
              return (
                <div key={group.id} className="space-y-1">
                  <button 
                    type="button"
                    onClick={() => toggleSection(group.id)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-wider transition-colors"
                  >
                    <span>{group.label}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  {isExpanded && (
                    <div className="space-y-1 pl-1 border-l border-slate-800/40 ml-2.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isSelected = activeTab === item.id;
                        return (
                          <button 
                            type="button"
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                              isSelected 
                                ? 'bg-emerald-600/15 text-emerald-400 border-l-2 border-emerald-500 font-bold' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{item.label}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500 text-slate-950 text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-slate-950 shadow-sm">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-850 space-y-2 bg-slate-950 shrink-0">
          <button 
            onClick={onNavigateHome}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/30 text-xs font-bold transition-all"
          >
            <Eye className="w-4 h-4" />
            View Website
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 z-10 shrink-0">
          <h1 className="text-sm font-extrabold text-white capitalize tracking-widest flex items-center gap-2">
            <span>{activeTab.replace(/([A-Z])/g, ' $1')}</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">Manager</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onRefreshData}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
            </button>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Session Active
            </div>
          </div>
        </header>

        {/* TOAST / SAVE STATUS NOTIFICATION */}
        {saveStatus.type && (
          <div className={`p-4 mx-8 mt-6 rounded-xl flex items-center gap-3 border shadow-lg shrink-0 ${
            saveStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
            saveStatus.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
            'bg-blue-500/10 border-blue-500/20 text-blue-400 animate-pulse'
          }`}>
            <RefreshCw className={`w-4 h-4 shrink-0 ${saveStatus.type === 'saving' ? 'animate-spin' : ''}`} />
            <span className="text-xs font-bold">{saveStatus.message}</span>
          </div>
        )}

        {/* CONTENT VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-900/40">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Leads Captured</span>
                    <div className="text-3xl font-extrabold text-white mt-1">{leads.length}</div>
                    <p className="text-slate-500 text-[10px] mt-1">Pending contact enquiries</p>
                  </div>
                  <Users className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
                </div>

                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Blog Posts</span>
                    <div className="text-3xl font-extrabold text-white mt-1">{siteData.blogPosts?.length || 0}</div>
                    <p className="text-slate-500 text-[10px] mt-1">Published articles</p>
                  </div>
                  <FileText className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
                </div>

                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Pricing Tiers</span>
                    <div className="text-3xl font-extrabold text-white mt-1">{siteData.plans?.length || 0}</div>
                    <p className="text-slate-500 text-[10px] mt-1">Active pricing options</p>
                  </div>
                  <CreditCard className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
                </div>
              </div>

              {/* Quick Leads Inbox view */}
              <div className="bg-slate-950/30 border border-slate-800/80 rounded-3xl p-6">
                <h3 className="font-bold text-sm text-white mb-6 uppercase tracking-wider">Recent Enquiries Inbox</h3>
                {leads.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    No leads in the queue.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.slice(0, 4).map((lead) => (
                      <div key={lead.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm text-white">{lead.name}</span>
                            <span className="text-[9px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">{lead.type}</span>
                            <span className="text-[9px] text-slate-500">{new Date(lead.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed font-light">{lead.message}</p>
                          <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-mono">
                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-emerald-500" /> {lead.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-500" /> {lead.phone}</span>
                            {lead.company && <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-emerald-500" /> {lead.company}</span>}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/25 transition-all shrink-0"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {leads.length > 4 && (
                      <button 
                        onClick={() => setActiveTab('leads')}
                        className="text-emerald-500 font-bold text-xs hover:underline block pt-2 uppercase tracking-widest"
                      >
                        View all {leads.length} enquiries →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO */}
          {activeTab === 'hero' && (
            <HeroEditor data={siteData.hero} onSave={(data) => handleSaveSection('hero', data)} />
          )}

          {/* TAB 3: SOCIAL PROOF */}
          {activeTab === 'socialProof' && (
            <SocialProofEditor data={siteData.socialProof} onSave={(data) => handleSaveSection('socialProof', data)} />
          )}

          {/* TAB 4: PROBLEM & SOLUTION */}
          {activeTab === 'problemSolution' && (
            <ProblemSolutionEditor data={siteData.problemSolution} onSave={(data) => handleSaveSection('problemSolution', data)} />
          )}

          {/* TAB 5: KEY FEATURES */}
          {activeTab === 'keyFeatures' && (
            <KeyFeaturesEditor data={siteData.keyFeatures} onSave={(data) => handleSaveSection('keyFeatures', data)} />
          )}

          {/* TAB 6: HOW IT WORKS */}
          {activeTab === 'howItWorks' && (
            <HowItWorksEditor data={siteData.howItWorks} onSave={(data) => handleSaveSection('howItWorks', data)} />
          )}

          {/* TAB 7: USE CASES */}
          {activeTab === 'useCases' && (
            <UseCasesEditor data={siteData.useCases} onSave={(data) => handleSaveSection('useCases', data)} />
          )}

          {/* TAB 8: METRICS */}
          {activeTab === 'metrics' && (
            <MetricsEditor data={siteData.metrics} onSave={(data) => handleSaveSection('metrics', data)} />
          )}

          {/* TAB 9: PRICING PLANS */}
          {activeTab === 'plans' && (
            <PricingEditor data={siteData.plans} onSave={(data) => handleSaveSection('plans', data)} />
          )}

          {/* TAB 10: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <TestimonialsEditor data={siteData.testimonials} onSave={(data) => handleSaveSection('testimonials', data)} />
          )}

          {/* TAB 11: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <IntegrationsEditor data={siteData.integrations} onSave={(data) => handleSaveSection('integrations', data)} />
          )}

          {/* TAB 12: BLOG ARTICLES */}
          {activeTab === 'blogPosts' && (
            <BlogEditor data={siteData.blogPosts} onSave={(data) => handleSaveSection('blogPosts', data)} />
          )}

          {/* TAB 13: CTA FINAL */}
          {activeTab === 'ctaFinal' && (
            <CTAFinalEditor data={siteData.ctaFinal} onSave={(data) => handleSaveSection('ctaFinal', data)} />
          )}

          {/* TAB 14: FOOTER */}
          {activeTab === 'footer' && (
            <FooterEditor data={siteData.footer} onSave={(data) => handleSaveSection('footer', data)} />
          )}

          {/* TAB 15: LEADS INBOX */}
          {activeTab === 'leads' && (
            <LeadsViewer leads={leads} onDeleteLead={handleDeleteLead} />
          )}

          {/* TAB 16: IMAGE LIBRARY */}
          {activeTab === 'images' && (
            <ImageLibrary apiBase={apiBase} />
          )}

          {/* NEW TAB EDITORS */}
          {activeTab === 'featuresPage' && (
            <FeaturesPageEditor data={siteData.featuresPage} onSave={(data) => handleSaveSection('featuresPage', data)} />
          )}

          {activeTab === 'broadcastsPage' && (
            <BroadcastsPageEditor data={siteData.broadcastsPage} onSave={(data) => handleSaveSection('broadcastsPage', data)} />
          )}

          {activeTab === 'sharedTeamInbox' && (
            <SharedTeamInboxEditor data={siteData.sharedTeamInbox} onSave={(data) => handleSaveSection('sharedTeamInbox', data)} />
          )}

          {activeTab === 'aiChatbotBuilder' && (
            <AiChatbotBuilderEditor data={siteData.aiChatbotBuilder} onSave={(data) => handleSaveSection('aiChatbotBuilder', data)} />
          )}

          {activeTab === 'solutionsPage' && (
            <SolutionsPageEditor data={siteData.solutionsPage} onSave={(data) => handleSaveSection('solutionsPage', data)} />
          )}

          {activeTab === 'aboutPage' && (
            <AboutPageEditor data={siteData.aboutPage} onSave={(data) => handleSaveSection('aboutPage', data)} />
          )}

          {activeTab === 'careersPage' && (
            <CareersPageEditor data={siteData.careersPage} onSave={(data) => handleSaveSection('careersPage', data)} />
          )}

          {activeTab === 'contactPage' && (
            <ContactPageEditor data={siteData.contactPage} onSave={(data) => handleSaveSection('contactPage', data)} />
          )}

          {activeTab === 'comparePage' && (
            <ComparePageEditor data={siteData.comparePage} onSave={(data) => handleSaveSection('comparePage', data)} />
          )}

        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;
