"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  X,
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  ChevronDown
} from "lucide-react";

// --- Types ---
interface Article {
  title: string;
  date: string;
  cat: string;
  readTime: string;
  excerpt: string;
  image: string;
  content?: string;
}

export default function NewsPage() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Emergency", "Education", "Reporting", "Livelihoods", "Health"];

  const featuredArticle: Article = {
    title: "Freedom Academy: Transforming Access for 500+ Children in Juba",
    date: "Oct 12, 2025",
    cat: "Education",
    readTime: "5 min read",
    excerpt: "A climate-resilient facility built with local materials opens its doors to displaced youth in Central Equatoria.",
    image: "/images/news/school-opening.jpeg",
    content: "South Sudan's educational landscape reached a major milestone today. In the heart of Juba, the 'Freedom Academy' officially opened its doors. This isn't just a building; it's a climate-resilient structure built with local materials. Over 500 children who were previously out of school due to local displacement now have a permanent place to learn, grow, and heal."
  };

  const allArticles: Article[] = [
    { 
      title: "Rapid WASH Response Deployed in Jonglei Flood Zones", 
      date: "Sep 28, 2025", 
      cat: "Emergency", 
      readTime: "3 min read",
      excerpt: "Emergency teams deploy purification kits to protect 2,000 families from waterborne diseases.",
      image: "/images/news/jonglei-water.jpeg"
    },
    { 
      title: "Transparency First: Publishing Our Annual Impact Report 2025", 
      date: "Sep 15, 2025", 
      cat: "Reporting", 
      readTime: "10 min read",
      excerpt: "A comprehensive look at how 92% of donations went directly to field programming.",
      image: "/images/news/partnership.jpeg"
    },
    { 
      title: "Climate-Resilient Seeds: Empowering Local Farmers", 
      date: "Aug 30, 2025", 
      cat: "Livelihoods", 
      readTime: "4 min read",
      excerpt: "Distributing drought-resistant crop varieties to stabilize food security in 300 households.",
      image: "/images/news/unity-education.jpeg"
    },
    { 
      title: "Expanding Maternal Health Outreach in Remote Villages", 
      date: "Aug 12, 2025", 
      cat: "Health", 
      readTime: "6 min read",
      excerpt: "Mobile health clinics bring essential prenatal care directly to expectant mothers.",
      image: "/images/news/maternal-health.jpeg"
    },
    { 
      title: "Youth Leadership Forum: Shaping the Future of Peace", 
      date: "Jul 25, 2025", 
      cat: "Education", 
      readTime: "4 min read",
      excerpt: "Engaging 100+ youth leaders in conflict resolution and community development workshops.",
      image: "/images/news/youth-peace.jpeg"
    }
  ];

  const filteredArticles = filter === "All" 
    ? allArticles 
    : allArticles.filter(a => a.cat === filter);

  // Determine which articles to display based on the "showAll" toggle
  const displayedArticles = showAll ? filteredArticles : filteredArticles.slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
        const totalHeight = scrollHeight - clientHeight;
        setScrollProgress((scrollTop / totalHeight) * 100);
      }
    };
    const currentModal = modalRef.current;
    if (currentModal) currentModal.addEventListener("scroll", handleScroll);
    return () => currentModal?.removeEventListener("scroll", handleScroll);
  }, [selectedArticle]);

  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-24 text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="inline-block rounded-full bg-sky-100 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-700">
                Latest Major Update
              </div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight text-slate-900">
                {featuredArticle.title}
              </h1>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <button 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="flex items-center gap-3 text-sm font-bold text-sky-600 hover:text-sky-700 transition-all group"
              >
                Read full story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image src={featuredArticle.image} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER TABS & DYNAMIC GRID */}
      <section className="container mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-12">
          <h2 className="text-2xl font-black">Field Updates</h2>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setShowAll(false); // Reset view when changing categories
                }}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all
                  ${filter === cat 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-white text-slate-400 hover:text-slate-900 ring-1 ring-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {displayedArticles.map((post) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={post.title} 
                onClick={() => setSelectedArticle(post)}
                className="group cursor-pointer space-y-4"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-sky-600">
                    <span>{post.cat}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug group-hover:text-sky-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 font-light">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {!showAll && filteredArticles.length > 3 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-[11px] font-black uppercase tracking-widest text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 transition-all shadow-sm"
            >
              View More Stories <ChevronDown size={16} />
            </button>
          </div>
        )}
      </section>

      {/* 3. CENTERED COMPACT MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedArticle(null)} />
            
            <motion.div 
              ref={modalRef}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-[2rem] overflow-y-auto shadow-2xl no-scrollbar"
            >
              {/* Header */}
              <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
                <div className="flex items-center gap-4">
                   <button className="text-slate-400 hover:text-slate-900"><Share2 size={18} /></button>
                   <button onClick={() => setSelectedArticle(null)} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <X size={18} />
                   </button>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 bg-sky-500 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
              </div>

              {/* Body */}
              <div className="p-8 md:p-14">
                <div className="space-y-4 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">{selectedArticle.cat}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {selectedArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {selectedArticle.readTime}</span>
                  </div>
                </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-slate-100 shadow-sm">
                  <Image src={selectedArticle.image} alt="" fill className="object-cover" />
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-lg leading-relaxed text-slate-600 font-light">
                    {selectedArticle.content || selectedArticle.excerpt}
                  </p>
                  <p className="text-lg leading-relaxed text-slate-600 font-light mt-6">
                    This initiative underscores our commitment to resilience and long-term sustainability. 
                    By engaging directly with community stakeholders, we ensure that every program we deploy 
                    is built to last and truly serves the people of South Sudan.
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center">
                   <div className="text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">A publication of</p>
                      <p className="text-sm font-bold text-slate-900">AGE South Sudan Operations</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. NEWSLETTER */}
      <section className="container mx-auto max-w-5xl px-6 mt-12">
        <div className="rounded-[2.5rem] bg-slate-900 p-12 text-center text-white">
          <h2 className="text-2xl font-black mb-4">Stay Informed</h2>
          <p className="text-slate-400 font-light text-sm mb-8 max-w-sm mx-auto">Receive a monthly digest of our field activities and humanitarian impact.</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
             <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none" />
             <button className="bg-sky-500 text-slate-900 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}