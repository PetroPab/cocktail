import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRightIcon as ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getLatestPublishedPosts } from "@/db/queries";
import { getLatestPosts, formatDate } from "@/data/news";

export const metadata: Metadata = {
  title: "О нас — Бар Коктейль Ярославль",
  description: "История легендарного бара Коктейль в Ярославле. Открыты с 1996 года в центре города на ул. Кирова, 5/23.",
  alternates: { canonical: "https://kokteil-bar.ru/about" },
};

const TIMELINE = [
  { year: "1996", title: "Открытие", desc: "Бар Коктейль открывает двери на ул. Кирова, 5/23. Небольшое пространство, большие амбиции." },
  { year: "2000-е", title: "Рост", desc: "Бар становится точкой притяжения ярославской молодёжи. Расширяем меню, добавляем DJ-сеты." },
  { year: "2010-е", title: "Летняя терраса", desc: "Открываем летнюю террасу — одну из лучших в центре города. Хукка, живая музыка по выходным." },
  { year: "Сейчас", title: "Легенда", desc: "4.9 на 2ГИС, более 2900 отзывов. Круглосуточно, 24/7. Почти 30 лет в центре Ярославля." },
];

const VALUES = [
  { label: "Атмосфера", desc: "Не просто бар — место где хочется остаться. Живая музыка, правильный свет, уютные пространства." },
  { label: "Коктейли", desc: "Классика и авторские рецепты. Только свежие ингредиенты, профессиональные бармены." },
  { label: "Команда", desc: "Люди, которые любят своё дело. Бармены с многолетним опытом, всегда готовые предложить что-то новое." },
  { label: "Открытость", desc: "Мы работаем 24/7. Приходите в любое время — мы всегда рады гостям." },
];

export default async function AboutPage() {
  const dbPosts = await getLatestPublishedPosts(3);
  const latestPosts = dbPosts.length > 0 ? dbPosts : getLatestPosts(3);
  return (
    <>
      <Header />
      <main className="pt-[var(--header-height)]">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/yaroslavlbar/1920/900"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container-site relative z-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">О нас</p>
            <h1
              className="text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[96px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ПОЧТИ <span className="text-gradient">30 ЛЕТ</span>
              <br />В ЦЕНТРЕ
              <br />ЯРОСЛАВЛЯ
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="container-site pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div data-reveal>
              <p className="text-2xl md:text-3xl text-[var(--color-text)] leading-snug mb-8">
                Бар Коктейль — это не просто место, где подают напитки.
                Это{" "}
                <span className="text-gradient" style={{ fontFamily: "var(--font-display)", fontSize: "inherit" }}>
                  пространство историй
                </span>
                , встреч и незабываемых вечеров.
              </p>
              <div className="flex flex-col gap-4 text-[var(--color-text-muted)]">
                <p className="leading-relaxed">
                  С 1996 года мы находимся в самом центре Ярославля на улице Кирова. За почти три десятилетия через наши двери прошли тысячи гостей — и каждый нашёл здесь своё.
                </p>
                <p className="leading-relaxed">
                  Мы верим, что хороший бар — это хорошие люди, хорошая музыка и хороший напиток. Именно этому принципу мы следуем каждый день, круглосуточно.
                </p>
              </div>
            </div>
            <div data-reveal data-reveal-delay="0.15" data-reveal-from="right" className="relative h-80 md:h-[480px] overflow-hidden">
              <Image
                src="https://picsum.photos/seed/barinteriorvibe/800/900"
                alt="Интерьер бара"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[var(--color-bg-surface)] py-24">
          <div className="container-site">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-12">История</p>
            <div className="flex flex-col gap-0">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  data-reveal
                  data-reveal-delay={String(i * 0.1)}
                  className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-8 border-t border-[var(--color-border)] py-10 group"
                >
                  <div
                    className="text-4xl md:text-5xl text-[var(--color-text-subtle)] group-hover:text-[var(--color-amber)] transition-colors leading-none pt-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.year}
                  </div>
                  <div>
                    <h3
                      className="text-2xl md:text-3xl text-[var(--color-text)] mb-3 leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[var(--color-border)]" />
            </div>
          </div>
        </section>

        {/* Full-width photo */}
        <section className="relative h-[50vh] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/bartender2024/1920/700"
            alt="Бармен за работой"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-bg)] opacity-50" />
        </section>

        {/* Values */}
        <section className="container-site py-28">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-12">Наши ценности</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {VALUES.map((v, i) => (
              <div key={v.label} data-reveal data-reveal-delay={String(i * 0.1)} className="bg-[var(--color-bg)] p-8 md:p-12 group hover:bg-[var(--color-bg-surface)] transition-colors duration-200">
                <h3
                  className="text-3xl md:text-4xl text-[var(--color-text)] mb-4 group-hover:text-[var(--color-amber)] transition-all leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.label}
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* News */}
        <section className="container-site py-24">
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-3">Медиа</p>
              <h2
                className="text-4xl md:text-6xl text-[var(--color-text)] leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                НОВОСТИ
              </h2>
            </div>
            <Link
              href="/news"
              className="shrink-0 hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--color-amber)] hover:gap-4 transition-all duration-200 link-line"
            >
              Все материалы <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
            {latestPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                data-reveal
                data-reveal-delay={String(i * 0.1)}
                className="group bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors duration-200 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden shrink-0">
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
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <p className="text-xs text-[var(--color-text-subtle)]">{formatDate(post.date)}</p>
                  <h3
                    className="text-lg text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors leading-snug flex-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-amber)] mt-2">
                    Читать <ArrowRight size={12} weight="bold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--color-amber)] link-line">
              Все материалы <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="container-site pb-32">
          <div
            data-reveal
            className="relative overflow-hidden p-12 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <div>
              <h2 className="text-4xl md:text-6xl text-[var(--color-text)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                УВИДЬ САМ
              </h2>
              <p className="text-[var(--color-text-muted)]">Приходи и почувствуй атмосферу лично. Мы открыты 24/7.</p>
            </div>
            <Link
              href="/contacts"
              className="shrink-0 inline-flex items-center gap-2 h-12 px-8 text-sm tracking-widest uppercase
                bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)] transition-colors"
            >
              Как добраться <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
