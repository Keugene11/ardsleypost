"use client";

import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function EditPostContent({
  postId,
  initialContent,
}: {
  postId: string;
  initialContent: string;
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [editContent, setEditContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!editContent.trim() || editContent.length > 5000 || saving) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .update({ content: editContent.trim() })
      .eq("id", postId);
    if (!error) {
      setContent(editContent.trim());
      setEditing(false);
      router.refresh();
    }
    setSaving(false);
  };

  if (editing) {
    return (
      <div className="mb-4">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full bg-bg-input border border-border rounded-xl px-4 py-3 text-[16px] leading-relaxed outline-none focus:border-text-muted transition-colors resize-none min-h-[100px]"
          autoFocus
          rows={4}
        />
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleSave}
            disabled={!editContent.trim() || editContent.length > 5000 || saving}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-green-600 press disabled:opacity-30"
          >
            <Check size={15} strokeWidth={2} />
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => { setEditing(false); setEditContent(content); }}
            className="flex items-center gap-1.5 text-[13px] text-text-muted press"
          >
            <X size={15} strokeWidth={1.5} />
            Cancel
          </button>
          {editContent.length > 4500 && (
            <span className={`text-[12px] ml-auto ${editContent.length > 5000 ? "text-red-500 font-semibold" : "text-text-muted"}`}>
              {editContent.length}/5000
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 group relative">
      <p className="text-[16px] leading-relaxed whitespace-pre-wrap">{content}</p>
      <button
        onClick={() => { setEditContent(content); setEditing(true); }}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-text-muted hover:text-text press transition-opacity"
      >
        <Pencil size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
