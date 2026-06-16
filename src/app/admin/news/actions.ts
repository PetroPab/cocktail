"use server";

import { redirect } from "next/navigation";
import { revalidateTag, revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { posts } from "@/db/schema";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

async function requireAdmin() {
  const store = await cookies();
  if (!(await verifySession(store.get(COOKIE_NAME)?.value))) redirect("/admin/login");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => {
      const map: Record<string, string> = {
        а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",
        к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",
        х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
      };
      return map[c] ?? c;
    })
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  if (!db) redirect("/admin/news");

  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugify(title) || `post-${Date.now()}`;

  await db.insert(posts).values({
    slug,
    title,
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    date: String(formData.get("date") || new Date().toISOString().slice(0, 10)),
    category: String(formData.get("category") || "news") as "news" | "article",
    tag: String(formData.get("tag") || ""),
    img: String(formData.get("img") || ""),
    published: formData.get("published") === "on",
  });

  revalidateTag("posts", {});
  revalidatePath("/about");
  redirect("/admin/news");
}

export async function updatePost(id: number, formData: FormData) {
  await requireAdmin();
  if (!db) redirect("/admin/news");

  const slug = String(formData.get("slug") || "");

  await db
    .update(posts)
    .set({
      slug,
      title: String(formData.get("title") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      date: String(formData.get("date") || ""),
      category: String(formData.get("category") || "news") as "news" | "article",
      tag: String(formData.get("tag") || ""),
      img: String(formData.get("img") || ""),
      published: formData.get("published") === "on",
    })
    .where(eq(posts.id, id));

  revalidateTag("posts", {});
  revalidatePath("/about");
  revalidatePath(`/news/${slug}`);
  redirect("/admin/news");
}

export async function deletePost(id: number) {
  await requireAdmin();
  if (!db) return;
  await db.delete(posts).where(eq(posts.id, id));
  revalidateTag("posts", {});
  revalidatePath("/about");
}
