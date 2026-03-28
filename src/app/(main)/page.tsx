import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Feed } from "@/components/feed";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles(*),
      like_count:likes(count),
      comment_count:comments(count)
    `
    )
    .order("created_at", { ascending: false })
    .limit(50);

  let likedPostIds: Set<string> = new Set();
  if (user) {
    const { data: likes } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", user.id);
    likedPostIds = new Set(likes?.map((l) => l.post_id) || []);
  }

  const formattedPosts = (posts || []).map((post) => ({
    ...post,
    like_count: post.like_count?.[0]?.count || 0,
    comment_count: post.comment_count?.[0]?.count || 0,
    user_has_liked: likedPostIds.has(post.id),
  }));

  return (
    <>
      <header className="mb-5">
        <h1 className="text-[26px] font-extrabold tracking-tight">Ardloop</h1>
      </header>
      <Feed initialPosts={formattedPosts} userId={user?.id || null} />
      <Link
        href="/new"
        className="fixed bottom-20 right-5 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center shadow-lg press z-40 hover:scale-105 transition-transform"
      >
        <Plus size={22} strokeWidth={2.5} />
      </Link>
    </>
  );
}
