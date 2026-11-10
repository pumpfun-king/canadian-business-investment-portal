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
  ArrowDown,
} from "lucide-react";
import { HERO_METRICS } from "@/data/onboardingData";
import { StatusBadge } from "./StatusBadge";

interface HeroSectionProps {
  activePhase: number;
  onSelectPhase: (phaseId: number) => void;
}

export function HeroSection({ activePhase, onSelectPhase }: HeroSectionProps) {
  const metricIcons = [
    <Landmark key="total" className="w-5 h-5 text-[#831f28]" />,
    <ShieldCheck key="investor" className="w-5 h-5 text-[#831f28]" />,
    <Users key="partner" className="w-5 h-5 text-[#831f28]" />,
    <CalendarClock key="timeline" className="w-5 h-5 text-[#831f28]" />,
  ];

  return (
    <section id="overview" className="relative overflow-hidden">
      {/* TLG Style Gradient Header: Deep Navy / Slate merging smoothly into Rich Burgundy/Crimson */}
      <div className="bg-gradient-to-br from-[#121b27] via-[#241722] to-[#731920] text-white pt-12 pb-24 sm:pt-16 sm:pb-28 border-b border-[#3e1b23] relative">
        {/* Subtle Decorative Concentric Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-transparent via-[#831f28]/25 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-7 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#831f28]/40 text-rose-100 border border-rose-400/30">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                Active Commercial Venture • Ontario / Federal Corp
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-stone-300 bg-[#141d28] border border-white/10">
                <Lock className="w-3.5 h-3.5 text-rose-300" />
                FINTRAC &amp; Schedule I Bank Compliant
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-300 font-mono">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-rose-300" />
                Artisanal &amp; Wholesale Bakery Venture
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:flex items-center gap-1.5 text-rose-200">
                <FileSpreadsheet className="w-3.5 h-3.5 text-rose-300" />
                Dossier Ref: CBIP-BK-2026-075K
              </span>
            </div>
          </div>

          {/* Main Hero Header & Subtitle matching the TLG Latvia Investor Portal style */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-white/10 text-rose-200 border border-white/15 mb-3">
                INVESTOR ONBOARDING PORTAL
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.12]"
              >
                Welcome to your <br className="hidden sm:inline" />
                Commercial Bakery Investor Portal
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mt-4 text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed font-normal"
              >
                Here you can find all the necessary information, capital breakdown,
                corporate governance setup, and operational deployment roadmap.
              </motion.p>

              {/* TLG Style Circular Scroll Down Prompt */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#roadmap"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer group"
                  aria-label="Scroll to Roadmap"
                >
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs font-mono text-stone-300">
                  Explore 5-Phase Procedure &amp; Allocation
                </span>
              </div>
            </div>

            {/* Right TLG Style Floating Slate / Crimson Summary Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#141e2a]/95 border border-[#2b394d] rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs uppercase tracking-wider font-bold text-stone-300 font-mono">
                    Equity &amp; Governance Split
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-300 bg-[#831f28]/30 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                    100% Unencumbered
                  </span>
                </div>
                <div className="w-full h-3 bg-[#0d141e] rounded-full overflow-hidden flex p-0.5 border border-white/10 mb-3">
                  <div
                    className="bg-gradient-to-r from-[#831f28] to-rose-500 h-full rounded-full"
                    style={{ width: "60%" }}
                    title="Direct Investor Allocation: 60% ($45,000 CAD)"
                  />
                  <div
                    className="bg-[#2a394d] h-full rounded-full ml-1"
                    style={{ width: "40%" }}
                    title="Partner Co-Funding: 40% ($30,000 CAD)"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-stone-300 font-mono">
                  <span className="flex items-center gap-1.5 font-semibold text-rose-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    Investor: 60% ($45k CAD)
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3d4f68] inline-block" />
                    Partner: 40% ($30k CAD)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar - TLG Soft Rounded White Cards with Crimson Accents */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 -mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {HERO_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="bg-white rounded-3xl border border-rose-100/80 p-6 shadow-md hover:shadow-xl hover:border-rose-300/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50/80 border border-rose-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {metricIcons[index]}
                  </div>
                  <StatusBadge status={metric.status} size="sm" />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
                  {metric.label}
                </p>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-[28px] font-extrabold font-mono tracking-tight text-stone-900 tabular-nums">
                    {metric.value}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">
                  {metric.subtext}
                </span>
                <a
                  href={index === 3 ? "#roadmap" : "#capital"}
                  onClick={() => {
                    if (index === 1) onSelectPhase(3);
                  }}
                  className="text-[#831f28] hover:text-[#9e2733] font-bold inline-flex items-center gap-0.5 shrink-0"
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
