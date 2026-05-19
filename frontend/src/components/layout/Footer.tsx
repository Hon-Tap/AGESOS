"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  X,
  Scale,
  Lock,
  FileCheck
} from "lucide-react";

// --- Types & Data ---
type ModalType = "privacy" | "terms" | "compliance" | null;

const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    icon: Lock,
    text: "AGE South Sudan is committed to protecting the data of our donors, partners, and beneficiaries. We collect information solely for project implementation and transparency reporting. We never sell or share personal data with third-party commercial entities."
  },
  terms: {
    title: "Terms of Use",
    icon: Scale,
    text: "By accessing our digital platforms, you agree to use our resources for humanitarian advocacy and informational purposes only. Unauthorized use of AGE field photography or intellectual property without written consent is strictly prohibited."
  },
  compliance: {
    title: "NGO Compliance",
    icon: FileCheck,
    text: "AGE is fully registered with the Relief and Rehabilitation Commission (RRC) under Registration No. 2486. We adhere to the Core Humanitarian Standard (CHS) and maintain strict anti-fraud and PSEA (Protection from Sexual Exploitation and Abuse) policies."
  }
};

// --- Sub-components ---
function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <Link 
      href={href} 
      target={external ? "_blank" : undefined}
      className="group flex items-center gap-1.5 text-sm text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-1"
    >
      <span className="h-1 w-1 rounded-full bg-[#60A0D2] opacity-0 transition-all group-hover:opacity-100 group-hover:w-2" />
      {children}
      {external && <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100" />}
    </Link>
  );
}

// Fixed 'any' type error with ElementType to resolve Vercel build hang
function ContactItem({ icon: Icon, label, value, href }: { icon: ElementType; label: string; value: string; href?: string }) {
  const Component = href ? 'a' : 'div';
  return (
    <Component 
      href={href} 
      className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white/5 group"
    >
      <div className="h-10 w-10 shrink-0 rounded-xl bg-[#60A0D2]/10 border border-[#60A0D2]/20 flex items-center justify-center text-[#60A0D2] group-hover:bg-[#60A0D2] group-hover:text-[#0D1630] transition-all">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <p className="text-sm font-bold text-slate-200 truncate">{value}</p>
      </div>
    </Component>
  );
}

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <footer className="relative bg-[#050810] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#60A0D2]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 bg-white rounded-xl p-2 shadow-xl shadow-sky-500/10 transition-transform hover:rotate-3">
                <Image src="/age-logo.png" alt="AGE Logo" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-none tracking-tight uppercase">AGE South Sudan</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#60A0D2] mt-1">Generational Education</p>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-10">
              Agency for Generational Education (AGE) is a registered National NGO dedicated to bridging the gap in education, health, and sustainable livelihoods for remote communities in South Sudan.
            </p>

            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "X" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: MessageCircle, label: "WhatsApp" }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href="#" 
                  className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#60A0D2] hover:text-[#0D1630] hover:border-[#60A0D2] transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemaps */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-1 gap-10">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6 flex items-center gap-2">
                <span className="h-px w-4 bg-[#60A0D2]" /> Navigation
              </h4>
              <nav className="flex flex-col gap-4">
                <FooterLink href="/about">Strategic Vision</FooterLink>
                <FooterLink href="/impact">Impact Reports</FooterLink>
                <FooterLink href="/where-we-work">Field Operations</FooterLink>
                <FooterLink href="/programs">Our Sectors</FooterLink>
              </nav>
            </div>
            
            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-5">Engagement</h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/get-involved#donate">Donate Funds</FooterLink>
                <FooterLink href="/get-involved#partner">NGO Partnership</FooterLink>
                <FooterLink href="/get-involved#volunteer">Field Volunteer</FooterLink>
              </nav>
            </div>
          </div>

          {/* Direct Intel / Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6 flex items-center gap-2">
              <span className="h-px w-4 bg-[#60A0D2]" /> Field HQ Dispatch
            </h4>
            <div className="space-y-2 bg-[#0D1630]/40 p-4 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <ContactItem 
                icon={MapPin} 
                label="Juba HQ" 
                value="Central Equatoria, South Sudan" 
              />
              <ContactItem 
                icon={Mail} 
                label="Official Correspondence" 
                value="info@agesos.org" 
                href="mailto:info@agesos.org"
              />
              <ContactItem 
                icon={Phone} 
                label="Direct Line" 
                value="+211 920 009 257" 
                href="tel:+211920009257"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} Agency for Generational Education.
            </p>
            <div className="flex items-center gap-2 mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
               <ShieldCheck size={12} className="text-[#60A0D2]" />
               National NGO Registration No. 2534
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {(['Privacy', 'Terms', 'Compliance'] as const).map((item) => (
              <button 
                key={item} 
                onClick={() => setActiveModal(item.toLowerCase() as ModalType)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#60A0D2] transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0D1630] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-[#60A0D2]/10 border border-[#60A0D2]/20 flex items-center justify-center text-[#60A0D2] mb-6">
                  {React.createElement(LEGAL_CONTENT[activeModal].icon, { size: 32 })}
                </div>
                
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                  {LEGAL_CONTENT[activeModal].title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {LEGAL_CONTENT[activeModal].text}
                </p>

                <button 
                  onClick={closeModal}
                  className="w-full py-4 bg-white text-[#0D1630] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#60A0D2] transition-colors"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}