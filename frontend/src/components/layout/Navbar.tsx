"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const NAV_ITEMS = [
  {
    label: "About",
    items: [
      { label: "About AGE", href: "/about" },
      { label: "Where We Work", href: "/where-we-work" },
    ],
  },
  {
    label: "Our Work",
    href: "/programs",
  },
  {
    label: "Impact",
    href: "/news",
  },
  {
    label: "Get Involved",
    items: [
      { label: "Volunteer", href: "/get-involved" },
      { label: "Donate", href: "/get-involved#donate" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const drawerVariants: Variants = {
  closed: { 
    x: "100%",
    transition: { type: "spring", bounce: 0, duration: 0.4 }
  },
  open: {
    x: 0,
    transition: { type: "spring", bounce: 0, duration: 0.4 },
  },
};

const staggerVariants: Variants = {
  closed: { 
    transition: { staggerChildren: 0.05, staggerDirection: -1 } 
  },
  open: { 
    transition: { staggerChildren: 0.07, delayChildren: 0.1 } 
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const hamburgerColor = mobileOpen
    ? "text-white"
    : isScrolled || !isHomePage
    ? "text-slate-900"
    : "text-white";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] w-full transition-all duration-500",
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
            : "bg-transparent"
        )}
      >
        {/* TOP CONTACT BAR - "Masquerade Motion" (Hides on Scroll) */}
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          animate={{
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(
            "hidden lg:block overflow-hidden border-b transition-colors duration-300",
            isHomePage ? "border-white/10 text-white/80" : "border-slate-200 text-slate-500"
          )}
        >
          <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.15em]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 hover:text-sky-400 transition-colors cursor-default">
                <MapPin size={12} className="text-sky-500" />
                Juba HQ, Central Equatoria, South Sudan
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:contact@age-southsudan.org" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                <Mail size={12} className="text-sky-500" />
                contact@age-southsudan.org
              </a>
              <a href="tel:+211920009257" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                <Phone size={12} className="text-sky-500" />
                +211 920 009 257
              </a>
            </div>
          </div>
        </motion.div>

        {/* MAIN NAVBAR */}
        <div
          className={cn(
            "container mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500",
            isScrolled ? "py-3 lg:py-4" : "py-5 lg:py-8"
          )}
        >
          {/* LOGO SECTION */}
          <Link href="/" className="group relative z-[110] flex items-center gap-4">
            <div className={cn(
              "relative overflow-hidden rounded-xl bg-white p-1 shadow-sm border border-slate-100 transition-all duration-500 group-hover:scale-105 group-hover:shadow-md",
              isScrolled ? "h-11 w-11" : "h-12 w-12 lg:h-14 lg:w-14"
            )}>
              <Image
                src="/age-logo.png"
                alt="AGE Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={cn(
                  "font-black tracking-tight transition-all duration-500 leading-none mb-1",
                  isScrolled ? "text-lg" : "text-xl",
                  isScrolled || !isHomePage ? "text-slate-900" : "text-white"
                )}
              >
                AGE <span className="text-sky-600">South Sudan</span>
              </span>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-500",
                isScrolled || !isHomePage ? "text-slate-500" : "text-white/70"
              )}>
                Agency for Generational Education
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {item.items ? (
                  <button
                    className={cn(
                      "group flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-bold tracking-wide transition-all rounded-full",
                      isScrolled || !isHomePage
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300 opacity-60",
                        hoveredNav === item.label && "rotate-180"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "relative flex px-4 py-2.5 text-[13px] font-bold tracking-wide transition-all rounded-full",
                      isScrolled || !isHomePage
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    {isActive(item.href!) && (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2 bg-sky-500 rounded-full" 
                      />
                    )}
                  </Link>
                )}

                <AnimatePresence>
                  {item.items && hoveredNav === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2.5 shadow-2xl ring-1 ring-black/5"
                    >
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-[13px] font-bold transition-all",
                            isActive(subItem.href)
                              ? "bg-sky-50 text-sky-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* RIGHT CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-5">
            <Link
              href="/get-involved#donate"
              className="hidden lg:inline-flex items-center rounded-full bg-sky-500 px-7 py-3.5 text-[11px] font-black tracking-widest uppercase text-white transition-all duration-300 hover:bg-sky-600 hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/30"
            >
              Donate Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[160] flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-label="Toggle Menu"
            >
              <span
                className={cn(
                  "block h-[2.5px] rounded-full bg-current transition-all duration-300 ease-out",
                  hamburgerColor,
                  mobileOpen ? "w-6 translate-y-[8.5px] rotate-45" : "w-6"
                )}
              />
              <span
                className={cn(
                  "block h-[2.5px] rounded-full bg-current transition-all duration-300 ease-out",
                  hamburgerColor,
                  mobileOpen ? "w-6 -translate-y-[8.5px] -rotate-45" : "w-4 ml-auto"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU (3/4 Screen Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[140] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed bottom-0 right-0 top-0 z-[150] flex w-[80%] max-w-[340px] flex-col bg-slate-950 text-white shadow-2xl lg:hidden"
            >
              <div className="flex-1 overflow-y-auto pb-32 pt-28 px-8">
                <motion.nav
                  variants={staggerVariants}
                  initial="closed"
                  animate="open"
                  className="flex flex-col gap-8"
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.div key={item.label} variants={itemVariants}>
                      {item.items ? (
                        <div className="flex flex-col gap-4">
                          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-500">
                            {item.label}
                          </h3>
                          <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-5">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  "text-lg font-bold transition-colors",
                                  isActive(subItem.href)
                                    ? "text-white"
                                    : "text-slate-400 hover:text-white"
                                )}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block text-2xl font-bold transition-colors",
                            isActive(item.href!)
                              ? "text-sky-400"
                              : "text-slate-100 hover:text-white"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              {/* Mobile Contact & CTA */}
              <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-950/90 p-6 backdrop-blur-xl">
                <div className="mb-6 flex flex-col gap-3 text-xs font-medium text-slate-400">
                  <a href="mailto:contact@age-southsudan.org" className="flex items-center gap-3">
                    <Mail size={14} className="text-sky-500" /> contact@age-southsudan.org
                  </a>
                  <a href="tel:+211920009257" className="flex items-center gap-3">
                    <Phone size={14} className="text-sky-500" /> +211 920 009 257
                  </a>
                </div>
                <Link
                  href="/get-involved#donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-sky-500 py-4 text-[13px] font-black uppercase tracking-widest text-white transition-transform active:scale-95 shadow-lg shadow-sky-500/20"
                >
                  Donate Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}