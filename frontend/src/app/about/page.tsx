"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  Maximize2,
  X,
  ArrowRight
} from "lucide-react";

// --- Types & Helpers ---
type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  photo: string;
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function Eyebrow({ children, variant = "light" }: { children: React.ReactNode; variant?: "light" | "dark" }) {
  return (
    <div className={cx(
      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest",
      variant === "dark" ? "bg-white/10 text-blue-200 ring-1 ring-white/20" : "bg-blue-50 text-[#1F305E] ring-1 ring-blue-100"
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#60A0D2] animate-pulse" />
      {children}
    </div>
  );
}

// --- Components ---

function Modal({ open, title, onClose, children, maxWidth = "max-w-4xl" }: { 
  open: boolean; 
  title: string; 
  onClose: () => void; 
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0D1630]/95 backdrop-blur-xl" onClick={onClose} />
      <div className={cx("relative w-full overflow-hidden rounded-[3rem] bg-white shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500", maxWidth)}>
        <button onClick={onClose} className="absolute right-6 top-6 z-10 rounded-full bg-slate-100 p-3 text-slate-500 hover:bg-slate-200 transition-all">
          <X size={24} />
        </button>
        <div className="max-h-[90vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

const ValueCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="group relative rounded-[2.5rem] border border-slate-200 bg-white p-8 transition-all hover:border-[#60A0D2]/30 hover:shadow-2xl hover:-translate-y-2">
    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#60A0D2] group-hover:bg-[#60A0D2] group-hover:text-white transition-all duration-500">
      <Icon size={28} />
    </div>
    <h4 className="text-xl font-bold text-[#0D1630]">{title}</h4>
    <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

// --- Main Page ---

export default function AboutPage() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const leadership: Leader[] = [
    {
      id: "ed",
      name: "Tesloai Par Golong",
      role: "Executive Director",
      photo: "/images/executive-director.jpg",
      bio: "As the lead visionary of AGE, the Executive Director oversees the entire organizational roadmap, ensuring that every humanitarian intervention aligns with our 2019 founding principles. They manage high-level partnerships with UN agencies and international donors to balance emergency response with long-term development.",
      focus: ["Policy", "Fundraising", "External Relations"],
    },
    {
      id: "dop",
      name: "Gatluak Kedok Jiek",
      role: "Director of Programs",
      photo: "/images/Bailuk.jpg", 
      bio: "Responsible for the technical integrity of Education, Health, and WASH initiatives, the Director of Programs bridges the gap between Juba HQ and field offices in Jonglei and Warrap. They ensure programs reach their targets, including health awareness for 5,000+ students.",
      focus: ["Implementation", "Technical Oversight", "Field Logistics"],
    },
    {
      id: "fam",
      name: "[INSERT NAME]",
      role: "Finance & Admin Manager",
      photo: "/images/executive-director.jpg",
      bio: "The backbone of AGE's transparency, the Finance and Admin Manager implements rigorous financial controls and audit-ready systems. They manage procurement and HR to ensure that donor funds create sustainable, community-owned impact.",
      focus: ["Audit Compliance", "HR", "Procurement"],
    },
    {
      id: "mne",
      name: "[INSERT NAME]",
      role: "M&E Coordinator",
      photo: "/images/Bailuk.jpg",
      bio: "Data-driven and results-oriented, the M&E Coordinator tracks every metric from literacy classes to agricultural inputs. By building robust beneficiary feedback loops, they provide the empirical evidence needed to refine youth-led community initiatives.",
      focus: ["Data Analysis", "Reporting", "Knowledge Management"],
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#FDFDFD] text-slate-900">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0D1630] pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Image src="/images/age-logo.png" alt="" fill priority className="object-contain scale-150" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-4xl">
            <Eyebrow variant="dark">Empowering South Sudan Since 2019</Eyebrow>
            <h1 className="mt-8 text-6xl font-black tracking-tight text-white lg:text-8xl leading-[1.1]">
              Standing for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A0D2] to-blue-400">Everyone.</span>
            </h1>
            <p className="mt-8 text-xl lg:text-2xl leading-relaxed text-slate-300 max-w-2xl">
              A National NGO dedicated to breaking cycles of poverty through integrated education, health, and sustainable livelihoods.
            </p>
          </div>
        </div>
      </section>

      {/* STATS OVERLAP */}
      <section className="container mx-auto max-w-7xl px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Established", value: "2019", icon: Globe },
            { label: "Impact", value: "5,000+ Students", icon: Users },
            { label: "Reach", value: "4+ States", icon: Target },
            { label: "Status", value: "RRC Registered", icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-[2rem] bg-white p-8 shadow-2xl shadow-blue-900/10 ring-1 ring-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#60A0D2]">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <p className="mt-1 text-xl font-bold text-[#0D1630]">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="container mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-[3.5rem] bg-[#0D1630] p-12 lg:p-16 text-white shadow-2xl transition-transform hover:scale-[1.01]">
             <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
               <Target size={160} />
             </div>
             <h2 className="text-4xl font-black mb-6">Our Vision</h2>
             <p className="text-xl leading-relaxed text-blue-100/80 italic font-light">
               "A South Sudan free from illiteracy and poverty, where every generation thrives through equitable access to education, health, and sustainable livelihoods."
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[3.5rem] bg-[#60A0D2] p-12 lg:p-16 text-[#0D1630] shadow-2xl transition-transform hover:scale-[1.01]">
             <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
               <Globe size={160} />
             </div>
             <h2 className="text-4xl font-black mb-6">Our Mission</h2>
             <p className="text-xl leading-relaxed font-semibold">
               To work with communities in South Sudan, empowering them to reduce illiteracy and poverty through education, health, and sustainable livelihood programs.
            </p>
          </div>
        </div>
      </section>

      {/* THEMATIC AREAS */}
      <section className="bg-slate-50/50 py-32 border-y border-slate-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <Eyebrow>Impact Sectors</Eyebrow>
              <h2 className="mt-4 text-5xl font-black text-[#0D1630]">Areas of Intervention</h2>
            </div>
            <p className="text-slate-500 font-medium max-w-xs">Integrated approaches to community development and emergency response.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard icon={BookOpen} title="Education" desc="Formal/non-formal schooling, TVET, teacher training, and literacy programs for the youth." />
            <ValueCard icon={HeartPulse} title="Health & Nutrition" desc="Primary healthcare, maternal/child health, and management of acute malnutrition." />
            <ValueCard icon={Sprout} title="Food Security (FSL)" desc="Agricultural inputs, vocational training, and income-generating activities for families." />
            <ValueCard icon={Droplets} title="WASH" desc="Safe water supply, hygiene promotion, and emergency sanitation infrastructure." />
            <ValueCard icon={Scale} title="Cross-cutting" desc="Focusing on gender mainstreaming, local peacebuilding, and climate resilience." />
            <div className="flex flex-col justify-center rounded-[2.5rem] bg-[#0D1630] p-10 text-center text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60A0D2]">Active Operational Zones</p>
              <h4 className="mt-4 text-2xl font-black leading-tight">Jonglei • Upper Nile • Unity • Warrap</h4>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-12 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Eyebrow>Our Team</Eyebrow>
            <h2 className="mt-4 text-5xl font-black text-[#0D1630]">Driven by Shared Purpose</h2>
            <p className="mt-6 text-lg text-slate-600">Our leadership combines deep technical expertise with lived experience in the communities we serve.</p>
          </div>

          <div className="space-y-12">
            {leadership.map((person, idx) => (
              <div 
                key={person.id}
                onClick={() => setActiveLeader(person)}
                className={cx(
                  "group relative flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-pointer rounded-[3rem] p-4 transition-all hover:bg-slate-50",
                  idx % 2 !== 0 && "md:flex-row-reverse"
                )}
              >
                <div className="relative h-[400px] w-full md:w-1/2 overflow-hidden rounded-[2.5rem] shadow-xl">
                  <Image 
                    src={person.photo} 
                    alt={person.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1630]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="w-full md:w-1/2 space-y-4 px-4">
                  <span className="text-sm font-bold text-[#60A0D2] uppercase tracking-widest">{person.role}</span>
                  <h3 className="text-4xl font-black text-[#0D1630]">{person.name}</h3>
                  <p className="text-slate-600 line-clamp-3 text-lg leading-relaxed">
                    {person.bio}
                  </p>
                  <button className="inline-flex items-center gap-2 font-bold text-[#0D1630] group/btn">
                    Read Full Profile 
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCTURE SECTION */}
      <section className="bg-[#0D1630] py-32 text-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <Eyebrow variant="dark">Governance</Eyebrow>
              <h2 className="text-5xl font-black leading-tight">Structure for <br />Accountability</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                Our hierarchical framework ensures transparency from the Board level down to field operations, fostering a culture of technical excellence.
              </p>
              <button 
                onClick={() => setIsZoomed(true)}
                className="group inline-flex items-center gap-3 rounded-full bg-[#60A0D2] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-blue-400"
              >
                <Maximize2 size={20} />
                View Detailed Org Chart
              </button>
            </div>
            
            <div 
              onClick={() => setIsZoomed(true)}
              className="group relative cursor-zoom-in rounded-[3rem] bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:ring-white/30"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
                <Image 
                  src="/org-structure.jpg" 
                  alt="Org Structure Preview" 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADER MODAL */}
      <Modal 
        open={!!activeLeader} 
        title="" 
        onClose={() => setActiveLeader(null)}
      >
        {activeLeader && (
          <div className="grid md:grid-cols-2">
            <div className="relative h-[400px] md:h-full min-h-[500px]">
              <Image 
                src={activeLeader.photo} 
                alt={activeLeader.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <Eyebrow>{activeLeader.role}</Eyebrow>
              <h3 className="mt-4 text-4xl font-black text-[#0D1630]">{activeLeader.name}</h3>
              <div className="mt-8 space-y-6">
                <p className="text-lg leading-relaxed text-slate-600">
                  {activeLeader.bio}
                </p>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Core Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLeader.focus.map(f => (
                      <span key={f} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-[#0D1630]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ZOOMABLE STRUCTURE MODAL */}
      <Modal 
        open={isZoomed} 
        title="Organizational Flow" 
        onClose={() => setIsZoomed(false)}
        maxWidth="max-w-6xl"
      >
        <div className="p-4 md:p-12">
          <div className="relative aspect-[16/10] w-full">
             <Image 
              src="/org-structure.jpg" 
              alt="Expanded Org Structure" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Modal>

    </main>
  );
}