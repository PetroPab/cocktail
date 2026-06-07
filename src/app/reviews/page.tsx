import type { Metadata } from "next";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/imageUtils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StarIcon as Star, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Отзывы — Бар Коктейль Ярославль",
  description: "Оставьте отзыв о баре Коктейль на Яндекс Картах или 2ГИС. Рейтинг 4.9 на основе 2921 оценки.",
  alternates: { canonical: "https://kokteil-bar.ru/reviews" },
};

const REVIEW_PLATFORMS = [
  {
    name: "Яндекс Карты",
    rating: "4.9",
    count: "2921 оценка",
    color: "oklch(65% 0.2 30)",
    writeUrl: "https://yandex.ru/maps/org/kokteyl/1357359355/reviews/?add-review=true",
    readUrl:  "https://yandex.ru/maps/org/kokteyl/1357359355/reviews/",
    logo: "Я",
  },
  {
    name: "2ГИС",
    rating: "4.9",
    count: "2921 оценка",
    color: "oklch(55% 0.18 145)",
    writeUrl: "https://2gis.ru/yaroslavl/firm/3941177954980665/tab/reviews",
    readUrl:  "https://2gis.ru/yaroslavl/firm/3941177954980665/tab/reviews",
    logo: "2",
  },
];

const REVIEWS = [
  {
    author: "Анастасия К.",
    date: "Март 2025",
    rating: 5,
    text: "Отличное место! Атмосфера потрясающая, коктейли на высоте. Бармены профессиональные, знают своё дело. Летняя терраса — просто сказка. Будем возвращаться!",
    tag: "Постоянный гость",
  },
  {
    author: "Дмитрий В.",
    date: "Февраль 2025",
    rating: 5,
    text: "Легенда Ярославля. Хожу сюда уже лет 10, и каждый раз всё так же хорошо. Коктейли всегда свежие, музыка подобрана со вкусом. Отличный персонал.",
    tag: "10 лет с нами",
  },
  {
    author: "Мария Л.",
    date: "Январь 2025",
    rating: 5,
    text: "Праздновали день рождения подруги. Бронирование прошло быстро, стол подготовили заранее. Коктейли — выше всяких похвал. Long Island тут лучший в городе!",
    tag: "День рождения",
  },
  {
    author: "Алексей Т.",
    date: "Декабрь 2024",
    rating: 5,
    text: "Работаю в центре города, захожу после работы. Спокойная атмосфера, хороший выбор пива и коктейлей. Цены адекватные для центра. Рекомендую.",
    tag: "Постоянный гость",
  },
  {
    author: "Екатерина М.",
    date: "Ноябрь 2024",
    rating: 5,
    text: "Были с друзьями в пятницу вечером. DJ отличный, танцпол живой. Бармены быстро работают даже в час пик. Mojito — просто восторг.",
    tag: "Вечеринка",
  },
  {
    author: "Игорь С.",
    date: "Октябрь 2024",
    rating: 5,
    text: "Летняя терраса — главное достоинство. Сидишь, смотришь на центр Ярославля, пьёшь хороший коктейль. Что ещё нужно для счастья?",
    tag: "Терраса",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < count ? "fill" : "regular"}
          className={i < count ? "text-[var(--color-amber)]" : "text-[var(--color-border-light)]"}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="pt-[var(--header-height)]">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/kokteilbar-crowd/1920/900"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div className="container-site relative z-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Отзывы</p>
            <h1
              className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[96px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ПОНРАВИЛОСЬ?
              <br />
              <span className="text-gradient">РАССКАЖИ</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-lg">
              Твой отзыв помогает нам становиться лучше и помогает другим найти нас.
            </p>
          </div>
        </section>

        {/* ── Leave a review — primary CTA ─────────────────────────────── */}
        <section className="container-site pt-16 md:pt-24 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REVIEW_PLATFORMS.map((p, i) => (
              <a
                key={p.name}
                data-reveal
                data-reveal-delay={String(i * 0.12)}
                href={p.writeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass p-8 md:p-10 flex flex-col gap-6 hover:border-[var(--color-border-light)] transition-colors duration-200"
              >
                {/* Logo + name */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center text-xl font-bold text-white shrink-0"
                    style={{ background: p.color, fontFamily: "var(--font-display)" }}
                  >
                    {p.logo}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)] mb-0.5">
                      Оставить отзыв
                    </p>
                    <p
                      className="text-2xl text-[var(--color-text)] leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.name}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-end gap-3">
                  <span
                    className="text-6xl leading-none text-gradient"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.rating}
                  </span>
                  <div className="pb-1">
                    <Stars count={5} />
                    <p className="text-xs text-[var(--color-text-subtle)] mt-1">{p.count}</p>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm tracking-widest uppercase font-medium transition-colors duration-150 text-[var(--color-bg)]"
                  style={{ background: p.color }}
                >
                  Написать отзыв <ArrowRight size={16} weight="bold" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Rating summary ────────────────────────────────────────────── */}
        <section className="container-site pb-20">
          <div data-reveal className="flex flex-col sm:flex-row items-start sm:items-center gap-8 glass p-8 md:p-12">
            <div className="text-center shrink-0">
              <div
                className="text-8xl text-gradient leading-none mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                4.9
              </div>
              <Stars count={5} />
              <p className="text-xs text-[var(--color-text-subtle)] mt-2">из 5.0</p>
            </div>
            <div className="w-px h-24 bg-[var(--color-border)] hidden sm:block" />
            <div className="flex flex-col gap-3 flex-1">
              {[5, 4, 3].map((stars) => {
                const pct = stars === 5 ? 88 : stars === 4 ? 9 : 3;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--color-text-muted)] w-4 shrink-0">{stars}</span>
                    <Star size={12} weight="fill" className="text-[var(--color-amber)] shrink-0" />
                    <div className="flex-1 h-1.5 bg-[var(--color-border)] overflow-hidden">
                      <div className="h-full bg-[var(--color-amber)]" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-[var(--color-text-subtle)] w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
            <div className="w-px h-24 bg-[var(--color-border)] hidden sm:block" />
            <div className="flex flex-col gap-3 shrink-0">
              {REVIEW_PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-5 text-xs tracking-widest uppercase
                    border border-[var(--color-border-light)] text-[var(--color-text-muted)]
                    hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-colors duration-200"
                >
                  Все отзывы на {p.name} <ArrowRight size={12} weight="bold" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Photo strip */}
        <section className="relative h-[40vh] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/kokteilbar-vibes/1920/700"
            alt="Атмосфера бара Коктейль"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-bg)] opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-center text-[8vw] sm:text-[5vw] md:text-[4vw] text-[var(--color-text)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ГОВОРЯТ <span className="text-gradient">НАШИ ГОСТИ</span>
            </p>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="container-site py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <article
                key={r.author}
                data-reveal
                data-reveal-delay={String((i % 3) * 0.1)}
                className="glass p-7 flex flex-col gap-4 hover:border-[var(--color-border-light)] transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">{r.author}</p>
                    <p className="text-xs text-[var(--color-text-subtle)]">{r.date}</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-[var(--color-amber-dim)]">
                    <span className="text-[10px] tracking-widest uppercase text-[var(--color-amber)]">{r.tag}</span>
                  </div>
                </div>
                <Stars count={r.rating} />
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">{r.text}</p>
              </article>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
