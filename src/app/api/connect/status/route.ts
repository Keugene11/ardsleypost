import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_account_id, stripe_onboarded")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_account_id) {
    return NextResponse.json({ onboarded: false, hasAccount: false });
  }

  const stripe = getStripe();
  const account = await stripe.accounts.retrieve(profile.stripe_account_id);
  const onboarded = account.charges_enabled && account.payouts_enabled;

  // Update the profile if onboarding status changed
  if (onboarded && !profile.stripe_onboarded) {
    await supabase
      .from("profiles")
      .update({ stripe_onboarded: true })
      .eq("id", user.id);
  }

  return NextResponse.json({
    onboarded,
    hasAccount: true,
  });
}
