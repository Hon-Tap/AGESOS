"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  GraduationCap,
  HeartPulse,
  Wheat,
  Droplets,
  Soup,
  Globe2,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// --- Types ---
type Tone = "light" | "dark";

type Sector = {
  id: string;
  title: string;
  desc: string;
  icon: any;
  image: string;
  features: string[];
  highlights: { label: string; value: string }[];
  tone?: Tone;
};

// --- Helpers ---
function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function Eyebrow({ children, variant = "light" }: { children: React.ReactNode; variant?: Tone }) {
  return (
    <div className={cx(
      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em]",
      variant === "dark" ? "bg-white/10 text-blue-200 ring-1 ring-white/20" : "bg-blue-50 text-[#1F305E] ring-1 ring-blue-100"
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#60A0D2] animate-pulse" />
      {children}
    </div>
  );
}

// --- Components ---

/**
 * ProgramCard: Matches the "Our Focus Areas" screenshot style
 */
function ProgramCard({ sector }: { sector: Sector }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-[#60A0D2]/30">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image 
          src={sector.image} 
          alt={sector.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1630]/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-8">
          <h3 className="text-3xl font-black text-white">{sector.title}</h3>
          <div className="mt-2 h-1 w-12 bg-[#60A0D2]" />
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <p className="text-lg leading-relaxed text-slate-600 italic">
          {sector.desc}
        </p>
        
        <div className="mt-auto pt-8">
          <Link 
            href={`#${sector.id}`}
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#60A0D2] transition-colors hover:text-[#0D1630]"
          >
            Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  const sectors: Sector[] = [
    {
      id: "education",
      title: "Education",
      image: "/images/programs/wash-hero.jpg", // Replace with your actual assets
      desc: "Ensuring every child can learn, grow, and access quality education through community schools and teacher support.",
      icon: GraduationCap,
      features: ["Foundational learning", "Teacher safeguarding", "Vocational (TVET)"],
      highlights: [{ label: "Target", value: "Retention" }, { label: "Focus", value: "Access" }],
    },
    {
      id: "health",
      title: "Health",
      image: "/images/programs/health.jpeg",
      desc: "Improving access to community healthcare, prevention programs, and life-saving medical services for women and children.",
      icon: HeartPulse,
      features: ["Maternal Health", "Outreach Clinics", "System Strengthening"],
      highlights: [{ label: "Method", value: "Outreach" }, { label: "Impact", value: "MNCH" }],
    },
    {
      id: "wash",
      title: "WASH",
      image: "/images/programs/wash.jpeg",
      desc: "Delivering clean water, sanitation infrastructure, and hygiene awareness in vulnerable South Sudanese communities.",
      icon: Droplets,
      features: ["Water Rehabilitation", "Hygiene Kits", "Gov Training"],
      highlights: [{ label: "Goal", value: "Safe Water" }, { label: "Reach", value: "Schools" }],
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      
      {/* HERO SECTION - Minimal & Professional */}
      <section className="relative overflow-hidden bg-[#0D1630] pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <Image src="/images/age-logo.png" alt="" fill className="object-contain scale-125" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-4xl">
            <Eyebrow variant="dark">Strategic Interventions</Eyebrow>
            <h1 className="mt-8 text-6xl font-black tracking-tight text-white lg:text-8xl leading-tight">
              Practical Solutions. <br />
              <span className="text-[#60A0D2]">Measurable Impact.</span>
            </h1>
            <p className="mt-8 text-xl lg:text-2xl leading-relaxed text-slate-300 max-w-2xl font-light">
              We deliver community-led programs across key sectors, designed to be accountable, partner-ready, and laser-focused on sustainable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS GRID - Matches the screenshot provided */}
      <section className="container mx-auto max-w-7xl px-6 -mt-20 relative z-20 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="rounded-[2rem] bg-white/10 backdrop-blur-md p-2">
            <div className="bg-white rounded-[1.8rem] p-8 lg:p-12 shadow-xl">
               <h2 className="text-4xl font-black text-[#0D1630]">Our Focus Areas</h2>
               <p className="mt-2 text-xl text-[#60A0D2] font-medium italic">Integrated solutions for complex challenges.</p>
            </div>
          </div>
          <Link href="/contact" className="hidden lg:flex items-center justify-center rounded-full bg-[#008160] px-10 py-5 text-sm font-bold text-white transition-all hover:bg-[#006a4e] shadow-xl hover:-translate-y-1">
             Show All Programs
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <ProgramCard key={s.id} sector={s} />
          ))}
        </div>
      </section>

      {/* SECTOR DETAILS - Deep dive sections */}
      {sectors.map((sector, idx) => (
        <section 
          key={sector.id} 
          id={sector.id} 
          className={cx(
            "py-24 lg:py-32",
            idx % 2 === 0 ? "bg-slate-50/50" : "bg-white"
          )}
        >
          <div className="container mx-auto max-w-7xl px-6">
            <div className={cx(
              "flex flex-col lg:flex-row gap-16 items-center",
              idx % 2 !== 0 && "lg:flex-row-reverse"
            )}>
              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] shadow-2xl ring-1 ring-slate-200">
                  <Image src={sector.image} alt={sector.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1630]/20 to-transparent" />
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#60A0D2] text-white shadow-lg">
                    <sector.icon size={32} />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#60A0D2]">Sector Portfolio</span>
                    <h2 className="text-5xl font-black text-[#0D1630]">{sector.title}</h2>
                  </div>
                </div>

                <p className="text-xl leading-relaxed text-slate-600">
                  Our {sector.title.toLowerCase()} intervention strategies are built on local ownership and international quality standards. We focus on long-term resilience rather than just temporary relief.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {sector.highlights.map((h) => (
                    <div key={h.label} className="rounded-3xl bg-white p-6 ring-1 ring-slate-100 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{h.label}</p>
                      <p className="mt-1 text-xl font-bold text-[#0D1630]">{h.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4">
                   <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Key Deliverables</h4>
                   <div className="grid gap-3">
                     {sector.features.map(f => (
                       <div key={f} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-100 transition-all hover:shadow-md">
                          <CheckCircle2 className="text-[#60A0D2]" size={20} />
                          <span className="font-semibold text-slate-700">{f}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FINAL CTA - High Quality Finish */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[4rem] bg-[#0D1630] p-12 lg:p-24 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#60A0D2] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
              Ready to create <br /> lasting change?
            </h2>
            <p className="text-xl text-slate-400 font-light">
              We are open for technical partnerships and donor collaborations. Join us in building a self-reliant South Sudan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto rounded-full bg-[#60A0D2] px-10 py-5 text-sm font-black uppercase tracking-widest text-[#0D1630] transition-all hover:bg-blue-300">
                Partner With Us
              </Link>
              <Link href="/get-involved#donate" className="w-full sm:w-auto rounded-full bg-white/10 px-10 py-5 text-sm font-black uppercase tracking-widest text-white ring-1 ring-white/20 hover:bg-white/20 transition-all">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}