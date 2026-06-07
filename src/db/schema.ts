import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  weight: text("weight"),
  description: text("description"),
  badge: text("badge"),
  img: text("img"),
  category: text("category").notNull(),
  section: text("section").notNull(), // "bar" | "kitchen"
  position: integer("position").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(), // "news" | "article"
  tag: text("tag").notNull(),
  img: text("img").notNull(),
  published: boolean("published").default(true).notNull(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export type MenuItemRow = typeof menuItems.$inferSelect;
export type PostRow = typeof posts.$inferSelect;
export type SettingRow = typeof settings.$inferSelect;
