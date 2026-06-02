import React, { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard.tsx';

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

const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    title: "The Key to Aligning Teams and Boosting Efficiency",
    excerpt: "Discover strategies to streamline communication and ensure everyone is on the same page using advanced productivity tools.",
    category: "Business Growth",
    date: "2023-10-24",
    theme: "blue",
    visualType: "productivity",
    author: "Sarah Jenkins",
    readTime: "5 min read",
    content: "Manual processes are the silent killers of productivity..."
  }
];

const DEFAULT_SOCIAL_PROOF = {
  heading: "Trusted by Agencies, D2C Brands and Service Companies",
  desc: "From early stage startups to established brands, teams use AI Greentick to manage WhatsApp conversations at scale.",
  companies: [
    { name: "Dell", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png", h: "h-8" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png", h: "h-8" }
  ]
};

const DEFAULT_PROBLEM_SOLUTION = {
  badge: "THE PROBLEM & THE SOLUTION",
  probTitle: "The Usual Problems with WhatsApp",
  probDesc: "Most businesses struggle with manual processes that don't scale.",
  solTitle: "How AI Greentick Helps Your Team Win",
  solDesc: "Turn WhatsApp into your most profitable revenue channel with tools built for growth.",
  problems: [
    { title: "Multiple People, One Phone", desc: "Sharing a single physical device means missed chats, slow replies, and zero accountability." }
  ],
  solutions: [
    { title: "Shared Team Inbox", desc: "Access one WhatsApp number from multiple devices. Assign chats, add private notes, and tag teammates." }
  ]
};

const DEFAULT_KEY_FEATURES = {
  badge: "PRODUCT OVERVIEW",
  title: "Everything You Need To Win on WhatsApp",
  desc: "AI Greentick bundles the key tools your team needs to turn WhatsApp into a serious growth channel.",
  features: [
    { title: "WhatsApp Broadcasts", desc: "Send approved promotional and transactional campaigns to thousands with high delivery and clear reporting." }
  ]
};

const DEFAULT_HOW_IT_WORKS = {
  title: "How AI Greentick works",
  desc: "Getting started with AI Greentick is simple. Your team can start sending campaigns and handling chats in just a few steps.",
  steps: [
    { number: "1", title: "Connect Your WhatsApp API", desc: "We help you onboard to the official WhatsApp Business API, connect your number and verify your brand." }
  ]
};

const DEFAULT_USE_CASES = {
  badge: "USE CASES",
  title: "Built For Teams That Live on WhatsApp",
  desc: "Whether you are an agency handling many brands, a D2C business running campaigns or a service company managing leads, AI Greentick gives you the tools to stay organised and responsive.",
  useCases: [
    { tag: "MARKETING TEAMS", title: "Travel & Hospitality", desc: "Run product launches, festival sales and event promotions with targeted WhatsApp broadcasts." }
  ]
};

const DEFAULT_METRICS = {
  badge: "OUR PERFORMANCE",
  title: "See The Difference on Your Metrics",
  desc: "Teams using AI Greentick report better response times and higher engagement on WhatsApp compared to using manual methods.",
  items: [
    { value: "2x", label: "Faster Replies", desc: "When using shared inbox and templates compared to manual replies." }
  ]
};

const DEFAULT_TESTIMONIALS = {
  title: "Loved by Businesses Worldwide",
  desc: "See what over 500+ businesses are saying about their experience with AI Greentick.",
  row1: [],
  row2: []
};

const DEFAULT_INTEGRATIONS = {
  title: "Works With Your Existing Tools",
  desc: "Connect AI Greentick with your store, CRM and internal tools so your WhatsApp data is never isolated.",
  items: []
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
  const [siteData, setSiteData] = useState({
    hero: DEFAULT_HERO,
    plans: DEFAULT_PLANS,
    blogPosts: DEFAULT_BLOG_POSTS,
    socialProof: DEFAULT_SOCIAL_PROOF,
    problemSolution: DEFAULT_PROBLEM_SOLUTION,
    keyFeatures: DEFAULT_KEY_FEATURES,
    howItWorks: DEFAULT_HOW_IT_WORKS,
    useCases: DEFAULT_USE_CASES,
    metrics: DEFAULT_METRICS,
    testimonials: DEFAULT_TESTIMONIALS,
    integrations: DEFAULT_INTEGRATIONS,
    ctaFinal: DEFAULT_CTA_FINAL,
    footer: DEFAULT_FOOTER
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
          blogPosts: data.blogPosts && data.blogPosts.length > 0 ? data.blogPosts : DEFAULT_BLOG_POSTS,
          socialProof: data.socialProof || DEFAULT_SOCIAL_PROOF,
          problemSolution: data.problemSolution || DEFAULT_PROBLEM_SOLUTION,
          keyFeatures: data.keyFeatures || DEFAULT_KEY_FEATURES,
          howItWorks: data.howItWorks || DEFAULT_HOW_IT_WORKS,
          useCases: data.useCases || DEFAULT_USE_CASES,
          metrics: data.metrics || DEFAULT_METRICS,
          testimonials: data.testimonials || DEFAULT_TESTIMONIALS,
          integrations: data.integrations || DEFAULT_INTEGRATIONS,
          ctaFinal: data.ctaFinal || DEFAULT_CTA_FINAL,
          footer: data.footer || DEFAULT_FOOTER
        });
      }
    } catch (err) {
      console.warn('Backend server offline, using static content fallback.', err);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AdminDashboard 
        siteData={siteData}
        onRefreshData={fetchSiteData}
        onNavigateHome={() => {
          window.open('http://localhost:3000', '_blank');
        }}
      />
    </div>
  );
};

export default App;
