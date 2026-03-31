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

  let type: string, targetId: string, reason: string, details: string | undefined;
  try {
    ({ type, targetId, reason, details } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!type || !targetId || !reason) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!["post", "comment", "user"].includes(type)) {
    return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
  }

  let reported_user_id: string | null = null;
  let post_id: string | null = null;
  let comment_id: string | null = null;

  if (type === "user") {
    reported_user_id = targetId;
  } else if (type === "post") {
    post_id = targetId;
    const { data: post } = await supabase
      .from("posts")
      .select("author_id")
      .eq("id", targetId)
      .single();
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    reported_user_id = post.author_id;
  } else if (type === "comment") {
    comment_id = targetId;
    const { data: comment } = await supabase
      .from("comments")
      .select("author_id")
      .eq("id", targetId)
      .single();
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    reported_user_id = comment.author_id;
  }

  if (reported_user_id === user.id) {
    return NextResponse.json({ error: "You cannot report yourself" }, { status: 400 });
  }

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    reported_user_id,
    post_id,
    comment_id,
    reason,
    details: details || null,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
