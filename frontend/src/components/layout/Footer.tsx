"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Globe, 
  ShieldCheck,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle
} from "lucide-react";

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

function ContactItem({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
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
                <h3 className="text-lg font-black text-white leading-none tracking-tight">AGE SOUTH SUDAN</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#60A0D2] mt-1">Generational Education</p>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-10">
              A registered National NGO dedicated to bridging the gap in education, health, and sustainable livelihoods for the most remote communities in South Sudan.
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
                value="contact@age-southsudan.org" 
                href="mailto:contact@age-southsudan.org"
              />
              <ContactItem 
                icon={Phone} 
                label="Direct Line" 
                value="+211 920 009 257" 
                href="tel:+211920009257"
              />
            </div>
            
            <div className="mt-6 flex items-center justify-between px-6 py-4 rounded-2xl bg-[#60A0D2]/5 border border-[#60A0D2]/10">
               <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Field Support
               </div>
               <Globe size={14} className="text-[#60A0D2] opacity-50" />
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
               National NGO Registration No. 2486
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {['Privacy', 'Terms', 'Compliance'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#60A0D2] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}