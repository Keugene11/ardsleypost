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
      {/* Stripe Connect */}
      {stripeOnboarded ? (
        <div className="flex items-center gap-2 text-green-600 text-[13px]">
          <CheckCircle size={15} strokeWidth={2} />
          <span>Payments enabled</span>
        </div>
      ) : (
        <button
          onClick={handleStripeConnect}
          disabled={connectingStripe}
          className="flex items-center gap-2 text-[13px] text-text-muted press disabled:opacity-40"
        >
          <CreditCard size={15} strokeWidth={1.5} />
          {connectingStripe ? "Connecting..." : "Set up payments to sell services"}
        </button>
      )}

      {/* Bio editor */}
      {editing ? (
        <div>
          <textarea
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            placeholder={"Tell Ardsley about yourself...\n\nE.g. I offer math & science tutoring for grades 6-12. 3 years of experience. $30/hr."}
            className="w-full bg-bg-input rounded-xl p-3.5 text-[14px] placeholder:text-text-muted/40 outline-none resize-none min-h-[120px] focus:ring-1 focus:ring-text-muted/30 transition-all"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSaveBio}
              disabled={saving}
              className="bg-[#1a1a1a] text-white px-4 py-2 rounded-full font-semibold text-[13px] press"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setBioValue(bio);
              }}
              className="text-[13px] text-text-muted px-3 py-2 press"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-[13px] text-text-muted press"
          >
            <Pencil size={14} strokeWidth={1.5} />
            {bio ? "Edit bio" : "Add bio"}
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-[13px] text-red-400 press ml-auto"
          >
            <LogOut size={14} strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
