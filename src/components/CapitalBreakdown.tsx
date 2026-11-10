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
    "physical-equipment": <Wrench className="w-5 h-5 text-[#831f28]" />,
    "working-capital": <Wallet className="w-5 h-5 text-[#831f28]" />,
    "facility-lease": <Building className="w-5 h-5 text-[#831f28]" />,
    "staffing-inventory": <Users className="w-5 h-5 text-[#831f28]" />,
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
      className="py-14 sm:py-20 bg-white border-y border-stone-200/80"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#831f28] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#831f28]" />
              CAPITAL ALLOCATION &amp; REGULATORY SPLIT
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              $75,000 CAD Deployment &amp; Custody Flow Chart
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl">
              Transparent distribution of the combined $75,000 CAD capital pool
              across four audited operational buckets. Click any bucket or inspect
              the regulatory requirements.
            </p>
          </div>

          <div className="bg-[#FBF9F8] border border-rose-100 rounded-2xl px-5 py-3 text-xs font-mono text-stone-700 shrink-0 shadow-xs">
            <div>
              Total Pool:{" "}
              <strong className="text-stone-900">$75,000 CAD (100%)</strong>
            </div>
            <div className="text-[#831f28] font-bold mt-0.5">
              60% Investor ($45k) + 40% Partner ($30k)
            </div>
          </div>
        </div>

        {/* 1. End-to-End Capital Flow Chart - TLG Style Rounded Boxes */}
        <div className="bg-[#FBF9F8] rounded-3xl border border-rose-100/90 p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
              Institutional Capital Custody &amp; Deployment Flow Chart
            </h3>
            <span className="text-xs font-mono text-[#831f28] bg-rose-50 border border-rose-200 px-3 py-1 rounded-full font-bold">
              Zero Intermediaries • Direct Schedule I Bank Wire
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            {/* Stage 1: Dual Capital Sources */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="rounded-2xl border border-[#30161c] bg-gradient-to-r from-[#182333] via-[#2d1820] to-[#691820] text-white p-5 shadow-md">
                <div className="flex items-center justify-between text-xs font-mono text-rose-200">
                  <span className="font-bold">SOURCE A • DIRECT INVESTOR (60%)</span>
                  <span>SWIFT MT103</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold font-mono tabular-nums">
                    $45,000 CAD
                  </span>
                  <span className="text-xs text-rose-100 font-medium">
                    600 Class A Shares
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-stone-300">
                  Wired directly from audited personal bank account
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span className="font-bold">SOURCE B • PARTNER CO-FUNDING (40%)</span>
                  <span>DOMESTIC EFT</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold font-mono text-stone-900 tabular-nums">
                    $30,000 CAD
                  </span>
                  <span className="text-xs text-stone-600 font-medium">
                    400 Class A Shares
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-stone-500">
                  Canadian operating partner capital commitment
                </p>
              </div>
            </div>

            {/* Arrow Connector 1 */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-1">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#831f28] rotate-90 lg:rotate-0 shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-1 uppercase font-bold">
                Consolidate
              </span>
            </div>

            {/* Stage 2: Canadian Corporate Account / Escrow */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border-2 border-[#831f28] bg-rose-50/50 p-6 text-center relative shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#831f28] to-[#5c131a] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#831f28]/30">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#831f28]">
                  Canadian Schedule I Bank
                </div>
                <div className="text-3xl font-extrabold font-mono text-stone-900 mt-1 tabular-nums">
                  $75,000 CAD
                </div>
                <div className="text-xs text-stone-600 mt-1 font-medium">
                  Corporate Operating &amp; Escrow Account
                </div>
                <div className="mt-3.5 pt-3 border-t border-rose-200/80 text-[11px] font-mono text-[#831f28] font-bold">
                  100% Traceable Commercial Disbursements
                </div>
              </div>
            </div>

            {/* Arrow Connector 2 */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-1">
              <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 rotate-90 lg:rotate-0 shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-1 uppercase font-bold">
                Deploy
              </span>
            </div>

            {/* Stage 3: 4 Operational Buckets Mini Summary */}
            <div className="lg:col-span-2 space-y-2">
              {CAPITAL_BREAKDOWN.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedCategory.id === item.id
                      ? "bg-[#831f28] text-white border-[#831f28] font-bold shadow-md shadow-[#831f28]/25"
                      : "bg-white text-stone-700 border-stone-200 hover:border-rose-200"
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

          {/* Interactive Proportional Segmented Bar - TLG Crimson Gradient Shades */}
          <div className="mt-6 pt-5 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-mono">
              <span>PROPORTIONAL ALLOCATION BAR ($75,000 CAD TOTAL)</span>
              <span>CLICK ANY SEGMENT TO INSPECT LINE ITEMS</span>
            </div>
            <div className="h-11 w-full rounded-2xl overflow-hidden flex p-1 bg-stone-100 border border-stone-200 gap-1">
              {CAPITAL_BREAKDOWN.map((item) => {
                const isSelected = selectedCategory.id === item.id;
                // TLG Burgundy / Crimson / Slate color mapping
                const segmentBg =
                  item.id === "physical-equipment"
                    ? "bg-[#831f28]"
                    : item.id === "working-capital"
                    ? "bg-[#a32835]"
                    : item.id === "facility-lease"
                    ? "bg-[#253346]"
                    : "bg-[#5c131a]";

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item)}
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-xl transition-all relative group flex items-center justify-center overflow-hidden cursor-pointer ${segmentBg} ${
                      isSelected
                        ? "ring-2 ring-offset-1 ring-stone-900 brightness-110 shadow-sm"
                        : "opacity-90 hover:opacity-100"
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

        {/* 2. Four Interactive Allocation Cards - TLG Style Rounded Border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CAPITAL_BREAKDOWN.map((item) => {
            const isSelected = selectedCategory.id === item.id;
            const isTooltipOpen = hoveredTooltipId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item)}
                className={`rounded-3xl border p-6 transition-all cursor-pointer relative flex flex-col justify-between bg-white ${
                  isSelected
                    ? "border-[#831f28] ring-2 ring-[#831f28]/20 shadow-lg shadow-[#831f28]/10"
                    : "border-stone-200 hover:border-rose-200 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-50 text-[#831f28] border border-rose-200">
                      {categoryIcons[item.id]}
                      <span>{item.percentage}%</span>
                    </span>

                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {item.category}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold font-mono text-stone-900 tabular-nums">
                      {formatCAD(item.amount)}
                    </span>
                    <span className="text-xs font-mono text-stone-500 font-semibold">
                      CAD
                    </span>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-stone-100 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-stone-600">
                      <span>Investor (60%):</span>
                      <span className="font-bold text-stone-900 tabular-nums">
                        {formatCAD(item.investorPortion)}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Partner (40%):</span>
                      <span className="font-semibold text-stone-700 tabular-nums">
                        {formatCAD(item.partnerPortion)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 relative">
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredTooltipId(item.id)}
                    onMouseLeave={() => setHoveredTooltipId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalCategory(item);
                    }}
                    className="w-full inline-flex items-center justify-between gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold bg-[#FBF9F8] hover:bg-rose-50 text-stone-700 hover:text-[#831f28] border border-stone-200 hover:border-rose-200 transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#831f28] shrink-0" />
                      <span>Why Verifiable Docs?</span>
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </button>

                  <AnimatePresence>
                    {isTooltipOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="hidden lg:block absolute left-0 right-0 bottom-full mb-2 z-30 bg-[#121b27] text-white p-4 rounded-2xl shadow-xl border border-rose-900/60 text-xs leading-relaxed pointer-events-none"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-wider text-rose-300 font-bold mb-1">
                          {item.regulatoryStandard}
                        </div>
                        <p className="text-stone-300 line-clamp-4">
                          {item.whyVerifiableDocRequired}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-rose-200 font-bold">
                          Click button to open compliance brief →
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
            className="bg-[#FBF9F8] rounded-3xl border border-rose-100 shadow-sm overflow-hidden"
          >
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left 7 Cols: Itemized Schedule */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#831f28] font-bold">
                      ITEMIZED SCHEDULE • {selectedCategory.percentage}% OF POOL
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-0.5">
                      {selectedCategory.category} ({formatCAD(selectedCategory.amount)} CAD)
                    </h3>
                  </div>
                  <button
                    onClick={() => setModalCategory(selectedCategory)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#831f28] text-white hover:bg-[#9c2631] transition-colors cursor-pointer shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Open Compliance Modal</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedCategory.lineItems.map((line, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white border border-stone-200/90 gap-2 shadow-xs"
                    >
                      <div>
                        <div className="text-sm font-bold text-stone-900">
                          {line.name}
                        </div>
                        <div className="text-xs text-stone-500 font-mono mt-0.5">
                          Counterparty: {line.vendorType}
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-sm font-bold text-stone-900 tabular-nums bg-[#FBF9F8] px-3 py-1 rounded-xl border border-stone-200 inline-block">
                          {formatCAD(line.cost)} CAD
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Regulatory Card matching TLG deep crimson panel */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#182333] via-[#2d1820] to-[#731920] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-md border border-[#3e1b23]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 text-rose-200 border border-white/20 font-bold">
                      {selectedCategory.regulatoryStandard}
                    </span>
                    <FileText className="w-4 h-4 text-rose-300" />
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    Why Verifiable Documentation is Required for Regulatory Compliance
                  </h4>

                  <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {selectedCategory.whyVerifiableDocRequired}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/15">
                    <div className="text-xs font-mono uppercase tracking-wider text-rose-200 font-bold mb-2.5">
                      Mandatory Audit Proofs for {selectedCategory.shortName}:
                    </div>
                    <ul className="space-y-2">
                      {selectedCategory.requiredProofs.map((proof, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-stone-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                          <span>{proof}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-stone-300">
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
            className="fixed inset-0 z-50 bg-[#0c1219]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-rose-100 max-w-2xl w-full shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#182333] via-[#2d1820] to-[#7a1f26] text-white p-6 sm:p-7 flex items-start justify-between gap-4 border-b border-[#3e1b23]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-0.5 rounded-full bg-white/15 text-rose-200 border border-white/20 font-bold">
                      {modalCategory.regulatoryStandard}
                    </span>
                    <span className="text-xs font-mono text-stone-300">
                      {modalCategory.percentage}% Allocation ({formatCAD(modalCategory.amount)} CAD)
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {modalCategory.category} — Regulatory Verification Mandate
                  </h3>
                </div>
                <button
                  onClick={() => setModalCategory(null)}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto bg-[#FBF9F8]">
                <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#831f28] font-bold mb-1">
                    Why Verifiable Documentation is Required
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {modalCategory.whyVerifiableDocRequired}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-2.5">
                    Required Evidentiary Documents for Audit File
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {modalCategory.requiredProofs.map((proof, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-start gap-2.5 text-xs text-stone-700 shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#831f28] shrink-0 mt-0.5" />
                        <span>{proof}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-2.5">
                    Approved Commercial Line-Items ({formatCAD(modalCategory.amount)} CAD)
                  </h4>
                  <div className="border border-stone-200 bg-white rounded-2xl divide-y divide-stone-200 overflow-hidden shadow-xs">
                    {modalCategory.lineItems.map((li, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div>
                          <span className="font-bold text-stone-900">
                            {li.name}
                          </span>
                          <span className="block text-[11px] text-stone-500 font-mono">
                            {li.vendorType}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-stone-900 tabular-nums">
                          {formatCAD(li.cost)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 py-4 bg-white border-t border-stone-200 flex items-center justify-between">
                <div className="text-xs font-mono text-stone-600">
                  60% Investor: <strong>{formatCAD(modalCategory.investorPortion)}</strong>{" "}
                  • 40% Partner: <strong>{formatCAD(modalCategory.partnerPortion)}</strong>
                </div>
                <button
                  onClick={() => setModalCategory(null)}
                  className="px-5 py-2 rounded-full text-xs font-bold bg-[#831f28] text-white hover:bg-[#9c2631] transition-colors cursor-pointer"
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
