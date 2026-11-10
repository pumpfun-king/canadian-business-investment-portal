"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Scale,
  Building2,
  Landmark,
  Factory,
  FileBarChart2,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import {
  RoadmapPhase,
} from "@/data/onboardingData";
import { StatusBadge } from "./StatusBadge";

interface ProcedureStepperProps {
  phases: RoadmapPhase[];
  activePhaseId: number;
  onSelectPhase: (id: number) => void;
  onToggleDeliverableStatus: (phaseId: number, deliverableId: string) => void;
}

export function ProcedureStepper({
  phases,
  activePhaseId,
  onSelectPhase,
  onToggleDeliverableStatus,
}: ProcedureStepperProps) {
  const activePhase =
    phases.find((p) => p.id === activePhaseId) || phases[0];

  const phaseIcons: Record<number, React.ReactNode> = {
    1: <Scale className="w-5 h-5" />,
    2: <Building2 className="w-5 h-5" />,
    3: <Landmark className="w-5 h-5" />,
    4: <Factory className="w-5 h-5" />,
    5: <FileBarChart2 className="w-5 h-5" />,
  };

  const allDeliverables = phases.flatMap((p) => p.deliverables);
  const verifiedDeliverables = allDeliverables.filter(
    (d) => d.status === "Verified"
  ).length;

  return (
    <section id="roadmap" className="py-14 sm:py-20 bg-[#FBF9F8]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header - TLG Typography & Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#831f28] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#831f28]" />
              PROCEDURE ROADMAP • 5 DISTINCT PHASES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Sequential Verification &amp; Execution Timeline
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
              Inspect mandatory legal deliverables, regulatory custody gates, and
              verification milestones. Click any status badge to simulate live compliance clearance.
            </p>
          </div>

          {/* Stepper Progress Summary - TLG Pill */}
          <div className="bg-white border border-rose-100 rounded-2xl px-5 py-3.5 flex items-center gap-4 shrink-0 shadow-sm">
            <div>
              <div className="text-xs font-mono font-medium text-stone-500 uppercase">
                Milestones Cleared
              </div>
              <div className="text-sm font-mono font-bold text-stone-900 tabular-nums">
                {verifiedDeliverables} of {allDeliverables.length} Deliverables
              </div>
            </div>
            <div className="h-8 w-[1px] bg-stone-200" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#831f28] bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              <CheckCheck className="w-4 h-4" />
              <span>Audit Trail Live</span>
            </div>
          </div>
        </div>

        {/* Horizontal Quick-Tab Bar for Mobile/Tablet */}
        <div className="grid grid-cols-5 gap-2 mb-6 lg:hidden">
          {phases.map((phase) => {
            const isSelected = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                onClick={() => onSelectPhase(phase.id)}
                className={`px-2 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#831f28] text-white border-[#831f28] shadow-md shadow-[#831f28]/30"
                    : "bg-white text-stone-700 border-stone-200 hover:border-rose-200"
                }`}
              >
                <div className="text-[10px] font-mono uppercase opacity-75">
                  P0{phase.id}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">
                  {phase.title.split("&")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 12-Column Split: Vertical Timeline Spine (Left 5 Cols) + Phase Inspector (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 5-Phase Vertical Stepper */}
          <div className="lg:col-span-5 space-y-3.5">
            {phases.map((phase, idx) => {
              const isSelected = phase.id === activePhaseId;
              const isLast = idx === phases.length - 1;

              return (
                <div key={phase.id} className="relative">
                  {/* Vertical Connector Line */}
                  {!isLast && (
                    <div
                      className={`hidden lg:block absolute left-[27px] top-14 bottom-[-14px] w-0.5 z-0 transition-colors ${
                        phase.status === "Verified"
                          ? "bg-[#831f28]"
                          : "bg-stone-200"
                      }`}
                    />
                  )}

                  <button
                    onClick={() => onSelectPhase(phase.id)}
                    className={`w-full text-left rounded-3xl p-5 border transition-all relative z-10 cursor-pointer group ${
                      isSelected
                        ? "bg-white border-[#831f28] ring-2 ring-[#831f28]/20 shadow-lg shadow-[#831f28]/10"
                        : "bg-white hover:bg-stone-50/80 border-stone-200/90 hover:border-rose-200 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Node Indicator */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-mono text-sm font-bold transition-all border ${
                          isSelected
                            ? "bg-gradient-to-br from-[#831f28] to-[#5c131a] text-white border-[#831f28] shadow-md shadow-[#831f28]/30"
                            : phase.status === "Verified"
                            ? "bg-rose-50 text-[#831f28] border-rose-200"
                            : phase.status === "In Progress"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-stone-100 text-stone-600 border-stone-200"
                        }`}
                      >
                        {phase.status === "Verified" && !isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-[#831f28]" />
                        ) : (
                          phaseIcons[phase.id]
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                              {phase.code}
                            </span>
                            <span className="text-[11px] font-mono text-stone-400">
                              • {phase.duration}
                            </span>
                          </div>
                          <StatusBadge status={phase.status} size="sm" />
                        </div>

                        <h3
                          className={`mt-1.5 text-base font-bold leading-snug transition-colors ${
                            isSelected
                              ? "text-stone-900"
                              : "text-stone-800 group-hover:text-stone-950"
                          }`}
                        >
                          {phase.title}
                        </h3>

                        <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {phase.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Animated Phase Details Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden"
              >
                {/* Top Crimson / Navy Banner matching TLG card headers */}
                <div className="bg-gradient-to-r from-[#141e2a] via-[#2d1820] to-[#7a1f26] text-white p-6 sm:p-8 border-b border-[#3e1b23]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-rose-100 font-mono text-xs font-bold">
                        {activePhase.code}
                      </span>
                      <span className="text-xs font-mono text-stone-300 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                        Duration: {activePhase.duration}
                      </span>
                    </div>
                    <StatusBadge status={activePhase.status} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {activePhase.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-200 leading-relaxed">
                    {activePhase.summary}
                  </p>

                  {/* Key Objective & Capital Milestone Strip */}
                  <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/20 border border-white/10 rounded-2xl p-3.5">
                      <span className="text-stone-300 uppercase tracking-wider font-mono text-[10px] block font-bold">
                        Primary Phase Objective
                      </span>
                      <span className="text-white font-medium mt-1 block">
                        {activePhase.keyObjective}
                      </span>
                    </div>
                    <div className="bg-black/20 border border-white/10 rounded-2xl p-3.5">
                      <span className="text-stone-300 uppercase tracking-wider font-mono text-[10px] block font-bold">
                        Capital &amp; Custody Gate
                      </span>
                      <span className="text-rose-200 font-mono font-bold mt-1 block">
                        {activePhase.capitalMilestone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phase Deliverables List */}
                <div className="p-6 sm:p-8 bg-[#FBF9F8]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                      Mandatory Phase Deliverables ({activePhase.deliverables.length})
                    </h4>
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#831f28]" />
                      Click badge to cycle status
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {activePhase.deliverables.map((item, index) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-rose-300 transition-all shadow-xs"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-[#831f28] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <h5 className="font-bold text-stone-900 text-sm sm:text-base">
                              {item.title}
                            </h5>
                          </div>

                          <StatusBadge
                            status={item.status}
                            size="sm"
                            interactive
                            onClick={() =>
                              onToggleDeliverableStatus(activePhase.id, item.id)
                            }
                          />
                        </div>

                        <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed pl-10">
                          {item.description}
                        </p>

                        <div className="mt-3 pl-10 flex flex-wrap items-center gap-2 text-[11px] font-mono text-stone-500">
                          <span className="bg-stone-50 border border-stone-200 px-3 py-1 rounded-full">
                            <strong className="text-stone-800">Authority:</strong>{" "}
                            {item.authority}
                          </span>
                          <span className="bg-stone-50 border border-stone-200 px-3 py-1 rounded-full">
                            <strong className="text-stone-800">Proof:</strong>{" "}
                            {item.verificationMethod}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regulatory Compliance Callout Box */}
                  <div className="mt-6 rounded-2xl bg-rose-50/80 border border-rose-200/90 p-4 sm:p-5 flex items-start gap-3.5">
                    <ShieldAlert className="w-5 h-5 text-[#831f28] shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed text-[#5c131a]">
                      <div className="font-bold uppercase tracking-wider text-[11px] text-[#831f28] mb-1">
                        Regulatory Audit Standard • {activePhase.regulatoryCitation}
                      </div>
                      {activePhase.complianceNote}
                    </div>
                  </div>

                  {/* Footer Step Navigation */}
                  <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() =>
                        onSelectPhase(Math.max(1, activePhase.id - 1))
                      }
                      disabled={activePhase.id === 1}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-stone-300 text-stone-700 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Phase</span>
                    </button>

                    <div className="text-xs font-mono text-stone-500">
                      Phase {activePhase.id} of {phases.length}
                    </div>

                    <button
                      onClick={() =>
                        onSelectPhase(
                          Math.min(phases.length, activePhase.id + 1)
                        )
                      }
                      disabled={activePhase.id === phases.length}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#831f28] text-white hover:bg-[#9c2631] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shadow-md shadow-[#831f28]/25"
                    >
                      <span>Next Phase</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
