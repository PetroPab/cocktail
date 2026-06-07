"use client";

import { deleteMenuItem } from "./actions";

export function DeleteMenuItemButton({ id }: { id: number }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!confirm("Удалить позицию?")) return;
        await deleteMenuItem(id);
        window.location.reload();
      }}
      className="text-xs text-[var(--color-text-subtle)] hover:text-red-400 transition-colors"
    >
      Удал.
    </button>
  );
}
