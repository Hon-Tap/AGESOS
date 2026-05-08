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
      name: "Bailuk Gatluak Kedok",
      role: "Director of Programs",
      photo: "/images/Bailuk.jpg", 
      bio: "Tasked with the technical excellence of our multi-sectoral initiatives, Gatluak ensures that Education, Health, and WASH programs deliver measurable impact. He serves as the critical link between Juba’s strategic planning and field-level execution across South Sudan’s most vulnerable regions.",
      focus: ["Program Design", "Technical Oversight", "Field Operations"],
    },
    {
      id: "cea",
      name: "Joyce Yobu",
      role: "Community Engagement Advisor",
      photo: "/images/joyce.jpg",
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
      photo: "/images/executive-director.jpg",
      bio: "A specialist in organizational efficiency, Par manages the complex logistical framework of AGE. From HR and procurement to ensuring strict compliance with RRC regulations, he provides the operational stability required for our field teams to work safely and effectively.",
      focus: ["Logistics", "Regulatory Compliance", "Human Resources"],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      
      {/* 1. MODERNIZED HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/news/school-opening.jpeg" 
            alt="AGE Field Operations" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-white" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <SectionLabel light>Empowering South Sudan Since 2019</SectionLabel>
            
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
              Legacy of <span className="text-sky-400">Impact.</span><br />
              Future of <span className="text-sky-400">Hope.</span>
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AGE is a registered national NGO operating at the intersection of 
              <span className="text-white font-semibold"> urgent relief</span> and 
              <span className="text-white font-semibold"> long-term stability</span>. 
              We transform communities by building local capacity and sustainable infrastructure.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link 
                href="/get-involved"
                className="group bg-sky-500 hover:bg-white text-slate-950 px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
              >
                Join Our Mission
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="#mission"
                className="px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MODERN IMPACT OVERLAY */}
      <div className="relative z-20 -mt-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Our Reach", value: "4 States", desc: "Active across Jonglei, Upper Nile, Unity, and Warrap." },
              { label: "Our People", value: "50k+", desc: "Lives touched through education and health programs." },
              { label: "Our Standard", value: "RRC Certified", desc: "Full compliance with national humanitarian laws." },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CORE IDENTITY SECTION (Rewritten Layout) */}
      <section id="mission" className="py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl">
                 <Image src="/images/news/school-opening.jpeg" alt="Vision" fill className="object-cover" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-slate-900 text-white p-10 rounded-[2.5rem] hidden md:block max-w-xs shadow-2xl">
                <Quote className="text-sky-500 mb-4" size={32} />
                <p className="text-lg font-medium leading-relaxed italic">
                  "Empowering South Sudanese communities to lead their own recovery."
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <SectionLabel>Mission & Vision</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Rooted in local expertise, driven by global standards.
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-sky-500">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Our Mission</h4>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    To work hand-in-hand with vulnerable populations, delivering high-impact education, health, and WASH programs that eradicate poverty and illiteracy.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-slate-900">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Our Vision</h4>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    A South Sudan where every generation thrives through equitable access to basic rights and economic opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTORS SECTION (Keep rest of the sections as they were but styled) */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionLabel light>Areas of Intervention</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">How We Orchestrate Change</h2>
            </div>
            <Link href="/programs" className="group flex items-center gap-3 text-sky-400 font-black text-[11px] uppercase tracking-widest">
              View All Sectors <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "edu", icon: BookOpen, title: "Education", list: ["TVET Training", "Teacher Support", "Youth Literacy"] },
              { id: "health", icon: HeartPulse, title: "Health", list: ["Primary Care", "Maternal Health", "Nutritional Support"] },
              { id: "wash", icon: Droplets, title: "WASH", list: ["Clean Water", "Hygiene Kits", "Safe Sanitation"] },
              { id: "fsl", icon: Sprout, title: "Livelihoods", list: ["Agri-Inputs", "Micro-grants", "Farming Tools"] },
              { id: "cross", icon: Scale, title: "Cross-cutting", list: ["Gender Equity", "Peacebuilding", "Climate Change"] },
              { id: "ops", icon: Globe, title: "Presence", list: ["Juba HQ", "State Hubs", "Field Mobile Units"] },
            ].map((sector, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <sector.icon size={40} className="text-sky-400 mb-6" />
                <h3 className="text-2xl font-bold mb-6">{sector.title}</h3>
                <ul className="space-y-4 mb-8">
                  {sector.list.map(item => (
                    <li key={item} className="text-sm text-slate-400 flex items-center gap-3">
                      <div className="h-1.5 w-1.5 bg-sky-500 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/programs#${sector.id}`} className="text-[10px] font-black uppercase tracking-widest text-sky-400 group-hover:text-white transition-colors">
                  Explore Sector
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <SectionLabel>Governance</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Meet the Leaders</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {leadership.map((person) => (
              <motion.div 
                key={person.id}
                whileHover={{ y: -10 }}
                onClick={() => setActiveLeader(person)}
                className="group cursor-pointer bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-200 group-hover:rotate-90 transition-all duration-700" />
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <Image src={person.photo} alt={person.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full shadow-lg">
                    <Plus size={16} />
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{person.role}</p>
                <h3 className="text-xl font-bold text-slate-900">{person.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MODAL FIX (SCROLLABLE & BALANCED) */}
      <AnimatePresence>
        {activeLeader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setActiveLeader(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setActiveLeader(null)} 
                className="absolute top-4 right-4 z-50 h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-sky-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
              
              {/* Modal Left - Image */}
              <div className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0">
                <Image src={activeLeader.photo} alt={activeLeader.name} fill className="object-cover" />
              </div>
              
              {/* Modal Right - Content (Scrollable) */}
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col overflow-hidden">
                <div className="mb-6 shrink-0">
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-600 mb-2">{activeLeader.role}</p>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900">{activeLeader.name}</h3>
                </div>

                {/* SCROLLABLE BIO AREA */}
                <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
                  <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed mb-8">
                    {activeLeader.bio}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Core Focus Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {activeLeader.focus.map(f => (
                        <span key={f} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. CTA SECTION */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="bg-sky-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Globe size={400} className="absolute -top-20 -right-20 text-white" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to collaborate on the future of South Sudan?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="bg-slate-950 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                  Contact Our HQ
                </Link>
                <Link href="/documents/AGE-Profile.pdf" target="_blank" className="bg-white text-sky-600 px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Organization Profile <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}