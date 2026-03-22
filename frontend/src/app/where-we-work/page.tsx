"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Navigation, 
  Waves, 
  Wind, 
  Activity, 
  ArrowUpRight, 
  Globe,
  Milestone
} from "lucide-react";

// --- Components ---
const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.3em] ${light ? "text-sky-400" : "text-sky-600"}`}>
    <span className={`h-px w-8 ${light ? "bg-sky-400" : "bg-sky-600"}`} />
    {children}
  </div>
);

export default function WhereWeWork() {
  const regions = [
    { 
      state: "Central Equatoria", 
      project: "Education & WASH", 
      focus: "Urban & Peri-urban Juba",
      icon: Navigation,
      color: "from-blue-500 to-sky-400"
    },
    { 
      state: "Jonglei", 
      project: "Food Security (FSL)", 
      focus: "Climate-resilient agriculture",
      icon: Waves,
      color: "from-emerald-500 to-teal-400"
    },
    { 
      state: "Lakes State", 
      project: "Health & Nutrition", 
      focus: "Mobile Pastoralist Clinics",
      icon: Activity,
      color: "from-rose-500 to-orange-400"
    },
    { 
      state: "Upper Nile", 
      project: "Emergency Response", 
      focus: "IDP & Returnee Support",
      icon: Wind,
      color: "from-amber-500 to-yellow-400"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      
      {/* 1. STRATEGIC HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel light>Geographic Footprint</SectionLabel>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
                Reaching the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-200">Last Mile.</span>
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-10 max-w-lg">
                We bridge the gap between urban centers and isolated communities, deploying aid across South Sudan’s most logistically challenging terrains.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-[2rem] flex-1 min-w-[200px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Presence</p>
                  <p className="text-3xl font-bold text-white tracking-tight">7 States</p>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-[2rem] flex-1 min-w-[200px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Infrastructure</p>
                  <p className="text-3xl font-bold text-white tracking-tight">15+ Offices</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square lg:aspect-video rounded-[3rem] bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center group"
            >
              {/* Decorative Map Grid Pattern */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#38bdf8 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
              
              <div className="relative z-10 text-center p-12">
                <div className="h-20 w-20 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Globe className="text-sky-400" size={40} />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Interactive Map Engine</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Visualizing our 2024–2026 deployment clusters across the Greater Upper Nile and Equatoria regions.</p>
              </div>

              {/* Corner Tag */}
              <div className="absolute bottom-6 left-6 bg-sky-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                Live Field Data
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. REGIONAL DEPLOYMENT GRID */}
      <section className="py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <SectionLabel>Mission Sectors</SectionLabel>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Active State Operations</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">Our localized approach ensures that every project is adapted to the specific socio-economic climate of the state.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((r, i) => (
              <motion.div 
                key={r.state}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-sky-100 hover:bg-white hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500"
              >
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <r.icon size={28} />
                </div>
                
                <h4 className="font-black text-slate-900 text-xl mb-1 tracking-tight">{r.state}</h4>
                <div className="flex items-center gap-2 text-sky-600 font-bold text-[11px] uppercase tracking-widest mb-4">
                  <Milestone size={12} /> {r.project}
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed font-light mb-8">
                  {r.focus}
                </p>

                <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between group-hover:border-sky-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">View Details</span>
                  <ArrowUpRight className="text-slate-300 group-hover:text-sky-500 transition-colors" size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LOGISTICAL CAPABILITY CTA */}
      <section className="pb-32 container mx-auto max-w-7xl px-6">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-20 relative overflow-hidden">
          {/* Subtle Map Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <MapPin className="absolute top-10 left-10 text-white" size={100} />
             <MapPin className="absolute bottom-10 right-20 text-white" size={150} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Partner with our <br/> Field Teams</h2>
              <p className="text-slate-400 max-w-md leading-relaxed">We provide the logistical backbone for international partners looking to implement programs in hard-to-reach areas.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-sky-500 text-slate-950 px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                Request Capacity Statement
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Our Field Offices
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}