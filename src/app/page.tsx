"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  CalendarClock,
  Printer,
  ChevronDown,
  CheckSquare,
  Square,
  HelpCircle,
  Filter,
  Sparkles,
  ExternalLink,
  Users,
  Compass,
  ArrowRight,
  ArrowDown,
  Globe2,
  Shuffle,
  Search,
  Scale,
  Landmark,
  Factory,
  FileBarChart2,
  CheckCheck,
  Clock,
  ShieldAlert,
  X,
  FileCheck,
  BadgeDollarSign,
  UserCheck,
  UserPlus,
  Mail,
  Phone,
  Briefcase,
  PieChart,
  GitCommitHorizontal,
  FileCheck2,
  MapPin,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import {
  ROADMAP_PHASES,
  DOCUMENT_CHECKLIST,
  FAQ_ITEMS,
  CAPITAL_BREAKDOWN,
  HERO_METRICS,
  RoadmapPhase,
  ChecklistDocument,
  CapitalAllocationItem,
  ComplianceStatus,
} from "@/data/onboardingData";

import {
  CANADIAN_BUSINESS_VENTURES,
  INVESTOR_COUNTRIES,
  BusinessVentureGroup,
} from "@/data/canadianBusinesses";

import { StatusBadge } from "@/components/StatusBadge";

const FIVE_STEP_BREAKS = [
  { step: 1, pct: 20, label: "Step 1 (20%)" },
  { step: 2, pct: 40, label: "Step 2 (40%)" },
  { step: 3, pct: 60, label: "Step 3 (60%)" },
  { step: 4, pct: 80, label: "Step 4 (80%)" },
  { step: 5, pct: 100, label: "Step 5 (100%)" },
];

const VERIFICATION_CHANNELS = [
  "Direct Wire • SWIFT MT103",
  "Schedule I Escrow Cleared",
  "Corporate Wire Verified",
  "Unencumbered Equity Cleared",
  "Direct Bank Transfer",
];

const STATUS_CYCLE: Record<ComplianceStatus, ComplianceStatus> = {
  Required: "In Progress",
  "In Progress": "Verified",
  Verified: "Required",
};

export default function OnboardingPortalPage() {
  // Navigation / View State
  const [activeTab, setActiveTab] = useState<
    "overview" | "timeline" | "capital" | "documents" | "faq" | "join"
  >("overview");

  // Business state
  const [businessIndex, setBusinessIndex] = useState(0);
  const [progress, setProgress] = useState(26);
  const [currentStepBreak, setCurrentStepBreak] = useState(2);
  const [isSquashing, setIsSquashing] = useState(false);
  const [joinedMembers, setJoinedMembers] = useState([
    {
      step: 1,
      country: INVESTOR_COUNTRIES[0],
      channel: VERIFICATION_CHANNELS[0],
      amount: 75000,
    },
    {
      step: 2,
      country: INVESTOR_COUNTRIES[1],
      channel: VERIFICATION_CHANNELS[1],
      amount: 75000,
    },
  ]);

  // Stepper / Roadmap state
  const [phases, setPhases] = useState<RoadmapPhase[]>(ROADMAP_PHASES);
  const [activePhaseId, setActivePhaseId] = useState<number>(1);

  // Capital breakdown state
  const [selectedCategory, setSelectedCategory] =
    useState<CapitalAllocationItem>(CAPITAL_BREAKDOWN[0]);
  const [modalCategory, setModalCategory] =
    useState<CapitalAllocationItem | null>(null);

  // Checklist state
  const [documents, setDocuments] =
    useState<ChecklistDocument[]>(DOCUMENT_CHECKLIST);
  const [docFilter, setDocFilter] = useState<ComplianceStatus | "All">("All");

  // FAQ state
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  // Join modal / In-page form state
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [applicantCountry, setApplicantCountry] = useState("");
  const [businessSearchQuery, setBusinessSearchQuery] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState(
    CANADIAN_BUSINESS_VENTURES[0].id
  );
  const [allocationOption, setAllocationOption] = useState<
    "75k-unit" | "45k-30k-split"
  >("75k-unit");
  const [confirmedUnencumbered, setConfirmedUnencumbered] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("CBIP-TLG-9021");
  const [downloadToast, setDownloadToast] = useState(false);

  const currentBusiness: BusinessVentureGroup =
    CANADIAN_BUSINESS_VENTURES[
      businessIndex % CANADIAN_BUSINESS_VENTURES.length
    ];

  // Progressive loading animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextBreak =
          FIVE_STEP_BREAKS.find((b) => b.pct > prev)?.pct ?? 100;
        const candidate = prev + 0.35 + Math.random() * 0.4;

        if (candidate >= nextBreak) {
          const hitStep = Math.round(nextBreak / 20);
          setCurrentStepBreak(hitStep);
          setIsSquashing(true);
          setTimeout(() => setIsSquashing(false), 700);

          setJoinedMembers((prevList) => {
            if (prevList.some((m) => m.step === hitStep)) return prevList;
            const newCountry =
              INVESTOR_COUNTRIES[
                (hitStep + businessIndex * 3) % INVESTOR_COUNTRIES.length
              ];
            return [
              ...prevList,
              {
                step: hitStep,
                country: newCountry,
                channel:
                  VERIFICATION_CHANNELS[
                    (hitStep + businessIndex) % VERIFICATION_CHANNELS.length
                  ],
                amount: 75000,
              },
            ];
          });

          if (nextBreak >= 100) {
            setTimeout(() => {
              setBusinessIndex(
                (b) => (b + 1) % CANADIAN_BUSINESS_VENTURES.length
              );
              setProgress(20);
              setCurrentStepBreak(1);
              setJoinedMembers([
                {
                  step: 1,
                  country:
                    INVESTOR_COUNTRIES[
                      (businessIndex + 5) % INVESTOR_COUNTRIES.length
                    ],
                  channel: VERIFICATION_CHANNELS[0],
                  amount: 75000,
                },
              ]);
            }, 6000);
          }
          return nextBreak;
        }
        return Number(candidate.toFixed(2));
      });
    }, 450);

    return () => clearInterval(interval);
  }, [businessIndex]);

  // Deliverable toggle
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

  const handleToggleDocStatus = (docId: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === docId ? { ...doc, status: STATUS_CYCLE[doc.status] } : doc
      )
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setConfirmationCode(`CBIP-TLG-${randomDigits}`);

    const cleanCountry = applicantCountry.trim() || "International";

    setJoinedMembers((prev) => {
      const nextStep = Math.min(5, prev.length + 1);
      return [
        ...prev.filter((m) => m.step !== nextStep),
        {
          step: nextStep,
          country: cleanCountry,
          channel: "Your Reserved Unit • Confirmed",
          amount: 75000,
        },
      ];
    });

    setIsSquashing(true);
    setTimeout(() => setIsSquashing(false), 700);
    setIsSubmitted(true);
  };

  const handleDownloadChecklist = () => {
    const lines: string[] = [
      "================================================================================",
      "CANADIAN BUSINESS INVESTMENT PROGRAM (CBIP) — INVESTOR DOSSIER",
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
    link.download = "CBIP-Commercial-Bakery-Investor-Checklist.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4000);
  };

  const filteredDocs =
    docFilter === "All"
      ? documents
      : documents.filter((d) => d.status === docFilter);

  const verifiedDocsCount = documents.filter(
    (d) => d.status === "Verified"
  ).length;

  const activePhase =
    phases.find((p) => p.id === activePhaseId) || phases[0];

  const filteredModalBusinesses = businessSearchQuery.trim()
    ? CANADIAN_BUSINESS_VENTURES.filter(
        (b) =>
          b.name.toLowerCase().includes(businessSearchQuery.toLowerCase()) ||
          b.sector.toLowerCase().includes(businessSearchQuery.toLowerCase()) ||
          b.city.toLowerCase().includes(businessSearchQuery.toLowerCase()) ||
          b.province.toLowerCase().includes(businessSearchQuery.toLowerCase())
      )
    : CANADIAN_BUSINESS_VENTURES;

  const formatCAD = (val: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="min-h-screen bg-[#8c2b33] text-stone-900 selection:bg-[#681920] selection:text-white py-6 sm:py-10 lg:py-14 px-3 sm:px-6 lg:px-12 flex justify-center items-center">
      {/* Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16212e] text-white border border-rose-300/40 rounded-full px-5 py-3 shadow-2xl flex items-center gap-3 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Downloaded Investor Checklist (.TXT)</span>
        </div>
      )}

      {/* THE CENTRAL WHITE APP CANVAS (Exact Rounded App Window from Screenshots) */}
      <div className="w-full max-w-[1440px] bg-white rounded-[36px] sm:rounded-[44px] overflow-hidden tlg-device-frame border border-white/20 relative shadow-2xl">
        {/* =========================================================================
            TLG TOP DARK HEADER BAR: Charcoal/Navy Gradient Header with Monogram & Menu
           ========================================================================= */}
        <div className="bg-gradient-to-r from-[#141f2c] via-[#241a24] to-[#711e26] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 sm:px-10 lg:px-14 relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8c2b33]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand & Menu Row */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 relative z-10">
            {/* TLG Style Monogram & Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
                {/* Geometric Monogram resembling TLG emblem */}
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
                  <path d="M22 12a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4 4 4 0 0 1 4-4h1a4 4 0 0 1 4 4z" />
                  <path d="M12 22a4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4 4 4 0 0 1 4 4v1a4 4 0 0 1-4 4z" />
                  <path d="M2 12a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
                </svg>
              </div>
              <div>
                <div className="font-extrabold tracking-widest text-lg font-mono text-white flex items-center gap-2">
                  <span>TLG</span>
                  <span className="text-[11px] font-sans font-normal text-rose-200 uppercase tracking-widest bg-white/15 px-2 py-0.5 rounded-full border border-white/20">
                    GLOBAL
                  </span>
                </div>
                <div className="text-[10px] text-stone-300 font-mono tracking-wider uppercase">
                  Canadian Investor Portal
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tabs matching the screenshots */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-stone-300 bg-black/25 px-2.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#8c2b33] text-white shadow-sm font-bold"
                    : "hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "timeline"
                    ? "bg-[#8c2b33] text-white shadow-sm font-bold"
                    : "hover:text-white"
                }`}
              >
                Visa Process
              </button>
              <button
                onClick={() => setActiveTab("capital")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "capital"
                    ? "bg-[#8c2b33] text-white shadow-sm font-bold"
                    : "hover:text-white"
                }`}
              >
                $75k Capital Split
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "documents"
                    ? "bg-[#8c2b33] text-white shadow-sm font-bold"
                    : "hover:text-white"
                }`}
              >
                Documentation
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "faq"
                    ? "bg-[#8c2b33] text-white shadow-sm font-bold"
                    : "hover:text-white"
                }`}
              >
                FAQs
              </button>
              <button
                onClick={() => setActiveTab("join")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "join"
                    ? "bg-[#8c2b33] text-white shadow-sm font-bold"
                    : "hover:text-white"
                }`}
              >
                Client Registration
              </button>
            </div>

            {/* Quick Actions (Join Button + Checklist) */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setSelectedBusinessId(currentBusiness.id);
                  setIsSubmitted(false);
                  setIsJoinModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold bg-[#8c2b33] hover:bg-[#a6343d] text-white border border-rose-400/40 shadow-md cursor-pointer transition-all active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join Business ($75k)</span>
              </button>

              <button
                onClick={handleDownloadChecklist}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Checklist</span>
              </button>
            </div>
          </div>

          {/* Main Hero Header - EXACT TLG Typography Pattern */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                Welcome to your <br />
                investor portal
              </h1>
              <p className="mt-4 text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed">
                Here you can find all the necessary information and documents.
                Your pathway to Canadian Commercial Investment starts now.
              </p>

              {/* TLG Style Circular Down Arrow */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#portal-content"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer group"
                >
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs font-mono text-stone-300">
                  Scroll to explore full investment program &amp; documents
                </span>
              </div>
            </div>

            {/* Quick Cap Table Metric Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#101722]/90 border border-white/15 rounded-3xl p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-stone-300 font-bold uppercase tracking-wider">
                    Total Required Capital
                  </span>
                  <span className="font-bold text-rose-300 bg-[#8c2b33]/40 px-2.5 py-0.5 rounded-full border border-rose-400/40">
                    $75,000 CAD
                  </span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden flex p-0.5 mb-2.5">
                  <div
                    className="bg-gradient-to-r from-[#8c2b33] to-rose-400 h-full rounded-full"
                    style={{ width: "60%" }}
                  />
                  <div
                    className="bg-[#2c3d52] h-full rounded-full ml-1"
                    style={{ width: "40%" }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-300">
                  <span className="text-rose-200 font-semibold">
                    Direct Investor: $45,000 (60%)
                  </span>
                  <span className="text-stone-400">
                    Partner: $30,000 (40%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            WHITE CONTENT CANVAS (Exact layout from TLG Global Latvia Dribbble screens)
           ========================================================================= */}
        <div id="portal-content" className="p-6 sm:p-10 lg:p-14 space-y-12 bg-white">
          {/* 1. TOP DUAL FEATURED BANNERS (Exact match for "About TLG Global" & "LUXE: Smart Hospitality") */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Banner 1: Dark Red / Crimson Card ("About Canadian Investment Program") */}
            <div className="rounded-3xl bg-[#711e26] text-white p-7 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  About CBIP Commercial Bakery Venture
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                  The Canadian Business Investment Program provides international
                  investors with a seamless pathway to active commercial venture
                  ownership in Ontario and across Canada. Our team provides
                  verified audit trails and transparent escrow governance.
                </p>
              </div>

              {/* 4 Small Rounded Pill Badges */}
              <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div className="bg-black/20 rounded-full py-1.5 px-2 text-rose-100 border border-white/10">
                  $75,000 Pool
                </div>
                <div className="bg-black/20 rounded-full py-1.5 px-2 text-rose-100 border border-white/10">
                  60% Investor
                </div>
                <div className="bg-black/20 rounded-full py-1.5 px-2 text-rose-100 border border-white/10">
                  40% Partner
                </div>
                <div className="bg-black/20 rounded-full py-1.5 px-2 text-rose-100 border border-white/10">
                  12–24 Months
                </div>
              </div>
            </div>

            {/* Banner 2: Dark Navy Card ("LUXE: Commercial Bakery Operations") */}
            <div className="rounded-3xl bg-[#151f2b] text-white p-7 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    VENTURE: Commercial Bakery &amp; Commissary
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-[#8c2b33] px-2.5 py-0.5 rounded-full text-white font-bold">
                    Active NAICS 311811
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Active commercial bakery venture specializing in high-output
                  industrial convection ovens, wholesale grocery supply, and local
                  Canadian staff employment. Full Schedule I bank compliance.
                </p>
              </div>

              {/* 3 Pill Badges */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div className="bg-white/5 rounded-full py-1.5 px-2 text-stone-300 border border-white/10 truncate">
                  $30k Equipment
                </div>
                <div className="bg-white/5 rounded-full py-1.5 px-2 text-stone-300 border border-white/10 truncate">
                  Zoned Lease
                </div>
                <div className="bg-white/5 rounded-full py-1.5 px-2 text-stone-300 border border-white/10 truncate">
                  CRA Payroll
                </div>
              </div>
            </div>
          </div>

          {/* 2. PROGRESSIVE 5-STEP SQUAD PROGRESS BAR & ROTATING 56+ BUSINESSES */}
          <div className="rounded-3xl border border-stone-200 bg-[#FBF9F8] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8c2b33] font-bold bg-[#8c2b33]/10 px-2.5 py-0.5 rounded-full">
                    VENTURE #{businessIndex + 1} OF{" "}
                    {CANADIAN_BUSINESS_VENTURES.length}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {currentBusiness.city}, {currentBusiness.province}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {currentBusiness.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  {currentBusiness.highlight} —{" "}
                  <strong className="text-[#8c2b33] font-mono">
                    Each Person Figure: $75,000 CAD
                  </strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setBusinessIndex(
                      (b) => (b + 1) % CANADIAN_BUSINESS_VENTURES.length
                    )
                  }
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-white border border-stone-300 text-stone-700 hover:border-[#8c2b33] cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5 inline mr-1 text-[#8c2b33]" />
                  <span>Cycle Venture ({businessIndex + 1}/56)</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBusinessId(currentBusiness.id);
                    setIsSubmitted(false);
                    setIsJoinModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#8c2b33] hover:bg-[#a6343d] text-white shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <span>Join Business ($75,000)</span>
                </button>
              </div>
            </div>

            {/* 5-Break Progress Bar with Squash Physics */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
                {FIVE_STEP_BREAKS.map((b) => (
                  <div
                    key={b.step}
                    className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold ${
                      progress >= b.pct
                        ? "bg-[#8c2b33] text-white border-[#8c2b33]"
                        : "bg-white text-stone-600 border-stone-200"
                    }`}
                  >
                    Slot 0{b.step} • {b.pct}%
                  </div>
                ))}
              </div>

              {/* Progress track */}
              <div className="relative h-6 w-full rounded-full bg-stone-200 p-1 overflow-hidden">
                <motion.div
                  animate={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#711e26] via-[#8c2b33] to-[#b33943] relative"
                />
              </div>
            </div>

            {/* 5 Joined Member Slots: Country only, no repeating names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {[1, 2, 3, 4, 5].map((slotNum) => {
                const member = joinedMembers.find((m) => m.step === slotNum);
                if (member) {
                  return (
                    <div
                      key={slotNum}
                      className="rounded-2xl border border-rose-200 bg-white p-3.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8c2b33]">
                        <span className="font-bold">SLOT 0{slotNum}</span>
                        <span className="flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-[#8c2b33]" />
                          Verified
                        </span>
                      </div>
                      <div className="mt-2 font-bold text-sm text-stone-900 flex items-center gap-1.5 truncate">
                        <Globe2 className="w-3.5 h-3.5 text-[#8c2b33] shrink-0" />
                        <span className="truncate">{member.country}</span>
                      </div>
                      <div className="mt-2 text-xs font-mono font-bold text-[#8c2b33]">
                        $75,000 CAD
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={slotNum}
                    onClick={() => {
                      setSelectedBusinessId(currentBusiness.id);
                      setIsSubmitted(false);
                      setIsJoinModalOpen(true);
                    }}
                    className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-3.5 text-left hover:border-[#8c2b33] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                      <span>SLOT 0{slotNum}</span>
                      <span className="text-amber-600 font-bold">OPEN</span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-stone-700 group-hover:text-[#8c2b33]">
                      + Join Slot #{slotNum}
                    </div>
                    <div className="mt-2 text-xs font-mono text-stone-500">
                      $75,000 CAD
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. INVESTMENT TERMS (Exact Table from Screenshot 2) */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-stone-900">
              Investment Terms
            </h3>
            <div className="rounded-3xl border border-stone-200 overflow-hidden divide-y divide-stone-100 bg-[#FBF9F8] text-xs sm:text-sm">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-stone-600 font-medium">
                  Total Required Commercial Capital
                </span>
                <span className="font-bold font-mono text-stone-900 text-sm sm:text-base">
                  $75,000 CAD minimum active investment in Commercial Bakery Venture
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-stone-600 font-medium">
                  Direct Investor Equity Allocation
                </span>
                <span className="font-bold font-mono text-stone-900">
                  $45,000 CAD for 60.0% controlling Class A voting shares
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-stone-600 font-medium">
                  Partner Co-Funding Commitment
                </span>
                <span className="font-bold font-mono text-stone-900">
                  $30,000 CAD for 40.0% Canadian operating partner equity
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-stone-600 font-medium">
                  Source of Capital Mandate
                </span>
                <span className="font-bold font-mono text-[#8c2b33]">
                  100% Unencumbered personal funds • SWIFT MT103 direct wire only
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-stone-600 font-medium">
                  Target Operational Timeline
                </span>
                <span className="font-bold font-mono text-stone-900">
                  12–24 months active commercial deployment &amp; milestone governance
                </span>
              </div>
            </div>
          </div>

          {/* 4. DOCUMENTS & RESOURCES TILES (Exact 4x2 Tile Grid from Screenshots 1 & 2) */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                Documents
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Essential legal &amp; corporate governance agreements
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Tile 1: Articles of Incorporation */}
              <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                    Articles of Incorporation
                  </h4>
                  <a
                    href="#documents"
                    className="text-[11px] text-[#8c2b33] font-semibold hover:underline mt-1 inline-block"
                  >
                    See Document
                  </a>
                </div>
              </div>

              {/* Tile 2: Shareholders Agreement */}
              <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                    Shareholders&apos; Agreement (60/40)
                  </h4>
                  <a
                    href="#documents"
                    className="text-[11px] text-[#8c2b33] font-semibold hover:underline mt-1 inline-block"
                  >
                    See Document
                  </a>
                </div>
              </div>

              {/* Tile 3: Power of Attorney / Resolution */}
              <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                    Corporate Resolution &amp; ILA
                  </h4>
                  <a
                    href="#documents"
                    className="text-[11px] text-[#8c2b33] font-semibold hover:underline mt-1 inline-block"
                  >
                    See Document
                  </a>
                </div>
              </div>

              {/* Tile 4: SWIFT MT103 Wire Agreement */}
              <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                    SWIFT Wire Coordinates
                  </h4>
                  <a
                    href="#documents"
                    className="text-[11px] text-[#8c2b33] font-semibold hover:underline mt-1 inline-block"
                  >
                    See Document
                  </a>
                </div>
              </div>
            </div>

            {/* Resources Sub-section */}
            <div className="pt-2">
              <h3 className="text-2xl font-bold tracking-tight text-stone-900 mb-1">
                Resources
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Operational guides and compliance checklists
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Tile 5: 56+ Canadian Businesses */}
                <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                      56+ Business Catalog
                    </h4>
                    <span className="text-[11px] text-stone-500 block mt-1">
                      All Provinces
                    </span>
                  </div>
                </div>

                {/* Tile 6: Equipment Schedule */}
                <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                      Industrial Equipment
                    </h4>
                    <span className="text-[11px] text-stone-500 block mt-1">
                      $30,000 Allocation
                    </span>
                  </div>
                </div>

                {/* Tile 7: Document Checklist */}
                <div
                  onClick={handleDownloadChecklist}
                  className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px] cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                      Document Checklist
                    </h4>
                    <span className="text-[11px] text-[#8c2b33] font-bold block mt-1">
                      Download .TXT
                    </span>
                  </div>
                </div>

                {/* Tile 8: Bank Approval Letter */}
                <div className="bg-[#FBF9F8] rounded-3xl p-5 border border-stone-200 tlg-tile flex flex-col justify-between text-center min-h-[150px]">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8c2b33] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-2">
                      Escrow Approval Letter
                    </h4>
                    <span className="text-[11px] text-stone-500 block mt-1">
                      Schedule I Bank
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. 5-PHASE SEQUENTIAL TIMELINE SECTION */}
          <div id="timeline" className="space-y-6 pt-4 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                  Visa &amp; Onboarding Procedure (5 Phases)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Step-by-step guided flow from Source-of-Funds audit to active governance
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#8c2b33] bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                Phase {activePhase.id} of 5 Active
              </span>
            </div>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {phases.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhaseId(p.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    activePhaseId === p.id
                      ? "bg-[#711e26] text-white border-[#711e26] shadow-md"
                      : "bg-[#FBF9F8] text-stone-700 border-stone-200 hover:border-rose-300"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase opacity-75">
                    {p.code}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">
                    {p.title}
                  </div>
                  <div className="text-[10px] opacity-80 mt-1 font-mono">
                    {p.duration}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Phase Card */}
            <div className="rounded-3xl border border-stone-200 bg-[#FBF9F8] p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#8c2b33] uppercase">
                    {activePhase.code} • {activePhase.duration}
                  </span>
                  <h4 className="text-xl font-bold text-stone-900 mt-1">
                    {activePhase.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    {activePhase.summary}
                  </p>
                </div>
                <StatusBadge status={activePhase.status} />
              </div>

              {/* Deliverables List */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                <span className="text-xs font-mono font-bold text-stone-500 uppercase block">
                  Mandatory Phase Deliverables:
                </span>
                {activePhase.deliverables.map((del, i) => (
                  <div
                    key={del.id}
                    className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#8c2b33] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-stone-900">
                          {del.title}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {del.description}
                        </div>
                      </div>
                    </div>
                    <StatusBadge
                      status={del.status}
                      size="sm"
                      interactive
                      onClick={() =>
                        handleToggleDeliverableStatus(activePhase.id, del.id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. $75,000 CAPITAL BREAKDOWN & INTERACTIVE SCHEDULE */}
          <div id="capital" className="space-y-6 pt-4 border-t border-stone-200">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                $75,000 CAD Capital Breakdown
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Physical Equipment (40%), Working Capital (25%), Facility Lease (20%), Staffing/Inventory (15%)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CAPITAL_BREAKDOWN.map((item) => {
                const isSelected = selectedCategory.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCategory(item)}
                    className={`rounded-3xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-[#8c2b33] bg-rose-50/40 ring-2 ring-[#8c2b33]/20 shadow-md"
                        : "border-stone-200 bg-[#FBF9F8] hover:border-stone-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="font-bold text-[#8c2b33] bg-white px-2 py-0.5 rounded-full border border-stone-200">
                          {item.percentage}%
                        </span>
                        <StatusBadge status={item.status} size="sm" />
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {item.category}
                      </h4>
                      <div className="text-xl font-extrabold font-mono text-stone-900 mt-1">
                        {formatCAD(item.amount)}
                      </div>
                      <div className="text-xs font-mono text-stone-500 mt-1">
                        Investor: {formatCAD(item.investorPortion)} | Partner:{" "}
                        {formatCAD(item.partnerPortion)}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalCategory(item);
                      }}
                      className="mt-4 w-full py-2 rounded-full text-xs font-bold bg-white hover:bg-stone-50 text-[#8c2b33] border border-stone-200 shadow-xs cursor-pointer"
                    >
                      Why Verifiable Docs?
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Category Deep Dive */}
            <div className="rounded-3xl border border-stone-200 bg-[#FBF9F8] p-6 sm:p-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-base text-stone-900">
                  Itemized Schedule: {selectedCategory.category} ({formatCAD(selectedCategory.amount)})
                </h4>
                <span className="text-xs font-mono font-semibold text-[#8c2b33]">
                  {selectedCategory.regulatoryStandard}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCategory.lineItems.map((li, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-bold text-stone-900">{li.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {li.vendorType}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-stone-900">
                      {formatCAD(li.cost)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7. FREQUENTLY ASKED QUESTIONS (Exact 2-Column Accordion Layout from Screenshot 5) */}
          <div id="faq" className="space-y-6 pt-4 border-t border-stone-200">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Clarification on unencumbered capital, active management, and regulatory compliance
              </p>
            </div>

            {/* 2-Column FAQ Layout matching Screenshot 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-3xl border transition-all overflow-hidden ${
                      isOpen
                        ? "border-[#8c2b33] bg-white shadow-md ring-1 ring-[#8c2b33]/20"
                        : "border-stone-200 bg-[#FBF9F8] hover:border-stone-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8c2b33] font-bold block mb-1">
                          {faq.regulatoryTag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-500 font-bold text-xs mt-1">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 8. CLIENT REGISTRATION FORM (Exact Match for "Agents: New Client Registration" in Screenshot 4 & 5) */}
          <div id="join" className="pt-4 border-t border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Description & Partner Resources */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                    Client Registration
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Onboard new clients directly into an active commercial business venture.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FBF9F8] border border-stone-200 space-y-3">
                  <div className="text-xs font-mono font-bold text-[#8c2b33] uppercase">
                    Onboarding Verification Standard
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    All client applicants are assigned a verified corporate unit of
                    <strong> $75,000 CAD</strong>. Our institutional desk conducts
                    FINTRAC KYC screening, prepares the Unanimous Shareholders&apos;
                    Agreement, and establishes direct Schedule I banking coordinates.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#8c2b33] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Direct Point-to-Point SWIFT MT103</span>
                  </div>
                </div>
              </div>

              {/* Right Column: The Red Rounded Card Form (Matching Screenshot 4 & 5 "Sub-Agents: New Client Registration") */}
              <div className="lg:col-span-7">
                <div className="bg-[#711e26] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-200 font-bold block">
                      SECURE ONBOARDING
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1">
                      New Client Registration
                    </h4>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Business select */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                          Assigned Business Venture *
                        </label>
                        <select
                          value={selectedBusinessId}
                          onChange={(e) => setSelectedBusinessId(e.target.value)}
                          className="w-full rounded-2xl bg-white text-stone-900 text-xs px-3.5 py-2.5 font-medium border border-rose-300/40 focus:outline-none"
                        >
                          {CANADIAN_BUSINESS_VENTURES.map((bv) => (
                            <option key={bv.id} value={bv.id}>
                              {bv.name} ({bv.city}, {bv.province}) — $75,000 CAD
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Client Name */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Please enter client's legal name"
                          className="w-full rounded-2xl bg-white text-stone-900 text-xs px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                        />
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                            Client Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (416) 555-0192"
                            className="w-full rounded-2xl bg-white text-stone-900 text-xs px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                            Client Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="investor@domain.com"
                            className="w-full rounded-2xl bg-white text-stone-900 text-xs px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                          Client Country of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantCountry}
                          onChange={(e) => setApplicantCountry(e.target.value)}
                          placeholder="e.g. United Kingdom, Singapore, UAE"
                          className="w-full rounded-2xl bg-white text-stone-900 text-xs px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                        />
                      </div>

                      {/* Capital Selection */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                          Capital Figure *
                        </label>
                        <div className="p-3 rounded-2xl bg-black/20 border border-white/10 text-xs text-rose-100">
                          <strong>$75,000 CAD</strong> full commercial venture unit allocation (100% unencumbered).
                        </div>
                      </div>

                      {/* Submit Button (Exact pill from screenshot) */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 rounded-full text-xs font-bold bg-white text-[#711e26] hover:bg-stone-100 shadow-md transition-all cursor-pointer font-mono tracking-wider uppercase"
                        >
                          Submit Registration
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Confirmation View */
                    <div className="py-6 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-white text-[#711e26] flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h5 className="text-xl font-bold text-white">
                        Client Accepted into Venture!
                      </h5>
                      <p className="text-xs text-rose-100 leading-relaxed max-w-md mx-auto">
                        Registration confirmed under Reference #{confirmationCode}.
                        We have dispatched the next-steps legal and banking pack to{" "}
                        <strong className="underline">{email}</strong>.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2 rounded-full text-xs font-bold bg-white text-[#711e26] cursor-pointer"
                      >
                        Register Another Client
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM DARK FOOTER (Exact Match for Dribbble Screenshot)
           ========================================================================= */}
        <div className="bg-[#121b27] text-stone-300 py-6 px-6 sm:px-10 lg:px-14 border-t border-[#233144] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white">TLG GLOBAL</span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-400">
              Canadian Business Investment Program
            </span>
          </div>
          <div className="text-[11px] text-stone-400 font-mono">
            $75,000 CAD Active Commercial Venture • 12–24 Month Timeline
          </div>
        </div>
      </div>

      {/* POPUP MODAL (When clicking "Join Business ($75k)" button in top navigation) */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsJoinModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#711e26] text-white rounded-[32px] max-w-lg w-full p-7 sm:p-9 shadow-2xl border border-rose-300/30"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-200 font-bold block">
                    TLG INVESTOR PORTAL
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Join Active Business ($75,000)
                  </h3>
                </div>
                <button
                  onClick={() => setIsJoinModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                      Selected Venture
                    </label>
                    <select
                      value={selectedBusinessId}
                      onChange={(e) => setSelectedBusinessId(e.target.value)}
                      className="w-full rounded-2xl bg-white text-stone-900 px-3.5 py-2.5 font-medium border border-rose-300/40 focus:outline-none"
                    >
                      {CANADIAN_BUSINESS_VENTURES.map((bv) => (
                        <option key={bv.id} value={bv.id}>
                          {bv.name} ({bv.city}, {bv.province}) — $75k
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                      Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-2xl bg-white text-stone-900 px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (416) 555-0192"
                        className="w-full rounded-2xl bg-white text-stone-900 px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full rounded-2xl bg-white text-stone-900 px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-rose-200 mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantCountry}
                      onChange={(e) => setApplicantCountry(e.target.value)}
                      placeholder="e.g. United Kingdom, Singapore"
                      className="w-full rounded-2xl bg-white text-stone-900 px-3.5 py-2.5 border border-rose-300/40 focus:outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-black/20 border border-white/10 text-[11px] text-rose-100">
                    Allocated Unit: <strong>$75,000 CAD</strong> (100% unencumbered).
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-bold bg-white text-[#711e26] hover:bg-stone-100 shadow-md font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Confirm &amp; Receive Documents
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white text-[#711e26] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Registration Confirmed!
                  </h4>
                  <p className="text-xs text-rose-100 leading-relaxed">
                    Accepted into the business venture under Ref #{confirmationCode}.
                    Check your email at <strong>{email}</strong> for instructions.
                  </p>
                  <button
                    onClick={() => setIsJoinModalOpen(false)}
                    className="px-6 py-2 rounded-full text-xs font-bold bg-white text-[#711e26] cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHY VERIFIABLE DOCS MODAL */}
      <AnimatePresence>
        {modalCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalCategory(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8c2b33] font-bold">
                    {modalCategory.regulatoryStandard}
                  </span>
                  <h4 className="text-xl font-bold text-stone-900 mt-0.5">
                    {modalCategory.category}
                  </h4>
                </div>
                <button
                  onClick={() => setModalCategory(null)}
                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-[#711e26]">
                  {modalCategory.whyVerifiableDocRequired}
                </div>

                <div>
                  <div className="font-bold text-stone-900 mb-2 font-mono uppercase text-[11px]">
                    Required Audit Proofs:
                  </div>
                  <ul className="space-y-1.5 list-disc pl-4 text-stone-600">
                    {modalCategory.requiredProofs.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setModalCategory(null)}
                className="mt-6 w-full py-2.5 rounded-full text-xs font-bold bg-[#711e26] text-white hover:bg-[#8c2b33] cursor-pointer"
              >
                Close Compliance Brief
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
