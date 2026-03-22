"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Droplets,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

// --- Types ---
type Tone = "light" | "dark";

type Sector = {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon; 
  image: string;
  features: string[];
  highlights: { label: string; value: string }[];
  accent: string;
};

// --- Helpers ---
function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function Eyebrow({ children, variant = "light" }: { children: React.ReactNode; variant?: Tone }) {
  return (
    <div className={cx(
      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]",
      variant === "dark" ? "bg-white/10 text-sky-300 ring-1 ring-white/20" : "bg-sky-50 text-slate-900 ring-1 ring-sky-100"
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
      {children}
    </div>
  );
}

// --- Components ---

function ProgramCard({ sector }: { sector: Sector }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:shadow-2xl hover:ring-sky-500/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image 
          src={sector.image} 
          alt={sector.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <div className={cx("mb-2 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg", sector.accent)}>
            <sector.icon size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">{sector.title}</h3>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
          {sector.desc}
        </p>
        
        <div className="mt-6 pt-4 border-t border-slate-50">
          <Link 
            href={`#${sector.id}`}
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-600 transition-all hover:gap-3"
          >
            Detailed Strategy <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgramsPage() {
  const sectors: Sector[] = [
    {
      id: "education",
      title: "Sanitation & Hygiene",
      image: "/images/m&e.jpeg", 
      desc: "Empowering communities with clean water access and hygiene education to prevent disease and promote health.",
      icon: GraduationCap,
      accent: "bg-blue-600",
      features: ["Foundational learning", "Teacher safeguarding", "Vocational (TVET)"],
      highlights: [{ label: "Reach", value: "5+ Schools" }, { label: "Impact", value: "Primary Focus" }],
    },
    {
      id: "health",
      title: "Health & Nutrition",
      image: "/images/programs/health.jpeg",
      desc: "Strengthening community health systems and providing maternal care to ensure every family in South Sudan has a healthy start.",
      icon: HeartPulse,
      accent: "bg-rose-500",
      features: ["Maternal Health", "Outreach Clinics", "System Strengthening"],
      highlights: [{ label: "Method", value: "Mobile Clinics" }, { label: "Focus", value: "MNCH" }],
    },
    {
      id: "wash",
      title: "WASH Initiatives",
      image: "/images/programs/wash.jpeg",
      desc: "Clean water and hygiene education are human rights. We rehabilitate boreholes and implement sanitation infrastructure.",
      icon: Droplets,
      accent: "bg-sky-500",
      features: ["Water Rehabilitation", "Hygiene Kits", "Sanitation Training"],
      highlights: [{ label: "Status", value: "Active" }, { label: "Metric", value: "Safe Access" }],
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      
      {/* HERO SECTION - Refined Typography */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-32 lg:pt-48 lg:pb-56">
      {/* --- BACKGROUND MEDIA LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Option 1: Video (Uncomment to use) */}
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source src="/videos/programs-bg.mp4" type="video/mp4" />
        </video> 
        */}

        {/* Option 2: Image (Default) */}
        <Image
          src="/images/hero.jpeg" // Path to your hero image
          alt="AGE South Sudan Programs"
          fill
          priority
          className="object-cover opacity-30" // Adjust opacity based on image brightness
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* --- BRANDED BLOOM ELEMENTS --- */}
      {/* These stay on top of the media to maintain brand colors */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto max-w-7xl px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Eyebrow variant="dark">Our Sector Portfolios</Eyebrow>
          
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white lg:text-6xl leading-[1.1]">
            Strategic Solutions for a <br />
            <span className="text-sky-400">Sustainable Future.</span>
          </h1>
          
          <p className="mt-6 text-lg lg:text-xl leading-relaxed text-slate-300 max-w-xl font-light">
            We deliver community-led programs in South Sudan, designed to be 
            <span className="text-white font-medium"> accountable</span>, 
            <span className="text-white font-medium"> partner-ready</span>, and 
            focused on long-term resilience.
          </p>

          {/* Optional: Add a quick scroll indicator or CTA here */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-sky-500/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-500/80">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
  </section>

      {/* FOCUS AREAS GRID - Floating Entry */}
      <section className="container mx-auto max-w-7xl px-6 -mt-32 relative z-20 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <ProgramCard key={s.id} sector={s} />
          ))}
        </div>
      </section>

      {/* SECTOR DETAILS - Balanced UI */}
      {sectors.map((sector, idx) => (
        <section 
          key={sector.id} 
          id={sector.id} 
          className={cx(
            "py-20 lg:py-32 overflow-hidden",
            idx % 2 === 0 ? "bg-white" : "bg-slate-50"
          )}
        >
          <div className="container mx-auto max-w-7xl px-6">
            <div className={cx(
              "flex flex-col lg:flex-row gap-12 lg:gap-20 items-center",
              idx % 2 !== 0 && "lg:flex-row-reverse"
            )}>
              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <Image src={sector.image} alt={sector.title} fill className="object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]" />
                </div>
              </motion.div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">Impact Sector {idx + 1}</span>
                  <h2 className="text-3xl lg:text-4xl font-black text-slate-900">{sector.title}</h2>
                </div>

                <p className="text-base lg:text-lg leading-relaxed text-slate-600">
                  Our {sector.title.toLowerCase()} programs prioritize local ownership. By training community leaders and leveraging international standards, we ensure every intervention is built to last.
                </p>

                <div className="grid grid-cols-2 gap-4 py-4">
                  {sector.highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-sm">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{h.label}</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">{h.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Deliverables</h4>
                   <div className="grid gap-2">
                     {sector.features.map(f => (
                       <div key={f} className="flex items-center gap-3 rounded-xl bg-slate-100/50 px-4 py-3 transition-colors hover:bg-white hover:shadow-sm ring-1 ring-transparent hover:ring-slate-200">
                          <CheckCircle2 className="text-sky-500" size={18} />
                          <span className="text-sm font-semibold text-slate-700">{f}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CALL TO ACTION */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-950 p-10 lg:p-20 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
              Partnering for a <br />
              <span className="text-sky-400">Stronger South Sudan.</span>
            </h2>
            <p className="text-base text-slate-400 font-light max-w-lg mx-auto">
              Join AGE in delivering essential services to those who need them most. We are open for collaboration with technical and donor partners.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact" className="w-full sm:w-auto rounded-full bg-sky-500 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-950 transition-all hover:bg-sky-400 hover:scale-105 active:scale-95">
                Get in Touch
              </Link>
              <Link href="/get-involved#donate" className="w-full sm:w-auto rounded-full bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/20 hover:bg-white/10 transition-all">
                Support Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}