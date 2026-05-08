"use client";

import React, { useState } from "react";
import { Heart, Users, Briefcase, ArrowRight, CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function GetInvolvedPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pathways = [
    { 
      title: "Sustainable Giving", 
      desc: "Provide the consistent funding needed for long-term health and education programs.", 
      cta: "Donate Monthly", 
      icon: <Heart className="text-sky-600" size={24} />,
      features: ["RRC compliant receipts", "Quarterly field updates"],
    },
    { 
      title: "Technical Expertise", 
      desc: "Contribute your professional skills in WASH, Healthcare, or Engineering to our field teams.", 
      cta: "Apply to Volunteer", 
      icon: <Users className="text-sky-600" size={24} />,
      features: ["Field & Remote tracks", "Professional accreditation"],
    },
    { 
      title: "Institutional Partnership", 
      desc: "Align your organization’s CSR goals with high-impact community resilience projects.", 
      cta: "Request a Meeting", 
      icon: <Briefcase className="text-sky-600" size={24} />,
      features: ["Impact auditing", "Co-branded visibility"],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1: CLEAN HERO */}
      <section className="pt-32 pb-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Your expertise, <br/>their <span className="text-sky-600">resilience.</span>
            </h1>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-10">
              AGE South Sudan operates on the principle of community-led development. We invite you to contribute your resources, time, or professional skills to help us bridge the gap between emergency relief and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PATHWAYS GRID */}
      <section className="py-24 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {pathways.map((path) => (
            <div key={path.title} className="flex flex-col border-t-2 border-slate-900 pt-8">
              <div className="mb-6">{path.icon}</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{path.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{path.desc}</p>
              
              <ul className="space-y-4 mb-10">
                {path.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-sky-500" /> {f}
                  </li>
                ))}
              </ul>

              <button className="flex items-center justify-between w-full py-4 px-6 border-2 border-slate-900 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                {path.cta} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: NGO FAQ */}
      <section className="bg-slate-950 py-24">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black text-white text-center mb-16">Operational FAQs</h2>
          <div className="space-y-4">
            {[
              { q: "Is remote volunteering available?", a: "Yes. We seek technical support in data management, IT, and grant writing." },
              { q: "What is the minimum field commitment?", a: "To ensure community stability, we require a 3-6 month commitment for field roles." },
              { q: "How are donations managed?", a: "85% of funds go directly to field programs, with 15% reserved for operational logistics." }
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:bg-white/5 transition-colors"
                >
                  {item.q} <ChevronDown className={`text-sky-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}