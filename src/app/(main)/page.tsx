import { createClient } from "@/lib/supabase/server";
import { Feed } from "@/components/feed";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Run all independent queries in parallel
  const [postsResult, userCountResult, ...userResults] = await Promise.all([
    supabase
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
      .limit(50),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true }),
    ...(user
      ? [
          supabase.from("likes").select("post_id").eq("user_id", user.id),
          supabase.from("blocks").select("blocked_id").eq("blocker_id", user.id),
          supabase.from("profiles").select("avatar_url, full_name").eq("id", user.id).single(),
        ]
      : []),
  ]);

  const posts = postsResult.data;
  const userCount = userCountResult.count;
  const likedPostIds = new Set(user ? (userResults[0]?.data?.map((l: { post_id: string }) => l.post_id) || []) : []);
  const blockedUserIds = new Set(user ? (userResults[1]?.data?.map((b: { blocked_id: string }) => b.blocked_id) || []) : []);
  const userProfile = user ? userResults[2]?.data : null;

  const postIds = (posts || []).map((p) => p.id);

  // Fetch recent comments (depends on posts result)
  const { data: recentComments } = postIds.length
    ? await supabase
        .from("comments")
        .select("*, author:profiles(*)")
        .in("post_id", postIds)
        .order("created_at", { ascending: false })
        .limit(200)
    : { data: [] };

  // Group comments by post_id, keep latest 2 per post
  const commentsByPost = new Map<string, typeof recentComments>();
  (recentComments || []).forEach((c) => {
    const existing = commentsByPost.get(c.post_id) || [];
    if (existing.length < 2) {
      existing.push(c);
      commentsByPost.set(c.post_id, existing);
    }
  });

  const formattedPosts = (posts || [])
    .filter((post) => !blockedUserIds.has(post.author_id))
    .map((post) => ({
      ...post,
      like_count: post.like_count?.[0]?.count || 0,
      comment_count: post.comment_count?.[0]?.count || 0,
      user_has_liked: likedPostIds.has(post.id),
      recent_comments: (commentsByPost.get(post.id) || []).reverse(),
    }));

  return (
    <>
      <header className="mb-5">
        <div className="flex items-baseline justify-between">
          <h1 className="text-[26px] font-extrabold tracking-tight">Ardsleypost</h1>
          {userCount !== null && userCount > 0 && (
            <span className="text-[12px] text-text-muted font-medium">
              {userCount} {userCount === 1 ? "member" : "members"}
            </span>
          )}
        </div>
        <p className="text-[13px] text-text-muted mt-1 leading-snug">
          The social network built for Ardsley students, parents, and alumni.
        </p>
      </header>
      <Feed
        initialPosts={formattedPosts}
        userId={user?.id || null}
        userAvatarUrl={userProfile?.avatar_url || null}
        userFullName={userProfile?.full_name || null}
      />
    </>
  );
}
