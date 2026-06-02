import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { BlogPost, renderVisual } from './blogData.tsx';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack }) => {
  const [copied, setCopied] = useState(false);

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(shareUrl);
    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const handleCopy = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Navigation / Progress Bar (Optional) */}
      <div className="fixed top-20 left-0 w-full h-1 bg-slate-100 z-40">
       
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium mb-8 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Blog
        </button>

        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime || '5 min read'}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                {/* Mock Avatar */}
                <svg className="w-full h-full text-slate-400 bg-slate-100 p-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             </div>
             <div className="text-left">
                <p className="text-sm font-bold text-slate-900">{post.author || 'AI Greentick Team'}</p>
                <p className="text-xs text-slate-500">Content Specialist</p>
             </div>
          </div>
        </header>

        {/* Featured Visual */}
        <div className="mb-12 shadow-xl rounded-2xl overflow-hidden">
          {post.image ? (
            <div className="rounded-2xl relative overflow-hidden flex items-center justify-center border aspect-video w-full bg-slate-50">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-2xl" />
            </div>
          ) : (
            renderVisual(post.visualType, true)
          )}
        </div>

        {/* Content & Sidebar Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <article className="md:col-span-8 prose prose-slate prose-lg max-w-none">
            {post.content ? (
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed font-light text-base space-y-4">
                {post.content}
              </div>
            ) : (
              <>
                <p className="lead text-xl text-slate-600 mb-8 font-light leading-relaxed">
                  {post.excerpt} In today's fast-paced digital landscape, efficiency isn't just a goal—it's a necessity. Whether you're managing a remote team or coordinating a complex project, the tools you use can make or break your success.
                </p>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Why Automation Matters</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Manual processes are the silent killers of productivity. From data entry to repetitive follow-ups, these tasks consume valuable time that could be spent on strategic initiatives. By integrating smart automation into your workflow, you free up your team to focus on what really matters: creative problem-solving and customer relationships.
                </p>
                
                <div className="bg-slate-50 border-l-4 border-brand-500 p-6 my-8 rounded-r-xl italic text-slate-700">
                   "The future of work isn't about working harder, it's about working smarter. Automation is the lever that multiplies your team's output."
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Key Benefits of Streamlined Communication</h3>
                <ul className="space-y-2 mb-6 list-disc pl-5 text-slate-600">
                  <li><strong>Reduced Latency:</strong> Instant updates keep everyone aligned.</li>
                  <li><strong>Centralized Data:</strong> No more hunting through email threads for files.</li>
                  <li><strong>Improved Morale:</strong> Removing busywork reduces burnout.</li>
                </ul>

                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600" 
                  alt="Team collaboration meeting" 
                  className="w-full rounded-xl my-8 shadow-md"
                />

                <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementing Change</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Adopting new tools can be challenging. Start small. Identify one bottleneck in your current process—perhaps it's the weekly status report or customer inquiry routing—and apply a targeted solution. Measure the impact, celebrate the win, and then expand.
                </p>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  At AI Greentick, we've seen firsthand how transforming WhatsApp from a chaotic messaging app into a structured business channel can revolutionize operations. It's about meeting your customers where they are, while keeping your sanity intact.
                </p>
              </>
            )}
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            
            {/* Share Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-32">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share this article
              </h3>
              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-100 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors relative"
                  aria-label="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <hr className="border-slate-100 my-6" />

              <h3 className="text-sm font-bold text-slate-900 mb-4">Subscribe to our newsletter</h3>
              <p className="text-xs text-slate-500 mb-4">Get the latest insights delivered to your inbox weekly.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                />
                <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

          </aside>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <section className="mt-20 border-t border-slate-100 pt-16">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-[24px] md:text-3xl font-bold text-slate-900 mb-4">Ready to put these insights into action?</h2>
            <p className="text-slate-600 mb-8">Start your free trial of AI Greentick today and experience the difference.</p>
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand-500/20 transition-all hover:scale-105">
              Start 14-Day Free Trial
            </button>
         </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;