"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
        <div className="max-w-md w-full text-center p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#0D1630] mb-4">Talk soon!</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Your message is on its way to our Juba office. We typically respond within one business day.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-[#0D1630] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#60A0D2] transition-colors"
          >
            Back to Contact
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 selection:bg-[#60A0D2]/30">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#60A0D2] text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A0D2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60A0D2]"></span>
            </span>
            Direct Support
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0D1630] leading-[0.95] tracking-tight mb-6">
            Connecting <span className="text-[#60A0D2]">Global</span> support to <span className="text-slate-400">Local</span> action.
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: INFORMATION PANEL --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0D1630] rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#60A0D2] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <h3 className="text-2xl font-black mb-8">Direct Channels</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin size={20} className="text-[#60A0D2]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">HQ Location</p>
                    <p className="text-sm font-bold text-slate-100 leading-relaxed">Juba, South Sudan<br />Central Equatoria State</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Mail size={20} className="text-[#60A0D2]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Inquiry</p>
                    <p className="text-sm font-bold text-slate-100">contact@age-southsudan.org</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Clock size={20} className="text-[#60A0D2]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Response Time</p>
                    <p className="text-sm font-bold text-slate-100">Within 24 Hours (CAT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty Map Container - Ready for your link */}
            <div className="h-64 bg-slate-200 rounded-[3rem] border-2 border-dashed border-slate-300 flex items-center justify-center group cursor-pointer hover:border-[#60A0D2] transition-colors">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-[#60A0D2]" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Map Integration Point</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: THE FORM PANEL --- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/60 border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 focus:border-[#60A0D2] outline-none transition-colors text-[#0D1630] font-bold placeholder-transparent"
                      placeholder="Name"
                      id="name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#60A0D2]">
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input 
                      required
                      type="email" 
                      className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 focus:border-[#60A0D2] outline-none transition-colors text-[#0D1630] font-bold placeholder-transparent"
                      placeholder="Email"
                      id="email"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#60A0D2]">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <select className="w-full bg-transparent border-b-2 border-slate-100 py-3 focus:border-[#60A0D2] outline-none transition-colors text-[#0D1630] font-bold appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Partnership Proposal</option>
                    <option>Technical Volunteering</option>
                    <option>Media Inquiry</option>
                  </select>
                  <label className="absolute left-0 -top-3.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Subject of interest
                  </label>
                </div>

                <div className="relative pt-4">
                  <textarea 
                    required
                    rows={4}
                    className="peer w-full bg-slate-50 rounded-3xl p-6 focus:ring-2 focus:ring-[#60A0D2] outline-none transition-all text-[#0D1630] font-medium resize-none border border-transparent"
                    placeholder="How can we help your mission?"
                  ></textarea>
                  <label className="absolute left-6 -top-1 px-2 bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Message Body
                  </label>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="group relative w-full bg-[#0D1630] text-white overflow-hidden rounded-2xl py-5 font-black uppercase text-[11px] tracking-[0.4em] transition-all hover:shadow-2xl hover:shadow-[#0D1630]/20 active:scale-[0.98]"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? "Deploying Message..." : "Send to AGE Dispatch"}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-[#60A0D2] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                </button>

                <p className="text-[9px] text-center text-slate-400 leading-relaxed uppercase tracking-wider">
                  Secure transmission enabled. Your data is managed according to our <span className="text-[#0D1630] underline cursor-pointer">NGO Privacy Standards</span>.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}