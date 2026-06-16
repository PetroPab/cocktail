import { unstable_cache } from "next/cache";
import { eq, asc, desc, and } from "drizzle-orm";
import { db } from "./index";
import { menuItems, posts, settings } from "./schema";
import type { MenuItemRow, PostRow } from "./schema";

// ── Menu ───────────────────────────────────────────────────────────────────

export const getMenuItems = unstable_cache(
  async (): Promise<MenuItemRow[]> => {
    if (!db) return [];
    return db
      .select()
      .from(menuItems)
      .where(eq(menuItems.active, true))
      .orderBy(asc(menuItems.position), asc(menuItems.id));
  },
  ["menu-items"],
  { tags: ["menu"], revalidate: 3600 },
);

export async function getAllMenuItems(): Promise<MenuItemRow[]> {
  if (!db) return [];
  return db
    .select()
    .from(menuItems)
    .orderBy(asc(menuItems.section), asc(menuItems.category), asc(menuItems.position), asc(menuItems.id));
}

export async function getMenuItemById(id: number): Promise<MenuItemRow | null> {
  if (!db) return null;
  const rows = await db.select().from(menuItems).where(eq(menuItems.id, id));
  return rows[0] ?? null;
}

// ── Posts ──────────────────────────────────────────────────────────────────

export const getPublishedPosts = unstable_cache(
  async (): Promise<PostRow[]> => {
    if (!db) return [];
    return db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.date));
  },
  ["published-posts"],
  { tags: ["posts"], revalidate: 3600 },
);

export const getLatestPublishedPosts = (n: number) =>
  unstable_cache(
    async (): Promise<PostRow[]> => {
      if (!db) return [];
      const rows = await db
        .select()
        .from(posts)
        .where(eq(posts.published, true))
        .orderBy(desc(posts.date));
      return rows.slice(0, n);
    },
    [`latest-posts-${n}`],
    { tags: ["posts"], revalidate: 3600 },
  )();

export const getPostBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<PostRow | null> => {
      if (!db) return null;
      const rows = await db
        .select()
        .from(posts)
        .where(and(eq(posts.slug, slug), eq(posts.published, true)));
      return rows[0] ?? null;
    },
    [`post-by-slug-${slug}`],
    { tags: ["posts"], revalidate: 3600 },
  )();

export async function getAllPosts(): Promise<PostRow[]> {
  if (!db) return [];
  return db.select().from(posts).orderBy(desc(posts.date));
}

export async function getPostById(id: number): Promise<PostRow | null> {
  if (!db) return null;
  const rows = await db.select().from(posts).where(eq(posts.id, id));
  return rows[0] ?? null;
}

// ── Settings ───────────────────────────────────────────────────────────────

export const getSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    if (!db) return {};
    const rows = await db.select().from(settings);
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },
  ["settings"],
  { tags: ["settings"], revalidate: 3600 },
);

export async function getAllSettings(): Promise<Array<{ key: string; value: string }>> {
  if (!db) return [];
  return db.select().from(settings).orderBy(asc(settings.key));
}
