import Link from "next/link";
import { getAllMenuItems, getAllPosts, getAllSettings } from "@/db/queries";

export const metadata = { title: "Дашборд — Панель управления" };

export default async function AdminPage() {
  const [items, posts, settings] = await Promise.all([
    getAllMenuItems(),
    getAllPosts(),
    getAllSettings(),
  ]);

  const stats = [
    { label: "Позиций меню", value: items.length, href: "/admin/menu" },
    { label: "Публикаций", value: posts.length, href: "/admin/news" },
    { label: "Настроек", value: settings.length, href: "/admin/settings" },
  ];

  return (
    <div>
      <h1
        className="text-4xl text-[var(--color-text)] mb-8 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ДАШБОРД
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-amber)] transition-colors p-6 flex flex-col gap-2"
          >
            <span className="text-4xl text-[var(--color-amber)]" style={{ fontFamily: "var(--font-display)" }}>
              {s.value}
            </span>
            <span className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)]">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/admin/menu/new", label: "Добавить позицию в меню" },
          { href: "/admin/news/new", label: "Новая публикация" },
          { href: "/admin/settings", label: "Режим работы и настройки" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="border border-[var(--color-border)] hover:border-[var(--color-amber)] hover:bg-[var(--color-bg-surface)] transition-colors px-5 py-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-amber)]"
          >
            → {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
