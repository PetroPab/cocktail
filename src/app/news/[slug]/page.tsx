import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { POSTS, getPost, formatDate } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Бар Коктейль Ярославль`,
    description: post.excerpt,
    alternates: { canonical: `https://kokteil-bar.ru/news/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.img }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

// Minimal markdown renderer: ## headings, **bold**, paragraphs
function renderContent(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl md:text-3xl text-[var(--color-text)] mt-10 mb-4 leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="text-base text-[var(--color-text)] font-semibold mt-6 mb-1 leading-relaxed">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="flex flex-col gap-2 my-4 ml-4">
          {items.map((item, j) => (
            <li key={j} className="flex gap-3 text-[var(--color-text-muted)] text-sm leading-relaxed">
              <span className="text-[var(--color-amber)] shrink-0 mt-0.5">—</span>
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("---")) {
      elements.push(
        <div key={i} className="my-8 border-t border-[var(--color-border)]" />
      );
    } else {
      // inline **bold** in paragraph
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={j} className="text-[var(--color-text)] font-semibold">{part.slice(2, -2)}</strong>
          : part
      );
      elements.push(
        <p key={i} className="text-[var(--color-text-muted)] leading-relaxed my-4">
          {parts}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <Header />
      <main className="pt-[var(--header-height)]">

        {/* Back */}
        <div className="container-site pt-8 pb-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--color-text-subtle)] hover:text-[var(--color-amber)] transition-colors"
          >
            <ArrowLeftIcon size={12} weight="bold" />
            Все {post.category === "article" ? "статьи" : "новости"}
          </Link>
        </div>

        {/* Hero */}
        <section className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[var(--color-bg)] opacity-60" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-site pb-10 md:pb-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-widest uppercase text-[var(--color-amber)] bg-[var(--color-bg)] px-2 py-1">
                  {post.tag}
                </span>
                <span className="text-xs text-[var(--color-text-subtle)]">{formatDate(post.date)}</span>
              </div>
              <h1
                className="text-[8vw] sm:text-[6vw] md:text-5xl lg:text-6xl text-[var(--color-text)] leading-none max-w-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="container-site py-16 max-w-3xl">
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-10 border-l-2 border-[var(--color-amber)] pl-5">
            {post.excerpt}
          </p>
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>
        </article>

        {/* CTA */}
        <section className="container-site pb-16 max-w-3xl">
          <div
            className="p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-2">Бар Коктейль</p>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                ул. Кирова, 5/23 · Ярославль · Круглосуточно
              </p>
            </div>
            <Link
              href="/contacts#booking"
              className="shrink-0 inline-flex items-center gap-2 h-11 px-7 text-xs tracking-widest uppercase
                bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)] transition-colors"
            >
              Забронировать стол <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-[var(--color-bg-surface)] py-20">
            <div className="container-site">
              <h2
                className="text-2xl md:text-3xl text-[var(--color-text)] mb-10 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ЕЩЁ МАТЕРИАЛЫ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)]">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/news/${p.slug}`}
                    className="group bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors flex gap-5 p-6"
                  >
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden">
                      <Image src={p.img} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1.5 justify-center">
                      <p className="text-[10px] tracking-widest uppercase text-[var(--color-amber)]">{p.tag}</p>
                      <p
                        className="text-base text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-subtle)]">{formatDate(p.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
