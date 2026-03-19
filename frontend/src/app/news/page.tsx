"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  ChevronDown, 
  Share2,
  Bookmark,
  X,
  ArrowLeft
} from "lucide-react";

// --- Types ---
interface Article {
  title: string;
  date: string;
  cat: string;
  readTime: string;
  excerpt: string;
  image: string;
  content?: string; // Full body text for the modal
}

export default function NewsPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const featuredArticle: Article = {
    title: "New Sustainable School Opens in Juba, Transforming Access for 500+ Children",
    date: "Oct 12, 2025",
    cat: "Education",
    readTime: "5 min read",
    excerpt: "After months of community-led construction, the new facility opens its doors, providing a safe learning environment for children affected by crisis.",
    image: "/images/news/school-opening.jpeg",
    content: "South Sudan's educational landscape reached a major milestone today. In the heart of Juba, the 'Freedom Academy' officially opened its doors. This isn't just a building; it's a climate-resilient structure built with local materials. The project, led by AGE youth volunteers, incorporates solar-powered classrooms and rainwater harvesting systems. Over 500 children who were previously out of school due to local displacement now have a permanent place to learn, grow, and heal. The curriculum will focus not only on standard academics but also on peace-building and vocational skills pertinent to the local economy."
  };

  const articles: Article[] = [
    { 
      title: "Rapid WASH Response Deployed in Jonglei Flood Zones", 
      date: "Sep 28, 2025", 
      cat: "Emergency", 
      readTime: "3 min read",
      excerpt: "The AGE emergency team has deployed purification kits to heavily flooded areas, protecting over 2,000 families.",
      image: "/images/news/jonglei-water.jpeg",
      content: "As water levels rose to record heights in Jonglei, our rapid response teams moved within 24 hours. We distributed over 2,500 point-of-use water treatment kits and conducted hygiene promotion sessions. Our focus remains on preventing cholera outbreaks in congested displacement camps."
    },
    { 
      title: "Publishing Our Annual Impact Report 2025", 
      date: "Sep 15, 2025", 
      cat: "Reporting", 
      readTime: "10 min read",
      excerpt: "A comprehensive, transparent look at our achievements, financial health, and the vital lessons learned.",
      image: "/images/news/partnership.jpeg",
      content: "Transparency is our core value. The 2025 Impact Report details how 92% of all donations went directly to field programming. We've mapped our growth across 10 states and highlighted the challenges of logistical navigation during the rainy season."
    },
    { 
      title: "Empowering Local Farmers with Climate-Resilient Seeds", 
      date: "Aug 30, 2025", 
      cat: "Livelihoods", 
      readTime: "4 min read",
      excerpt: "Our latest initiative distributes drought-resistant crop varieties to 300 households to stabilize food security.",
      image: "/images/news/unity-education.jpeg",
      content: "Agriculture is the backbone of South Sudanese resilience. By introducing short-cycle, drought-resistant sorghum and maize varieties, we are helping families harvest even when the rains are unpredictable."
    },
    { 
      title: "Expanding Maternal Health Outreach in Remote Villages", 
      date: "Aug 12, 2025", 
      cat: "Health", 
      readTime: "6 min read",
      excerpt: "Mobile health clinics are now reaching three new districts, bringing essential prenatal care directly to mothers.",
      image: "/images/news/maternal-health.jpeg",
      content: "Distance should not be a death sentence. Our mobile units are equipped with basic ultrasound tech and essential vitamins, ensuring that even the most remote mothers get the care they deserve."
    }
  ];

  // Handle Scroll Progress for Modal
  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
        const totalHeight = scrollHeight - clientHeight;
        const windowScroll = (scrollTop / totalHeight) * 100;
        setScrollProgress(windowScroll);
      }
    };
    const currentModal = modalRef.current;
    if (currentModal) currentModal.addEventListener("scroll", handleScroll);
    return () => currentModal?.removeEventListener("scroll", handleScroll);
  }, [selectedArticle]);

  return (
    <main className="min-h-screen bg-[#FCFDFF] pb-24 selection:bg-[#60A0D2]/30">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-[#0D1630]">
        <Image 
          src={featuredArticle.image} 
          alt={featuredArticle.title}
          fill
          priority
          className="object-cover opacity-60 scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1630] via-[#0D1630]/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#60A0D2] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#0D1630] mb-6 shadow-xl">
                Latest Update • {featuredArticle.cat}
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
                {featuredArticle.title}
              </h1>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-[#0D1630] transition-all hover:bg-[#60A0D2] hover:scale-105"
                >
                  Read Full Story <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENT STORIES GRID */}
      <section className="container mx-auto max-w-7xl px-6 -mt-10 relative z-30">
        <div className="grid gap-8">
          <div className="flex items-end justify-between bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 shadow-xl mb-4">
            <div>
              <h2 className="text-3xl font-black text-[#0D1630]">Field Reports</h2>
              <p className="text-slate-500 font-medium">Stories of resilience from the ground.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, visibleCount).map((post, idx) => (
              <article 
                key={post.title} 
                onClick={() => setSelectedArticle(post)}
                className={`group cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl ${idx !== 0 ? 'scale-[0.97] opacity-90' : 'shadow-lg'}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black uppercase text-[#60A0D2] tracking-widest">{post.cat}</span>
                  <h3 className="font-black text-[#0D1630] text-xl mt-2 mb-4 group-hover:text-[#60A0D2] transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{post.date}</span>
                    <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#0D1630] group-hover:text-white transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < articles.length && (
            <button onClick={() => setVisibleCount(v => v + 3)} className="mx-auto mt-8 flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[#0D1630]">
              Load More <ChevronDown size={16} />
            </button>
          )}
        </div>
      </section>

      {/* 3. MODERN MODAL (The Reveal) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#0D1630]/90 backdrop-blur-md" onClick={() => setSelectedArticle(null)} />
          
          <div 
            ref={modalRef}
            className="relative w-full max-w-5xl h-full bg-white rounded-[3rem] overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
          >
            {/* Modal Progress Bar */}
            <div className="sticky top-0 z-50 h-1.5 w-full bg-slate-100">
              <div className="h-full bg-[#60A0D2] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
            </div>

            {/* Modal Header Controls */}
            <div className="sticky top-1.5 z-40 flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b border-slate-50">
              <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0D1630]">
                <ArrowLeft size={16} /> Back to News
              </button>
              <div className="flex gap-2">
                <button className="p-3 rounded-full hover:bg-slate-50"><Share2 size={18} /></button>
                <button onClick={() => setSelectedArticle(null)} className="p-3 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={18} /></button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 lg:p-20 pt-10">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 text-xs font-bold text-[#60A0D2] uppercase tracking-[0.2em] mb-6">
                  <span>{selectedArticle.cat}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-200" />
                  <span className="text-slate-400">{selectedArticle.readTime}</span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-[#0D1630] leading-tight mb-10">{selectedArticle.title}</h2>
                
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                  <Image src={selectedArticle.image} alt="" fill className="object-cover" />
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-xl leading-relaxed text-slate-600 font-medium">
                    {selectedArticle.content || selectedArticle.excerpt}
                  </p>
                  <div className="h-px w-full bg-slate-100 my-12" />
                  
                  {/* RELATED STORIES SECTION */}
                  <div className="not-prose">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Related Field Stories</h4>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {articles.filter(a => a.title !== selectedArticle.title).slice(0, 2).map(related => (
                        <button 
                          key={related.title}
                          onClick={() => {
                            setSelectedArticle(related);
                            modalRef.current?.scrollTo(0, 0);
                          }}
                          className="group flex gap-4 text-left p-4 rounded-3xl border border-slate-100 hover:border-[#60A0D2] transition-all"
                        >
                          <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden">
                            <Image src={related.image} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#60A0D2] uppercase">{related.cat}</p>
                            <p className="font-bold text-[#0D1630] text-sm leading-snug line-clamp-2 mt-1">{related.title}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. NEWSLETTER */}
      <section className="container mx-auto max-w-7xl px-6 mt-32">
        <div className="rounded-[4rem] bg-[#0D1630] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-6">Never miss an update.</h2>
            <p className="text-slate-400 text-lg mb-10">Sign up for our monthly digest of field activities and impact stories.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#60A0D2]" />
              <button className="rounded-full bg-[#60A0D2] px-10 py-4 font-black uppercase tracking-widest text-[#0D1630] hover:bg-white transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
    </main>
  );
}