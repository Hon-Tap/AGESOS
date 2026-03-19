"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Users, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap,
  ChevronDown
} from "lucide-react";

export default function GetInvolvedPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const ways = [
    { 
      title: "Individual Giving", 
      desc: "Small monthly contributions provide the consistent fuel needed for our education and health programs in South Sudan.", 
      cta: "Become a Donor", 
      icon: <Heart className="text-rose-500" size={28} />,
      features: ["Tax-deductible", "Quarterly impact reports", "Cancel anytime"],
      color: "hover:border-rose-200" 
    },
    { 
      title: "Technical Volunteer", 
      desc: "Lend your professional expertise in engineering, medicine, or curriculum design—remotely or directly in the field.", 
      cta: "View Openings", 
      icon: <Users className="text-[#60A0D2]" size={28} />,
      features: ["Skill-based matching", "Certificate of service", "Flexible hours"],
      color: "hover:border-blue-200" 
    },
    { 
      title: "Corporate Partnership", 
      desc: "Connect your organization's CSR mission with high-impact field projects that create measurable community change.", 
      cta: "Start a Dialogue", 
      icon: <Briefcase className="text-amber-500" size={28} />,
      features: ["Brand visibility", "Direct project tracking", "Joint PR"],
      color: "hover:border-amber-200" 
    },
  ];

  return (
    <main className="min-h-screen bg-[#FCFDFF] selection:bg-[#60A0D2]/30">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#0D1630] text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap size={14} className="text-[#60A0D2]" /> Join the Movement
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0D1630] leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Help us build a <span className="text-[#60A0D2]">resilient</span> future.
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Whether you have five minutes, five dollars, or five years of expertise, there is a seat at the table for you.
          </p>
        </div>
      </section>

      {/* --- WAYS TO HELP GRID --- */}
      <section className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {ways.map((way, idx) => (
            <div 
              key={way.title} 
              className={`group relative bg-white border border-slate-100 p-10 rounded-[3rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${way.color}`}
            >
              <div className="mb-8 p-4 w-fit rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform duration-500">
                {way.icon}
              </div>
              <h3 className="text-2xl font-black text-[#0D1630] mb-4">{way.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8 text-sm">
                {way.desc}
              </p>
              
              <ul className="space-y-3 mb-10">
                {way.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500" /> {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#0D1630] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#60A0D2] transition-colors shadow-xl shadow-slate-200">
                {way.cta} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#0D1630] mb-6">How it works</h2>
            <p className="text-slate-500 mb-10">From your first click to real-world impact, we make the journey transparent and simple.</p>
            
            <div className="space-y-8">
              {[
                { step: "01", t: "Submit Interest", d: "Fill out a quick form or set up your monthly gift." },
                { step: "02", t: "Connect with Us", d: "Our team reaches out for a brief alignment chat." },
                { step: "03", t: "Start Impact", d: "Get assigned to a project and see your contribution in action." },
              ].map((s) => (
                <div key={s.step} className="flex gap-6">
                  <span className="text-3xl font-black text-slate-200">{s.step}</span>
                  <div>
                    <h4 className="font-black text-[#0D1630] text-lg">{s.t}</h4>
                    <p className="text-slate-500 text-sm">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square bg-white rounded-[3rem] shadow-inner overflow-hidden flex items-center justify-center p-12 border border-slate-100">
             <Globe size={200} className="text-slate-100 animate-spin-slow" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 bg-[#60A0D2] rounded-full blur-3xl opacity-20" />
             </div>
             <p className="absolute bottom-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Global Network</p>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="container mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-3xl font-black text-[#0D1630] text-center mb-12">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Can I volunteer remotely?", a: "Yes! We have a 'Virtual Support' track for technical skills like IT, data analysis, and translation." },
            { q: "Is there a minimum time commitment?", a: "For field volunteers, we ask for at least 3 months. Remote roles are project-based and more flexible." },
            { q: "Are donations tax-deductible?", a: "Absolutely. We provide annual tax receipts for all cumulative donations over $50." }
          ].map((item, i) => (
            <div key={i} className="border border-slate-100 rounded-3xl overflow-hidden bg-white">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-[#0D1630] hover:bg-slate-50 transition-colors"
              >
                {item.q} <ChevronDown className={`transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === i && (
                <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- PARTNERSHIP CTA --- */}
      <section className="container mx-auto max-w-7xl px-6 pb-32">
        <div className="relative rounded-[4rem] bg-[#0D1630] p-12 lg:p-24 overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#60A0D2] rounded-full blur-[120px] opacity-10 -mr-20 -mt-20 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Are you an <span className="text-[#60A0D2]">Organization?</span>
              </h2>
              <p className="mt-6 text-xl text-slate-400 font-light leading-relaxed">
                We collaborate with UN agencies, International NGOs, and Local Authorities to maximize our footprint. Let's discuss a strategic partnership.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button className="rounded-full bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-[#0D1630] hover:bg-[#60A0D2] transition-all">
                Partner Inquiry
              </button>
              <button className="rounded-full bg-white/5 border border-white/10 px-10 py-5 text-sm font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                Download Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </main>
  );
}