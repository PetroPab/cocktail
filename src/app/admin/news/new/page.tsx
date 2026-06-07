import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export const metadata = { title: "Новая публикация — Панель управления" };

export default function NewPostPage() {
  return (
    <div>
      <h1
        className="text-4xl text-[var(--color-text)] mb-8 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        НОВАЯ ПУБЛИКАЦИЯ
      </h1>
      <PostForm action={createPost} />
    </div>
  );
}
