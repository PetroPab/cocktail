import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { POSTS, formatDate } from "@/data/news";

export const metadata: Metadata = {
  title: "Новости и статьи — Бар Коктейль Ярославль",
  description: "Новости бара Коктейль, гиды по коктейлям, события и акции. Бар в центре Ярославля с 1996 года, ул. Кирова 5/23.",
  alternates: { canonical: "https://kokteil-bar.ru/news" },
};

const articles = POSTS.filter((p) => p.category === "article").sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const news = POSTS.filter((p) => p.category === "news").sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="pt-[var(--header-height)]">

        {/* Hero */}
        <section className="container-site py-16 md:py-24">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Медиа</p>
          <h1
            className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[96px] leading-none text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            НОВОСТИ
            <br />
            <span className="text-gradient">И СТАТЬИ</span>
          </h1>
        </section>

        {/* Articles — featured */}
        <section className="container-site pb-24">
          <div className="flex items-baseline justify-between mb-10 gap-4 border-b border-[var(--color-border)] pb-4">
            <h2
              className="text-3xl md:text-4xl text-[var(--color-text)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              СТАТЬИ
            </h2>
            <span className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)]">
              {articles.length} материала
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
            {articles.map((post, i) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors duration-200 flex flex-col"
                data-reveal
                data-reveal-delay={String(i * 0.1)}
              >
                <div className="relative h-52 overflow-hidden shrink-0">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[var(--color-bg)] opacity-30" />
                  <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase text-[var(--color-amber)] bg-[var(--color-bg)] px-2 py-1">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <p className="text-xs text-[var(--color-text-subtle)]">{formatDate(post.date)}</p>
                  <h3
                    className="text-xl text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-amber)] mt-2">
                    Читать <ArrowRightIcon size={12} weight="bold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* News */}
        <section className="bg-[var(--color-bg-surface)] py-24">
          <div className="container-site">
            <div className="flex items-baseline justify-between mb-10 gap-4 border-b border-[var(--color-border)] pb-4">
              <h2
                className="text-3xl md:text-4xl text-[var(--color-text)] leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                НОВОСТИ
              </h2>
              <span className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)]">
                {news.length} новости
              </span>
            </div>

            <div className="flex flex-col gap-0">
              {news.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  data-reveal
                  data-reveal-delay={String(i * 0.08)}
                  className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] gap-6 border-t border-[var(--color-border)] py-8 hover:bg-[var(--color-bg-elevated)] px-4 -mx-4 transition-colors duration-150"
                >
                  <div className="relative h-36 sm:h-full overflow-hidden min-h-[120px]">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[var(--color-bg)] opacity-20" />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-widest uppercase text-[var(--color-amber)]">{post.tag}</span>
                      <span className="text-xs text-[var(--color-text-subtle)]">{formatDate(post.date)}</span>
                    </div>
                    <h3
                      className="text-xl md:text-2xl text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-amber)] mt-1">
                      Читать <ArrowRightIcon size={12} weight="bold" />
                    </div>
                  </div>
                </Link>
              ))}
              <div className="border-t border-[var(--color-border)]" />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
