"use client";

import React, { useState } from "react";
import {
  Building2,
  Download,
  ShieldCheck,
  FileCheck2,
  PieChart,
  GitCommitHorizontal,
  UserPlus,
  Menu,
  X,
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
    <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 text-white no-print">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 h-16 flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-sm sm:text-base text-white">
                CBIP
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                NAICS 311811 • Active Venture
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block truncate">
              Canadian Business Investment Program • 24/7 Business Portal
            </p>
          </div>
        </a>

        {/* Section Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs lg:text-sm font-medium text-slate-300">
          <a
            href="#overview"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Overview</span>
          </a>
          <a
            href="#roadmap"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GitCommitHorizontal className="w-4 h-4 text-emerald-400" />
            <span>5-Phase Procedure</span>
          </a>
          <a
            href="#capital"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <PieChart className="w-4 h-4 text-emerald-400" />
            <span>$75k Capital Split</span>
          </a>
          <a
            href="#documents"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>Checklist &amp; FAQ</span>
          </a>
        </nav>

        {/* Right Actions: Live Readiness, Join Squad & Download */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden 2xl:flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Dossier Verified
              </div>
              <div className="text-xs font-mono font-semibold text-emerald-400 tabular-nums">
                {verifiedCount}/{totalDocs} Docs ({completionPct}%)
              </div>
            </div>
            <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          <button
            onClick={onOpenJoinSquad}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join Business ($75k)</span>
          </button>

          <button
            onClick={onDownloadChecklist}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Checklist</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="xl:hidden p-2 rounded-lg bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700 cursor-pointer"
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
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-800/70 text-slate-200 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Overview</span>
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-800/70 text-slate-200 flex items-center gap-2"
            >
              <GitCommitHorizontal className="w-4 h-4 text-emerald-400" />
              <span>5-Phase Stepper</span>
            </a>
            <a
              href="#capital"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-800/70 text-slate-200 flex items-center gap-2"
            >
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>$75k Capital Split</span>
            </a>
            <a
              href="#documents"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-800/70 text-slate-200 flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Checklist &amp; FAQ</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onDownloadChecklist();
            }}
            className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Client Checklist (.TXT)</span>
          </button>
        </div>
      )}
    </header>
  );
}
