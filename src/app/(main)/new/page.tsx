"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewPostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const priceValue = price ? Math.round(parseFloat(price) * 100) : null;

    const { error } = await supabase.from("posts").insert({
      author_id: user.id,
      content: content.trim(),
      price: priceValue,
    });

    if (!error) {
      router.push("/");
      router.refresh();
    }
    setSubmitting(false);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-[13px] text-text-muted press flex items-center gap-1"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || submitting}
          className="bg-[#1a1a1a] text-white px-5 py-2 rounded-full font-semibold text-[13px] press disabled:opacity-30"
        >
          {submitting ? "Posting..." : "Post"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening in Ardsley?"
          className="w-full bg-transparent text-[16px] placeholder:text-text-muted/40 outline-none resize-none min-h-[160px]"
          autoFocus
        />

        <div className="border-t border-border pt-4 mt-2">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-text-muted">Price</span>
            <div className="relative flex-1 max-w-[140px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-text-muted">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="optional"
                className="w-full bg-bg-input rounded-full pl-7 pr-3 py-2 text-[13px] placeholder:text-text-muted/40 outline-none"
              />
            </div>
          </div>
          {price && (
            <p className="text-[11px] text-text-muted mt-1.5 ml-0.5">
              10% platform fee applies
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
