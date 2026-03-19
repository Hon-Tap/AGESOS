"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const NAV_GROUPS = [
  {
    label: "About",
    items: [
      { label: "About AGE", href: "/about" },
      { label: "Where We Work", href: "/where-we-work" },
    ],
  },
  {
    label: "Our Work",
    items: [{ label: "Programs", href: "/programs" }],
  },
  {
    label: "Impact",
    items: [{ label: "Stories", href: "/news" }],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Volunteer", href: "/get-involved" },
      { label: "Donate", href: "/get-involved#donate" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        // Solid background on mobile, glassy/blur on desktop when scrolled
        "bg-white lg:bg-white/80 lg:backdrop-blur-xl",
        isScrolled ? "py-2 shadow-xl border-b border-slate-200/60" : "py-4 shadow-none"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* DESIGNER LOGO BADGE */}
        <Link href="/" className="flex items-center gap-4 group relative z-[110]">
          <div className="relative">
            {/* Animated Ring */}
            <div className="absolute inset-0 scale-125 rounded-2xl bg-sky-100/50 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
            
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)] ring-1 ring-[#1b2a4e]/10 transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-105">
              <Image
                src="/age-logo.png"
                alt="AGE Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-[#1b2a4e] transition-colors group-hover:text-sky-600">
              AGE <span className="text-sky-500">SOS</span>
            </span>
            <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
              South Sudan
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV (Modern Minimalist) */}
        <nav className="hidden lg:flex items-center gap-2">
          {NAV_GROUPS.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(group.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold text-slate-600 transition-all hover:text-[#1b2a4e]">
                {group.label}
                <motion.span animate={{ rotate: openDropdown === group.label ? 180 : 0 }}>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {openDropdown === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 top-full mt-1 w-52 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block rounded-xl px-4 py-2.5 text-xs font-bold transition-all",
                          isActive(item.href) ? "bg-sky-50 text-sky-600" : "text-slate-500 hover:bg-slate-50 hover:text-[#1b2a4e]"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link href="/contact" className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-[#1b2a4e]">
            Contact
          </Link>

          {/* PREMIUM ACTION BUTTON */}
          <Link
            href="/get-involved#donate"
            className="ml-4 overflow-hidden rounded-full bg-[#1b2a4e] px-8 py-3 text-[11px] font-black tracking-widest text-white shadow-lg shadow-[#1b2a4e]/20 transition-all hover:bg-sky-500 hover:shadow-sky-500/40 active:scale-95"
          >
            DONATE NOW
          </Link>
        </nav>

        {/* MOBILE TRIGGER */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#1b2a4e] transition-all hover:bg-sky-50 lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M4 8h16M8 16h12" />
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER (3/4 WIDTH) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[130] w-[75vw] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer Header with Logo */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-50 p-1">
                    <Image src="/age-logo.png" alt="AGE" width={32} height={32} />
                  </div>
                  <span className="font-black text-[#1b2a4e]">AGE SOS</span>
                </div>
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#1b2a4e]"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Navigation */}
              <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-sky-500 mb-4">{group.label}</h3>
                    <div className="grid gap-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "text-lg font-bold transition-colors",
                            isActive(item.href) ? "text-sky-600" : "text-slate-700 active:text-sky-500"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                   <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-lg font-bold text-slate-700">
                     Contact Us
                   </Link>
                </div>
              </nav>

              {/* Mobile CTA */}
              <div className="p-6 bg-slate-50">
                <Link
                  href="/get-involved#donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#1b2a4e] py-5 text-sm font-black tracking-widest text-white shadow-xl shadow-[#1b2a4e]/20"
                >
                  DONATE NOW
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}