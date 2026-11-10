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
  ComplianceStatus,
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

  // Compute aggregate deliverable stats across all 5 phases
  const allDeliverables = phases.flatMap((p) => p.deliverables);
  const verifiedDeliverables = allDeliverables.filter(
    (d) => d.status === "Verified"
  ).length;

  return (
    <section id="roadmap" className="py-12 sm:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              SECTION 01 • SEQUENTIAL PROCEDURE TIMELINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Interactive 5-Phase Onboarding &amp; Execution Stepper
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
              Select any phase below to inspect mandatory legal deliverables,
              regulatory custody authorities, and verification milestones. Click
              any deliverable badge to simulate compliance progression.
            </p>
          </div>

          {/* Live Stepper Progress Summary */}
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-4 shrink-0 shadow-sm">
            <div>
              <div className="text-xs font-medium text-slate-500">
                Deliverable Verification
              </div>
              <div className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                {verifiedDeliverables} of {allDeliverables.length} Milestones
                Verified
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              <CheckCheck className="w-4 h-4" />
              <span>Audit Trail Active</span>
            </div>
          </div>
        </div>

        {/* Horizontal Quick-Tab Bar for Mobile/Tablet + Overview */}
        <div className="grid grid-cols-5 gap-2 mb-6 lg:hidden">
          {phases.map((phase) => {
            const isSelected = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                onClick={() => onSelectPhase(phase.id)}
                className={`px-2 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="text-[10px] font-mono uppercase opacity-75">
                  P0{phase.id}
                </div>
                <div className="text-xs font-semibold truncate mt-0.5">
                  {phase.title.split("&")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 12-Column Split: Vertical Timeline Spine (Left 5 Cols) + Phase Inspector (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 5-Phase Vertical Stepper */}
          <div className="lg:col-span-5 space-y-3">
            {phases.map((phase, idx) => {
              const isSelected = phase.id === activePhaseId;
              const isLast = idx === phases.length - 1;

              return (
                <div key={phase.id} className="relative">
                  {/* Vertical Connector Line */}
                  {!isLast && (
                    <div
                      className={`hidden lg:block absolute left-[26px] top-14 bottom-[-14px] w-0.5 z-0 transition-colors ${
                        phase.status === "Verified"
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                  )}

                  <button
                    onClick={() => onSelectPhase(phase.id)}
                    className={`w-full text-left rounded-xl p-4 sm:p-5 border transition-all relative z-10 cursor-pointer group ${
                      isSelected
                        ? "bg-white border-slate-900 ring-2 ring-slate-900/10 shadow-md"
                        : "bg-white/90 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Step Node Indicator */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono text-sm font-bold transition-colors border ${
                          isSelected
                            ? "bg-slate-900 text-emerald-400 border-slate-900"
                            : phase.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : phase.status === "In Progress"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {phase.status === "Verified" && !isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          phaseIcons[phase.id]
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              {phase.code}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              • {phase.duration}
                            </span>
                          </div>
                          <StatusBadge status={phase.status} size="sm" />
                        </div>

                        <h3
                          className={`mt-1.5 text-base font-bold leading-snug transition-colors ${
                            isSelected
                              ? "text-slate-900"
                              : "text-slate-800 group-hover:text-slate-950"
                          }`}
                        >
                          {phase.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {phase.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Animated Phase Details & Deliverables Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Top Dark Navy Header Bar */}
                <div className="bg-[#0F172A] text-white p-6 sm:p-7 border-b border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                        {activePhase.code}
                      </span>
                      <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                        TimelineWindow: {activePhase.duration}
                      </span>
                    </div>
                    <StatusBadge status={activePhase.status} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activePhase.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {activePhase.summary}
                  </p>

                  {/* Key Objective & Capital Milestone Strip */}
                  <div className="mt-5 pt-4 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
                      <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] block">
                        Primary Phase Objective
                      </span>
                      <span className="text-slate-100 font-medium mt-1 block">
                        {activePhase.keyObjective}
                      </span>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
                      <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] block">
                        Capital &amp; Custody Gate
                      </span>
                      <span className="text-emerald-400 font-mono font-semibold mt-1 block">
                        {activePhase.capitalMilestone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phase Deliverables List */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Mandatory Phase Deliverables ({activePhase.deliverables.length})
                    </h4>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Click status badge to toggle verification state
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {activePhase.deliverables.map((item, index) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all bg-slate-50/50"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm sm:text-base">
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

                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                          {item.description}
                        </p>

                        <div className="mt-3 pl-8 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500">
                          <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                            <strong className="text-slate-700">Authority:</strong>{" "}
                            {item.authority}
                          </span>
                          <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                            <strong className="text-slate-700">Proof:</strong>{" "}
                            {item.verificationMethod}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regulatory Compliance Callout Box */}
                  <div className="mt-6 rounded-xl bg-amber-50/70 border border-amber-200/90 p-4 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed text-amber-950">
                      <div className="font-bold uppercase tracking-wider text-[11px] text-amber-800 mb-0.5">
                        Regulatory Audit Standard • {activePhase.regulatoryCitation}
                      </div>
                      {activePhase.complianceNote}
                    </div>
                  </div>

                  {/* Footer Step Navigation */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() =>
                        onSelectPhase(Math.max(1, activePhase.id - 1))
                      }
                      disabled={activePhase.id === 1}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Phase</span>
                    </button>

                    <div className="text-xs font-mono text-slate-500">
                      Phase {activePhase.id} of {phases.length}
                    </div>

                    <button
                      onClick={() =>
                        onSelectPhase(
                          Math.min(phases.length, activePhase.id + 1)
                        )
                      }
                      disabled={activePhase.id === phases.length}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
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
