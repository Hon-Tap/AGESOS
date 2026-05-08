"use client";

import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to your backend/Formspree/etc.
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-sky-500/30">
      {/* HEADER SECTION */}
      <section className="bg-slate-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              Operational Support Active
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Connect with <span className="text-sky-400">AGE.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
              Bridging the distance between global partners and grassroots impact in South Sudan.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 -mt-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: FIELD DISPATCH INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Globe2 size={18} className="text-sky-500" />
                Field Headquarters
              </h3>

              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Primary Office</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Juba HQ, Central Equatoria<br />South Sudan</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Mail size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Email Dispatch</p>
                    <p className="text-sm font-bold text-slate-900">contact@age-southsudan.org</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Clock size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Response Protocol</p>
                    <p className="text-sm font-bold text-slate-900">Monday—Friday, 08:00 - 17:00 CAT</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-10 border-t border-slate-50">
                <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                  <ShieldCheck className="text-sky-600 mb-3" size={24} />
                  <h4 className="text-xs font-black text-sky-900 uppercase tracking-wide mb-2">NGO Transparency</h4>
                  <p className="text-[11px] text-sky-700 leading-relaxed">
                    All communications are handled in accordance with RRC guidelines and international SPHERE standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE INTERFACE */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="p-8 md:p-12 space-y-6 flex-grow flex flex-col justify-center"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-bold text-slate-900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-bold text-slate-900" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Inquiry Purpose</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-bold text-slate-900 appearance-none">
                        <option>General Support Inquiry</option>
                        <option>International Partnership</option>
                        <option>Program Volunteering</option>
                        <option>Donation Verification</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Detailed Message</label>
                      <textarea required rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-medium text-slate-900 resize-none" />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="group w-full bg-slate-950 text-white rounded-xl py-5 font-black uppercase text-[11px] tracking-[0.3em] transition-all hover:bg-sky-600 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? "Processing..." : "Transmit Message"}
                      <Send size={14} className={isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 transition-transform"} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 text-center flex flex-col items-center justify-center flex-grow"
                  >
                    <div className="w-20 h-20 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mb-6 border border-sky-100">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3">Submission Received</h2>
                    <p className="text-slate-500 max-w-sm mb-10">
                      Your inquiry has been logged in our system. A representative from the Juba office will be in touch shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-sky-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-950 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}