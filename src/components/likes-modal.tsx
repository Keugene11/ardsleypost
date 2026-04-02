"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Liker {
  user_id: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  };
}

export function LikesModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: () => void;
}) {
  const [likers, setLikers] = useState<Liker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikers = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("likes")
        .select("user_id, profiles(full_name, avatar_url)")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });
      setLikers((data as unknown as Liker[]) || []);
      setLoading(false);
    };
    fetchLikers();
  }, [postId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-bg-card border border-border rounded-2xl px-6 py-6 w-[340px] max-w-[90vw] max-h-[70vh] animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted press"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <h3 className="text-[16px] font-bold mb-4">Likes</h3>

        {loading ? (
          <p className="text-[13px] text-text-muted py-4 text-center">Loading...</p>
        ) : likers.length === 0 ? (
          <p className="text-[13px] text-text-muted py-4 text-center">No likes yet</p>
        ) : (
          <div className="overflow-y-auto max-h-[50vh] -mx-1 px-1">
            {likers.map((liker) => (
              <Link
                key={liker.user_id}
                href={`/user/${liker.user_id}`}
                onClick={onClose}
                className="flex items-center gap-3 py-2.5 press"
              >
                {liker.profiles.avatar_url ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={liker.profiles.avatar_url}
                      alt={liker.profiles.full_name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-bg-input flex items-center justify-center text-[12px] font-semibold text-text-muted shrink-0">
                    {liker.profiles.full_name?.[0] || "?"}
                  </div>
                )}
                <span className="text-[14px] font-medium">
                  {liker.profiles.full_name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
