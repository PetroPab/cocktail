import { notFound } from "next/navigation";
import { getPostById } from "@/db/queries";
import { updatePost } from "../actions";
import { PostForm } from "../PostForm";

export const metadata = { title: "Редактировать публикацию — Панель управления" };

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(parseInt(id, 10));
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <div>
      <h1
        className="text-4xl text-[var(--color-text)] mb-2 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        РЕДАКТИРОВАТЬ
      </h1>
      <p className="text-[var(--color-text-subtle)] text-xs mb-8">{post.title} · ID {post.id}</p>
      <PostForm post={post} action={action} />
    </div>
  );
}
