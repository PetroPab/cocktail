"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/db/index";
import { settings } from "@/db/schema";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

async function requireAdmin() {
  const store = await cookies();
  if (!(await verifySession(store.get(COOKIE_NAME)?.value))) redirect("/admin/login");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  if (!db) redirect("/admin/settings");

  const pairs: Array<{ key: string; value: string }> = [];

  // Standard settings
  for (const key of ["hours", "address", "phone", "telegram"]) {
    const val = String(formData.get(key) || "").trim();
    if (val) pairs.push({ key, value: val });
  }

  // Custom settings from formData (all keys starting with "key_")
  const customKeys: string[] = [];
  for (const [k] of formData.entries()) {
    if (k.startsWith("ckey_")) customKeys.push(k.slice(5));
  }
  for (const k of customKeys) {
    const key = String(formData.get(`ckey_${k}`) || "").trim();
    const val = String(formData.get(`cval_${k}`) || "").trim();
    if (key && val) pairs.push({ key, value: val });
  }

  // Upsert all pairs
  for (const pair of pairs) {
    await db
      .insert(settings)
      .values(pair)
      .onConflictDoUpdate({ target: settings.key, set: { value: pair.value } });
  }

  revalidateTag("settings", {});
  redirect("/admin/settings?saved=1");
}
