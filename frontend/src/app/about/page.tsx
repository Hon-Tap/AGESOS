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
  <div className={`flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.3em] ${light ? "text-sky-400" : "text-sky-600"}`}>
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
      bio: "The strategic visionary behind AGE, Tesloai orchestrates the organization's long-term roadmap while ensuring every intervention remains rooted in our 2019 founding mission.",
      focus: ["Strategic Leadership", "Partnership Building", "Policy Development"],
    },
    {
      id: "dop",
      name: "Bailuk Gatluak Kedok",
      role: "Director of Programs",
      photo: "/images/Bailuk.jpg", 
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
      role: "Finance Manager",
      photo: "/images/nyaduoth.jpeg",
      bio: "Nyadouth directs the financial architecture of AGE, specializing in meticulous budgeting, fiscal planning, and transparent accountability.",
      focus: ["Fiscal Stewardship", "Audit Accountability", "Resource Management"],
    },
    {
      id: "om",
      name: "Par Chuol",
      role: "Operations Manager",
      photo: "/images/executive-director.jpg",
      bio: "A specialist in organizational efficiency, Par manages the complex logistical framework of AGE from HR to RRC compliance.",
      focus: ["Logistics", "Regulatory Compliance", "Human Resources"],
    },
  ];

  return (
    // mt-20 or pt-20 added to prevent navbar overlap
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden pt-20">
      
      {/* 1. HERO SECTION - Refined Text Sizes */}
      <section className="relative min-h-[80vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/news/school-opening.jpeg" 
            alt="AGE Field Operations" 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <SectionLabel light>National NGO • Since 2019</SectionLabel>
            
            {/* Reduced from text-8xl to text-4xl/5xl for a "small but bold" aesthetic */}
            <h1 className="mt-6 text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Advancing <span className="text-sky-400">Education.</span> <br/>
              Restoring <span className="text-sky-400">Resilience.</span>
            </h1>
            
            {/* Reduced from text-2xl to base/lg */}
            <p className="mt-6 text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              AGE South Sudan is a registered national NGO dedicated to bridging the gap between 
              <span className="text-white font-medium"> emergency relief</span> and 
              <span className="text-white font-medium"> sustainable development</span>.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link 
                href="/get-involved"
                className="group inline-flex items-center justify-center bg-sky-500 hover:bg-white text-slate-950 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300"
              >
                Partner With Us
                <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="#mission" 
                className="text-white/70 hover:text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors border-b border-white/10 pb-1"
              >
                Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. IMPACT STATS - Adjusted Overlap */}
      <div className="relative z-20 -mt-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Established", value: "2019", sub: "National NGO" },
              { label: "Reach", value: "4 States", sub: "Jonglei, Nile, Unity, Warrap" },
              { label: "Impact", value: "50k+", sub: "Lives Annually" },
              { label: "RRC Status", value: "Certified", sub: "Fully Compliant" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-xl border border-slate-100"
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-sky-600 mb-2">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-[10px] text-slate-500 font-medium">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MISSION & VISION */}
      <section id="mission" className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Driven by communities, focused on resilience.</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Founded in 2019, AGE South Sudan emerged from a collective necessity to rebuild localized capacities. We bridge the gap between emergency relief and long-term development.
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative">
                <Quote className="text-sky-200 absolute top-6 right-6 opacity-50" size={32} />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-3">Our Vision</h3>
                <p className="text-xl font-bold text-slate-800 italic">
                  "A South Sudan free from illiteracy and poverty, where every generation thrives through equitable access to education and health."
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <ShieldCheck size={16} className="text-sky-500" /> Excellence
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Adhering to strict international SPHERE standards in every implementation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Users size={16} className="text-sky-500" /> Ownership
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Local stakeholders are the primary decision-makers in project design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP - Maintained Design */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <SectionLabel>Our Leadership</SectionLabel>
            <h2 className="text-3xl font-black text-slate-900">The People Behind the Impact</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {leadership.map((person) => (
              <div 
                key={person.id}
                onClick={() => setActiveLeader(person)}
                className="group cursor-pointer text-center"
              >
                <div className="relative mx-auto w-32 h-32 lg:w-40 lg:h-40 mb-4">
                  <div className="absolute inset-0 rounded-full border border-dashed border-sky-300 group-hover:rotate-90 transition-all duration-700" />
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">
                    <Image src={person.photo} alt={person.name} fill className="object-cover grayscale group-hover:grayscale-0" />
                  </div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-sky-600">{person.role}</p>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{person.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MODAL - Center Modal Maintained */}
      <AnimatePresence>
        {activeLeader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setActiveLeader(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button onClick={() => setActiveLeader(null)} className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md"><X size={20}/></button>
              <div className="w-full md:w-1/3 relative h-64 md:h-auto"><Image src={activeLeader.photo} alt={activeLeader.name} fill className="object-cover" /></div>
              <div className="w-full md:w-2/3 p-8">
                <p className="text-[10px] font-black text-sky-600 uppercase mb-1">{activeLeader.role}</p>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{activeLeader.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{activeLeader.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {activeLeader.focus.map(f => (
                    <span key={f} className="px-3 py-1 bg-slate-100 text-[9px] font-bold uppercase rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 bg-sky-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-black mb-4">Partner With AGE South Sudan</h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto text-sm">Download our full organizational profile or reach out to our Juba headquarters for implementation partnerships.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="bg-slate-900 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">Contact HQ</Link>
            <Link href="/profile.pdf" className="bg-white text-sky-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">Profile <ArrowUpRight size={14}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}