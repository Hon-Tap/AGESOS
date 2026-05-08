"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FieldUpdate {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  image: string;
}

export default function ImpactPage() {
  const [updates, setUpdates] = useState<FieldUpdate[]>([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUpdates(data);
      } catch (err) {
        console.error("Backend connection failed, using fallback data:", err);
        // Fallback data so the page never looks empty on Vercel
        setUpdates([
          { id: "1", title: "New Well in Lakes State", category: "Water", description: "Providing clean water to 500 households.", date: "2024-05-10", image: "" },
          { id: "2", title: "Classroom Block Completed", category: "Education", description: "Expanded capacity for 200 more students.", date: "2024-05-12", image: "" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const stats = [
    { label: "Students Enrolled", value: "45,000+", icon: "📚" },
    { label: "Clean Water Access", value: "120k People", icon: "💧" },
    { label: "Health Consultations", value: "85,000", icon: "🏥" },
    { label: "Communities Reached", value: "12 States", icon: "🌍" },
  ];

  const categories = ["All", ...Array.from(new Set(updates.map(u => u.category)))];

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#1F305E]">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#60A0D2]/5 -skew-x-12 translate-x-32" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#60A0D2]/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#60A0D2] text-xs font-bold tracking-widest uppercase mb-8 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#60A0D2] animate-pulse" />
                Live Impact Tracking
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1]">
                Turning Intent into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A0D2] to-blue-200">
                  Lasting Change.
                </span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                We track every life touched to ensure our interventions create sustainable, generational shifts across South Sudan.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="#updates" className="bg-[#60A0D2] hover:bg-white hover:text-[#1F305E] text-white px-10 py-4 rounded-2xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-[#60A0D2]/20">
                  View Field Updates
                </Link>
              </div>
            </div>

            <div className="lg:w-2/5 grid grid-cols-2 gap-4 w-full">
              {stats.map((s) => (
                <div key={s.label} className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] group hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div className="text-3xl font-black text-white">{s.value}</div>
                  <div className="text-[10px] font-bold text-[#60A0D2] uppercase tracking-[0.2em] mt-2 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FIELD UPDATES (DYNAMIC NEWS) --- */}
      <section id="updates" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-md">
            <h2 className="text-4xl font-black text-[#1F305E] mb-4">Latest from the Field</h2>
            <div className="h-1.5 w-20 bg-[#60A0D2] rounded-full mb-4" />
            <p className="text-slate-500 font-medium">Verified updates from our ground teams across the country.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  filter === cat 
                  ? 'bg-[#1F305E] text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-200 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {updates
              .filter(u => filter === "All" || u.category === filter)
              .map((news) => (
                <article key={news.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-[#60A0D2]/30 hover:shadow-2xl transition-all duration-500">
                  <div className="h-56 bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F305E]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black text-[#1F305E] uppercase tracking-widest shadow-sm">
                        {news.category}
                      </span>
                    </div>
                    {/* Placeholder for actual image */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100 italic">
                      Field Photo
                    </div>
                  </div>
                  <div className="p-8">
                    <time className="text-[11px] font-bold text-[#60A0D2] tracking-widest uppercase block mb-3">{news.date}</time>
                    <h3 className="text-2xl font-bold text-[#1F305E] mb-4 group-hover:text-[#60A0D2] transition-colors leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {news.description}
                    </p>
                    <button className="flex items-center gap-2 text-[#1F305E] font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                      Read Full Report <span className="text-[#60A0D2]">→</span>
                    </button>
                  </div>
                </article>
              ))}
          </div>
        )}
      </section>

      {/* --- FEATURED IMPACT SPOTLIGHT --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-[#1F305E] rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-3xl relative">
          <div className="md:w-1/2 bg-slate-800 h-96 md:h-auto relative">
             <div className="absolute inset-0 flex items-center justify-center text-slate-500 italic p-12 text-center bg-[url('/images/pattern.png')] bg-cover">
               [Photo: Agricultural Resilience Program]
             </div>
          </div>
          <div className="md:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 p-12 opacity-10">
               <span className="text-9xl font-black text-white">"</span>
            </div>
            <span className="text-[#60A0D2] font-black uppercase tracking-[0.3em] text-[10px] mb-6">Success Story</span>
            <h2 className="text-4xl font-bold text-white mb-8 leading-tight italic">
              "Now, we are selling surplus at the local market."
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 border-l-4 border-[#60A0D2] pl-6">
              Before AGE provided us with drought-resistant seeds and irrigation training, my family struggled to have one meal a day. The harvest has changed our future.
            </p>
            <div>
              <div className="font-black text-white text-xl tracking-wide">Mary Akol</div>
              <div className="text-[#60A0D2] font-bold text-sm uppercase tracking-widest mt-1">Lead Farmer, Lakes State</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}