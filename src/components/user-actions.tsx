"use client";

import { useState } from "react";
import { Ban, Flag } from "lucide-react";
import { ReportModal } from "./report-modal";

export function UserActions({
  userId,
  isBlocked: initialBlocked,
}: {
  userId: string;
  isBlocked: boolean;
}) {
  const [blocked, setBlocked] = useState(initialBlocked);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const toggleBlock = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/block", {
      method: blocked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setBlocked(!blocked);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={toggleBlock}
          disabled={loading}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold press transition-colors ${
            blocked
              ? "bg-red-50 border border-red-200 text-red-600"
              : "border border-border text-text-muted hover:bg-bg-card-hover"
          }`}
        >
          <Ban size={14} strokeWidth={1.5} />
          {loading ? "..." : blocked ? "Unblock" : "Block"}
        </button>
        <button
          onClick={() => setShowReport(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold border border-border text-text-muted hover:bg-bg-card-hover press transition-colors"
        >
          <Flag size={14} strokeWidth={1.5} />
          Report
        </button>
      </div>

      {showReport && (
        <ReportModal
          type="user"
          targetId={userId}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
}
