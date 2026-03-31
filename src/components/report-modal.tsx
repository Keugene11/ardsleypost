"use client";

import { useState } from "react";
import { X } from "lucide-react";

const REASONS = [
  "Spam",
  "Harassment",
  "Hate speech",
  "Inappropriate content",
  "Other",
];

export function ReportModal({
  type,
  targetId,
  onClose,
}: {
  type: "post" | "comment" | "user";
  targetId: string;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!reason || submitting) return;
    setSubmitting(true);

    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, targetId, reason, details: details || undefined }),
    });

    if (res.ok) {
      setSubmitted(true);
      setTimeout(onClose, 1500);
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-bg-card border border-border rounded-2xl px-6 py-6 w-[340px] max-w-[90vw] animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted press"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <p className="text-[16px] font-semibold">Report submitted</p>
            <p className="text-[13px] text-text-muted mt-1">
              Thank you. We&apos;ll review this shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-[16px] font-bold mb-1">Report {type}</h3>
            <p className="text-[13px] text-text-muted mb-4">
              Why are you reporting this {type}?
            </p>

            <div className="space-y-2 mb-4">
              {REASONS.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border cursor-pointer transition-colors press ${
                    reason === r
                      ? "border-text bg-bg-input"
                      : "border-border hover:bg-bg-card-hover"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      reason === r ? "border-text" : "border-text-muted/40"
                    }`}
                  >
                    {reason === r && (
                      <div className="w-2 h-2 rounded-full bg-text" />
                    )}
                  </div>
                  <span className="text-[14px]">{r}</span>
                </label>
              ))}
            </div>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Additional details (optional)"
              rows={3}
              className="w-full bg-bg-input border border-border rounded-xl px-3.5 py-2.5 text-[14px] placeholder:text-text-muted/50 outline-none focus:border-text-muted transition-colors resize-none mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={!reason || submitting}
              className="w-full bg-[#1a1a1a] text-white py-3 rounded-2xl font-semibold text-[14px] press disabled:opacity-30"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
