"use client";

import { useState } from "react";
import type { Services, ServiceType, ServiceEntry } from "@/types";
import { SERVICE_TYPES, SERVICE_LABELS, SERVICE_ICONS } from "@/types";

export function ServicesDisplay({ services, paused }: { services: Services; paused: boolean }) {
  const hasAny = Object.values(services).some((s) => s);
  if (!hasAny) return null;

  return (
    <div className="w-full mt-4">
      <h3 className="text-[13px] font-semibold uppercase tracking-wide text-text-muted mb-2 text-left">
        Services
      </h3>
      {paused && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-2">
          <p className="text-[13px] font-medium text-orange-600">
            Not available right now
          </p>
        </div>
      )}
      <div className={`space-y-2 ${paused ? "opacity-40" : ""}`}>
        {SERVICE_TYPES.map((type) => {
          const entry = services[type];
          if (!entry) return null;
          return <ServiceBadge key={type} type={type} entry={entry} />;
        })}
      </div>
    </div>
  );
}

function ServiceBadge({ type, entry }: { type: ServiceType; entry: ServiceEntry }) {
  const isOffering = entry.mode === "offering";
  const [expanded, setExpanded] = useState(false);
  const isLong = (entry.details?.length || 0) > 80;

  return (
    <div
      className={`rounded-2xl px-4 py-3 flex items-start gap-3 ${
        isOffering
          ? "bg-green-50 border border-green-200"
          : "bg-blue-50 border border-blue-200"
      }`}
    >
      <span className="text-[16px] mt-0.5">{SERVICE_ICONS[type]}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold">{SERVICE_LABELS[type]}</span>
          <span
            className={`text-[11px] font-semibold uppercase tracking-wide ${
              isOffering ? "text-green-600" : "text-blue-600"
            }`}
          >
            · {isOffering ? "Offering" : "Looking"}
          </span>
        </div>
        {entry.details && (
          <div className="mt-0.5">
            <p className={`text-[13px] text-text-muted ${!expanded && isLong ? "line-clamp-2" : ""}`}>
              {entry.details}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[12px] font-medium text-text-muted/70 hover:text-text-muted mt-0.5 press"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
