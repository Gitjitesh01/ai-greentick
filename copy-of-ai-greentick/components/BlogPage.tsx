import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ArrowRight, Headphones, LayoutTemplate, BarChart3, ShoppingBag, Heart, Zap, X, Filter, SlidersHorizontal, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS, CATEGORIES, renderVisual } from './blogData.tsx';
import BlogDetailPage from './BlogDetailPage.tsx';

interface BlogPageProps {
  posts?: any[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const activePosts = posts && posts.length > 0 ? posts : BLOG_POSTS;

  // Navigation State
  const [activePostId, setActivePostId] = useState<number | null>(null);

  // Filter & Sort State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // UI States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter & Sort Logic
  const filteredPosts = useMemo(() => {
    return activePosts
      .filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [activePosts, selectedCategory, sortOrder, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Helper function to highlight text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="bg-emerald-100 text-emerald-900 px-0.5 rounded">{part}</span> : part
        )}
      </span>
    );
  };

  if (activePostId !== null) {
    const post = activePosts.find(p => p.id === activePostId);
    if (post) {
      return (
        <BlogDetailPage 
          post={post} 
          onBack={() => {
            setActivePostId(null);
            window.scrollTo(0, 0);
          }} 
        />
      );
    }
  }

  return (
    <div className="bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-50 py-20 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              The <span className="text-brand-600">GreenTick</span> Blog
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Strategies, insights and guides to help you master WhatsApp marketing and grow your business.
            </p>
          </motion.div>

          {/* Large Search Interface */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search guides, tips and updates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 shadow-xl transition-all bg-white text-lg"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- FILTER BAR --- */}
        <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md py-4 mb-10 border-b border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Category Pills - Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0 px-1">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'All' 
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Filter Desktop Actions */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:border-brand-500 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 z-50"
                    >
                      <button 
                        onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${sortOrder === 'newest' ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50'}`}
                      >
                        Newest First
                      </button>
                      <button 
                        onClick={() => { setSortOrder('oldest'); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${sortOrder === 'oldest' ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50'}`}
                      >
                        Oldest First
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          <AnimatePresence>
            {(selectedCategory !== 'All' || searchQuery) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-50"
              >
                <span className="text-sm font-bold text-slate-400">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-brand-100">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3" /></button>
                  </div>
                )}
                {searchQuery && (
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                  </div>
                )}
                <button 
                  onClick={clearFilters}
                  className="text-xs font-bold text-slate-500 hover:text-red-500 underline underline-offset-4"
                >
                  Clear All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- BLOG GRID --- */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.div 
                    layout
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActivePostId(post.id)}
                    className="group cursor-pointer bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:border-brand-200 transition-all"
                  >
                    <div className="p-2">
                      {post.image ? (
                        <div className="rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border aspect-video bg-slate-50">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-xl" />
                        </div>
                      ) : (
                        renderVisual(post.visualType)
                      )}
                    </div>
                    
                    <div className="p-8 pt-2 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                          post.theme === 'blue' ? 'bg-blue-50 text-blue-600' :
                          post.theme === 'purple' ? 'bg-purple-50 text-purple-600' :
                          post.theme === 'pink' ? 'bg-pink-50 text-pink-600' :
                          post.theme === 'green' ? 'bg-emerald-50 text-emerald-600' :
                          post.theme === 'orange' ? 'bg-orange-50 text-orange-600' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {post.category}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">
                        {highlightText(post.title, searchQuery)}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {highlightText(post.excerpt, searchQuery)}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-brand-600 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                          READ ARTICLE <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                            {/* User icon imported from lucide-react */}
                            <User className="w-3 h-3 text-slate-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-24 text-center"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    We couldn't find any results for <span className="font-bold text-slate-700">"{searchQuery}"</span> in {selectedCategory === 'All' ? 'all categories' : selectedCategory}.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="bg-brand-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-brand-600 transition-all"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* --- NEWSLETTER CTA --- */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 animate-grid-scroll" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20' fill='none' stroke='%23ffffff'%3e%3cpath d='M0 .5H20M.5 0V20' /%3e%3c/svg%3e")` }}></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-[24px] md:text-5xl font-bold text-white mb-6">Master WhatsApp Marketing</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Get the latest strategies, case studies and feature updates delivered to your inbox every fortnight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your business email" 
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20">
              Join 5000+ Marketers
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-6">Join a community of high-growth brands. No spam, ever.</p>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;