import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Upsert to handle cases where profile row doesn't exist yet
  // (e.g. native iOS auth bypasses the server callback that creates profiles)
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email || "",
      full_name:
        user.user_metadata?.full_name || user.user_metadata?.name || "",
      avatar_url: user.user_metadata?.avatar_url || null,
      accepted_terms: true,
    },
    { onConflict: "id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
