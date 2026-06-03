import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import SocialProof from './components/SocialProof.tsx';
import ProblemSolution from './components/ProblemSolution.tsx';
import KeyFeatures from './components/KeyFeatures.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import UseCases from './components/UseCases.tsx';
import Metrics from './components/Metrics.tsx';
import Pricing from './components/Pricing.tsx';
import Testimonials from './components/Testimonials.tsx';
import IntegrationsPreview from './components/IntegrationsPreview.tsx';
import Resources from './components/Resources.tsx';
import CTAFinal from './components/CTAFinal.tsx';
import Footer from './components/Footer.tsx';
import PricingPage from './components/PricingPage.tsx';
import BlogPage from './components/BlogPage.tsx';
import SolutionsPage from './components/SolutionsPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import CareersPage from './components/CareersPage.tsx';
import BroadcastsPage from './components/features/BroadcastsPage.tsx';
import FeaturesPage from './components/FeaturesPage.tsx';
import ComparePage from './components/ComparePage.tsx';
import { BLOG_POSTS } from './components/blogData.tsx';

// --- DEFAULTS ACCORDING TO STATIC DESIGNS ---
const DEFAULT_HERO = {
  badge: "WHATSAPP MARKETING SUITE FOR MODERN TEAMS",
  title: "Grow Faster With\nSmarter WhatsApp Conversations",
  subtitle: "Send high-delivery broadcasts, manage every chat in a shared inbox and automate replies with AI chatbots. Built for agencies and D2C brands.",
  primaryCta: "Start Free Trial",
  secondaryCta: "Book A Demo"
};

const DEFAULT_PLANS = [
  {
    name: "Starter",
    priceMonthly: "2,499",
    priceYearly: "23,999",
    isCustom: false,
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
    isCustom: false,
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

const DEFAULT_SOCIAL_PROOF = {
  heading: "Trusted by Agencies, D2C Brands and Service Companies",
  desc: "From early stage startups to established brands, teams use AI Greentick to manage WhatsApp conversations at scale.",
  companies: [
    { name: "Dell", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png", h: "h-8" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png", h: "h-8" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", h: "h-8" },
    { name: "VMware", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/2560px-Vmware.svg.png", h: "h-6" },
    { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png", h: "h-8" },
    { name: "PhonePe", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png", h: "h-10" }
  ]
};

const DEFAULT_PROBLEM_SOLUTION = {
  badge: "THE PROBLEM & THE SOLUTION",
  probTitle: "The Usual Problems with WhatsApp",
  probDesc: "Most businesses struggle with manual processes that don't scale.",
  solTitle: "How AI Greentick Helps Your Team Win",
  solDesc: "Turn WhatsApp into your most profitable revenue channel with tools built for growth.",
  problems: [
    { title: "Multiple People, One Phone", desc: "Sharing a single physical device means missed chats, slow replies, and zero accountability." },
    { title: "No Visibility on Sales", desc: "You have no idea which leads are converting or how your support team is performing." },
    { title: "Slow Manual Broadcasts", desc: "Copy-pasting messages to hundreds of customers is tedious, risky, and gets you blocked." }
  ],
  solutions: [
    { title: "Shared Team Inbox", desc: "Access one WhatsApp number from multiple devices. Assign chats, add private notes, and tag teammates." },
    { title: "Smart Analytics", desc: "See exactly who opened, clicked, and replied to your broadcasts. Use data to improve campaigns." },
    { title: "24/7 Automation", desc: "Let AI bots handle FAQs, qualify leads, and schedule appointments while your team sleeps." }
  ]
};

const DEFAULT_KEY_FEATURES = {
  badge: "PRODUCT OVERVIEW",
  title: "Everything You Need To Win on WhatsApp",
  desc: "AI Greentick bundles the key tools your team needs to turn WhatsApp into a serious growth channel.",
  features: [
    { title: "WhatsApp Broadcasts", desc: "Send approved promotional and transactional campaigns to thousands with high delivery and clear reporting." },
    { title: "Shared Team Inbox", desc: "Manage every conversation from one number with assignments, notes and response tracking." },
    { title: "AI Chatbot Builder", desc: "Build flows without coding to automate FAQs, lead capture and routing." },
    { title: "Campaign Manager", desc: "Track delivery, clicks, replies and conversions across every WhatsApp campaign." },
    { title: "WhatsApp Automation", desc: "Trigger personalised messages based on time, actions, tags and customer journeys." },
    { title: "Integrations", desc: "Connect AI Greentick with Shopify, Zapier, APIs and your existing tech stack." }
  ]
};

const DEFAULT_HOW_IT_WORKS = {
  title: "How AI Greentick works",
  desc: "Getting started with AI Greentick is simple. Your team can start sending campaigns and handling chats in just a few steps.",
  steps: [
    { number: "1", title: "Connect Your WhatsApp API", desc: "We help you onboard to the official WhatsApp Business API, connect your number and verify your brand. Our team guides you through the process so you go live smoothly." },
    { number: "2", title: "Set Up Broadcasts, Inbox and Bots", desc: "Import your contacts, create your first broadcast, invite your team to the shared inbox and build basic chatbot flows for common questions. Start small and expand as you learn." },
    { number: "3", title: "Track, Optimise and Automate", desc: "Use the campaign manager and analytics to see what is working. Add automation rules for follow ups, reminders and re engagement. Keep improving your messaging based on real performance." },
    { number: "4", title: "Scale Across Teams", desc: "Add more teammates, plug in your CRM or store, and roll out AI Greentick across marketing, sales and support teams." }
  ]
};

const DEFAULT_USE_CASES = {
  badge: "USE CASES",
  title: "Built For Teams That Live on WhatsApp",
  desc: "Whether you are an agency handling many brands, a D2C business running campaigns or a service company managing leads, AI Greentick gives you the tools to stay organised and responsive.",
  useCases: [
    { tag: "Marketing Teams", title: "Travel & Hospitality", desc: "Run product launches, festival sales and event promotions with targeted WhatsApp broadcasts." },
    { tag: "Sales Teams", title: "Education & EdTech", desc: "Capture leads from forms, reply faster with templates and automate follow ups." },
    { tag: "Support Teams", title: "Spa & Salons", desc: "Handle queries from one shared inbox and keep customers updated on bookings." },
    { tag: "Agencies", title: "Agencies & B2B", desc: "Manage multiple client projects, track performance and share clear reports." }
  ]
};

const DEFAULT_METRICS = {
  badge: "OUR PERFORMANCE",
  title: "See The Difference on Your Metrics",
  desc: "Teams using AI Greentick report better response times and higher engagement on WhatsApp compared to using manual methods.",
  items: [
    { value: "2x", label: "Faster Replies", desc: "When using shared inbox and templates compared to manual replies." },
    { value: "98%", label: "Higher Engagement", desc: "High open and read rates. WhatsApp typically sees much stronger engagement than email for many audiences." },
    { value: "100%", label: "Better Team Visibility", desc: "Single view of all chats. No more switching devices or asking who replied to which customer." }
  ]
};

const DEFAULT_TESTIMONIALS = {
  title: "Loved by Businesses Worldwide",
  desc: "See what over 500+ businesses are saying about their experience with AI Greentick.",
  row1: [
    {
      name: "Mila McSabbu",
      role: "Freelance Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "We test and compare the best project management software for collaborating with a team, hitting deadlines."
    },
    {
      name: "Robert Fox",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "AI Greentick transformed how we handle customer support. The shared inbox is a game changer for our remote team."
    },
    {
      name: "Jenny Wilson",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Our response rates doubled within the first week. The automated broadcasts allow us to reach thousands instantly."
    },
    {
      name: "Kristin Watson",
      role: "Operations Head",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Finally, a WhatsApp tool that actually works for teams. The analytics help us understand exactly what our customers want."
    }
  ],
  row2: [
    {
      name: "Guy Hawkins",
      role: "CEO, TechStart",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "We test and compare the best project management software for collaborating with a team, hitting deadlines."
    },
    {
      name: "Courtney Henry",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "The chatbot builder is incredibly intuitive. We set up our FAQ bot in under an hour without any coding knowledge."
    },
    {
      name: "Arlene McCoy",
      role: "Ecommerce Owner",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Managing orders via WhatsApp used to be a nightmare. Now it's our smoothest channel for sales and support."
    },
    {
      name: "Darrell Steward",
      role: "Support Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Highly recommended for any business looking to scale their WhatsApp communication without losing the personal touch."
    }
  ]
};

const DEFAULT_INTEGRATIONS = {
  title: "Works With Your Existing Tools",
  desc: "Connect AI Greentick with your store, CRM and internal tools so your WhatsApp data is never isolated.",
  items: [
    { name: "Shopify", desc: "Sync orders, send delivery updates and recover abandoned carts automatically." },
    { name: "Zapier", desc: "Connect with 5000+ apps to automate workflows without writing a single line of code." },
    { name: "HubSpot", desc: "Sync contacts, log WhatsApp conversations and trigger workflows from your CRM." },
    { name: "Salesforce", desc: "Manage enterprise leads and support tickets directly from your Salesforce dashboard." },
    { name: "WooCommerce", desc: "Instant order notifications and COD confirmation messages for your WordPress store." },
    { name: "Google Sheets", desc: "Export leads, track campaign data and manage contacts in real-time spreadsheets." }
  ]
};

const DEFAULT_CTA_FINAL = {
  badge: "Ready to scale?",
  title: "Turn WhatsApp Into Your Growth Channel",
  desc: "Join hundreds of high-growth brands using AI Greentick to simplify their WhatsApp strategy.",
  primaryCta: "Start Free Trial Today",
  secondaryCta: "Explore Plans"
};

const DEFAULT_FOOTER = {
  desc: "The complete WhatsApp Marketing Suite for modern teams. Broadcasts, Chatbots, and Shared Inbox in one place.",
  copyright: "© 2026 AI Greentick. All rights reserved.",
  twitterUrl: "#",
  linkedinUrl: "#",
  facebookUrl: "#"
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'blog' | 'solutions' | 'about' | 'contact' | 'careers' | 'broadcasts' | 'features' | 'compare' | 'admin'>('home');
  
  // Dynamic Scroll-Linked Parallax transforms for page-wide floating indicators
  const { scrollY } = useScroll();
  const floatY1 = useTransform(scrollY, [0, 5000], [0, 500]);
  const floatY2 = useTransform(scrollY, [0, 5000], [0, -320]);
  const floatY3 = useTransform(scrollY, [0, 5000], [0, 240]);

  const [siteData, setSiteData] = useState<any>({
    hero: DEFAULT_HERO,
    plans: DEFAULT_PLANS,
    blogPosts: BLOG_POSTS,
    socialProof: DEFAULT_SOCIAL_PROOF,
    problemSolution: DEFAULT_PROBLEM_SOLUTION,
    keyFeatures: DEFAULT_KEY_FEATURES,
    howItWorks: DEFAULT_HOW_IT_WORKS,
    useCases: DEFAULT_USE_CASES,
    metrics: DEFAULT_METRICS,
    testimonials: DEFAULT_TESTIMONIALS,
    integrations: DEFAULT_INTEGRATIONS,
    ctaFinal: DEFAULT_CTA_FINAL,
    footer: DEFAULT_FOOTER,
    featuresPage: null,
    broadcastsPage: null,
    sharedTeamInbox: null,
    aiChatbotBuilder: null,
    solutionsPage: null,
    aboutPage: null,
    careersPage: null,
    contactPage: null,
    comparePage: null
  });

  const fetchSiteData = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/content`);
      if (res.ok) {
        const data = await res.json();
        setSiteData({
          hero: data.hero || DEFAULT_HERO,
          plans: data.plans && data.plans.length > 0 ? data.plans : DEFAULT_PLANS,
          blogPosts: data.blogPosts && data.blogPosts.length > 0 ? data.blogPosts : BLOG_POSTS,
          socialProof: data.socialProof || DEFAULT_SOCIAL_PROOF,
          problemSolution: data.problemSolution || DEFAULT_PROBLEM_SOLUTION,
          keyFeatures: data.keyFeatures || DEFAULT_KEY_FEATURES,
          howItWorks: data.howItWorks || DEFAULT_HOW_IT_WORKS,
          useCases: data.useCases || DEFAULT_USE_CASES,
          metrics: data.metrics || DEFAULT_METRICS,
          testimonials: data.testimonials || DEFAULT_TESTIMONIALS,
          integrations: data.integrations || DEFAULT_INTEGRATIONS,
          ctaFinal: data.ctaFinal || DEFAULT_CTA_FINAL,
          footer: data.footer || DEFAULT_FOOTER,
          featuresPage: data.featuresPage || null,
          broadcastsPage: data.broadcastsPage || null,
          sharedTeamInbox: data.sharedTeamInbox || null,
          aiChatbotBuilder: data.aiChatbotBuilder || null,
          solutionsPage: data.solutionsPage || null,
          aboutPage: data.aboutPage || null,
          careersPage: data.careersPage || null,
          contactPage: data.contactPage || null,
          comparePage: data.comparePage || null
        });
      }
    } catch (err) {
      console.warn('Backend server offline, using static content fallback.', err);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  const handleBookDemo = () => {
    setCurrentPage('contact');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-x-hidden">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} onBookDemo={handleBookDemo} />
      
      {/* Scroll-Linked Floating Futuristic Elements (Parallax) */}
      <div className="absolute inset-y-0 inset-x-0 overflow-hidden pointer-events-none -z-0">
        <motion.div 
          style={{ y: floatY1 }}
          className="absolute left-[3%] top-[1400px] w-20 h-20 rounded-full border border-emerald-500/10 bg-gradient-to-tr from-emerald-500/5 to-transparent backdrop-blur-[2px] hidden lg:block"
        />
        <motion.div 
          style={{ y: floatY2 }}
          className="absolute right-[4%] top-[2600px] w-28 h-28 rounded-3xl border border-teal-500/10 bg-gradient-to-br from-teal-500/5 to-transparent backdrop-blur-[1px] rotate-12 hidden lg:block"
        />
        <motion.div 
          style={{ y: floatY3 }}
          className="absolute left-[2%] top-[4000px] w-36 h-12 rounded-full bg-emerald-500/5 blur-[20px] hidden lg:block"
        />
      </div>

      <main className="relative z-10">
        {currentPage === 'home' && (
          <>
            <Hero content={siteData.hero} />
            <SocialProof data={siteData.socialProof} />
            <ProblemSolution data={siteData.problemSolution} />
            <KeyFeatures onNavigate={setCurrentPage} data={siteData.keyFeatures} />
            <HowItWorks data={siteData.howItWorks} />
            <UseCases data={siteData.useCases} />
            <Metrics data={siteData.metrics} />
            <Pricing plans={siteData.plans} />
            <Testimonials data={siteData.testimonials} />
            <IntegrationsPreview data={siteData.integrations} />
            <Resources onNavigate={setCurrentPage} />
            <CTAFinal data={siteData.ctaFinal} />
          </>
        )}
        
        {currentPage === 'pricing' && <PricingPage plans={siteData.plans} />}
        {currentPage === 'blog' && <BlogPage posts={siteData.blogPosts} />}
        {currentPage === 'solutions' && <SolutionsPage data={siteData.solutionsPage} />}
        {currentPage === 'about' && <AboutPage data={siteData.aboutPage} />}
        {currentPage === 'contact' && <ContactPage data={siteData.contactPage} />}
        {currentPage === 'careers' && <CareersPage data={siteData.careersPage} />}
        {currentPage === 'broadcasts' && <BroadcastsPage data={siteData.broadcastsPage} />}
        {currentPage === 'features' && <FeaturesPage data={siteData.featuresPage} sharedTeamInbox={siteData.sharedTeamInbox} aiChatbotBuilder={siteData.aiChatbotBuilder} />}
        {currentPage === 'compare' && <ComparePage data={siteData.comparePage} />}
      </main>
      
      <Footer onNavigate={setCurrentPage} data={siteData.footer} />
    </div>
  );
};

export default App;
