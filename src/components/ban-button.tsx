"use client";

import { useState } from "react";
import { ShieldX, ShieldCheck } from "lucide-react";

export function BanButton({
  userId,
  isBanned: initialBanned,
}: {
  userId: string;
  isBanned: boolean;
}) {
  const [banned, setBanned] = useState(initialBanned);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (loading) return;
    const reason = !banned ? prompt("Ban reason (optional):") : null;
    if (!banned && reason === null) return; // cancelled prompt

    setLoading(true);
    const res = await fetch("/api/admin/ban", {
      method: banned ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, reason: reason || undefined }),
    });

    if (res.ok) {
      setBanned(!banned);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold press transition-colors ${
        banned
          ? "bg-green-50 border border-green-200 text-green-600"
          : "bg-red-50 border border-red-200 text-red-600"
      }`}
    >
      {banned ? (
        <ShieldCheck size={14} strokeWidth={1.5} />
      ) : (
        <ShieldX size={14} strokeWidth={1.5} />
      )}
      {loading ? "..." : banned ? "Unban" : "Ban User"}
    </button>
  );
}
