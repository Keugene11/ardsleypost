import { ShieldX } from "lucide-react";

export function BannedScreen({ reason }: { reason: string | null }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <ShieldX size={48} strokeWidth={1.5} className="mx-auto mb-4 text-red-500" />
        <h1 className="text-[22px] font-bold tracking-tight mb-2">
          Account Suspended
        </h1>
        <p className="text-[14px] text-text-muted leading-relaxed">
          Your account has been suspended for violating community guidelines.
        </p>
        {reason && (
          <p className="mt-3 text-[13px] text-text-muted bg-bg-card border border-border rounded-xl px-4 py-3">
            Reason: {reason}
          </p>
        )}
        <p className="mt-6 text-[12px] text-text-muted">
          If you believe this is a mistake, contact support.
        </p>
      </div>
    </div>
  );
}
