import type { PostRow } from "@/db/schema";

const inputCls = "w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] px-3 h-9 text-sm outline-none focus:border-[var(--color-amber)] transition-colors";
const labelCls = "block text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] mb-1";

export function PostForm({ post, action }: { post?: PostRow; action: (fd: FormData) => Promise<void> }) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-3xl">

      <div className="grid grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label className={labelCls}>Тип</label>
          <select name="category" defaultValue={post?.category ?? "news"}
            className={inputCls + " appearance-none"}>
            <option value="news">Новость</option>
            <option value="article">Статья</option>
          </select>
        </div>
        {/* Date */}
        <div>
          <label className={labelCls}>Дата публикации</label>
          <input type="date" name="date"
            defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)}
            className={inputCls} />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className={labelCls}>Заголовок *</label>
        <input type="text" name="title" required defaultValue={post?.title ?? ""}
          className={inputCls} />
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>Slug (URL) *</label>
        <input type="text" name="slug" required defaultValue={post?.slug ?? ""}
          placeholder="naprímer-my-slug" className={inputCls} />
        <p className="text-xs text-[var(--color-text-subtle)] mt-1">Только латиница, цифры и дефисы. Для новой записи оставьте пустым — сгенерируется автоматически.</p>
      </div>

      {/* Tag */}
      <div>
        <label className={labelCls}>Тег</label>
        <input type="text" name="tag" defaultValue={post?.tag ?? ""}
          placeholder="напр. Акция / Гид / Меню" className={inputCls} />
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelCls}>Анонс *</label>
        <textarea name="excerpt" required defaultValue={post?.excerpt ?? ""}
          rows={3}
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] px-3 py-2 text-sm outline-none focus:border-[var(--color-amber)] transition-colors resize-none" />
      </div>

      {/* Content */}
      <div>
        <label className={labelCls}>Текст статьи (markdown)</label>
        <p className="text-xs text-[var(--color-text-subtle)] mb-2">
          ## Заголовок · **жирный** · - список · --- разделитель
        </p>
        <textarea name="content" defaultValue={post?.content ?? ""}
          rows={16}
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] px-3 py-2 text-sm outline-none focus:border-[var(--color-amber)] transition-colors resize-y font-mono" />
      </div>

      {/* Image */}
      <div>
        <label className={labelCls}>URL изображения</label>
        <input type="url" name="img" defaultValue={post?.img ?? ""}
          placeholder="https://..." className={inputCls} />
      </div>

      {/* Published */}
      <div className="flex items-center gap-3">
        <input type="checkbox" name="published" id="published"
          defaultChecked={post ? post.published : true}
          className="w-4 h-4 accent-[var(--color-amber)]" />
        <label htmlFor="published" className={labelCls + " mb-0"}>Опубликовать (показывать на сайте)</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="h-10 px-6 text-xs tracking-widest uppercase bg-[var(--color-amber)] text-[var(--color-bg)] hover:opacity-90 transition-opacity"
        >
          {post ? "Сохранить" : "Создать"}
        </button>
        <a
          href="/admin/news"
          className="h-10 px-6 text-xs tracking-widest uppercase border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-amber)] hover:border-[var(--color-amber)] transition-colors inline-flex items-center"
        >
          Отмена
        </a>
      </div>
    </form>
  );
}
