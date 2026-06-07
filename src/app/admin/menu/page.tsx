import Link from "next/link";
import { getAllMenuItems } from "@/db/queries";
import { DeleteMenuItemButton } from "./DeleteButton";

export const metadata = { title: "Меню — Панель управления" };

const SECTIONS: Record<string, string> = { bar: "Бар", kitchen: "Кухня" };

export default async function AdminMenuPage() {
  const items = await getAllMenuItems();

  const bySection = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1
          className="text-4xl text-[var(--color-text)] leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          МЕНЮ
        </h1>
        <Link
          href="/admin/menu/new"
          className="h-9 px-5 text-xs tracking-widest uppercase bg-[var(--color-amber)] text-[var(--color-bg)] hover:opacity-90 transition-opacity inline-flex items-center"
        >
          + Добавить
        </Link>
      </div>

      {!items.length && (
        <p className="text-[var(--color-text-muted)] text-sm">
          Нет данных. Запустите <code className="text-[var(--color-amber)]">pnpm db:seed</code> для начального заполнения.
        </p>
      )}

      {Object.entries(bySection).map(([section, sectionItems]) => {
        const byCategory = sectionItems.reduce<Record<string, typeof sectionItems>>((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});

        return (
          <div key={section} className="mb-12">
            <h2
              className="text-2xl text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SECTIONS[section] ?? section}
            </h2>
            {Object.entries(byCategory).map(([cat, catItems]) => (
              <div key={cat} className="mb-8">
                <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--color-amber)] mb-3">{cat}</h3>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-8">ID</th>
                      <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal">Название</th>
                      <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-24 hidden sm:table-cell">Объём</th>
                      <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-20">Цена</th>
                      <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-16 hidden md:table-cell">Акт.</th>
                      <th className="py-2 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {catItems.map((item) => (
                      <tr key={item.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-surface)] group">
                        <td className="py-2 pr-4 text-[var(--color-text-subtle)] text-xs">{item.id}</td>
                        <td className="py-2 pr-4 text-[var(--color-text)]">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 text-[9px] tracking-widest uppercase text-[var(--color-amber)] border border-[var(--color-amber)] px-1 opacity-70">
                              {item.badge}
                            </span>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-[var(--color-text-subtle)] text-xs hidden sm:table-cell">{item.weight ?? "—"}</td>
                        <td className="py-2 pr-4 text-[var(--color-amber)] text-sm" style={{ fontFamily: "var(--font-display)" }}>
                          {item.price} ₽
                        </td>
                        <td className="py-2 pr-4 hidden md:table-cell">
                          <span className={`text-xs ${item.active ? "text-green-400" : "text-[var(--color-text-subtle)]"}`}>
                            {item.active ? "Да" : "Нет"}
                          </span>
                        </td>
                        <td className="py-2 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              href={`/admin/menu/${item.id}`}
                              className="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-amber)] transition-colors"
                            >
                              Изм.
                            </Link>
                            <DeleteMenuItemButton id={item.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
