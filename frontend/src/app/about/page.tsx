"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  ShieldCheck, 
  X,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Briefcase,
  Layers,
  Award
} from "lucide-react";

type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  photo: string;
};

const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`flex items-center gap-3 mb-4 text-[10px] font-extrabold uppercase tracking-[0.25em] ${light ? "text-sky-400" : "text-sky-600"}`}>
    <span className={`h-[1px] w-6 ${light ? "bg-sky-400/50" : "bg-sky-600/40"}`} />
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
      bio: "The strategic visionary behind AGE, Tesloai orchestrates the organization's long-term roadmap while ensuring every intervention remains rooted in our 2019 founding mission.",
      focus: ["Strategic Leadership", "Partnership Building", "Policy Development"],
    },
    {
      id: "dop",
      name: "Bailuk Gatluak Kedok",
      role: "Head of Programs",
      photo: "/images/GK.jpeg", 
      bio: "Gatluak ensures that Education, Health, and WASH programs deliver measurable impact, serving as the link between strategic planning and field-level execution.",
      focus: ["Program Design", "Technical Oversight", "Field Operations"],
    },
    {
      id: "cea",
      name: "Joyce Yobu",
      role: "Community Engagement Advisor",
      photo: "/images/joyce.jpeg",
      bio: "Joyce champions inclusive participation, ensuring that the voices of vulnerable populations are central to the design of every AGE program.",
      focus: ["Inclusive Participation", "Community Advocacy", "Social Accountability"],
    },
    {
      id: "fm",
      name: "Nyadouth William Deng",
      role: "Finance & Admin Manager",
      photo: "/images/nyaduoth.jpeg",
      bio: "Nyadouth directs the financial architecture of AGE, specializing in meticulous budgeting, fiscal planning, and transparent accountability.",
      focus: ["Fiscal Stewardship", "Audit Accountability", "Resource Management"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden pt-16">
      
      {/* 1. HERO SECTION - Premium Editorial Frame */}
      <section className="relative min-h-[75vh] flex items-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/news/school-opening.jpeg" 
            alt="AGE Field Operations" 
            fill 
            className="object-cover opacity-45 transform scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <SectionLabel light>National NGO • Impact Framework</SectionLabel>
            
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Advancing <span className="text-sky-400">Education.</span> <br />
              Restoring <span className="text-sky-400">Resilience.</span>
            </h1>
            
            <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl opacity-90">
              AGE South Sudan is an institutional-grade national non-governmental organization bridging critical lifelines between emergency humanitarian responses and structured generational development.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link 
                href="/get-involved"
                className="group inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-3.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 shadow-xl shadow-sky-500/10"
              >
                Partner With Us
                <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="#mission" 
                className="text-white/80 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors border-b border-white/20 hover:border-white pb-1"
              >
                Our Strategic Plan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. IMPACT STATS - UN-style High Density Minimal Row */}
      <div className="relative z-20 border-y border-slate-200/80 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 text-left">
            {[
              { label: "Established Status", value: "2019", sub: "Registered National NGO" },
              { label: "Operational Footprint", value: "4 States", sub: "Jonglei, Nile, Unity, Warrap" },
              { label: "Annual Verified Reach", value: "50,000+", sub: "Beneficiaries Served" },
              { label: "Regulatory Status", value: "RRC Certified", sub: "Fully Compliant & Audited" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 lg:py-8 lg:px-10 flex flex-col justify-center bg-white"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.label}</span>
                <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 font-medium">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MISSION & VISION - Clean Two-Column Editorial Grid */}
      <section id="mission" className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5">
              <SectionLabel>Institutional Profile</SectionLabel>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mt-3 mb-6">
                Driven by local insights, structured for scale.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Founded in 2019, AGE South Sudan emerged from a collective dedication among South Sudanese professionals to revitalize sustainable localized systems. We purposefully bridge local execution gaps to secure stable, resilient communities.
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-10">
              <div className="p-8 lg:p-10 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                <Quote className="text-sky-500/5 absolute -top-2 -left-2 scale-150" size={120} />
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 block mb-3">Our Vision Statement</span>
                <p className="text-lg lg:text-xl font-bold text-slate-800 leading-relaxed italic">
                  "A South Sudan free from systemic illiteracy and poverty, where every generation thrives through equitable access to education, health, and dignified livelihoods."
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-1">Operational Excellence</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Adhering strictly to international SPHERE standards across all fragile context response structures.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-1">Community Ownership</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Positioning target demographics and traditional councils as direct decision-makers.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP - Upgraded Editorial Grid Design */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-2xl mb-16">
            <SectionLabel>Governance Framework</SectionLabel>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mt-2">Executive Leadership Team</h2>
            <p className="text-slate-500 text-sm mt-3">The administrative officers steering humanitarian alignment, data transparency, and field project execution.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person) => (
              <div 
                key={person.id}
                onClick={() => setActiveLeader(person)}
                className="group cursor-pointer bg-white border border-slate-200/70 rounded-xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden w-full">
                  <Image 
                    src={person.photo} 
                    alt={person.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center gap-1">
                      Read Full Dossier <ArrowUpRight size={14} className="text-sky-400" />
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-1">{person.role}</span>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{person.name}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MODAL - Premium UN Profile Sheet View */}
      <AnimatePresence>
        {activeLeader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setActiveLeader(null)} />
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            >
              <button 
                onClick={() => setActiveLeader(null)} 
                className="absolute top-4 right-4 z-30 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-md"
                aria-label="Close modal"
              >
                <X size={16}/>
              </button>
              
              <div className="w-full md:w-2/5 relative h-72 md:h-auto min-h-[280px] bg-slate-100">
                <Image 
                  src={activeLeader.photo} 
                  alt={activeLeader.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-3">
                    <Briefcase size={10} /> {activeLeader.role}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">{activeLeader.name}</h3>
                  <hr className="border-slate-100 mb-4" />
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">{activeLeader.bio}</p>
                </div>
                
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
                    <Layers size={10} /> Core Focus Area
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLeader.focus.map(f => (
                      <span key={f} className="px-3 py-1 bg-slate-50 border border-slate-200/60 text-slate-700 text-[10px] font-bold rounded-md">
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

      {/* 6. CALL TO ACTION - High-Trust Partnership Banner */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-4">
            <Award size={10} /> Institutional Engagement
          </span>
          <h2 className="text-3xl font-black tracking-tight mb-3">Partner With AGE South Sudan</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Review our verified execution profiles, financial declarations, or establish target implementation partnerships with our Juba headquarters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-sky-500 text-slate-950 font-bold px-6 py-3 rounded-full text-[11px] uppercase tracking-wider hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/10"
            >
              Contact HQ
            </Link>
            <Link 
              href="/about/profile" 
              className="bg-white/10 text-white font-bold px-6 py-3 rounded-full text-[11px] uppercase tracking-wider flex items-center gap-2 hover:bg-white/20 border border-white/10 transition-all"
            >
              View Organizational Profile <ArrowUpRight size={14} className="text-sky-400" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}