"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

/**
 * FIXED VARIANTS
 * Explicitly typed as Variants to solve the Index Signature error
 */
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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
          "fixed inset-x-0 top-0 z-[100] w-full transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-white/95 border-b border-slate-200 py-3 backdrop-blur-md shadow-sm"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          
          {/* LOGO SECTION */}
          <Link href="/" className="group relative z-[110] flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-white p-1 shadow-sm border border-slate-100 transition-transform group-hover:scale-105">
              <Image
                src="/age-logo.png"
                alt="AGE Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-lg font-black tracking-tight transition-colors leading-tight",
                  isScrolled || !isHomePage ? "text-slate-900" : "text-white"
                )}
              >
                AGE <span className="text-sky-600">South Sudan</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Agency for Generational Education
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
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
                      "group flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all",
                      isScrolled || !isHomePage
                        ? "text-slate-600 hover:text-slate-900"
                        : "text-white/90 hover:text-white"
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
                      "relative flex px-4 py-2 text-sm font-bold transition-all",
                      isScrolled || !isHomePage
                        ? "text-slate-600 hover:text-slate-900"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.label}
                    {isActive(item.href!) && (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-sky-500 rounded-full" 
                      />
                    )}
                  </Link>
                )}

                <AnimatePresence>
                  {item.items && hoveredNav === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black/5"
                    >
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block rounded-md px-4 py-2.5 text-sm font-semibold transition-all",
                            isActive(subItem.href)
                              ? "bg-slate-50 text-sky-600"
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

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5">
            <Link
              href="/get-involved#donate"
              className="hidden lg:inline-flex items-center rounded-full bg-sky-500 px-6 py-2.5 text-xs font-black tracking-widest uppercase text-white transition-all hover:bg-sky-600 hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
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
              className="fixed inset-0 z-[140] bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed bottom-0 right-0 top-0 z-[150] flex w-3/4 max-w-[320px] flex-col bg-slate-950 text-white shadow-2xl lg:hidden"
            >
              <div className="flex-1 overflow-y-auto pb-24 pt-24 px-8">
                <motion.nav
                  variants={staggerVariants}
                  initial="closed"
                  animate="open"
                  className="flex flex-col gap-8"
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.div key={item.label} variants={itemVariants}>
                      {item.items ? (
                        <div className="flex flex-col gap-3">
                          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                            {item.label}
                          </h3>
                          <div className="flex flex-col gap-3 border-l border-white/10 pl-4">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  "text-lg font-bold transition-colors",
                                  isActive(subItem.href)
                                    ? "text-sky-400"
                                    : "text-slate-200 hover:text-white"
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

              <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-950/90 p-6 backdrop-blur-md">
                <Link
                  href="/get-involved#donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-sky-500 py-4 text-sm font-black uppercase tracking-widest text-white transition-transform active:scale-95"
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