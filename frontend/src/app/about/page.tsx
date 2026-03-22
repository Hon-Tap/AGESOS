"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  HeartPulse, 
  Sprout, 
  Droplets, 
  Scale, 
  X,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Quote
} from "lucide-react";

// --- Types ---
type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  photo: string;
};

const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`flex items-center gap-3 mb-6 text-[11px] font-black uppercase tracking-[0.3em] ${light ? "text-sky-400" : "text-sky-600"}`}>
    <span className={`h-px w-8 ${light ? "bg-sky-400" : "bg-sky-600"}`} />
    {children}
  </div>
);

export default function AboutPage() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);

  const leadership: Leader[] = [
    {
      id: "ed",
      name: "Tesloai Par Golong",
      role: "Executive Director",
      photo: "/images/executive-director.jpg",
      bio: "As the lead visionary of AGE, the Executive Director oversees the entire organizational roadmap, ensuring that every humanitarian intervention aligns with our 2019 founding principles. They manage high-level partnerships with UN agencies and international donors.",
      focus: ["Policy", "Fundraising", "External Relations"],
    },
    {
      id: "dop",
      name: "Gatluak Kedok Jiek",
      role: "Director of Programs",
      photo: "/images/Bailuk.jpg", 
      bio: "Responsible for the technical integrity of Education, Health, and WASH initiatives, the Director of Programs bridges the gap between Juba HQ and field offices.",
      focus: ["Implementation", "Technical Oversight", "Field Logistics"],
    },
    {
      id: "OM",
      name: "Par Chuol",
      role: "Operations Manager",
      photo: "/images/executive-director.jpg",
      bio: "The Operations Manager ensures that our programs run smoothly on the ground, managing everything from procurement to HR and compliance with RRC regulations.",
      focus: ["Audit Compliance", "HR", "Procurement"],
    },
    {
      id: "FAM",
      name: "Name...",
      role: "Finance & Admin Manager",
      photo: "/images/executive-director.jpg",
      bio: "The Finance & Admin Manager oversees the financial health and administrative efficiency of AGE, ensuring responsible stewardship of resources.",
      focus: ["Budgeting", "Financial Reporting", "Admin Operations"],
    },
    {
      id: "mne",
      name: "Name...",
      role: "M&E Coordinator",
      photo: "/images/Bailuk.jpg",
      bio: "Data-driven and results-oriented, the M&E Coordinator tracks every metric from literacy classes to agricultural inputs.",
      focus: ["Data Analysis", "Reporting", "Knowledge Management"],
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      
      {/* 1. REFINED FULL COVER HERO */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/news/school-opening.jpeg" 
            alt="Field Operations" 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/70 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <SectionLabel light>Humanitarian Action</SectionLabel>
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              Empowering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">Generations.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300/90 font-light leading-relaxed tracking-wide">
              Reshaping the future of South Sudan through integrated <span className="text-white font-medium">Education, Health, and Resilience.</span>
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/get-involved"></Link>
               <button className="bg-sky-500 hover:bg-white text-slate-900 px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">
                 Get Involved
               </button>
               <button id="mission" className="group flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-widest px-6 transition-all hover:text-sky-400">
                 <span className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 group-hover:bg-white/10 group-hover:border-sky-400/50 transition-all">
                   <Plus size={16} />
                 </span>
                 Our Mission
               </button>
            </div>
          </motion.div>
        </div>

        {/* --- REWRITTEN SLEEK STATS BAR --- */}
        <div className="absolute bottom-2 left-0 right-0 z-20 hidden lg:block">
          <div className="container mx-auto max-w-7xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between bg-slate-900/40 backdrop-blur-xl rounded-full border border-white/10 p-2 pl-12 pr-4 shadow-2xl"
            >
              {[
                { label: "Established", value: "2019" },
                { label: "Reach", value: "4 States" },
                { label: "Impact", value: "100+ Students" },
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  <div className="py-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-400/80 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white tracking-tight">{stat.value}</p>
                  </div>
                  {i < 2 && <div className="h-8 w-px bg-white/10" />}
                </React.Fragment>
              ))}
              
              <div className="bg-white/10 rounded-full px-8 py-4 border border-white/10 flex items-center gap-3">
                <ShieldCheck className="text-sky-400" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">RRC Registered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION - EDITORIAL LAYOUT */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="sticky top-32">
              <SectionLabel>Our Foundation</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8">The Core of Our Action</h2>
              <div className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                <Quote className="text-sky-200 absolute top-8 right-4" size={30} />
                <p className="text-2xl font-bold leading-snug text-slate-800 italic relative z-10">
                  A South Sudan free from illiteracy and poverty, where every generation thrives through equitable access to education and health.
                </p>
                <p className="mt-6 text-sm font-black uppercase tracking-widest text-sky-600">— AGE Vision Statement</p>
              </div>
            </div>
            
            <div className="space-y-16 pt-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-4">
                   <span className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black">01</span>
                   Our Mission
                </h3>
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  To work with communities in South Sudan, empowering them to reduce illiteracy and poverty through education, health, and sustainable livelihood programs.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 border border-slate-100 rounded-3xl">
                   <Target className="text-sky-600 mb-4" />
                   <h4 className="font-bold mb-2">Technical Excellence</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">Adhering to international humanitarian standards in every project.</p>
                </div>
                <div className="p-8 border border-slate-100 rounded-3xl">
                   <Users className="text-sky-600 mb-4" />
                   <h4 className="font-bold mb-2">Community Led</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">Programs designed and managed alongside local stakeholders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THEMATIC SECTORS - SLEEK CARDS */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionLabel light>Areas of Intervention</SectionLabel>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: BookOpen, title: "Education", list: ["TVET Training", "Teacher Support", "Youth Literacy"] },
              { icon: HeartPulse, title: "Health & Nutrition", list: ["Primary Care", "Maternal Health", "Malnutrition"] },
              { icon: Sprout, title: "Livelihoods (FSL)", list: ["Agri-Inputs", "Income Generation", "Small Business"] },
              { icon: Droplets, title: "WASH", list: ["Water Supply", "Hygiene Kits", "Sanitation"] },
              { icon: Scale, title: "Cross-cutting", list: ["Gender Equity", "Peacebuilding", "Climate"] },
              { icon: Globe, title: "Operational States", list: ["Jonglei", "Upper Nile", "Unity", "Warrap"] },
            ].map((sector, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-sky-600 transition-all duration-500">
                <sector.icon size={32} className="text-sky-400 group-hover:text-white mb-8 transition-colors" />
                <h4 className="text-xl font-bold mb-6">{sector.title}</h4>
                <ul className="space-y-3">
                  {sector.list.map(item => (
                    <li key={item} className="text-sm text-slate-400 group-hover:text-sky-100 flex items-center gap-2">
                      <div className="h-1 w-1 bg-sky-500 group-hover:bg-white rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CIRCULAR LEADERSHIP SECTION */}
      <section className="py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <SectionLabel>Our Leadership</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">The People Behind the Impact</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {leadership.map((person) => (
              <div 
                key={person.id}
                onClick={() => setActiveLeader(person)}
                className="group cursor-pointer text-center"
              >
                <div className="relative mx-auto w-48 h-48 lg:w-56 lg:h-56 mb-8">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-200 group-hover:border-sky-500 group-hover:rotate-45 transition-all duration-1000" />
                  <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                    <Image 
                      src={person.photo} 
                      alt={person.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 h-10 w-10 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <Plus size={20} />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">{person.role}</p>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{person.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MODAL - REFINED GLASS UI */}
      <AnimatePresence>
        {activeLeader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setActiveLeader(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setActiveLeader(null)} 
                className="absolute top-8 right-8 z-20 h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-2/5 relative h-[350px] md:h-auto bg-slate-200">
                <Image src={activeLeader.photo} alt="" fill className="object-cover" />
              </div>
              
              <div className="w-full md:w-3/5 p-12 lg:p-16 flex flex-col justify-center">
                <SectionLabel>{activeLeader.role}</SectionLabel>
                <h3 className="text-4xl font-black mb-6 text-slate-900">{activeLeader.name}</h3>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  {activeLeader.bio}
                </p>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {activeLeader.focus.map(f => (
                      <span key={f} className="px-5 py-2 bg-sky-50 text-sky-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 bg-sky-600">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-white max-w-xl">
            <h2 className="text-4xl font-black mb-4">Ready to collaborate?</h2>
            <p className="text-sky-100 text-lg">Download our full organizational profile or reach out to our Juba headquarters for partnership inquiries.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white text-sky-600 px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl flex items-center gap-3">
              Organization Profile <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}