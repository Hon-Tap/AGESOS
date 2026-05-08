"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Stethoscope,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Users2,
  ShieldCheck,
  LucideIcon,
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

function ProgramOverviewCard({ sector }: { sector: Sector }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:shadow-2xl hover:ring-sky-500/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image 
          src={sector.image} 
          alt={sector.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg ${sector.accentColor}`}>
            <sector.icon size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">{sector.title}</h3>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
          {sector.desc}
        </p>
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link 
            href={`#${sector.id}`}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-sky-600 transition-all hover:gap-3"
          >
            Explore Framework <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgramsPage() {
  const thematicPillars: Sector[] = [
    {
      id: "education",
      title: "Education & Protection",
      subtitle: "Inclusive Learning & Safeguarding",
      image: "/images/hero.jpeg", 
      desc: "We work to ensure that every child in South Sudan has access to safe, quality, and inclusive learning environments, with a specific focus on teacher capacity building and child protection protocols.",
      icon: BookOpen,
      accentColor: "bg-blue-600",
      interventionAreas: ["Primary & Accelerated Education", "Teacher Training & Support", "Child Safeguarding", "Vocational Skills (TVET)"],
      impactMetrics: [{ label: "Focus", value: "Inclusive Access" }, { label: "Target", value: "Vulnerable Youth" }],
    },
    {
      id: "health",
      title: "Health & Nutrition",
      subtitle: "Maternal & Child Health Systems",
      image: "/images/programs/health.jpeg",
      desc: "Strengthening community-based health structures to reduce mortality rates through maternal care, malnutrition prevention, and integrated mobile clinic outreach in remote areas.",
      icon: Stethoscope,
      accentColor: "bg-rose-500",
      interventionAreas: ["Maternal & Neonatal Health", "Outpatient Therapeutic Programs", "Immunization Outreach", "Health Staff Mentorship"],
      impactMetrics: [{ label: "Priority", value: "MNCH Care" }, { label: "Delivery", value: "Community-Led" }],
    },
    {
      id: "wash",
      title: "WASH & Resilience",
      subtitle: "Water, Sanitation, and Hygiene",
      image: "/images/programs/wash.jpeg",
      desc: "Delivering life-saving water and sanitation services. We focus on rehabilitating critical infrastructure and promoting hygiene behavioral change to build community resilience.",
      icon: Droplets,
      accentColor: "bg-sky-500",
      interventionAreas: ["Borehole Rehabilitation", "CLTS (Sanitation) Training", "Hygiene Kit Distribution", "Water Management Committees"],
      impactMetrics: [{ label: "Standard", value: "Sphere Standards" }, { label: "Impact", value: "Safe Access" }],
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-40 lg:pt-48 lg:pb-60">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpeg"
            alt="AGE Programs in South Sudan"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Eyebrow light>Strategic Programmatic Framework</Eyebrow>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-white lg:text-7xl leading-[1.05]">
              Empowering Communities Through <span className="text-sky-400">Sustainable Change.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl leading-relaxed text-slate-300 font-light">
              At AGE, our interventions are guided by the needs of the community and the 
              <span className="text-white font-medium"> Core Humanitarian Standards</span>. We deliver targeted support across South Sudan to foster long-term self-reliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PILLARS QUICK NAVIGATION */}
      <section className="container mx-auto max-w-7xl px-6 -mt-24 relative z-20 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {thematicPillars.map((pillar) => (
            <ProgramOverviewCard key={pillar.id} sector={pillar} />
          ))}
        </div>
      </section>

      {/* DETAILED INTERVENTION SECTIONS */}
      {thematicPillars.map((pillar, idx) => (
        <section 
          key={pillar.id} 
          id={pillar.id} 
          className={`py-24 lg:py-32 overflow-hidden ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
        >
          <div className="container mx-auto max-w-7xl px-6">
            <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              
              {/* Media Block */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl">
                  <Image src={pillar.image} alt={pillar.title} fill className="object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]" />
                  {/* Floating Stat Card */}
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur p-6 rounded-3xl shadow-xl max-w-[200px] ring-1 ring-slate-100">
                    <Users2 className="text-sky-600 mb-3" size={24} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Engagement Model</p>
                    <p className="text-sm font-bold text-slate-900">Community-Led & Ownership Focused</p>
                  </div>
                </div>
              </motion.div>

              {/* Content Block */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-10 rounded-full ${pillar.accentColor}`} />
                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-600">Thematic Pillar {idx + 1}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight">
                    {pillar.title}
                  </h2>
                  <p className="text-lg font-semibold text-slate-500 italic">{pillar.subtitle}</p>
                </div>

                <p className="text-lg leading-relaxed text-slate-600 font-light">
                  Our approach to {pillar.title.toLowerCase()} is built on rigorous assessment and partnership. 
                  By aligning with National Development Plans and international best practices, we ensure 
                  measurable outcomes for the populations we serve.
                </p>

                {/* Intervention Grid */}
                <div className="space-y-4">
                   <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <ShieldCheck size={14} className="text-sky-500" />
                     Key Intervention Strategies
                   </h4>
                   <div className="grid sm:grid-cols-2 gap-3">
                     {pillar.interventionAreas.map(area => (
                       <div key={area} className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-4 transition-all hover:bg-white hover:shadow-md hover:border-sky-100">
                          <CheckCircle2 className="text-sky-500 shrink-0" size={18} />
                          <span className="text-sm font-bold text-slate-700">{area}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  {pillar.impactMetrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                      <p className="mt-1 text-xl font-bold text-slate-900">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* PROGRAMMATIC INTEGRITY / CTA */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[4rem] bg-slate-950 p-12 lg:p-24 text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <Eyebrow light>Global Partnerships</Eyebrow>
            <h2 className="text-3xl lg:text-6xl font-black text-white leading-[1.1]">
              Scaling Impact through <br />
              <span className="text-sky-400">Collaborative Action.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light max-w-xl mx-auto">
              AGE is actively seeking technical and funding partners to expand our reach within South Sudan. 
              Together, we can bridge the gap from humanitarian relief to development.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/contact" className="group w-full sm:w-auto rounded-full bg-sky-500 px-10 py-5 text-[11px] font-black uppercase tracking-widest text-slate-950 transition-all hover:bg-sky-400 hover:scale-105">
                Partner With Us
              </Link>
              <Link href="/reports" className="w-full sm:w-auto rounded-full bg-white/5 px-10 py-5 text-[11px] font-black uppercase tracking-widest text-white ring-1 ring-white/20 hover:bg-white/10 transition-all">
                Download Annual Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}