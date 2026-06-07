import Link from "next/link";
import { logoutAction } from "./login/actions";

const NAV = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/menu", label: "Меню" },
  { href: "/admin/news", label: "Новости" },
  { href: "/admin/settings", label: "Настройки" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Topbar */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-14">
          <Link
            href="/admin"
            className="text-xl text-[var(--color-text)] shrink-0"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
          >
            КОКТЕЙЛЬ
          </Link>
          <span className="text-xs text-[var(--color-text-subtle)] tracking-widest uppercase shrink-0">Admin</span>

          <nav className="flex items-center gap-1 ml-4 flex-1 overflow-x-auto">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 px-3 py-1.5 text-xs tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-amber)] hover:bg-[var(--color-bg)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto shrink-0">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-amber)] transition-colors"
            >
              ← Сайт
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)] hover:text-red-400 transition-colors"
              >
                Выйти
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
}
