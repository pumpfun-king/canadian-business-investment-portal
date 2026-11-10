"use client";

import React, { useState } from "react";
import {
  Download,
  ShieldCheck,
  FileCheck2,
  PieChart,
  GitCommitHorizontal,
  UserPlus,
  Menu,
  X,
  Compass,
} from "lucide-react";

interface NavbarProps {
  verifiedCount: number;
  totalDocs: number;
  onDownloadChecklist: () => void;
  onOpenJoinSquad: () => void;
}

export function Navbar({
  verifiedCount,
  totalDocs,
  onDownloadChecklist,
  onOpenJoinSquad,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const completionPct = Math.round((verifiedCount / totalDocs) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[#121b27]/95 backdrop-blur-md border-b border-[#243041] text-white no-print">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 h-16 flex items-center justify-between gap-3">
        {/* Brand Identity - TLG Style Geometric Monogram */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#831f28] to-[#4e1117] border border-[#a82d38]/60 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            {/* Elegant Flower/Compass icon reminiscent of TLG Global logo */}
            <Compass className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white font-mono">
                CBIP
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#831f28]/30 text-rose-200 border border-[#831f28]/60 font-semibold">
                NAICS 311811 • Active Venture
              </span>
            </div>
            <p className="text-[11px] text-stone-300 hidden sm:block truncate">
              Canada Business Venture Structure • Investor Portal
            </p>
          </div>
        </a>

        {/* Section Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs lg:text-sm font-medium text-stone-300">
          <a
            href="#overview"
            className="px-3.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-rose-300" />
            <span>Overview</span>
          </a>
          <a
            href="#roadmap"
            className="px-3.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GitCommitHorizontal className="w-4 h-4 text-rose-300" />
            <span>5-Phase Procedure</span>
          </a>
          <a
            href="#capital"
            className="px-3.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <PieChart className="w-4 h-4 text-rose-300" />
            <span>$75k Capital Split</span>
          </a>
          <a
            href="#documents"
            className="px-3.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4 text-rose-300" />
            <span>Checklist &amp; FAQ</span>
          </a>
        </nav>

        {/* Right Actions: Live Readiness, Join Business & Download */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden 2xl:flex items-center gap-2.5 bg-[#1a2533] border border-[#2a374a] px-3.5 py-1.5 rounded-full shadow-inner">
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-wider text-stone-400 font-mono font-medium">
                Dossier Verified
              </div>
              <div className="text-xs font-mono font-bold text-rose-300 tabular-nums">
                {verifiedCount}/{totalDocs} Docs ({completionPct}%)
              </div>
            </div>
            <div className="w-12 h-2 bg-[#0c1219] rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-[#831f28] rounded-full transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          <button
            onClick={onOpenJoinSquad}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#831f28] to-[#5e141a] hover:from-[#9b2632] hover:to-[#731920] text-white shadow-md shadow-[#831f28]/30 transition-all cursor-pointer active:scale-95 border border-rose-400/30"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join Business ($75k)</span>
          </button>

          <button
            onClick={onDownloadChecklist}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#1a2533] hover:bg-[#223042] text-stone-200 border border-[#2c3b4f] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-rose-300" />
            <span className="hidden md:inline">Checklist</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="xl:hidden p-2 rounded-xl bg-[#1a2533] text-stone-200 hover:text-white border border-[#2c3b4f] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121b27] border-t border-[#243041] px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#1a2533] text-stone-200 flex items-center gap-2 border border-[#2c3b4f]"
            >
              <ShieldCheck className="w-4 h-4 text-rose-300" />
              <span>Overview</span>
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#1a2533] text-stone-200 flex items-center gap-2 border border-[#2c3b4f]"
            >
              <GitCommitHorizontal className="w-4 h-4 text-rose-300" />
              <span>5-Phase Stepper</span>
            </a>
            <a
              href="#capital"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#1a2533] text-stone-200 flex items-center gap-2 border border-[#2c3b4f]"
            >
              <PieChart className="w-4 h-4 text-rose-300" />
              <span>$75k Capital Split</span>
            </a>
            <a
              href="#documents"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#1a2533] text-stone-200 flex items-center gap-2 border border-[#2c3b4f]"
            >
              <FileCheck2 className="w-4 h-4 text-rose-300" />
              <span>Checklist &amp; FAQ</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onDownloadChecklist();
            }}
            className="w-full py-2.5 rounded-full text-xs font-semibold bg-[#831f28]/30 text-rose-200 border border-[#831f28]/60 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Client Checklist (.TXT)</span>
          </button>
        </div>
      )}
    </header>
  );
}
