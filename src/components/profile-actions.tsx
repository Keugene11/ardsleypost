"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Pencil, CreditCard, CheckCircle } from "lucide-react";

export function ProfileActions({
  userId,
  bio,
  stripeOnboarded,
}: {
  userId: string;
  bio: string;
  stripeOnboarded: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [bioValue, setBioValue] = useState(bio);
  const [saving, setSaving] = useState(false);
  const [connectingStripe, setConnectingStripe] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleSaveBio = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ bio: bioValue.trim() })
      .eq("id", userId);
    setEditing(false);
    setSaving(false);
    router.refresh();
  };

  const handleStripeConnect = async () => {
    setConnectingStripe(true);
    const res = await fetch("/api/connect/onboard", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to start Stripe setup");
      setConnectingStripe(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Stripe Connect Status */}
      <div className="bg-bg-card border border-border rounded-2xl px-4 py-3.5">
        {stripeOnboarded ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={16} strokeWidth={2} />
            <span className="text-[13px] font-semibold">
              Payments enabled — you can receive payouts
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">Set up payments</p>
              <p className="text-[11px] text-text-muted">
                Connect Stripe to sell services and receive payouts
              </p>
            </div>
            <button
              onClick={handleStripeConnect}
              disabled={connectingStripe}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-xl text-[12px] font-semibold press disabled:opacity-40"
            >
              <CreditCard size={14} strokeWidth={1.5} />
              {connectingStripe ? "Loading..." : "Connect"}
            </button>
          </div>
        )}
      </div>

      {/* Bio & Sign Out */}
      <div className="flex gap-2">
        {editing ? (
          <div className="flex-1 flex gap-2">
            <input
              value={bioValue}
              onChange={(e) => setBioValue(e.target.value)}
              placeholder="Add a bio..."
              className="flex-1 bg-bg-card border border-border rounded-full pl-4 pr-4 py-2.5 text-[14px] placeholder:text-text-muted/50 outline-none focus:border-text-muted transition-colors"
            />
            <button
              onClick={handleSaveBio}
              disabled={saving}
              className="bg-[#1a1a1a] text-white px-4 py-2.5 rounded-xl font-semibold text-[13px] press"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="border border-border px-4 py-2.5 rounded-xl text-[13px] press"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 border border-border rounded-xl px-4 py-2.5 text-[13px] font-semibold press"
            >
              <Pencil size={14} strokeWidth={1.5} />
              Edit Bio
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 border border-border rounded-xl px-4 py-2.5 text-[13px] font-semibold text-red-500 press ml-auto"
            >
              <LogOut size={14} strokeWidth={1.5} />
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
