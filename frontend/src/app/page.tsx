"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Outfit, Inter } from "next/font/google";

// Initialize modern, highly readable fonts
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- TYPES ---
type Program = {
  title: string;
  href: string;
  desc: string;
  image: string;
};

type Story = {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
};

// --- DATA ---
const HERO_SLIDES = [
  "/images/hero.jpeg",
  "/images/programs/health.jpeg",
  "/images/programs/wash-hero.jpeg",
  "/images/child-edu.jpeg",
];

const PROGRAMS: Program[] = [
  {
    title: "Education",
    href: "/programs#education",
    desc: "Ensuring every child can learn, grow, and access quality education through community schools and teacher support.",
    image: "/images/child-edu.jpeg",
  },
  {
    title: "Health",
    href: "/programs#health",
    desc: "Improving access to community healthcare, prevention programs, and life-saving medical services.",
    image: "/images/programs/health.jpeg",
  },
  {
    title: "WASH",
    href: "/programs#wash",
    desc: "Delivering clean water, sanitation infrastructure, and hygiene awareness in vulnerable communities.",
    image: "/images/programs/wash.jpeg",
  },
  {
    title: "Food Security",
    href: "/programs#fsl",
    desc: "Supporting farmers and families with sustainable agriculture and livelihood resilience.",
    image: "/images/programs/health.jpeg",
  },
  {
    title: "Nutrition",
    href: "/programs#nutrition",
    desc: "Preventing malnutrition and supporting healthy child development through community nutrition programs.",
    image: "/images/programs/nutrition.jpeg",
  },
  {
    title: "Community Development",
    href: "/programs#crosscutting",
    desc: "Strengthening local leadership, youth engagement, gender equality, and peacebuilding.",
    image: "/images/programs/program.jpeg",
  },
];

const STORIES: Story[] = [
  {
    title: "Clean water bringing new life to Jonglei communities",
    excerpt: "New boreholes and hygiene awareness programs are helping families access safe drinking water and prevent disease.",
    date: "Oct 12, 2024",
    image: "/images/programs/wash.jpeg",
    href: "/news",
  },
  {
    title: "Helping children return to school through community support",
    excerpt: "Local education initiatives are helping students reconnect with learning opportunities.",
    date: "Sep 28, 2024",
    image: "/images/child-edu.jpeg",
    href: "/news",
  },
  {
    title: "Stronger partnerships improving community health access",
    excerpt: "Working together with local leaders to strengthen health services and reach vulnerable families.",
    date: "Sep 15, 2024",
    image: "/images/programs/health.jpeg",
    href: "/news",
  },
];

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- COMPONENTS ---
function ProgramCard({ program }: { program: Program }) {
  return (
    <motion.div variants={fadeInUp} className="group h-full">
      <Link href={program.href} className="block h-full outline-none">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-300 z-10">
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className={`${outfit.className} text-2xl font-bold text-white tracking-wide`}>
                {program.title}
              </h3>
              <div className="mt-3 h-1 w-12 rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6 md:p-8 bg-white z-10">
            <p className={`${inter.className} text-slate-600 text-base leading-relaxed line-clamp-3`}>
              {program.desc}
            </p>
            <div className="mt-6 flex items-center text-sm font-semibold uppercase tracking-wider text-sky-600">
              Explore Program
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 transition-transform group-hover:translate-x-2 group-hover:bg-sky-100">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isModalOpen]);

  return (
    <main className={`bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white ${inter.variable} ${outfit.variable} font-sans`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-blue-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide]}
              alt={`AGE community work slide ${currentSlide + 1}`}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/70 to-blue-950/30" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-32 pb-24 text-white z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center rounded-full bg-blue-900/50 px-4 py-2 border border-blue-800/50 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse mr-3" />
                <span className={`${inter.className} text-sm font-medium tracking-wide text-sky-50 uppercase`}>
                  Agency for Generational Education
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className={`${outfit.className} text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight`}>
                Communities First.
                <br />
                <span className="text-sky-400">
                  Generations Empowered.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className={`${inter.className} mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed`}>
                Partnering with communities across South Sudan to expand education, enhance health services, and build sustainable livelihoods for a resilient future.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4 md:gap-6">
                <Link
                  href="/get-involved#donate"
                  className="group relative inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-4 font-semibold text-blue-950 transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:-translate-y-1"
                >
                  <span>Donate Now</span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>

                <Link
                  href="/programs"
                  className="group inline-flex items-center justify-center rounded-full border border-white/40 bg-white/5 backdrop-blur-sm px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-blue-950"
                >
                  Explore Programs
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-6 right-6 mx-auto max-w-7xl flex gap-3 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === idx ? "w-12 bg-sky-400" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="relative bg-slate-50 overflow-hidden">
        
        {/* Subtle background watermark */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-fixed bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/age-logo.png')",
            backgroundSize: "50%",
          }}
        />

        {/* --- VISION & MISSION SECTION --- */}
        <section className="relative z-10 py-24 sm:py-32 border-b border-slate-200">
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.h2
                initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true, margin: "-100px" }}
                className={`${outfit.className} text-4xl sm:text-5xl font-bold text-blue-950`}
              >
                Driving Real Change
              </motion.h2>
              <motion.p
                initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
                className={`${inter.className} mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed`}
              >
                Building the future, one community at a time through strategic partnerships and grassroots local leadership.
              </motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "Our Vision", icon: "👁️", text: "A resilient South Sudan where communities have equal access to education, healthcare, and sustainable opportunities." },
                { title: "Our Mission", icon: "🎯", text: "Delivering community-led programs that empower people with the tools, knowledge, and resources to shape their own future." },
                { title: "Our Impact", icon: "🌱", text: "Through strategic partnerships and grassroots local leadership, we are creating long-term, scalable generational change." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative rounded-2xl bg-white p-8 md:p-10 shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:bg-blue-950 hover:border-blue-950 hover:shadow-xl z-10"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/10">
                    {item.icon}
                  </div>
                  <h3 className={`${outfit.className} mb-4 text-2xl font-bold text-blue-950 group-hover:text-white transition-colors`}>
                    {item.title}
                  </h3>
                  <p className={`${inter.className} text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed`}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROGRAMS SECTION --- */}
        <section className="relative z-10 py-24 sm:py-32 bg-slate-100 border-b border-slate-200">
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl z-10">
                <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className={`${outfit.className} text-4xl sm:text-5xl font-bold text-blue-950`}>
                  Our Focus Areas
                </motion.h2>
                <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className={`${inter.className} mt-4 text-xl text-sky-600`}>
                  Integrated solutions for complex challenges.
                </motion.p>
              </div>
              
              <motion.button
                initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center z-10 justify-center rounded-full bg-blue-950 px-8 py-3.5 font-semibold text-white transition-all hover:bg-sky-600 hover:shadow-md"
              >
                View All Programs
              </motion.button>
            </div>

            <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="grid gap-8 md:grid-cols-3">
              {PROGRAMS.slice(0, 3).map((p) => (
                <ProgramCard key={p.title} program={p} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- WHERE WE WORK SECTION --- */}
        <section className="relative z-10 py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className="z-10">
              <h2 className={`${outfit.className} text-4xl sm:text-5xl font-bold text-blue-950`}>Where We Work</h2>
              <p className={`${inter.className} mt-4 text-xl font-medium text-sky-600`}>
                Reaching the unreachable.
              </p>
              <p className={`${inter.className} mt-6 text-lg text-slate-600 leading-relaxed`}>
                AGE operates in vulnerable regions across South Sudan, ensuring that communities facing the greatest challenges—from conflict to climate shocks—are not left behind. We go where the need is greatest.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {["Jonglei", "Unity", "Upper Nile", "Warrap"].map((state) => (
                  <span
                    key={state}
                    className="px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm transition-all hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50"
                  >
                    {state}
                  </span>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/where-we-work" className="group inline-flex items-center text-base font-semibold text-blue-950">
                  <span className="border-b-2 border-sky-500 pb-0.5 transition-colors group-hover:text-sky-600">
                    Explore our locations map
                  </span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2 text-sky-500">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] w-full z-10"
            >
              {/* Decorative offset border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-sky-100 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-lg bg-slate-100 border border-slate-200">
                <Image
                  src="/images/map.png"
                  alt="South Sudan map"
                  fill
                  className="object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- STORIES SECTION --- */}
        <section className="relative z-10 bg-slate-50 py-24 sm:py-32 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-xl z-10">
                <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className={`${outfit.className} text-4xl sm:text-5xl font-bold text-blue-950`}>
                  Stories of Change
                </motion.h2>
                <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className={`${inter.className} mt-4 text-xl text-sky-600`}>
                  Voices from the communities we serve.
                </motion.p>
              </div>
              <Link
                href="/news"
                className="group inline-flex items-center justify-center z-10 rounded-full border border-blue-950 px-8 py-3.5 font-semibold text-blue-950 transition-all hover:bg-blue-950 hover:text-white"
              >
                Read All Stories
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="grid gap-8 md:grid-cols-3">
              {STORIES.map((story) => (
                <motion.div key={story.title} variants={fadeInUp} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 z-10 hover:-translate-y-1">
                  <Link href={story.href} className="block flex-1 outline-none">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-blue-950 shadow-sm">
                        {story.date}
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-white">
                      <div>
                        <h3 className={`${outfit.className} text-xl font-bold text-blue-950 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight`}>
                          {story.title}
                        </h3>
                        <p className={`${inter.className} mt-4 text-slate-600 text-sm line-clamp-3 leading-relaxed`}>
                          {story.excerpt}
                        </p>
                      </div>
                      <div className="mt-8 text-sm font-semibold text-sky-600 flex items-center uppercase tracking-wider">
                        Read Story
                        <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* --- ALL PROGRAMS MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 10 }} 
              transition={{ duration: 0.2 }}
              className="relative flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-white p-6 sm:p-8">
                <div>
                  <h2 className={`${outfit.className} text-3xl font-bold text-blue-950`}>All Focus Areas</h2>
                  <p className={`${inter.className} text-lg text-sky-600 mt-1`}>Discover everything we do.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-blue-950"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-slate-50">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {PROGRAMS.map((p) => (
                    <ProgramCard key={p.title} program={p} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CTA SECTION --- */}
      <section className="relative z-20 bg-slate-100 mx-auto w-full px-4 sm:px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-blue-950 px-8 py-20 sm:px-12 sm:py-24 text-center shadow-xl max-w-6xl mx-auto"
        >
          {/* Decorative Dot Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10 mx-auto max-w-3xl text-white">
            <h2 className={`${outfit.className} text-4xl sm:text-5xl font-bold tracking-tight`}>
              Be Part of the Change.
            </h2>
            <p className={`${inter.className} mt-6 text-lg sm:text-xl text-sky-200 leading-relaxed max-w-2xl mx-auto font-light`}>
              Your support directly strengthens communities, educates children, and creates sustainable opportunities for families in South Sudan.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href="/get-involved#donate"
                className="rounded-full bg-amber-500 px-10 py-4 font-semibold text-blue-950 shadow-md transition-all hover:-translate-y-1 hover:bg-amber-400"
              >
                Make a Donation
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-transparent border border-white/30 px-10 py-4 font-semibold text-white transition-all hover:bg-white/10"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </main>
  );
}