import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();
  const origin = request.headers.get("origin")!;

  // Check if user already has a Stripe account
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_account_id")
    .eq("id", user.id)
    .single();

  let accountId = profile?.stripe_account_id;

  if (!accountId) {
    // Create a new Stripe Connect Express account
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    accountId = account.id;

    // Save the account ID to the profile
    await supabase
      .from("profiles")
      .update({ stripe_account_id: accountId })
      .eq("id", user.id);
  }

  // Create an onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${origin}/profile?connect=refresh`,
    return_url: `${origin}/profile?connect=complete`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}
