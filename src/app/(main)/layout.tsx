import { createClient } from "@/lib/supabase/server";
import { BottomNav } from "@/components/bottom-nav";
import { AcceptTermsModal } from "@/components/accept-terms-modal";
import { BannedScreen } from "@/components/banned-screen";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let showTerms = false;
  let isBanned = false;
  let banReason: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("accepted_terms, is_banned, ban_reason")
      .eq("id", user.id)
      .single();
    showTerms = !profile?.accepted_terms;
    isBanned = !!profile?.is_banned;
    banReason = profile?.ban_reason || null;
  }

  if (isBanned) {
    return <BannedScreen reason={banReason} />;
  }

  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-md md:max-w-2xl mx-auto px-5 pt-6 pb-24">{children}</main>
      <BottomNav isLoggedIn={!!user} />
      {showTerms && <AcceptTermsModal />}
    </div>
  );
}
