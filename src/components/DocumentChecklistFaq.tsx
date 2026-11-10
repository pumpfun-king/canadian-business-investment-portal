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
    <section id="documents" className="py-12 sm:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              SECTION 03 • COMPLIANCE DOSSIER &amp; REGULATORY FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Client Document Checklist &amp; Institutional FAQ
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
              Review and export mandatory KYC, source-of-wealth, and corporate
              wire documentation. All capital must be unencumbered, directly
              wired, and tied to active bakery assets.
            </p>
          </div>

          {/* Export / Print Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={onDownloadChecklist}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Client Checklist (.TXT)</span>
            </button>
          </div>
        </div>

        {/* 12-Column Split: Document Checklist (Left 7 Cols) + FAQ Accordion (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Document Checklist */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            {/* Top Checklist Summary & Filter Header */}
            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Mandatory Client Onboarding Documents
                    </h3>
                    <p className="text-xs text-slate-500">
                      Click any document checkbox or status badge to update
                      verification status
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    {verifiedCount}/{documents.length} Verified
                  </span>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
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
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        statusFilter === tab.value
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="divide-y divide-slate-200">
              {filteredDocs.map((doc) => {
                const isVerified = doc.status === "Verified";
                return (
                  <div
                    key={doc.id}
                    className={`p-5 transition-colors ${
                      isVerified ? "bg-emerald-50/20" : "hover:bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => onToggleDocStatus(doc.id)}
                        className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                        title="Click to cycle document verification status"
                      >
                        {isVerified ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {doc.code}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">
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
                            isVerified
                              ? "text-slate-800"
                              : "text-slate-900"
                          }`}
                        >
                          {doc.title}
                        </h4>

                        <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {doc.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                            <strong>Format:</strong> {doc.formatRequirements}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-emerald-50/80 text-emerald-900 border border-emerald-200/80">
                            <strong>Compliance Purpose:</strong>{" "}
                            {doc.mandatoryReason}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Checklist Download Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Export a timestamped copy of this checklist for your legal
                  counsel and banking officer.
                </span>
              </div>
              <button
                onClick={onDownloadChecklist}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Checklist</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Institutional FAQ Accordion */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0F172A] text-white rounded-xl p-5 sm:p-6 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Regulatory Clarity &amp; Safeguards</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Frequently Asked Compliance Questions
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                Essential guidance on unencumbered funds, direct SWIFT wire
                transmission, and active commercial bakery asset rules.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-xl border transition-all overflow-hidden ${
                      isOpen
                        ? "border-slate-900 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqId(isOpen ? null : faq.id)
                      }
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                            {faq.regulatoryTag}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {faq.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug pt-0.5">
                          {faq.question}
                        </h4>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-1 transition-transform ${
                          isOpen
                            ? "bg-slate-900 text-white border-slate-900 rotate-180"
                            : "bg-slate-50 text-slate-600 border-slate-200"
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
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 leading-relaxed">
                <strong className="font-bold block text-emerald-900 mb-0.5">
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
