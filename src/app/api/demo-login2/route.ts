import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const DEMO2_EMAIL = process.env.DEMO2_EMAIL || "demo2@ardsleypost.com";
const DEMO2_PASSWORD = process.env.DEMO2_PASSWORD || process.env.DEMO_PASSWORD!;

export async function POST() {
  if (!DEMO2_PASSWORD) {
    return NextResponse.json({ error: "Demo login not configured" }, { status: 404 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email: DEMO2_EMAIL,
    password: DEMO2_PASSWORD,
  });

  if (error) {
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({
        email: DEMO2_EMAIL,
        password: DEMO2_PASSWORD,
        options: {
          data: { full_name: "Test User" },
        },
      });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    if (signUpData.user) {
      await supabase.from("profiles").upsert({
        id: signUpData.user.id,
        email: DEMO2_EMAIL,
        full_name: "Test User",
        bio: "Second test account for messaging.",
      });
    }

    const { data: signInData } = await supabase.auth.signInWithPassword({
      email: DEMO2_EMAIL,
      password: DEMO2_PASSWORD,
    });

    return NextResponse.json({
      access_token: signInData.session?.access_token,
      refresh_token: signInData.session?.refresh_token,
    });
  }

  return NextResponse.json({
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
}
