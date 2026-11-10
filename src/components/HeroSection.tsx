"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Landmark,
  Users,
  CalendarClock,
  ArrowUpRight,
  Lock,
  Building,
  FileSpreadsheet,
} from "lucide-react";
import { HERO_METRICS } from "@/data/onboardingData";
import { StatusBadge } from "./StatusBadge";

interface HeroSectionProps {
  activePhase: number;
  onSelectPhase: (phaseId: number) => void;
}

export function HeroSection({ activePhase, onSelectPhase }: HeroSectionProps) {
  const metricIcons = [
    <Landmark key="total" className="w-5 h-5 text-emerald-600" />,
    <ShieldCheck key="investor" className="w-5 h-5 text-slate-900" />,
    <Users key="partner" className="w-5 h-5 text-emerald-600" />,
    <CalendarClock key="timeline" className="w-5 h-5 text-slate-700" />,
  ];

  return (
    <section id="overview" className="relative overflow-hidden">
      {/* Institutional Deep Navy Banner */}
      <div className="bg-[#0F172A] text-white pt-10 pb-20 sm:pt-14 sm:pb-24 border-b border-slate-800 relative">
        {/* Subtle Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
          {/* Top Institutional Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-7 border-b border-slate-800/90">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Commercial Venture • Ontario / Federal Corp
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-800/90 border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                FINTRAC & Schedule I Bank Compliant
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                Sector: Artisanal & Wholesale Commercial Bakery
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Dossier Ref: CBIP-BK-2026-075K
              </span>
            </div>
          </div>

          {/* Main Hero Header & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]"
              >
                Commercial Bakery Venture Onboarding &amp; Investment Roadmap
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
              >
                A transparent, step-by-step breakdown of capital allocation,
                corporate setup, and operational deployment.
              </motion.p>
            </div>

            {/* Right Executive Summary Pill Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Equity &amp; Governance Structure
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    100% Unencumbered
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex mb-2.5">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: "60%" }}
                    title="Direct Investor Allocation: 60% ($45,000 CAD)"
                  />
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: "40%" }}
                    title="Partner Co-Funding: 40% ($30,000 CAD)"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                    Investor: 60% ($45k)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-500 inline-block" />
                    Partner: 40% ($30k)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar (Overlapping Institutional Cards) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {HERO_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                    {metricIcons[index]}
                  </div>
                  <StatusBadge status={metric.status} size="sm" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {metric.label}
                </p>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-[26px] font-bold font-mono tracking-tight text-slate-900 tabular-nums">
                    {metric.value}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  {metric.subtext}
                </span>
                <a
                  href={index === 3 ? "#roadmap" : "#capital"}
                  onClick={() => {
                    if (index === 1) onSelectPhase(3);
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-0.5 shrink-0"
                >
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
