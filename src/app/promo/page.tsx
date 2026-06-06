import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRightIcon as ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Акции и скидки — Бар Коктейль Ярославль",
  description: "Актуальные акции, скидки и специальные предложения бара Коктейль в Ярославле. Счастливые часы, DJ-вечеринки, тематические вечера.",
  alternates: { canonical: "https://kokteil-bar.ru/promo" },
};

const PROMOS = [
  {
    tag: "Каждый день",
    title: "Счастливые часы",
    subtitle: "16:00 — 20:00",
    desc: "Скидка 20% на все коктейли и пиво с понедельника по пятницу. Лучшее время, чтобы заглянуть после работы.",
    accent: "var(--color-amber)",
    badge: "−20%",
    img: "https://picsum.photos/seed/happyhour/800/500",
  },
  {
    tag: "Пятница и Суббота",
    title: "DJ-ночи",
    subtitle: "С 22:00 до утра",
    desc: "Живые сеты, танцпол, специальные коктейли от бармена. Лучшие вечеринки центра Ярославля.",
    accent: "var(--color-magenta)",
    badge: "HOT",
    img: "https://picsum.photos/seed/djnight/800/500",
  },
  {
    tag: "День рождения",
    title: "Именинник бесплатно",
    subtitle: "В день рождения",
    desc: "Если у тебя день рождения — первый коктейль за счёт заведения. Просто покажи паспорт. Звони заранее — забронируем лучший стол.",
    accent: "oklch(65% 0.2 200)",
    badge: "GIFT",
    img: "https://picsum.photos/seed/birthday/800/500",
  },
  {
    tag: "Студентам",
    title: "Студенческая скидка",
    subtitle: "Пн–Чт, до 22:00",
    desc: "Скидка 15% по студенческому билету. Учиться — хорошо, отдыхать тоже надо.",
    accent: "oklch(68% 0.18 280)",
    badge: "−15%",
    img: "https://picsum.photos/seed/students/800/500",
  },
  {
    tag: "Группы 5+",
    title: "Корпоративы и компании",
    subtitle: "По предварительной брони",
    desc: "Для компаний от 5 человек — специальные условия. Звоните или пишите в Telegram — составим программу вечера.",
    accent: "var(--color-amber)",
    badge: "VIP",
    img: "https://picsum.photos/seed/corporate/800/500",
  },
  {
    tag: "Летом",
    title: "Терраса открыта",
    subtitle: "Май — Сентябрь",
    desc: "Летняя терраса в центре Ярославля. Лучшее место для вечера на свежем воздухе с коктейлем в руке.",
    accent: "oklch(70% 0.15 150)",
    badge: "☀",
    img: "https://picsum.photos/seed/terrace/800/500",
  },
];

export default function PromoPage() {
  return (
    <>
      <Header />
      <main className="pt-[var(--header-height)]">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/promohero/1920/900"
              alt=""
              fill
              className="object-cover opacity-15"
              priority
            />
          </div>
          <div className="container-site relative z-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Акции</p>
            <h1
              className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[96px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ВЫГОДНО
              <br />
              <span className="text-gradient">ПРОВЕСТИ</span>
              <br />ВЕЧЕР
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-lg">
              Актуальные акции, скидки и специальные предложения.
            </p>
          </div>
        </section>

        {/* Promos grid */}
        <section className="container-site pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
            {PROMOS.map((p, i) => (
              <article
                key={p.title}
                data-reveal
                data-reveal-delay={String((i % 3) * 0.1)}
                className="bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors duration-200 group flex flex-col"
              >
                {/* Photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[var(--color-bg)] opacity-40" />
                  {/* Badge */}
                  <span
                    className="absolute bottom-3 right-3 text-2xl leading-none px-3 py-1"
                    style={{ fontFamily: "var(--font-display)", color: p.accent, background: "var(--color-bg)" }}
                  >
                    {p.badge}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-1 gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)]">{p.tag}</span>
                  <div>
                    <h2
                      className="text-3xl text-[var(--color-text)] leading-none mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.title}
                    </h2>
                    <p className="text-sm font-medium" style={{ color: p.accent }}>
                      {p.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-bg-surface)] py-24">
          <div className="container-site">
            <div data-reveal className="max-w-2xl">
              <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Не пропусти</p>
              <h2
                className="text-5xl md:text-7xl text-[var(--color-text)] mb-6 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                СЛЕДИ ЗА
                <br />
                <span className="text-gradient">НОВОСТЯМИ</span>
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed max-w-md">
                Анонсы вечеринок, новые акции и специальные предложения — в нашем Telegram-канале.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/kokteilbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm tracking-widest uppercase
                    bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)] transition-colors"
                >
                  Telegram-канал <ArrowRight size={16} weight="bold" />
                </a>
                <Link
                  href="/contacts#booking"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm tracking-widest uppercase
                    border border-[var(--color-border-light)] text-[var(--color-text)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]
                    transition-colors"
                >
                  Забронировать стол
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
