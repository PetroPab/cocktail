"use client";

import { deletePost } from "./actions";

export function DeletePostButton({ id }: { id: number }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!confirm("Удалить публикацию?")) return;
        await deletePost(id);
        window.location.reload();
      }}
      className="text-xs text-[var(--color-text-subtle)] hover:text-red-400 transition-colors"
    >
      Удал.
    </button>
  );
}
