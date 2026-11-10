"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Info,
  X,
  ShieldCheck,
  FileText,
  Landmark,
  Wrench,
  Wallet,
  Building,
  Users,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  CAPITAL_BREAKDOWN,
  CapitalAllocationItem,
} from "@/data/onboardingData";
import { StatusBadge } from "./StatusBadge";

export function CapitalBreakdown() {
  const [selectedCategory, setSelectedCategory] =
    useState<CapitalAllocationItem>(CAPITAL_BREAKDOWN[0]);
  const [modalCategory, setModalCategory] =
    useState<CapitalAllocationItem | null>(null);
  const [hoveredTooltipId, setHoveredTooltipId] = useState<string | null>(null);

  const categoryIcons: Record<string, React.ReactNode> = {
    "physical-equipment": <Wrench className="w-5 h-5" />,
    "working-capital": <Wallet className="w-5 h-5" />,
    "facility-lease": <Building className="w-5 h-5" />,
    "staffing-inventory": <Users className="w-5 h-5" />,
  };

  const formatCAD = (val: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section
      id="capital"
      className="py-12 sm:py-16 bg-slate-100/70 border-y border-slate-200/90"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              SECTION 02 • CAPITAL ARCHITECTURE &amp; DEPLOYMENT SPLIT
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              $75,000 CAD Capital Breakdown &amp; Regulatory Flow Chart
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-3xl">
              Interactive visual split of how the combined $75,000 CAD capital pool
              is distributed across four audited operational buckets. Click any
              bucket or its{" "}
              <span className="font-semibold text-slate-800">
                &ldquo;Why Verifiable Docs?&rdquo;
              </span>{" "}
              button for regulatory compliance details.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-600 shrink-0 shadow-2xs">
            <div>
              Total Pool:{" "}
              <strong className="text-slate-900">$75,000 CAD (100%)</strong>
            </div>
            <div className="text-emerald-700 font-semibold mt-0.5">
              60% Investor ($45k) + 40% Partner ($30k)
            </div>
          </div>
        </div>

        {/* 1. End-to-End Capital Flow Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-2xs">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Institutional Capital Custody &amp; Deployment Flow Chart
            </h3>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Zero Third-Party Intermediaries • Direct Schedule I Bank Routing
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            {/* Stage 1: Dual Capital Sources */}
            <div className="lg:col-span-4 space-y-3">
              <div className="rounded-xl border border-slate-900 bg-slate-900 text-white p-4">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>SOURCE A • DIRECT INVESTOR (60%)</span>
                  <span>SWIFT MT103</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold font-mono tabular-nums">
                    $45,000 CAD
                  </span>
                  <span className="text-xs text-slate-300">
                    600 Class A Shares
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Wired directly from audited personal bank account
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>SOURCE B • PARTNER CO-FUNDING (40%)</span>
                  <span>DOMESTIC EFT</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    $30,000 CAD
                  </span>
                  <span className="text-xs text-slate-600">
                    400 Class A Shares
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Canadian operating partner capital commitment
                </p>
              </div>
            </div>

            {/* Arrow Connector 1 */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-1">
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 rotate-90 lg:rotate-0">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">
                Consolidate
              </span>
            </div>

            {/* Stage 2: Canadian Corporate Account / Escrow */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50/40 p-5 text-center relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2.5 shadow-xs">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                  Canadian Schedule I Bank
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  $75,000 CAD
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Corporate Operating &amp; Escrow Account
                </div>
                <div className="mt-3 pt-2.5 border-t border-emerald-200/80 text-[11px] font-mono text-emerald-800">
                  100% Traceable Commercial Disbursements
                </div>
              </div>
            </div>

            {/* Arrow Connector 2 */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-1">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 rotate-90 lg:rotate-0">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">
                Deploy
              </span>
            </div>

            {/* Stage 3: 4 Operational Buckets Mini Summary */}
            <div className="lg:col-span-2 space-y-2">
              {CAPITAL_BREAKDOWN.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedCategory.id === item.id
                      ? "bg-slate-900 text-white border-slate-900 font-semibold"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate pr-1">{item.shortName}</span>
                  <span className="font-mono font-bold shrink-0">
                    {item.percentage}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Proportional Segmented Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
              <span>PROPORTIONAL ALLOCATION BAR ($75,000 CAD TOTAL)</span>
              <span>CLICK ANY SEGMENT TO INSPECT LINE ITEMS</span>
            </div>
            <div className="h-11 w-full rounded-xl overflow-hidden flex p-1 bg-slate-100 border border-slate-200 gap-1">
              {CAPITAL_BREAKDOWN.map((item) => {
                const isSelected = selectedCategory.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item)}
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-lg transition-all relative group flex items-center justify-center overflow-hidden cursor-pointer ${
                      item.bgClass
                    } ${
                      isSelected
                        ? "ring-2 ring-offset-1 ring-slate-950 brightness-110"
                        : "opacity-85 hover:opacity-100"
                    }`}
                    title={`${item.category}: ${item.percentage}% (${formatCAD(
                      item.amount
                    )})`}
                  >
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-white truncate px-2">
                      {item.shortName} ({item.percentage}%)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Four Interactive Allocation Cards + Regulatory Tooltip/Modal Trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CAPITAL_BREAKDOWN.map((item) => {
            const isSelected = selectedCategory.id === item.id;
            const isTooltipOpen = hoveredTooltipId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item)}
                className={`rounded-xl border p-5 transition-all cursor-pointer relative flex flex-col justify-between bg-white ${
                  isSelected
                    ? "border-slate-900 ring-2 ring-slate-900/10 shadow-md"
                    : "border-slate-200 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold ${item.badgeClass}`}
                    >
                      {categoryIcons[item.id]}
                      <span>{item.percentage}%</span>
                    </span>

                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  {/* Category Name & Dollar Amount */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.category}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                      {formatCAD(item.amount)}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      CAD
                    </span>
                  </div>

                  {/* Investor vs Partner Pro-Rata Split */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Investor (60%):</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        {formatCAD(item.investorPortion)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Partner (40%):</span>
                      <span className="font-semibold text-slate-700 tabular-nums">
                        {formatCAD(item.partnerPortion)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Compliance Tooltip & Modal Trigger */}
                <div className="mt-4 pt-3 border-t border-slate-100 relative">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredTooltipId(item.id)}
                      onMouseLeave={() => setHoveredTooltipId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalCategory(item);
                      }}
                      className="w-full inline-flex items-center justify-between gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/90 hover:border-emerald-300 transition-colors cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Why Verifiable Docs?</span>
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </button>
                  </div>

                  {/* Hover Popover Tooltip */}
                  <AnimatePresence>
                    {isTooltipOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="hidden lg:block absolute left-0 right-0 bottom-full mb-2 z-30 bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs leading-relaxed pointer-events-none"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">
                          {item.regulatoryStandard}
                        </div>
                        <p className="text-slate-200 line-clamp-4">
                          {item.whyVerifiableDocRequired}
                        </p>
                        <div className="mt-1.5 text-[10px] font-mono text-emerald-300">
                          Click button to open full compliance modal →
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Selected Bucket Deep-Dive Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
          >
            <div className="p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left 7 Cols: Itemized Schedule of Expenditures */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                      ITEMIZED COMMERCIAL SCHEDULE • {selectedCategory.percentage}% OF POOL
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      {selectedCategory.category} ({formatCAD(selectedCategory.amount)} CAD)
                    </h3>
                  </div>
                  <button
                    onClick={() => setModalCategory(selectedCategory)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Open Compliance Modal</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {selectedCategory.lineItems.map((line, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 gap-2"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {line.name}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          Counterparty: {line.vendorType}
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-sm font-bold text-slate-900 tabular-nums bg-white px-3 py-1 rounded-lg border border-slate-200 inline-block">
                          {formatCAD(line.cost)} CAD
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Why Verifiable Documentation is Required */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      {selectedCategory.regulatoryStandard}
                    </span>
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>

                  <h4 className="text-base font-bold text-white">
                    Why Verifiable Documentation is Required for Regulatory Compliance
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedCategory.whyVerifiableDocRequired}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2.5">
                      Mandatory Audit Proofs for {selectedCategory.shortName}:
                    </div>
                    <ul className="space-y-2">
                      {selectedCategory.requiredProofs.map((proof, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{proof}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Investor Share: {formatCAD(selectedCategory.investorPortion)}</span>
                  <span>Partner Share: {formatCAD(selectedCategory.partnerPortion)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Regulatory Compliance Modal */}
      <AnimatePresence>
        {modalCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalCategory(null)}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#0F172A] text-white p-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                      {modalCategory.regulatoryStandard}
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {modalCategory.percentage}% Allocation ({formatCAD(modalCategory.amount)} CAD)
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {modalCategory.category} — Regulatory Verification Mandate
                  </h3>
                </div>
                <button
                  onClick={() => setModalCategory(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold mb-1">
                    Why Verifiable Documentation is Required
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {modalCategory.whyVerifiableDocRequired}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    Required Evidentiary Documents for Audit File
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {modalCategory.requiredProofs.map((proof, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{proof}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    Approved Commercial Line-Items ({formatCAD(modalCategory.amount)} CAD)
                  </h4>
                  <div className="border border-slate-200 rounded-xl divide-y divide-slate-200">
                    {modalCategory.lineItems.map((li, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div>
                          <span className="font-semibold text-slate-900">
                            {li.name}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-mono">
                            {li.vendorType}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-slate-900 tabular-nums">
                          {formatCAD(li.cost)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-600">
                  60% Investor: <strong>{formatCAD(modalCategory.investorPortion)}</strong>{" "}
                  • 40% Partner: <strong>{formatCAD(modalCategory.partnerPortion)}</strong>
                </div>
                <button
                  onClick={() => setModalCategory(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Audit Brief
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
