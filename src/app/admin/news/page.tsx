import Link from "next/link";
import { getAllPosts } from "@/db/queries";
import { DeletePostButton } from "./DeletePostButton";
import { formatDate } from "@/data/news";

export const metadata = { title: "Новости — Панель управления" };

export default async function AdminNewsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1
          className="text-4xl text-[var(--color-text)] leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          НОВОСТИ
        </h1>
        <Link
          href="/admin/news/new"
          className="h-9 px-5 text-xs tracking-widest uppercase bg-[var(--color-amber)] text-[var(--color-bg)] hover:opacity-90 transition-opacity inline-flex items-center"
        >
          + Добавить
        </Link>
      </div>

      {!posts.length && (
        <p className="text-[var(--color-text-muted)] text-sm">
          Нет публикаций. Запустите <code className="text-[var(--color-amber)]">pnpm db:seed</code> для начального заполнения.
        </p>
      )}

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-8">ID</th>
            <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal">Заголовок</th>
            <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-24 hidden sm:table-cell">Тип</th>
            <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-32 hidden md:table-cell">Дата</th>
            <th className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] font-normal w-16 hidden md:table-cell">Опубл.</th>
            <th className="py-2 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-surface)]">
              <td className="py-2.5 pr-4 text-[var(--color-text-subtle)] text-xs">{post.id}</td>
              <td className="py-2.5 pr-4 text-[var(--color-text)]">
                <div>
                  <span>{post.title}</span>
                  <span className="ml-2 text-[9px] tracking-widest uppercase text-[var(--color-amber)] border border-[var(--color-amber)] px-1 opacity-70">{post.tag}</span>
                </div>
                <div className="text-xs text-[var(--color-text-subtle)] mt-0.5">{post.slug}</div>
              </td>
              <td className="py-2.5 pr-4 text-xs text-[var(--color-text-subtle)] hidden sm:table-cell">
                {post.category === "article" ? "Статья" : "Новость"}
              </td>
              <td className="py-2.5 pr-4 text-xs text-[var(--color-text-subtle)] hidden md:table-cell">
                {formatDate(post.date)}
              </td>
              <td className="py-2.5 pr-4 hidden md:table-cell">
                <span className={`text-xs ${post.published ? "text-green-400" : "text-[var(--color-text-subtle)]"}`}>
                  {post.published ? "Да" : "Нет"}
                </span>
              </td>
              <td className="py-2.5 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/news/${post.id}`}
                    className="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-amber)] transition-colors"
                  >
                    Изм.
                  </Link>
                  <DeletePostButton id={post.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
