"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { menuItems } from "@/db/schema";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

async function requireAdmin() {
  const store = await cookies();
  if (!(await verifySession(store.get(COOKIE_NAME)?.value))) redirect("/admin/login");
}

export async function createMenuItem(formData: FormData) {
  await requireAdmin();
  if (!db) redirect("/admin/menu");

  await db.insert(menuItems).values({
    name: String(formData.get("name") || ""),
    price: parseInt(String(formData.get("price") || "0"), 10),
    weight: String(formData.get("weight") || "") || null,
    description: String(formData.get("description") || "") || null,
    badge: String(formData.get("badge") || "") || null,
    img: String(formData.get("img") || "") || null,
    category: String(formData.get("category") || "cocktails"),
    section: String(formData.get("section") || "bar") as "bar" | "kitchen",
    position: parseInt(String(formData.get("position") || "0"), 10),
    active: formData.get("active") === "on",
  });

  revalidateTag("menu", {});
  redirect("/admin/menu");
}

export async function updateMenuItem(id: number, formData: FormData) {
  await requireAdmin();
  if (!db) redirect("/admin/menu");

  await db
    .update(menuItems)
    .set({
      name: String(formData.get("name") || ""),
      price: parseInt(String(formData.get("price") || "0"), 10),
      weight: String(formData.get("weight") || "") || null,
      description: String(formData.get("description") || "") || null,
      badge: String(formData.get("badge") || "") || null,
      img: String(formData.get("img") || "") || null,
      category: String(formData.get("category") || "cocktails"),
      section: String(formData.get("section") || "bar") as "bar" | "kitchen",
      position: parseInt(String(formData.get("position") || "0"), 10),
      active: formData.get("active") === "on",
    })
    .where(eq(menuItems.id, id));

  revalidateTag("menu", {});
  redirect("/admin/menu");
}

export async function deleteMenuItem(id: number) {
  await requireAdmin();
  if (!db) return;
  await db.delete(menuItems).where(eq(menuItems.id, id));
  revalidateTag("menu", {});
}
