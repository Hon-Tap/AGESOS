"use client";

import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    
    try {
      // Replace 'YOUR_FORMSPREE_ID' with your actual ID from formspree.io
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Transmission failed", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-sky-500/30">
      {/* HEADER SECTION - Increased pt-44 to clear Navbar */}
      <section className="bg-slate-950 pt-36 md:pt-44 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              Operational Dispatch Active
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              Get in <span className="text-sky-400">Touch.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Direct lines to our Juba headquarters for partnerships, support, and program verification.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="container mx-auto max-w-7xl px-6 -mt-16 pb-32">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: CONTACT PROTOCOLS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-12 flex items-center gap-3">
                <Globe2 size={18} className="text-sky-500" />
                Regional HQ
              </h3>

              <div className="space-y-12">
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin size={20} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Location</p>
                    <p className="text-base font-bold text-slate-900 leading-snug">Juba HQ, Central Equatoria<br />South Sudan</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Mail size={20} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Official Email</p>
                    <p className="text-base font-bold text-slate-900">info@agesos.org</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Smartphone size={20} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Direct Line</p>
                    <p className="text-base font-bold text-slate-900">+211 920 009 257</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Clock size={20} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Availability</p>
                    <p className="text-base font-bold text-slate-900">Mon—Fri, 08:00 - 17:00 CAT</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-slate-100">
                <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-100">
                  <ShieldCheck className="text-sky-600 mb-4" size={28} />
                  <h4 className="text-[11px] font-black text-sky-900 uppercase tracking-widest mb-2">NGO Standards</h4>
                  <p className="text-[11px] text-sky-800 leading-relaxed font-medium">
                    Your data is handled securely under South Sudan RRC guidelines and international humanitarian privacy protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SECURE MESSAGE INTERFACE */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-300/40 border border-slate-100 overflow-hidden min-h-[700px] flex flex-col">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="p-10 md:p-16 space-y-8 flex-grow flex flex-col justify-center"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Identity</label>
                        <input required name="name" type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email for Response</label>
                        <input required name="email" type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nature of Inquiry</label>
                      <select name="inquiryType" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer">
                        <option>Program Partnerships</option>
                        <option>International Volunteering</option>
                        <option>Donation & Financial Inquiries</option>
                        <option>General Advocacy Support</option>
                        <option>Media & Press Relations</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Message Detail</label>
                      <textarea required name="message" rows={6} placeholder="How can we collaborate or support your goals?" className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-6 py-5 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium text-slate-900 resize-none placeholder:text-slate-300" />
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs font-bold uppercase tracking-wider text-center">Transmission Failed. Please check your connection.</p>
                    )}

                    <button 
                      disabled={isSubmitting}
                      className="group w-full bg-slate-950 text-white rounded-[1.5rem] py-6 font-black uppercase text-xs tracking-[0.4em] transition-all hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-500/30 active:scale-[0.97] flex items-center justify-center gap-4"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}
                      <Send size={16} className={isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-16 text-center flex flex-col items-center justify-center flex-grow"
                  >
                    <div className="w-24 h-24 bg-sky-50 text-sky-500 rounded-[2rem] flex items-center justify-center mb-8 border border-sky-100 shadow-inner">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Send Successfully</h2>
                    <p className="text-slate-500 text-lg max-w-md mb-12 font-medium leading-relaxed">
                      Your message has been routed to <span className="text-sky-600 font-bold">info@agesos.org</span>. Our Juba team typically responds within 24–48 business hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-sky-600 font-black uppercase text-[11px] tracking-[0.2em] hover:text-slate-950 transition-colors bg-slate-100 px-8 py-4 rounded-full"
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