"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "group inline-flex items-center gap-2 rounded-lg text-sm text-slate-300 transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40";

  const content = (
    <span className="relative">
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
    </span>
  );

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {content}
        <span
          className="text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a
      href={href}
      className="group block min-w-0 rounded-xl transition-all duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {label}
          </div>
          <div className="mt-1 truncate text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
            {value}
          </div>
        </div>
      </div>
    </a>
  ) : (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          {label}
        </div>
        <div className="mt-1 text-sm font-medium text-slate-200">{value}</div>
      </div>
    </div>
  );

  return content;
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {children}
      </span>
    </a>
  );
}

export default function Footer() {
  const whatsappNumber = "211922111273";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-[#050816] text-white"
      aria-label="Site footer"
    >
      {/* Accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand / CTA */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex max-w-max items-center gap-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/age-logo.png"
                  alt="AGE logo"
                  fill
                  className="object-contain p-2"
                  sizes="56px"
                />
              </div>

              <div className="leading-tight">
                <p className="text-base font-bold tracking-tight text-white sm:text-lg">
                  Agency for Generational Education
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/90">
                  Standing for everyone
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-md text-sm leading-7 text-slate-400">
              Dedicated to empowering communities through education, health,
              and sustainable development across South Sudan since 2019.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/get-involved#donate"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-400 px-7 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 active:scale-[0.98]"
              >
                Donate Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-[0.98]"
              >
                Partner with Us
              </Link>
            </div>

            <div className="mt-10">
              <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Follow our impact
              </div>

              <div className="flex items-center gap-3">
                <SocialIcon href="#" label="Facebook">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56v1.91h2.78l-.44 2.91h-2.34V22c4.78-.75 8.43-4.91 8.43-9.93Z" />
                  </svg>
                </SocialIcon>

                <SocialIcon href="#" label="X">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.25l-4.9-6.44L6.41 22H3.3l7.23-8.27L.8 2h6.4l4.43 5.84L18.9 2Zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20Z" />
                  </svg>
                </SocialIcon>

                <SocialIcon href="#" label="LinkedIn">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.96 1.96 0 1 0-3.91 0 1.96 1.96 0 0 0 3.9 0ZM20.44 13.04c0-3.12-1.66-4.57-3.88-4.57-1.79 0-2.59.98-3.04 1.67V8.5h-3.38V20h3.38v-5.7c0-1.5.28-2.96 2.14-2.96 1.84 0 1.86 1.72 1.86 3.05V20H21v-6.96h-.56Z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Organization
                </h2>
                <div className="mt-6 flex flex-col gap-4">
                  <FooterLink href="/about">About AGE</FooterLink>
                  <FooterLink href="/impact">Impact & Results</FooterLink>
                  <FooterLink href="/where-we-work">Where We Work</FooterLink>
                  <FooterLink href="/programs">Our Programs</FooterLink>
                  <FooterLink href="/news">News & Updates</FooterLink>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Quick Actions
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  <FooterLink href="/get-involved#volunteer">Volunteer</FooterLink>
                  <FooterLink href="/get-involved#partner">Global Partnership</FooterLink>
                  <FooterLink href="/get-involved#csr">Corporate CSR</FooterLink>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <section className="lg:col-span-4" aria-label="Direct Contact">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Get in Touch
            </h2>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="space-y-5">
                <ContactRow
                  label="Headquarters"
                  value="Juba, South Sudan"
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                />

                <ContactRow
                  label="General Inquiries"
                  value="agesouthsudan@gmail.com"
                  href="mailto:agesouthsudan@gmail.com"
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />

                <ContactRow
                  label="Phone Support"
                  value="+211 920 009 257"
                  href="tel:+211920009257"
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                />

                <ContactRow
                  label="WhatsApp"
                  value="+211 922 111 273"
                  href={whatsappLink}
                  icon={
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                />
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4">
                <p className="text-sm font-medium text-slate-200">
                  We welcome partnerships, volunteers, and supporters who want
                  to make measurable impact in South Sudan.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Agency for Generational Education (AGE).
                All rights reserved.
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                National NGO Registration No. 2486
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              <Link
                className="transition-colors hover:text-white"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="transition-colors hover:text-white"
                href="/terms"
              >
                Terms of Use
              </Link>
              <Link
                className="transition-colors hover:text-white"
                href="/cookies"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}