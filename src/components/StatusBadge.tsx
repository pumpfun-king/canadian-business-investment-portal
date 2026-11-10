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
      dot: string;
      icon: React.ReactNode;
    }
  > = {
    Verified: {
      container:
        "bg-emerald-50 text-emerald-800 border-emerald-200/90 hover:bg-emerald-100/80",
      dot: "bg-emerald-600",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
    },
    "In Progress": {
      container:
        "bg-amber-50 text-amber-800 border-amber-200/90 hover:bg-amber-100/80",
      dot: "bg-amber-500 animate-pulse",
      icon: <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
    },
    Required: {
      container:
        "bg-slate-100 text-slate-700 border-slate-300/90 hover:bg-slate-200/70",
      dot: "bg-slate-500",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-slate-600 shrink-0" />,
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
      className={`inline-flex items-center font-semibold tracking-wide rounded-full border transition-colors select-none ${sizeClasses} ${
        current.container
      } ${interactive ? "cursor-pointer shadow-sm" : ""}`}
    >
      {current.icon}
      <span>{status}</span>
    </span>
  );
}
