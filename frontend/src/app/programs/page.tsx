"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Stethoscope,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Users2,
  ShieldCheck,
  LucideIcon,
  Sprout,
  Compass,
  FileText
} from "lucide-react";

// --- Types ---
type Sector = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  interventionAreas: string[];
  impactMetrics: { label: string; value: string }[];
  accentColor: string;
  bgMuted: string;
};

// --- UI Components ---
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${
    light ? "bg-white/10 text-sky-300 ring-1 ring-white/20" : "bg-sky-50 text-sky-900 ring-1 ring-sky-100"
  }`}>
    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
    {children}
  </div>
);

export default function ProgramsPage() {
  const thematicPillars: Sector[] = [
    {
      id: "education",
      title: "Education & Protection",
      subtitle: "Inclusive Learning & Safeguarding Frameworks",
      image: "/images/hero.jpeg", 
      desc: "Ensuring that vulnerable children and youth in South Sudan have unimpeded access to safe, protective, and equitable learning environments. Our strategy centers heavily on localized teacher capacity development, protective environment infrastructure, and structured child safeguarding standards.",
      icon: BookOpen,
      accentColor: "bg-blue-600 text-blue-600",
      bgMuted: "bg-blue-50/40",
      interventionAreas: ["Primary & Accelerated Education", "Teacher Training & Support", "Child Safeguarding Protocols", "Vocational Skills Training (TVET)"],
      impactMetrics: [{ label: "Strategic Axis", value: "Inclusive Access" }, { label: "Target Demographics", value: "Vulnerable Youth" }],
    },
    {
      id: "health",
      title: "Health & Nutrition",
      subtitle: "Maternal, Neonatal & Emergency Nutrition Systems",
      image: "/images/programs/health.jpeg",
      desc: "Strengthening community-managed healthcare ecosystems to reduce preventable mortality rates. We deploy localized integrated mobile medical clinics, manage therapeutic outpatient feeding infrastructure, and deliver robust child development monitoring paths in hard-to-reach administrative areas.",
      icon: Stethoscope,
      accentColor: "bg-rose-600 text-rose-600",
      bgMuted: "bg-rose-50/40",
      interventionAreas: ["Maternal & Neonatal Healthcare", "Outpatient Therapeutic Programs", "Immunization Outreach Operations", "Frontline Health Staff Mentorship"],
      impactMetrics: [{ label: "Priority Level", value: "MNCH Essential Care" }, { label: "Delivery Engine", value: "Community-Led" }],
    },
    {
      id: "wash",
      title: "WASH & Infrastructure",
      subtitle: "Water, Emergency Sanitation, and Hygiene Systems",
      image: "/images/programs/wash.jpeg",
      desc: "Providing access to safe water and climate-resilient environmental sanitation lines. We combine heavy deep-well borehole rehabilitation with community-led total sanitation (CLTS) strategies and institutional water management structural frameworks to achieve generational stability.",
      icon: Droplets,
      accentColor: "bg-sky-600 text-sky-600",
      bgMuted: "bg-sky-50/40",
      interventionAreas: ["Deep Borehole Rehabilitation", "CLTS Sanitation Deployments", "Critical Hygiene Kit Distribution", "Water Management Committees"],
      impactMetrics: [{ label: "Compliance Model", value: "SPHERE Standards" }, { label: "Impact Target", value: "Climate Resilience" }],
    },
    {
      id: "livelihoods",
      title: "Food Security & Livelihoods",
      subtitle: "Sustainable Agronomic Systems & Economic Resilience",
      image: "/images/programs/emergency.jpeg",
      desc: "Building household economic buffers against environmental and climatic shocks. AGE provides smallholder farmers with adaptive crop seeds, modern agropastoral training programs, and community-led savings and loan models to secure self-reliance and stabilize food supply chains.",
      icon: Sprout,
      accentColor: "bg-emerald-600 text-emerald-600",
      bgMuted: "bg-emerald-50/40",
      interventionAreas: ["Climate-Smart Seed Distributions", "Agropastoral Field Training", "Village Savings & Loans (VSLA)", "Emergency Safety Net Support"],
      impactMetrics: [{ label: "Core Objective", value: "Self-Reliance" }, { label: "System Focus", value: "Market Integration" }],
    },
  ];

  const [selectedTab, setSelectedTab] = useState<Sector>(thematicPillars[0]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-16 selection:bg-sky-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-44 lg:pt-40 lg:pb-56">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpeg"
            alt="AGE Operations in South Sudan"
            fill
            priority
            className="object-cover opacity-20 transform scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Eyebrow light>Operational Strategy</Eyebrow>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Empowering Communities Through <span className="text-sky-400">Sustainable Change.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 font-normal opacity-90 max-w-2xl">
              Our interventions align directly with Core Humanitarian Standards and national strategic matrices. We transition remote sectors from immediate emergency dependency toward self-contained developmental pathways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE THEMATIC HUB - Tabbed Interface Replacing Full-Page Repeat Loops */}
      <section className="container mx-auto max-w-7xl px-6 -mt-20 relative z-30 pb-24">
        
        {/* Navigation Selector Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-3 rounded-2xl shadow-xl ring-1 ring-slate-200/60 mb-12">
          {thematicPillars.map((pillar) => {
            const IsActive = selectedTab.id === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedTab(pillar)}
                className={`group flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
                  IsActive 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "hover:bg-slate-50 text-slate-700 bg-transparent"
                }`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                  IsActive 
                    ? "bg-white/10 border-white/20 text-sky-400" 
                    : "bg-slate-50 border-slate-200/80 group-hover:bg-white text-slate-500 group-hover:text-slate-900"
                }`}>
                  <pillar.icon size={16} />
                </div>
                <div className="truncate">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none mb-1">
                    Pillar
                  </p>
                  <p className="text-xs font-black tracking-tight leading-tight group-hover:translate-x-0.5 transition-transform">
                    {pillar.title.split(" & ")[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Canvas */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid lg:grid-cols-12 gap-0"
            >
              
              {/* Media Block Left */}
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[320px] bg-slate-900 overflow-hidden">
                <Image 
                  src={selectedTab.image} 
                  alt={selectedTab.title} 
                  fill 
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                
                {/* Embedded High-Density Widget */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-slate-950/70 border border-white/10 p-5 rounded-xl flex gap-3 items-center">
                  <div className="h-9 w-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Users2 size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Framework Protocol</p>
                    <p className="text-xs font-semibold text-white leading-tight">Co-Designed Community Governance</p>
                  </div>
                </div>
              </div>

              {/* Data Content Block Right */}
              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between space-y-8">
                
                {/* Title Segment */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${selectedTab.accentColor.split(" ")[0]}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Integrated Program Response</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {selectedTab.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 leading-normal">{selectedTab.subtitle}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-2 font-normal">
                    {selectedTab.desc}
                  </p>
                </div>

                {/* Sub-Interventions Matrix */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <ShieldCheck size={13} className="text-sky-500" /> Key Programmatic Axes
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {selectedTab.interventionAreas.map((area) => (
                      <div 
                        key={area} 
                        className="flex items-center gap-3 rounded-xl bg-slate-50/70 border border-slate-200/40 px-4 py-3 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                      >
                        <CheckCircle2 className="text-sky-500 shrink-0" size={14} />
                        <span className="text-xs font-bold text-slate-700 tracking-tight">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabular Footnotes Dashboard */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {selectedTab.impactMetrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">{m.label}</span>
                      <span className="text-sm font-black text-slate-900 tracking-tight">{m.value}</span>
                    </div>
                  ))}
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. PARADIGM FRAMEWORK ROW - Added Institutional Trust Block */}
      <section className="bg-white border-y border-slate-200/60 py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div>
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-1">Humanitarian Mandate</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">The Core Standards Guiding Operations</h3>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3"><Compass size={16}/></div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">Contextual Customization</h4>
                <p className="text-xs text-slate-500 leading-relaxed">No static templates. Every intervention is redesigned to align with local traditional models and realities.</p>
              </div>
              <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3"><FileText size={16}/></div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">Accountable Stewardship</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Continuous verification reporting tracks metric performance and field data transparency outputs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMMATIC INTEGRITY / CTA */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-10 lg:p-20 text-center shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.08),transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <Eyebrow light>Global Partnerships</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Scaling Impact through <br />
              <span className="text-sky-400">Collaborative Action.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-normal max-w-xl mx-auto leading-relaxed">
              AGE actively collaborates with global technical units and funding institutions to expand our operational footprint. Contact our Juba team to review resource allocation pathways.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact" className="w-full sm:w-auto rounded-full bg-sky-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-sky-400 shadow-lg shadow-sky-500/10">
                Partner With Us
              </Link>
              <Link href="/reports" className="w-full sm:w-auto rounded-full bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:bg-white/10 transition-all">
                Download Operational Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}