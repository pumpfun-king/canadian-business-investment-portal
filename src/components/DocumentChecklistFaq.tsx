"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Printer,
  ChevronDown,
  FileCheck2,
  ShieldCheck,
  CheckSquare,
  Square,
  HelpCircle,
  Filter,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  ChecklistDocument,
  FaqItem,
  ComplianceStatus,
} from "@/data/onboardingData";
import { StatusBadge } from "./StatusBadge";

interface DocumentChecklistFaqProps {
  documents: ChecklistDocument[];
  faqs: FaqItem[];
  onToggleDocStatus: (docId: string) => void;
  onDownloadChecklist: () => void;
}

export function DocumentChecklistFaq({
  documents,
  faqs,
  onToggleDocStatus,
  onDownloadChecklist,
}: DocumentChecklistFaqProps) {
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "All">(
    "All"
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const filteredDocs =
    statusFilter === "All"
      ? documents
      : documents.filter((d) => d.status === statusFilter);

  const verifiedCount = documents.filter((d) => d.status === "Verified").length;
  const inProgressCount = documents.filter(
    (d) => d.status === "In Progress"
  ).length;
  const requiredCount = documents.filter((d) => d.status === "Required").length;

  return (
    <section id="documents" className="py-14 sm:py-20 bg-[#FBF9F8]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#831f28] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#831f28]" />
              COMPLIANCE DOSSIER &amp; REGULATORY FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Client Document Checklist &amp; Program FAQ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
              Inspect and export mandatory KYC, source-of-wealth, and corporate
              banking documentation. Funds must be unencumbered, directly wired,
              and tied to operational business assets.
            </p>
          </div>

          {/* Export / Print Buttons */}
          <div className="flex flex-wrap items-center gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={onDownloadChecklist}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#831f28] hover:bg-[#9c2631] text-white transition-all cursor-pointer shadow-md shadow-[#831f28]/25"
            >
              <Download className="w-4 h-4" />
              <span>Download Checklist (.TXT)</span>
            </button>
          </div>
        </div>

        {/* 12-Column Split: Document Checklist (Left 7 Cols) + FAQ Accordion (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Document Checklist */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
            {/* Top Checklist Summary & Filter Header */}
            <div className="p-6 sm:p-7 bg-[#FBF9F8] border-b border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#831f28] to-[#5c131a] text-white flex items-center justify-center shadow-md shadow-[#831f28]/30">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900">
                      Mandatory Client Onboarding Documents
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Click any document checkbox or status badge to update verification status
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-[#831f28] bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    {verifiedCount}/{documents.length} Verified
                  </span>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3.5 border-t border-stone-200/80">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter by Status:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { label: `All (${documents.length})`, value: "All" },
                      {
                        label: `Verified (${verifiedCount})`,
                        value: "Verified",
                      },
                      {
                        label: `In Progress (${inProgressCount})`,
                        value: "In Progress",
                      },
                      {
                        label: `Required (${requiredCount})`,
                        value: "Required",
                      },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setStatusFilter(tab.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        statusFilter === tab.value
                          ? "bg-[#831f28] text-white shadow-xs"
                          : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="divide-y divide-stone-100">
              {filteredDocs.map((doc) => {
                const isVerified = doc.status === "Verified";
                return (
                  <div
                    key={doc.id}
                    className={`p-5 sm:p-6 transition-colors ${
                      isVerified ? "bg-rose-50/20" : "hover:bg-stone-50/70"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => onToggleDocStatus(doc.id)}
                        className="mt-0.5 text-stone-400 hover:text-[#831f28] transition-colors cursor-pointer shrink-0"
                        title="Click to cycle document verification status"
                      >
                        {isVerified ? (
                          <CheckSquare className="w-5 h-5 text-[#831f28]" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                              {doc.code}
                            </span>
                            <span className="text-[11px] font-mono text-stone-500">
                              {doc.category} • {doc.phaseRef}
                            </span>
                          </div>

                          <StatusBadge
                            status={doc.status}
                            size="sm"
                            interactive
                            onClick={() => onToggleDocStatus(doc.id)}
                          />
                        </div>

                        <h4
                          className={`mt-1.5 text-sm sm:text-base font-bold ${
                            isVerified ? "text-stone-800" : "text-stone-900"
                          }`}
                        >
                          {doc.title}
                        </h4>

                        <p className="mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {doc.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                          <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                            <strong>Format:</strong> {doc.formatRequirements}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-rose-50 text-[#831f28] border border-rose-200 font-semibold">
                            <strong>Purpose:</strong> {doc.mandatoryReason}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Checklist Download Bar */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#182333] via-[#2d1820] to-[#731920] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs">
                <Sparkles className="w-4 h-4 text-rose-300 shrink-0" />
                <span>
                  Export a timestamped copy of this checklist for your legal
                  counsel and banking officer.
                </span>
              </div>
              <button
                onClick={onDownloadChecklist}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#831f28] hover:bg-[#9c2631] text-white shrink-0 transition-all cursor-pointer shadow-md shadow-[#831f28]/30 border border-rose-400/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Checklist</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Institutional FAQ Accordion matching TLG FAQ Layout */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-r from-[#182333] via-[#2d1820] to-[#731920] text-white rounded-3xl p-6 sm:p-7 border border-[#3e1b23] shadow-md">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-mono uppercase tracking-wider font-bold mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Regulatory Clarity &amp; Safeguards</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Frequently Asked Questions
              </h3>
              <p className="mt-1 text-xs text-stone-200 leading-relaxed">
                Clear institutional guidance on unencumbered capital, direct SWIFT MT103
                wiring, and active commercial asset rules.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                      isOpen
                        ? "border-[#831f28] shadow-md ring-1 ring-[#831f28]/20"
                        : "border-stone-200 hover:border-rose-200 shadow-xs"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-[#831f28] border border-rose-200 font-bold">
                            {faq.regulatoryTag}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">
                            {faq.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-stone-900 leading-snug pt-0.5">
                          {faq.question}
                        </h4>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-transform ${
                          isOpen
                            ? "bg-[#831f28] text-white border-[#831f28] rotate-180 shadow-xs"
                            : "bg-stone-50 text-stone-600 border-stone-200"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Institutional Compliance Guarantee Card */}
            <div className="bg-rose-50/80 border border-rose-200 rounded-3xl p-5 flex items-start gap-3.5 shadow-xs">
              <HelpCircle className="w-5 h-5 text-[#831f28] shrink-0 mt-0.5" />
              <div className="text-xs text-[#5c131a] leading-relaxed">
                <strong className="font-bold block text-[#831f28] mb-0.5">
                  Core Program Mandate:
                </strong>
                100% of the $45,000 CAD Direct Investor Allocation and $30,000
                CAD Partner Co-Funding must remain tied to active commercial
                bakery operations—never passive deposits, real estate holding
                companies, or guaranteed-redemption instruments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
