"use client";

import React from "react";
import { CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { ComplianceStatus } from "@/data/onboardingData";

interface StatusBadgeProps {
  status: ComplianceStatus;
  size?: "sm" | "md";
  interactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function StatusBadge({
  status,
  size = "md",
  interactive = false,
  onClick,
}: StatusBadgeProps) {
  const styles: Record<
    ComplianceStatus,
    {
      container: string;
      icon: React.ReactNode;
    }
  > = {
    Verified: {
      container:
        "bg-[#831f28]/10 text-[#831f28] border-[#831f28]/30 hover:bg-[#831f28]/15",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#831f28] shrink-0" />,
    },
    "In Progress": {
      container:
        "bg-amber-500/10 text-amber-900 border-amber-300/80 hover:bg-amber-500/15",
      icon: <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />,
    },
    Required: {
      container:
        "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/70",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-stone-600 shrink-0" />,
    },
  };

  const current = styles[status];
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-0.5 text-[11px] gap-1.5"
      : "px-3 py-1 text-xs gap-1.5";

  return (
    <span
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      title={
        interactive ? "Click to cycle compliance verification status" : undefined
      }
      className={`inline-flex items-center font-semibold tracking-wide rounded-full border transition-all select-none ${sizeClasses} ${
        current.container
      } ${interactive ? "cursor-pointer shadow-xs active:scale-95" : ""}`}
    >
      {current.icon}
      <span>{status}</span>
    </span>
  );
}
