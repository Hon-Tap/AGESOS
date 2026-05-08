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
    bio: "The strategic visionary behind AGE, Tesloai orchestrates the organization's long-term roadmap while ensuring every intervention remains rooted in our 2019 founding mission. He leads high-level diplomacy and builds vital partnerships with UN agencies and international stakeholders to drive institutional growth.",
    focus: ["Strategic Leadership", "Partnership Building", "Policy Development"],
  },
  {
    id: "dop",
    name: "Gatluak Kedok Jiek",
    role: "Director of Programs",
    photo: "/images/Bailuk.jpg", 
    bio: "Tasked with the technical excellence of our multi-sectoral initiatives, Gatluak ensures that Education, Health, and WASH programs deliver measurable impact. He serves as the critical link between Juba’s strategic planning and field-level execution across South Sudan’s most vulnerable regions.",
    focus: ["Program Design", "Technical Oversight", "Field Operations"],
  },
  {
    id: "cea",
    name: "Joyce Yobu",
    role: "Community Engagement Advisor",
    photo: "/images/Bailuk.jpg", // Placeholder photo path
    bio: "Joyce is dedicated to bridging the gap between humanitarian aid and community ownership. She champions inclusive participation, ensuring that the voices of vulnerable populations are not just heard, but are central to the design and implementation of every AGE program.",
    focus: ["Inclusive Participation", "Community Advocacy", "Social Accountability"],
  },
  {
    id: "fm",
    name: "Nyadouth William Deng",
    role: "Finance Manager",
    photo: "/images/nyaduoth.jpeg",
    bio: "Nyadouth directs the financial architecture of AGE, specializing in meticulous budgeting, fiscal planning, and transparent accountability. Her stewardship ensures that resources are managed with the highest integrity to maximize the reach of our humanitarian and development projects.",
    focus: ["Fiscal Stewardship", "Audit Accountability", "Resource Management"],
  },
  {
    id: "om",
    name: "Par Chuol",
    role: "Operations Manager",
    photo: "/images/executive-director.jpg", // Reusing provided path
    bio: "A specialist in organizational efficiency, Par manages the complex logistical framework of AGE. From HR and procurement to ensuring strict compliance with RRC regulations, he provides the operational stability required for our field teams to work safely and effectively.",
    focus: ["Logistics", "Regulatory Compliance", "Human Resources"],
  },
];

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      
      {/* 1. REFINED FULL COVER HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/news/school-opening.jpeg" 
            alt="Field Operations in South Sudan" 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <SectionLabel light>Humanitarian Action</SectionLabel>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Rebuilding Lives. <br/>
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">Generations.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 font-light leading-relaxed tracking-wide mb-10 max-w-2xl">
              AGE South Sudan is a national NGO reshaping the future of our communities through integrated <span className="text-white font-medium">Education, Health, and Livelihood Resilience.</span>
            </p>
            
            {/* FIXED: Proper Next.js Link Usage */}
            <div className="flex flex-wrap items-center gap-6">
              <Link 
                href="/get-involved"
                className="inline-flex items-center justify-center bg-sky-500 hover:bg-white text-white hover:text-slate-900 px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/30"
              >
                Get Involved
              </Link>
              <a 
                href="#mission" 
                className="group flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-widest px-4 transition-all hover:text-sky-400"
              >
                <span className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 group-hover:bg-white/10 group-hover:border-sky-400/50 transition-all">
                  <ArrowRight size={16} />
                </span>
                Discover Our Impact
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1B. REWRITTEN & VISUALLY APPEALING IMPACT STATS (Overlapping design) */}
      <div className="relative z-20 -mt-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Established", value: "2019", sub: "Registered National NGO" },
              { label: "Operational Reach", value: "4 States", sub: "Jonglei, Upper Nile, Unity, Warrap" },
              { label: "Community Impact", value: "50k+", sub: "Lives Reached Annually" },
              { label: "Compliance", value: "RRC Certified", sub: "Meeting Global NGO Standards" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 mb-4">{stat.label}</p>
                <div>
                  <p className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. VISION & MISSION - MSF EDITORIAL STYLE */}
      <section id="mission" className="py-32 bg-white relative">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Who We Are */}
            <div className="lg:col-span-5">
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">Driven by communities, focused on resilience.</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-6">
                Founded in 2019, AGE South Sudan emerged from a collective necessity to rebuild localized capacities in the wake of prolonged crises. We are a registered national NGO dedicated to bridging the gap between emergency relief and long-term sustainable development.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                By maintaining a strong grassroots presence, we ensure that our interventions are culturally attuned, deeply impactful, and fully led by the communities we serve.
              </p>
            </div>
            
            {/* Right Column: Mission, Vision, Values */}
            <div className="lg:col-span-7 space-y-12 lg:pl-10">
              {/* Vision Blockquote */}
              <div className="relative p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
                <Quote className="text-sky-200 absolute top-8 right-8" size={40} />
                <h3 className="text-sm font-black uppercase tracking-widest text-sky-600 mb-4">Our Vision</h3>
                <p className="text-2xl font-bold leading-snug text-slate-800 relative z-10">
                  "A South Sudan free from illiteracy and poverty, where every generation thrives through equitable access to education, health, and economic opportunity."
                </p>
              </div>

              {/* Mission Statement */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-4">
                  <Target size={18} className="text-sky-600"/> Our Mission
                </h3>
                <p className="text-xl text-slate-900 font-medium leading-relaxed">
                  To work hand-in-hand with vulnerable communities in South Sudan, empowering them to eradicate illiteracy and extreme poverty through high-impact education, health, and sustainable livelihood programs.
                </p>
              </div>

              {/* Core Principles */}
              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-sky-500" /> Technical Excellence
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Adhering to strict international humanitarian standards (SPHERE) in every program implementation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Users size={16} className="text-sky-500" /> Community Led
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Ensuring local stakeholders are the primary decision-makers in project design and execution.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THEMATIC SECTORS - ACTIONABLE LISTS WITH PROGRAM LINKS */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <SectionLabel light>Areas of Intervention</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black">How We Create Impact</h2>
            </div>
            <Link href="/programs" className="text-sky-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "education", icon: BookOpen, title: "Education", desc: "Building knowledge foundations for displaced and marginalized youth.", list: ["TVET & Skills Training", "Teacher Capacity Building", "Accelerated Learning"] },
              { id: "health", icon: HeartPulse, title: "Health & Nutrition", desc: "Delivering life-saving primary care and combatting severe malnutrition.", list: ["Primary Healthcare Clinics", "Maternal & Child Health", "Nutrition Screenings"] },
              { id: "livelihoods", icon: Sprout, title: "Livelihoods (FSL)", desc: "Securing food networks and promoting economic independence.", list: ["Agricultural Inputs", "Micro-grants & Business", "Climate-Smart Farming"] },
              { id: "wash", icon: Droplets, title: "WASH", desc: "Ensuring access to clean water and dignified sanitation facilities.", list: ["Borehole Rehabilitation", "Hygiene Kit Distribution", "Community Sanitation"] },
              { id: "cross-cutting", icon: Scale, title: "Cross-cutting", desc: "Integrating core societal values across all our project sectors.", list: ["Gender Equity & GBV", "Peacebuilding", "Climate Adaptation"] },
              { id: "presence", icon: Globe, title: "Operational Presence", desc: "Strategically deployed in regions with the most acute humanitarian needs.", list: ["Jonglei State", "Upper Nile State", "Unity State", "Warrap State"] },
            ].map((sector, i) => (
              <div key={i} className="group flex flex-col p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-slate-800 transition-all duration-300">
                <sector.icon size={36} className="text-sky-400 mb-6" />
                <h4 className="text-2xl font-bold mb-3">{sector.title}</h4>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">{sector.desc}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {sector.list.map(item => (
                    <li key={item} className="text-sm text-slate-300 flex items-start gap-3">
                      <div className="h-1.5 w-1.5 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" /> 
                      {item}
                    </li>
                  ))}
                </ul>

                {/* New Clickable Action to specific program page */}
                <Link 
                  href={`/programs#${sector.id}`}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-400 group-hover:text-white transition-colors"
                >
                  Explore Details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CIRCULAR LEADERSHIP SECTION (Maintained per request) */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <SectionLabel>Our Leadership</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">The People Behind the Impact</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16 justify-center">
            {leadership.map((person) => (
              <div 
                key={person.id}
                onClick={() => setActiveLeader(person)}
                className="group cursor-pointer text-center"
              >
                <div className="relative mx-auto w-48 h-48 lg:w-56 lg:h-56 mb-8">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-200 group-hover:border-sky-500 group-hover:rotate-45 transition-all duration-1000" />
                  <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-200">
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
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={() => setActiveLeader(null)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setActiveLeader(null)} 
                className="absolute top-6 right-6 z-20 h-10 w-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-2/5 relative h-[300px] md:h-auto bg-slate-100">
                <Image src={activeLeader.photo} alt={activeLeader.name} fill className="object-cover" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 lg:p-14 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 mb-2">{activeLeader.role}</p>
                <h3 className="text-3xl font-black mb-6 text-slate-900">{activeLeader.name}</h3>
                <p className="text-base text-slate-600 font-light leading-relaxed mb-8">
                  {activeLeader.bio}
                </p>
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {activeLeader.focus.map(f => (
                      <span key={f} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
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

      {/* 6. CALL TO ACTION - Properly linked */}
      <section className="py-24 bg-sky-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-white max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Partner With AGE South Sudan</h2>
            <p className="text-sky-100 text-lg font-light">Download our full organizational profile or reach out to our Juba headquarters for implementation partnerships and donor inquiries.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link 
              href="/contact" 
              className="bg-slate-900 text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all text-center"
            >
              Contact HQ
            </Link>
            <Link 
              href="/documents/AGE-Profile.pdf" 
              target="_blank"
              className="bg-white text-sky-700 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Download Profile <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
