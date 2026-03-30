"use client";

import { useState } from "react";
import { Search, ImagePlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types";
import { PostCard } from "./post-card";

export function Feed({
  initialPosts,
  userId,
  userAvatarUrl,
  userFullName,
}: {
  initialPosts: Post[];
  userId: string | null;
  userAvatarUrl: string | null;
  userFullName: string | null;
}) {
  const [search, setSearch] = useState("");

  const filtered = initialPosts.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.content.toLowerCase().includes(q) ||
      p.author.full_name.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {userId && (
        <Link
          href="/new"
          className="flex items-center gap-3 bg-bg-card border border-border rounded-2xl px-4 py-3 mb-4 press"
        >
          {userAvatarUrl ? (
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
              <Image
                src={userAvatarUrl}
                alt={userFullName || "You"}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-bg-input flex items-center justify-center text-[13px] font-semibold text-text-muted shrink-0">
              {userFullName?.[0] || "?"}
            </div>
          )}
          <span className="flex-1 text-[14px] text-text-muted/50">
            What&apos;s happening in Ardsley?
          </span>
          <ImagePlus size={18} strokeWidth={1.5} className="text-text-muted/40" />
        </Link>
      )}

      <div className="relative mb-2">
        <Search
          size={15}
          strokeWidth={1.5}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/50"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full bg-bg-input rounded-full pl-9 pr-4 py-2 text-[13px] placeholder:text-text-muted/40 outline-none focus:ring-1 focus:ring-text-muted/30 transition-all"
        />
      </div>

      <div className="divide-y divide-border">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-text-muted text-[14px]">
            {search ? "No results." : "No posts yet."}
          </div>
        ) : (
          filtered.map((post) => (
            <PostCard key={post.id} post={post} userId={userId} />
          ))
        )}
      </div>
    </div>
  );
}
