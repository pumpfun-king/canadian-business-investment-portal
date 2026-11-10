"use client";

import React, { useState } from "react";
import {
  ROADMAP_PHASES,
  DOCUMENT_CHECKLIST,
  FAQ_ITEMS,
  CAPITAL_BREAKDOWN,
  RoadmapPhase,
  ChecklistDocument,
  ComplianceStatus,
} from "@/data/onboardingData";
import { Navbar } from "@/components/Navbar";
import { LiveSquadProgressHub } from "@/components/LiveSquadProgressHub";
import { HeroSection } from "@/components/HeroSection";
import { ProcedureStepper } from "@/components/ProcedureStepper";
import { CapitalBreakdown } from "@/components/CapitalBreakdown";
import { DocumentChecklistFaq } from "@/components/DocumentChecklistFaq";
import { Building2, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

const STATUS_CYCLE: Record<ComplianceStatus, ComplianceStatus> = {
  Required: "In Progress",
  "In Progress": "Verified",
  Verified: "Required",
};

export default function OnboardingPortalPage() {
  const [phases, setPhases] = useState<RoadmapPhase[]>(ROADMAP_PHASES);
  const [activePhaseId, setActivePhaseId] = useState<number>(2);
  const [documents, setDocuments] =
    useState<ChecklistDocument[]>(DOCUMENT_CHECKLIST);
  const [downloadToast, setDownloadToast] = useState<boolean>(false);
  const [joinModalTrigger, setJoinModalTrigger] = useState<number>(0);

  // Cycle deliverable status inside a phase and automatically recalculate overall phase status
  const handleToggleDeliverableStatus = (
    phaseId: number,
    deliverableId: string
  ) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id !== phaseId) return phase;

        const updatedDeliverables = phase.deliverables.map((del) =>
          del.id === deliverableId
            ? { ...del, status: STATUS_CYCLE[del.status] }
            : del
        );

        const allVerified = updatedDeliverables.every(
          (d) => d.status === "Verified"
        );
        const anyVerifiedOrProgress = updatedDeliverables.some(
          (d) => d.status === "Verified" || d.status === "In Progress"
        );

        const nextPhaseStatus: ComplianceStatus = allVerified
          ? "Verified"
          : anyVerifiedOrProgress
          ? "In Progress"
          : "Required";

        return {
          ...phase,
          deliverables: updatedDeliverables,
          status: nextPhaseStatus,
        };
      })
    );
  };

  // Cycle checklist document status
  const handleToggleDocStatus = (docId: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === docId ? { ...doc, status: STATUS_CYCLE[doc.status] } : doc
      )
    );
  };

  // Generate and download a comprehensive plain-text Client Onboarding Checklist & Capital Summary
  const handleDownloadChecklist = () => {
    const lines: string[] = [
      "================================================================================",
      "CANADIAN BUSINESS INVESTMENT PROGRAM (CBIP) — CLIENT ONBOARDING DOSSIER",
      "VENTURE: ACTIVE COMMERCIAL BAKERY VENTURE (NAICS 311811 / 311814)",
      "REFERENCE: CBIP-BK-2026-075K",
      "================================================================================",
      "",
      "1. CAPITAL STRUCTURE & TIMELINE SUMMARY",
      "--------------------------------------------------------------------------------",
      "• Total Required Capital:        $75,000 CAD (100% Active Commercial Deployment)",
      "• Direct Investor Allocation:    $45,000 CAD (60.0% Controlling Class A Equity)",
      "• Partner Co-Funding:            $30,000 CAD (40.0% Operating Partner Equity)",
      "• Target Operational Timeline:   12–24 Months",
      "",
      "2. $75,000 CAD CAPITAL DEPLOYMENT BREAKDOWN",
      "--------------------------------------------------------------------------------",
      ...CAPITAL_BREAKDOWN.map(
        (c) =>
          `• ${c.category} (${c.percentage}%): $${c.amount.toLocaleString()} CAD [Investor: $${c.investorPortion.toLocaleString()} CAD | Partner: $${c.partnerPortion.toLocaleString()} CAD] — Status: ${c.status}`
      ),
      "",
      "3. MANDATORY CLIENT DOCUMENT CHECKLIST",
      "--------------------------------------------------------------------------------",
      ...documents.map(
        (d) =>
          `[${d.status.toUpperCase()}] ${d.code} — ${d.title} (${d.phaseRef})\n  Category: ${d.category}\n  Format:   ${d.formatRequirements}\n  Detail:   ${d.description}\n  Mandate:  ${d.mandatoryReason}\n`
      ),
      "4. 5-PHASE ONBOARDING & EXECUTION ROADMAP",
      "--------------------------------------------------------------------------------",
      ...phases.map(
        (p) =>
          `${p.code}: ${p.title} (${p.duration}) — [${p.status.toUpperCase()}]\n` +
          p.deliverables
            .map(
              (del) =>
                `   - [${del.status}] ${del.title} (${del.verificationMethod})`
            )
            .join("\n") +
          "\n"
      ),
      "================================================================================",
      "COMPLIANCE NOTICE: All invested funds must be 100% unencumbered, wired directly",
      "via SWIFT MT103 from the investor's personal bank account to the Canadian",
      "corporate bank account, and deployed exclusively into active business assets.",
      "================================================================================",
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CBIP-Commercial-Bakery-Onboarding-Checklist.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4000);
  };

  const verifiedDocsCount = documents.filter(
    (d) => d.status === "Verified"
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden">
      {/* Sticky Top Institutional Navigation */}
      <Navbar
        verifiedCount={verifiedDocsCount}
        totalDocs={documents.length}
        onDownloadChecklist={handleDownloadChecklist}
        onOpenJoinSquad={() => setJoinModalTrigger((prev) => prev + 1)}
      />

      {/* Download Confirmation Toast */}
      {downloadToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white border border-emerald-500/50 rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Downloaded{" "}
            <strong className="font-mono text-emerald-300">
              CBIP-Commercial-Bakery-Onboarding-Checklist.txt
            </strong>
          </span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* LIVE 24/7 5-STEP PROGRESSIVE SQUAD SYNDICATION BAR WITH SQUASH ANIMATIONS */}
        <LiveSquadProgressHub externalModalTrigger={joinModalTrigger} />

        {/* 1. Hero Section + Quick Metrics Bar */}
        <HeroSection
          activePhase={activePhaseId}
          onSelectPhase={(id) => setActivePhaseId(id)}
        />

        {/* 2. Interactive 5-Phase Stepper / Procedure Timeline */}
        <ProcedureStepper
          phases={phases}
          activePhaseId={activePhaseId}
          onSelectPhase={setActivePhaseId}
          onToggleDeliverableStatus={handleToggleDeliverableStatus}
        />

        {/* 3. Capital Breakdown & Flow Chart */}
        <CapitalBreakdown />

        {/* 4. Document Checklist & FAQ Accordion */}
        <DocumentChecklistFaq
          documents={documents}
          faqs={FAQ_ITEMS}
          onToggleDocStatus={handleToggleDocStatus}
          onDownloadChecklist={handleDownloadChecklist}
        />
      </main>

      {/* Institutional Footer */}
      <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 py-10 text-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                Canadian Business Investment Program • Commercial Bakery Venture
              </div>
              <div className="text-slate-400 text-[11px] font-mono">
                Total Capital: $75,000 CAD ($45,000 Direct Investor / $30,000
                Partner Co-Funding) • 12–24 Month Roadmap
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Unencumbered Equity Verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Schedule I Corporate Escrow
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
