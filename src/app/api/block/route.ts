import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId: string;
  try {
    ({ userId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (userId === user.id) {
    return NextResponse.json({ error: "You cannot block yourself" }, { status: 400 });
  }

  const { error } = await supabase.from("blocks").insert({
    blocker_id: user.id,
    blocked_id: userId,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ success: true, message: "Already blocked" });
    }
    return NextResponse.json({ error: "Failed to block user" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId: string;
  try {
    ({ userId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const { error } = await supabase
    .from("blocks")
    .delete()
    .eq("blocker_id", user.id)
    .eq("blocked_id", userId);

  if (error) {
    return NextResponse.json({ error: "Failed to unblock user" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
