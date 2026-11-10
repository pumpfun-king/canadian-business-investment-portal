"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  UserCheck,
  X,
  BadgeDollarSign,
  Activity,
  ChevronRight,
  FileCheck,
  Globe2,
  Shuffle,
  Search,
} from "lucide-react";
import {
  CANADIAN_BUSINESS_VENTURES,
  INVESTOR_COUNTRIES,
  BusinessVentureGroup,
} from "@/data/canadianBusinesses";

export interface BusinessJoiner {
  step: number;
  country: string;
  verificationChannel: string;
  amount: number;
  timeLabel: string;
}

const VERIFICATION_CHANNELS = [
  "Direct Wire • SWIFT MT103",
  "Schedule I Escrow Cleared",
  "Corporate Wire Verified",
  "Unencumbered Equity Cleared",
  "Direct Bank Transfer",
];

const FIVE_STEP_BREAKS = [
  {
    step: 1,
    pct: 20,
    label: "Break 1/5 • Lead Anchor Slot",
    shortLabel: "Step 1 (20%)",
  },
  {
    step: 2,
    pct: 40,
    label: "Break 2/5 • Co-Venture Slot",
    shortLabel: "Step 2 (40%)",
  },
  {
    step: 3,
    pct: 60,
    label: "Break 3/5 • Quorum Threshold",
    shortLabel: "Step 3 (60%)",
  },
  {
    step: 4,
    pct: 80,
    label: "Break 4/5 • Equipment Lock",
    shortLabel: "Step 4 (80%)",
  },
  {
    step: 5,
    pct: 100,
    label: "Break 5/5 • Group Closing",
    shortLabel: "Step 5 (100%)",
  },
];

interface LiveSquadProgressHubProps {
  externalModalTrigger?: number;
}

export function LiveSquadProgressHub({
  externalModalTrigger = 0,
}: LiveSquadProgressHubProps) {
  const [businessIndex, setBusinessIndex] = useState(0);
  const [progress, setProgress] = useState(22);
  const [currentStepBreak, setCurrentStepBreak] = useState(1);
  const [paceStyle, setPaceStyle] = useState<"slow" | "medium" | "quick">(
    "medium"
  );
  const [isSquashing, setIsSquashing] = useState(false);
  const [squashIntensity, setSquashIntensity] = useState<"normal" | "burst">(
    "normal"
  );
  const [joinedMembers, setJoinedMembers] = useState<BusinessJoiner[]>([
    {
      step: 1,
      country: INVESTOR_COUNTRIES[0],
      verificationChannel: VERIFICATION_CHANNELS[0],
      amount: 75000,
      timeLabel: "Verified • Active 24/7",
    },
  ]);
  const [liveFeedTicker, setLiveFeedTicker] = useState<{
    country: string;
    business: string;
    sector: string;
    city: string;
    amount: string;
  }>({
    country: INVESTOR_COUNTRIES[0],
    business: CANADIAN_BUSINESS_VENTURES[0].name,
    sector: CANADIAN_BUSINESS_VENTURES[0].sector,
    city: "Toronto, ON",
    amount: "$75,000 CAD",
  });

  // Join Modal & Confirmation State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [businessSearchQuery, setBusinessSearchQuery] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState(
    CANADIAN_BUSINESS_VENTURES[0].id
  );
  const [allocationOption, setAllocationOption] = useState<
    "75k-unit" | "45k-30k-split"
  >("75k-unit");
  const [confirmedUnencumbered, setConfirmedUnencumbered] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState("CBIP-GRP-8492");

  const currentBusiness: BusinessVentureGroup =
    CANADIAN_BUSINESS_VENTURES[
      businessIndex % CANADIAN_BUSINESS_VENTURES.length
    ];
  const countryCursorRef = useRef(1);
  const pauseUntilRef = useRef<number>(0);

  // Pick a non-repeating country for the current business slots
  const getNextDistinctCountry = (existing: BusinessJoiner[]): string => {
    const usedCountries = new Set(existing.map((m) => m.country));
    for (let i = 0; i < INVESTOR_COUNTRIES.length; i++) {
      const candidate =
        INVESTOR_COUNTRIES[
          (countryCursorRef.current + i) % INVESTOR_COUNTRIES.length
        ];
      if (!usedCountries.has(candidate)) {
        countryCursorRef.current =
          (countryCursorRef.current + i + 1) % INVESTOR_COUNTRIES.length;
        return candidate;
      }
    }
    countryCursorRef.current =
      (countryCursorRef.current + 1) % INVESTOR_COUNTRIES.length;
    return INVESTOR_COUNTRIES[countryCursorRef.current];
  };

  // Open modal if parent triggers it
  useEffect(() => {
    if (externalModalTrigger > 0) {
      setSelectedBusinessId(currentBusiness.id);
      setIsSubmitted(false);
      setIsJoinModalOpen(true);
    }
  }, [externalModalTrigger, currentBusiness.id]);

  // Realistic, unhurried 5-break variable-speed engine with squash-and-stretch physics
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now < pauseUntilRef.current) {
        return;
      }

      setProgress((prev) => {
        const nextBreak =
          FIVE_STEP_BREAKS.find((b) => b.pct > prev)?.pct ?? 100;

        const roll = Math.random();
        let delta = 0.45;

        if (roll > 0.84) {
          delta = 0.95 + Math.random() * 0.65;
          setPaceStyle("quick");
          setSquashIntensity("burst");
        } else if (roll < 0.45) {
          if (Math.random() < 0.3) {
            pauseUntilRef.current = Date.now() + 800 + Math.random() * 900;
          }
          delta = 0.14 + Math.random() * 0.22;
          setPaceStyle("slow");
          setSquashIntensity("normal");
        } else {
          delta = 0.35 + Math.random() * 0.42;
          setPaceStyle("medium");
          setSquashIntensity("normal");
        }

        const candidate = prev + delta;

        // Check if we reached or crossed one of the 5 step breaks (20%, 40%, 60%, 80%, 100%)
        if (candidate >= nextBreak) {
          const hitStep = Math.round(nextBreak / 20);
          setCurrentStepBreak(hitStep);

          setIsSquashing(true);
          setTimeout(() => setIsSquashing(false), 700);

          setJoinedMembers((prevMembers) => {
            if (prevMembers.some((m) => m.step === hitStep)) {
              return prevMembers;
            }
            const nextCountry = getNextDistinctCountry(prevMembers);
            const channel =
              VERIFICATION_CHANNELS[
                (hitStep + businessIndex) % VERIFICATION_CHANNELS.length
              ];

            const tickerBiz =
              CANADIAN_BUSINESS_VENTURES[
                (businessIndex + hitStep * 3) %
                  CANADIAN_BUSINESS_VENTURES.length
              ];

            setLiveFeedTicker({
              country: nextCountry,
              business:
                hitStep % 2 === 0 ? currentBusiness.name : tickerBiz.name,
              sector:
                hitStep % 2 === 0 ? currentBusiness.sector : tickerBiz.sector,
              city: `${
                hitStep % 2 === 0 ? currentBusiness.city : tickerBiz.city
              }, ${
                hitStep % 2 === 0
                  ? currentBusiness.province
                  : tickerBiz.province
              }`,
              amount: "$75,000 CAD",
            });

            return [
              ...prevMembers,
              {
                step: hitStep,
                country: nextCountry,
                verificationChannel: channel,
                amount: 75000,
                timeLabel: "Verified • Active 24/7",
              },
            ];
          });

          // Realistic pause at each of the 5 step breaks
          if (nextBreak >= 100) {
            pauseUntilRef.current = Date.now() + 6500;
            setTimeout(() => {
              setBusinessIndex((prevIdx) => {
                const stepJump = 1 + Math.floor(Math.random() * 4);
                const nextIdx =
                  (prevIdx + stepJump) % CANADIAN_BUSINESS_VENTURES.length;
                const nextAnchorCountry = getNextDistinctCountry([]);
                setJoinedMembers([
                  {
                    step: 1,
                    country: nextAnchorCountry,
                    verificationChannel: VERIFICATION_CHANNELS[0],
                    amount: 75000,
                    timeLabel: "Anchor Slot • Verified",
                  },
                ]);
                setCurrentStepBreak(1);
                setProgress(20);
                return nextIdx;
              });
            }, 6200);
          } else {
            pauseUntilRef.current =
              Date.now() + 3500 + Math.floor(Math.random() * 2300);
          }

          return nextBreak;
        }

        return Number(candidate.toFixed(2));
      });
    }, 450);

    return () => clearInterval(interval);
  }, [businessIndex, currentBusiness]);

  const handleSelectBusinessIndex = (newIndex: number) => {
    const normalized =
      ((newIndex % CANADIAN_BUSINESS_VENTURES.length) +
        CANADIAN_BUSINESS_VENTURES.length) %
      CANADIAN_BUSINESS_VENTURES.length;
    setBusinessIndex(normalized);
    const firstCountry = getNextDistinctCountry([]);
    const secondCountry = getNextDistinctCountry([
      {
        step: 1,
        country: firstCountry,
        verificationChannel: VERIFICATION_CHANNELS[0],
        amount: 75000,
        timeLabel: "Verified",
      },
    ]);
    setJoinedMembers([
      {
        step: 1,
        country: firstCountry,
        verificationChannel: VERIFICATION_CHANNELS[0],
        amount: 75000,
        timeLabel: "Anchor Slot • Verified",
      },
      {
        step: 2,
        country: secondCountry,
        verificationChannel: VERIFICATION_CHANNELS[1],
        amount: 75000,
        timeLabel: "Verified • Active 24/7",
      },
    ]);
    setCurrentStepBreak(2);
    setProgress(42);
    setIsSquashing(true);
    setTimeout(() => setIsSquashing(false), 550);
  };

  const handleOpenJoinModal = (businessId?: string) => {
    setSelectedBusinessId(businessId || currentBusiness.id);
    setIsSubmitted(false);
    setIsJoinModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setConfirmationCode(`CBIP-GRP-${randomDigits}`);

    const cleanCountry = country.trim() || "International";

    setJoinedMembers((prev) => {
      const nextStep = Math.min(5, prev.length + 1);
      return [
        ...prev.filter((m) => m.step !== nextStep),
        {
          step: nextStep,
          country: cleanCountry,
          verificationChannel: "Your Reserved Slot • Confirmed",
          amount: 75000,
          timeLabel: "Accepted Just Now",
        },
      ];
    });

    setIsSquashing(true);
    setTimeout(() => setIsSquashing(false), 700);
    setIsSubmitted(true);
  };

  const chosenBusinessObj =
    CANADIAN_BUSINESS_VENTURES.find((b) => b.id === selectedBusinessId) ||
    currentBusiness;

  const filteredModalBusinesses = businessSearchQuery.trim()
    ? CANADIAN_BUSINESS_VENTURES.filter(
        (b) =>
          b.name.toLowerCase().includes(businessSearchQuery.toLowerCase()) ||
          b.sector.toLowerCase().includes(businessSearchQuery.toLowerCase()) ||
          b.city.toLowerCase().includes(businessSearchQuery.toLowerCase()) ||
          b.province.toLowerCase().includes(businessSearchQuery.toLowerCase())
      )
    : CANADIAN_BUSINESS_VENTURES;

  const visiblePillBusinesses = Array.from({ length: 6 }, (_, offset) => {
    const idx = (businessIndex + offset) % CANADIAN_BUSINESS_VENTURES.length;
    return { business: CANADIAN_BUSINESS_VENTURES[idx], idx };
  });

  return (
    <section className="bg-gradient-to-b from-[#121b27] via-[#1a202c] to-[#25151c] text-white border-b border-[#3d1e26] relative overflow-hidden">
      {/* Ambient Crimson / Maroon Radial Glow */}
      <div className="absolute -top-32 left-1/3 w-[550px] h-[550px] bg-[#831f28]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-[#5c131a]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-8 relative z-10">
        {/* Top Live 24/7 Global Activity Banner */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#831f28]/40 text-rose-200 border border-rose-400/40 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-rose-400 -ml-4" />
              LIVE 24/7 INVESTOR ONBOARDING ({CANADIAN_BUSINESS_VENTURES.length}{" "}
              VENTURES)
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${liveFeedTicker.country}-${liveFeedTicker.business}`}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm bg-[#121b27]/90 border border-[#2a374a] px-3.5 py-1.5 rounded-full shadow-md"
              >
                <Activity className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-stone-300">Investor from</span>
                <span className="inline-flex items-center gap-1 font-bold text-white bg-[#831f28]/40 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                  <Globe2 className="w-3.5 h-3.5 text-rose-300" />
                  {liveFeedTicker.country}
                </span>
                <span className="text-stone-400">joined</span>
                <span className="font-semibold text-rose-200 underline decoration-rose-400/40 underline-offset-2">
                  {liveFeedTicker.business}
                </span>
                <span className="text-stone-400 hidden md:inline text-xs font-mono">
                  [{liveFeedTicker.sector} • {liveFeedTicker.city}]
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#831f28] to-[#5c131a] border border-rose-400/40 text-white font-mono font-bold text-xs tabular-nums">
                  {liveFeedTicker.amount}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Rotating 56+ Business Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 no-scrollbar">
            <button
              type="button"
              onClick={() =>
                handleSelectBusinessIndex(
                  businessIndex + 1 + Math.floor(Math.random() * 5)
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#831f28]/30 hover:bg-[#831f28]/50 text-rose-200 border border-rose-400/30 shrink-0 cursor-pointer transition-colors"
              title="Cycle through 56+ available Canadian businesses"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Next Venture ({businessIndex + 1}/{CANADIAN_BUSINESS_VENTURES.length})</span>
            </button>

            {visiblePillBusinesses.map(({ business, idx }) => {
              const isCurrent = idx === businessIndex;
              return (
                <button
                  key={business.id}
                  onClick={() => handleSelectBusinessIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer border ${
                    isCurrent
                      ? "bg-gradient-to-r from-[#831f28] to-[#69171f] text-white font-bold border-rose-400/60 shadow-md shadow-[#831f28]/40"
                      : "bg-[#16202c]/80 text-stone-300 border-[#263547] hover:border-rose-400/40 hover:text-white"
                  }`}
                >
                  {business.city} • {business.sector.split("&")[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Progressive Business Card - TLG Style Rounded Crimson & Navy Theme */}
        <div className="bg-[#151f2b]/95 border border-[#2c3d52] rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Corner Glow Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#831f28]/25 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Active Business Header + Prominent Join Business CTA */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6 relative z-10">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#831f28]/35 border border-rose-400/40 text-[11px] font-mono text-rose-200 font-bold">
                  VENTURE #{String(businessIndex + 1).padStart(2, "0")} OF{" "}
                  {CANADIAN_BUSINESS_VENTURES.length}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#1e2a3b] border border-[#2f4058] text-[11px] font-mono text-stone-300 font-medium">
                  {currentBusiness.naics} • {currentBusiness.sector}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-300 bg-[#1e2a3b] px-3 py-0.5 rounded-full border border-[#2f4058]">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {currentBusiness.city}, {currentBusiness.province}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBusiness.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex flex-wrap items-center gap-2.5">
                    <span>{currentBusiness.name}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">
                    {currentBusiness.highlight} —{" "}
                    <span className="text-rose-300 font-semibold font-mono">
                      Each Member Joins with $75,000 CAD Capital Allocation
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right CTA & Live Counter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 relative z-10">
              <motion.div
                animate={
                  isSquashing
                    ? {
                        scaleX: [1, 1.12, 0.92, 1.04, 1],
                        scaleY: [1, 0.88, 1.09, 0.97, 1],
                      }
                    : { scaleX: 1, scaleY: 1 }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-[#0e1620] border border-[#2a384b] rounded-2xl px-5 py-3 flex items-center justify-between sm:justify-start gap-4 shadow-inner"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Step Break Progress
                  </div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-rose-300 tabular-nums">
                    Break {currentStepBreak}/5 • {Math.round(progress)}%
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-[#2a384b]" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Per-Person Figure
                  </div>
                  <div className="text-sm sm:text-base font-mono font-bold text-white tabular-nums">
                    $75,000 CAD
                  </div>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scaleX: 1.08, scaleY: 0.9 }}
                onClick={() => handleOpenJoinModal(currentBusiness.id)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base bg-gradient-to-r from-[#831f28] via-[#6f1a22] to-[#541218] hover:from-[#9c2631] hover:to-[#6b171f] text-white shadow-lg shadow-[#831f28]/35 cursor-pointer transition-all border border-rose-400/30"
              >
                <UserCheck className="w-5 h-5 stroke-[2.5]" />
                <span>Join Business ($75,000)</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>
            </div>
          </div>

          {/* 5-STEP PROGRESSIVE BAR WITH SQUASH-AND-STRETCH PHYSICS */}
          <div className="space-y-3.5 relative z-10">
            {/* Top 5 Break Labels */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
              {FIVE_STEP_BREAKS.map((b) => {
                const isReached = progress >= b.pct;
                const isCurrentTarget =
                  progress < b.pct &&
                  (b.step === 1 || progress >= (b.step - 1) * 20);

                return (
                  <motion.div
                    key={b.step}
                    animate={
                      isSquashing && currentStepBreak === b.step
                        ? {
                            scaleX: [1, 1.16, 0.89, 1.05, 1],
                            scaleY: [1, 0.84, 1.13, 0.96, 1],
                          }
                        : { scaleX: 1, scaleY: 1 }
                    }
                    transition={{ duration: 0.6 }}
                    className={`rounded-2xl p-2.5 sm:p-3.5 border transition-all ${
                      isReached
                        ? "bg-gradient-to-br from-[#831f28]/30 to-[#4c1015]/40 border-rose-400/50 text-rose-200 shadow-md shadow-[#831f28]/20"
                        : isCurrentTarget
                        ? "bg-[#1e2a3b] border-rose-400/40 text-white"
                        : "bg-[#0f1722]/60 border-[#243346] text-stone-500"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold">
                        STEP {b.step}/5
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono font-bold tabular-nums">
                        {b.pct}%
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] sm:text-xs font-semibold truncate text-white">
                      $75,000 CAD
                    </div>
                    <div className="text-[10px] font-mono opacity-80 truncate hidden sm:block">
                      {isReached
                        ? "✓ Slot Locked"
                        : isCurrentTarget
                        ? "Allocating Slot..."
                        : "Open Business Slot"}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Elastic Squash-and-Stretch Progress Track - TLG Dark Crimson Shimmer */}
            <motion.div
              animate={
                isSquashing
                  ? {
                      scaleY:
                        squashIntensity === "burst"
                          ? [1, 1.32, 0.8, 1.12, 1]
                          : [1, 1.22, 0.86, 1.07, 1],
                      scaleX: [1, 0.986, 1.01, 0.997, 1],
                    }
                  : { scaleY: 1, scaleX: 1 }
              }
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative h-8 sm:h-9 w-full rounded-full bg-[#0d141d] border border-[#27374b] p-1 overflow-hidden shadow-inner"
            >
              {/* 5 Step Break Vertical Divider Ticks */}
              {[20, 40, 60, 80].map((mark) => (
                <div
                  key={mark}
                  style={{ left: `${mark}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-[#2a3a4f] z-20 flex flex-col justify-between py-1"
                >
                  <span className="w-1.5 h-1.5 -ml-[2px] rounded-full bg-rose-400/40" />
                  <span className="w-1.5 h-1.5 -ml-[2px] rounded-full bg-rose-400/40" />
                </div>
              ))}

              {/* Animated Elastic Fill Bar - TLG Crimson Gradient */}
              <motion.div
                animate={{
                  width: `${Math.min(100, Math.max(4, progress))}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness:
                    paceStyle === "quick"
                      ? 170
                      : paceStyle === "slow"
                      ? 75
                      : 115,
                  damping: isSquashing ? 12 : 22,
                  mass: 0.85,
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#5a141b] via-[#831f28] to-[#b32b38] relative flex items-center justify-end pr-2 shadow-lg shadow-[#831f28]/40"
              >
                {/* Diagonal Subtle Texture */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Squashing Elastic Leading Head */}
                <motion.div
                  animate={
                    isSquashing
                      ? {
                          scaleX: [1, 1.5, 0.72, 1.2, 1],
                          scaleY: [1, 0.68, 1.32, 0.9, 1],
                        }
                      : {
                          scaleX: [1, 1.1, 0.95, 1],
                          scaleY: [1, 0.92, 1.06, 1],
                        }
                  }
                  transition={{
                    duration: isSquashing ? 0.55 : 1.6,
                    repeat: isSquashing ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center relative z-10"
                >
                  <span className="w-2 h-2 rounded-full bg-[#831f28]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Live Business Slots - Country only, no repeating names */}
          <div className="mt-6 pt-5 border-t border-[#253549] relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-300">
                <Users className="w-4 h-4 text-rose-400" />
                <span>
                  Verified Investor Countries Joined Under{" "}
                  <strong className="text-white">{currentBusiness.name}</strong>
                </span>
              </div>
              <span className="text-xs font-mono text-rose-300">
                Individual Join Figure: <strong>$75,000 CAD</strong> • Total
                5-Unit Business Pool: <strong>$375,000 CAD</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((slotNum) => {
                const member = joinedMembers.find((m) => m.step === slotNum);

                if (member) {
                  return (
                    <motion.div
                      key={`${currentBusiness.id}-slot-${slotNum}-${member.country}`}
                      initial={{
                        opacity: 0,
                        scaleX: 1.2,
                        scaleY: 0.78,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        scaleX: 1,
                        scaleY: 1,
                        y: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="rounded-2xl bg-gradient-to-b from-[#192433] to-[#121a24] border border-[#831f28]/40 p-4 flex flex-col justify-between shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded-full bg-[#831f28]/30 text-rose-200 font-bold border border-rose-400/30">
                            SLOT 0{slotNum}
                          </span>
                          <span className="text-rose-300 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                            Joined
                          </span>
                        </div>
                        <div className="mt-2.5 font-bold text-sm text-white flex items-center gap-1.5 truncate">
                          <Globe2 className="w-4 h-4 text-rose-400 shrink-0" />
                          <span className="truncate">{member.country}</span>
                        </div>
                        <div className="text-[11px] text-stone-400 truncate mt-0.5">
                          {member.verificationChannel}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#253549] flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-rose-200 tabular-nums">
                          $75,000 CAD
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          {member.timeLabel.split("•")[0]}
                        </span>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <button
                    key={`${currentBusiness.id}-open-${slotNum}`}
                    onClick={() => handleOpenJoinModal(currentBusiness.id)}
                    className="rounded-2xl bg-[#0f1722]/50 border border-dashed border-[#2f4258] hover:border-rose-400/70 hover:bg-[#1a2535] p-4 text-left transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                        <span>SLOT 0{slotNum}</span>
                        <span className="text-amber-400 font-semibold">
                          OPEN
                        </span>
                      </div>
                      <div className="mt-2.5 text-xs font-bold text-stone-300 group-hover:text-rose-200 transition-colors">
                        + Click to Join Business Slot #{slotNum}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {currentBusiness.city}, {currentBusiness.province}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#253549]/70 flex items-center justify-between text-xs font-mono text-stone-400 group-hover:text-white">
                      <span>$75,000 CAD</span>
                      <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE JOIN BUSINESS MODAL & ACCEPTANCE CONFIRMATION */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsJoinModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#0c1219]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-stone-900 rounded-3xl border border-rose-100 max-w-xl w-full shadow-2xl overflow-hidden my-auto"
            >
              {!isSubmitted ? (
                <>
                  {/* Modal Header - TLG Crimson Gradient */}
                  <div className="bg-gradient-to-r from-[#831f28] via-[#6a1921] to-[#4e1117] text-white p-6 sm:p-7 flex items-start justify-between gap-4 border-b border-[#a82d38]/50">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white/15 text-rose-100 border border-white/20 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                        INSTANT BUSINESS ONBOARDING •{" "}
                        {CANADIAN_BUSINESS_VENTURES.length} VENTURES
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        Join Active Commercial Business
                      </h3>
                      <p className="text-xs text-rose-100/90 mt-1">
                        Choose from {CANADIAN_BUSINESS_VENTURES.length}{" "}
                        available Canadian businesses across sectors and submit
                        your details to reserve your $75,000 CAD unit.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsJoinModalOpen(false)}
                      className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form Body */}
                  <form
                    onSubmit={handleFormSubmit}
                    className="p-6 sm:p-7 space-y-4 max-h-[75vh] overflow-y-auto bg-[#FBF9F8]"
                  >
                    {/* Search & Select from 56+ Available Businesses */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold">
                        Select Active Business ({filteredModalBusinesses.length}{" "}
                        of {CANADIAN_BUSINESS_VENTURES.length} Ventures)
                      </label>

                      <div className="relative">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={businessSearchQuery}
                          onChange={(e) =>
                            setBusinessSearchQuery(e.target.value)
                          }
                          placeholder="Filter 56+ businesses by name, sector, or city..."
                          className="w-full rounded-2xl border border-stone-200 bg-white pl-9 pr-3 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#831f28]"
                        />
                      </div>

                      <select
                        value={selectedBusinessId}
                        onChange={(e) => setSelectedBusinessId(e.target.value)}
                        className="w-full rounded-2xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#831f28]"
                      >
                        {filteredModalBusinesses.map((bv, index) => (
                          <option key={bv.id} value={bv.id}>
                            #{index + 1} • {bv.name} [{bv.sector}] ({bv.city},{" "}
                            {bv.province}) — $75,000 CAD
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full Name & Email Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full rounded-2xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#831f28]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                          Official Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="investor@domain.com"
                          className="w-full rounded-2xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#831f28]"
                        />
                      </div>
                    </div>

                    {/* Phone & Country Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (416) 555-0192"
                          className="w-full rounded-2xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#831f28]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                          Country of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="e.g. United Kingdom / Singapore"
                          className="w-full rounded-2xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#831f28]"
                        />
                      </div>
                    </div>

                    {/* Capital Commitment Structure */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                        $75,000 CAD Capital Structure Selection
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setAllocationOption("75k-unit")}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            allocationOption === "75k-unit"
                              ? "border-[#831f28] bg-rose-50/60 ring-2 ring-[#831f28]/30 shadow-sm"
                              : "border-stone-200 bg-white hover:border-stone-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#831f28]">
                              FULL BUSINESS UNIT
                            </span>
                            <BadgeDollarSign className="w-4 h-4 text-[#831f28]" />
                          </div>
                          <div className="text-base font-bold font-mono text-stone-900 mt-1">
                            $75,000 CAD
                          </div>
                          <div className="text-[11px] text-stone-600 mt-0.5">
                            Direct $75k Commercial Venture Unit
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setAllocationOption("45k-30k-split")}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            allocationOption === "45k-30k-split"
                              ? "border-[#831f28] bg-rose-50/60 ring-2 ring-[#831f28]/30 shadow-sm"
                              : "border-stone-200 bg-white hover:border-stone-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-stone-800">
                              60/40 CO-FUNDED
                            </span>
                            <Users className="w-4 h-4 text-[#831f28]" />
                          </div>
                          <div className="text-base font-bold font-mono text-stone-900 mt-1">
                            $45k + $30k CAD
                          </div>
                          <div className="text-[11px] text-stone-600 mt-0.5">
                            $45k Investor (60%) + $30k Partner (40%)
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Compliance Checkbox */}
                    <label className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-700 cursor-pointer shadow-xs">
                      <input
                        type="checkbox"
                        required
                        checked={confirmedUnencumbered}
                        onChange={(e) =>
                          setConfirmedUnencumbered(e.target.checked)
                        }
                        className="mt-0.5 rounded border-stone-300 text-[#831f28] focus:ring-[#831f28]"
                      />
                      <span>
                        I confirm my capital commitment is{" "}
                        <strong className="text-stone-900">100% unencumbered</strong> and ready for direct
                        Schedule I corporate escrow verification upon receiving
                        the onboarding package.
                      </span>
                    </label>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsJoinModalOpen(false)}
                        className="px-5 py-2.5 rounded-full text-xs font-semibold border border-stone-300 text-stone-600 hover:bg-stone-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#831f28] to-[#5a141b] hover:from-[#9c2631] hover:to-[#6b171f] text-white shadow-md cursor-pointer transition-all border border-rose-400/30"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>Submit &amp; Join Business</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* OFFICIAL CONFIRMATION NOTICE OF ACCEPTANCE INTO GROUP */
                <div className="p-7 sm:p-9 text-center space-y-5 bg-[#FBF9F8]">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 16,
                    }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#831f28] to-[#4e1117] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#831f28]/30 border-2 border-rose-200"
                  >
                    <CheckCircle2 className="w-9 h-9" />
                  </motion.div>

                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#831f28]/10 text-[#831f28] border border-[#831f28]/30">
                      GROUP ACCEPTANCE CONFIRMED • REF #{confirmationCode}
                    </span>
                    <h3 className="text-2xl font-extrabold text-stone-900">
                      Welcome to the Business Group!
                    </h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      You have been officially{" "}
                      <strong className="text-[#831f28]">
                        accepted into the group
                      </strong>{" "}
                      under{" "}
                      <strong className="text-stone-900">
                        {chosenBusinessObj.name} ({chosenBusinessObj.city},{" "}
                        {chosenBusinessObj.province})
                      </strong>{" "}
                      with your{" "}
                      <strong className="font-mono text-stone-900">
                        $75,000 CAD
                      </strong>{" "}
                      unit allocation recorded under{" "}
                      <strong className="text-stone-900">{country}</strong>.
                    </p>
                  </div>

                  {/* Email Next Steps Notice Box */}
                  <div className="bg-[#121b27] text-white rounded-3xl p-6 text-left space-y-3.5 border border-[#2a374a] shadow-md">
                    <div className="flex items-center gap-2.5 text-rose-300 text-xs font-mono uppercase tracking-wider font-bold">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>OFFICIAL EMAIL DISPATCH &amp; NEXT STEPS</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      Our Institutional Onboarding Desk is connecting with you
                      via email at{" "}
                      <span className="font-mono font-bold text-rose-300 underline">
                        {email}
                      </span>{" "}
                      with your complete group welcome dossier and next steps:
                    </p>
                    <ul className="space-y-2 text-xs text-stone-300 font-mono">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>
                          Phase 1 KYC &amp; Source-of-Funds Upload Link
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>
                          Unanimous Shareholders&apos; Agreement (
                          {chosenBusinessObj.name})
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>
                          Schedule I Canadian Corporate Escrow Wire Coordinates
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsJoinModalOpen(false)}
                      className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-bold bg-[#121b27] hover:bg-[#1a2535] text-white cursor-pointer transition-colors"
                    >
                      Return to Live Onboarding Portal
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
