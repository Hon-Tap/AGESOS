"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Users, Briefcase, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GetInvolvedPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pathways = [
    {
      title: "Sustainable Giving",
      desc: "Provide the consistent funding needed for long-term health and education programs.",
      cta: "Donate Monthly",
      icon: <Heart className="text-sky-600" size={28} />,
      features: ["RRC compliant receipts", "Quarterly field updates"],
    },
    {
      title: "Technical Expertise",
      desc: "Contribute your professional skills in WASH, Healthcare, or Engineering to our field teams.",
      cta: "Apply to Volunteer",
      icon: <Users className="text-sky-600" size={28} />,
      features: ["Field & Remote tracks", "Professional accreditation"],
    },
    {
      title: "Institutional Partnership",
      desc: "Align your organization’s CSR goals with high-impact community resilience projects.",
      cta: "Request a Meeting",
      icon: <Briefcase className="text-sky-600" size={28} />,
      features: ["Impact auditing", "Co-branded visibility"],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Spacer to prevent Navbar overlap */}
      <div className="h-20 w-full" />

      {/* SECTION 1: HERO */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-10">
              Your expertise, <br />
              <span className="text-sky-600">their resilience.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl">
              AGE South Sudan operates on the principle of community-led development. We invite you to bridge the gap between emergency relief and sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PATHWAYS GRID */}
      <section className="pb-32 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          {pathways.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col group"
            >
              <div className="h-px w-full bg-slate-200 mb-8 group-hover:bg-sky-500 transition-colors duration-500" />
              <div className="mb-6 p-3 bg-sky-50 w-fit rounded-xl text-sky-600">
                {path.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                {path.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow text-lg">
                {path.desc}
              </p>

              <ul className="space-y-4 mb-10">
                {path.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">
                    <CheckCircle2 size={16} className="text-sky-500" /> {f}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="group/btn">
                <button className="flex items-center justify-between w-full py-5 px-8 border-2 border-slate-900 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300 transform active:scale-[0.98]">
                  {path.cta} 
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: NGO FAQ */}
      <section className="bg-slate-950 py-32">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic">Operational FAQ</h2>
            <div className="h-1 w-20 bg-sky-500 mx-auto" />
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is remote volunteering available?", a: "Yes. We seek technical support in data management, IT, and grant writing. Our remote contributors are vital to our administrative sustainability." },
              { q: "What is the minimum field commitment?", a: "To ensure community stability and deep-impact project handover, we generally require a 3-6 month commitment for on-ground roles." },
              { q: "How are donations managed?", a: "We maintain radical transparency. 85% of funds go directly to field programs, with 15% reserved for vital operational logistics and security." }
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left font-bold text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg md:text-xl pr-8">{item.q}</span>
                  <ChevronDown className={`text-sky-400 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-slate-400 text-lg leading-relaxed border-t border-white/5 mt-2">
                        {item.a}
                        <div className="mt-6">
                           <Link href="/contact" className="text-sky-400 font-bold uppercase text-xs tracking-widest hover:text-sky-300 flex items-center gap-2">
                            Have more questions? Ask us <ArrowRight size={14}/>
                           </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}