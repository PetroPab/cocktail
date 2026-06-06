import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeHero } from "@/components/home/HomeHero";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  ArrowRightIcon as ArrowRight,
  TelegramLogoIcon, InstagramLogoIcon,
  CalendarIcon, WineIcon,
  StarIcon as Star, ClockIcon as Clock,
} from "@phosphor-icons/react/dist/ssr";

const COCKTAILS_PREVIEW = [
  { name: "Эль Чоко",   desc: "Настой смородины, шоколадный ликёр, мартини фиеро и биттер",          price: "540 ₽", tag: "Стронг",     img: "https://picsum.photos/seed/elchoko/400/300" },
  { name: "Гуччи",      desc: "Манго, ром, текила, водка и джин — бархатный тропический саур",        price: "540 ₽", tag: "Саур",       img: "https://picsum.photos/seed/guccisour/400/300" },
  { name: "Хани Мани",  desc: "Медовый виски с ликёром бузины — изысканный и мягкий",                 price: "540 ₽", tag: "Саур",       img: "https://picsum.photos/seed/honeymoney/400/300" },
  { name: "Авеллино",   desc: "Дынная настойка, ликёр юдзу и мус из зелёного чая",                   price: "540 ₽", tag: "Саур",       img: "https://picsum.photos/seed/avellino/400/300" },
  { name: "Вэри Бэрри", desc: "Настой лесных ягод, джин и ягодная содовая",                          price: "540 ₽", tag: "Хайбол",    img: "https://picsum.photos/seed/veryberry/400/300" },
  { name: "Ловеррис",   desc: "Ежевика, лаванда и игристое вино — лёгкий и романтичный",              price: "540 ₽", tag: "Баблс",     img: "https://picsum.photos/seed/loveris/400/300" },
  { name: "Деликат",    desc: "Кокос, миндаль и томатная вода — необычный милк панч",                 price: "540 ₽", tag: "Милк панч", img: "https://picsum.photos/seed/delikat/400/300" },
  { name: "Лав из…",    desc: "Банан, клубника и ваниль — вкус той самой жвачки из детства",          price: "540 ₽", tag: "Шорт",      img: "https://picsum.photos/seed/lovefrom/400/300" },
];

const FACTS = [
  { value: "1996", label: "Год открытия",        Icon: CalendarIcon },
  { value: "50+",  label: "Авторских коктейлей", Icon: WineIcon },
  { value: "4.9",  label: "Рейтинг на 2ГИС",    Icon: Star },
  { value: "24/7", label: "Всегда открыты",      Icon: Clock },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero (client component — GSAP stagger animation) ──────────── */}
        <HomeHero />

        {/* ── Marquee strip ─────────────────────────────────────────────── */}
        <section className="overflow-hidden border-y border-[var(--color-border)] py-5" aria-hidden="true">
          <div className="flex">
            <div className="marquee-track">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8 text-xs tracking-[0.35em] uppercase text-[var(--color-text-muted)] select-none">
                  <span className="text-[var(--color-amber)]">✦</span>
                  Авторские коктейли
                  <span className="text-[var(--color-amber)]">✦</span>
                  Живая музыка
                  <span className="text-[var(--color-amber)]">✦</span>
                  Летняя терраса
                  <span className="text-[var(--color-amber)]">✦</span>
                  DJ по выходным
                  <span className="text-[var(--color-amber)]">✦</span>
                  Хукка
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Facts grid ────────────────────────────────────────────────── */}
        <section className="container-site py-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)]">
            {FACTS.map(({ value, label, Icon }, i) => (
              <div
                key={label}
                data-reveal
                data-reveal-delay={String(i * 0.12)}
                className="bg-[var(--color-bg)] flex flex-col items-center justify-center py-10 md:py-14 px-4 text-center gap-3"
              >
                <Icon size={28} weight="fill" className="text-[var(--color-amber)]" />
                <AnimatedCounter
                  value={value}
                  className="text-gradient text-5xl md:text-7xl leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                />
                <span className="text-[10px] tracking-widest uppercase text-[var(--color-text-muted)]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured cocktails ────────────────────────────────────────── */}
        <section className="container-site py-16">
          <div data-reveal className="flex items-end justify-between mb-14 gap-4">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-[var(--color-text)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              НАШ БАР —
              <br />
              <span className="text-gradient">ЭТО КОКТЕЙЛИ</span>
            </h2>
            <Link
              href="/menu"
              className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--color-amber)] hover:gap-4 transition-all duration-200 link-line shrink-0"
            >
              Всё меню <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          <div data-reveal data-reveal-delay="0.15" className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)]">
            {COCKTAILS_PREVIEW.map((c) => (
              <div
                key={c.name}
                className="group bg-[var(--color-bg-surface)] flex flex-col hover:bg-[var(--color-bg-elevated)] transition-colors duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[var(--color-bg)] opacity-20" />
                  <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase text-[var(--color-amber)] bg-[var(--color-bg)] px-2 py-1">
                    {c.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-2xl text-[var(--color-text)] mb-2 group-hover:text-[var(--color-amber)] transition-colors leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {c.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed flex-1">{c.desc}</p>
                  <p className="text-2xl text-[var(--color-amber)]" style={{ fontFamily: "var(--font-display)" }}>
                    {c.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/menu" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--color-amber)] link-line">
              Всё меню <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </section>

        {/* ── Bar interior photo strip ──────────────────────────────────── */}
        <section className="relative h-[60vh] overflow-hidden my-16">
          <Image
            src="https://picsum.photos/seed/barinterior2024/1920/800"
            alt="Интерьер бара Коктейль"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-bg)] opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p data-reveal className="text-center">
              <span
                className="text-[8vw] sm:text-[7vw] md:text-[5.5vw] text-[var(--color-text)] leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ХОРОШИЕ ЛЮДИ,<br />
                <span className="text-gradient">ХОРОШАЯ МУЗЫКА,</span><br />
                ХОРОШИЙ НАПИТОК
              </span>
            </p>
          </div>
        </section>

        {/* ── Social media ──────────────────────────────────────────────── */}
        <section className="container-site pb-24">
          <div data-reveal className="flex items-end justify-between mb-10 gap-4">
            <h2
              className="text-5xl md:text-7xl text-[var(--color-text)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              МЫ В СЕТЯХ
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs text-right hidden md:block">
              Анонсы вечеринок, новые коктейли и жизнь бара — подписывайся
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">

            {/* VK */}
            <a
              data-reveal
              data-reveal-delay="0"
              href="https://vk.com/kokteilbar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors duration-300 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[var(--color-text-muted)] group-hover:text-[var(--color-amber)] transition-colors duration-300" aria-hidden="true">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.045-1.72-1.033-1-1.49-.99-1.746-.99-.356 0-.458.102-.458.596v1.57c0 .426-.136.68-1.254.68-1.846 0-3.896-1.12-5.335-3.203C4.624 10.857 4 8.408 4 7.932c0-.254.102-.49.596-.49h1.744c.444 0 .61.203.78.68.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.95c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.49.763-.49h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.048.17.49-.085.745-.576.745z"/>
                </svg>
                <ArrowRight size={16} weight="bold" className="text-[var(--color-text-subtle)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <p className="text-xl text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors duration-300 font-semibold mb-1">
                  ВКонтакте
                </p>
                <p className="text-xs text-[var(--color-text-subtle)] tracking-wide">vk.com/kokteilbar</p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Афиша вечеринок, акции и новости бара
              </p>
            </a>

            {/* Telegram */}
            <a
              data-reveal
              data-reveal-delay="0.12"
              href="https://t.me/kokteilbar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors duration-300 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <TelegramLogoIcon size={40} weight="fill" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-amber)] transition-colors duration-300" />
                <ArrowRight size={16} weight="bold" className="text-[var(--color-text-subtle)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <p className="text-xl text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors duration-300 font-semibold mb-1">
                  Telegram
                </p>
                <p className="text-xs text-[var(--color-text-subtle)] tracking-wide">t.me/kokteilbar</p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Эксклюзивные акции и анонсы первыми
              </p>
            </a>

            {/* Instagram */}
            <a
              data-reveal
              data-reveal-delay="0.24"
              href="https://instagram.com/kokteilbar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] transition-colors duration-300 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <InstagramLogoIcon size={40} weight="fill" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-amber)] transition-colors duration-300" />
                <ArrowRight size={16} weight="bold" className="text-[var(--color-text-subtle)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <p className="text-xl text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors duration-300 font-semibold mb-1">
                  Instagram
                </p>
                <p className="text-xs text-[var(--color-text-subtle)] tracking-wide">@kokteilbar</p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Фото коктейлей, интерьера и атмосферы
              </p>
              <p className="text-[10px] text-[var(--color-text-subtle)] leading-relaxed border-t border-[var(--color-border)] pt-4 mt-auto">
                Instagram принадлежит Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ
              </p>
            </a>

          </div>
        </section>

        {/* ── Booking CTA ───────────────────────────────────────────────── */}
        <section className="container-site pb-32">
          <div
            data-reveal
            className="relative overflow-hidden p-12 md:p-20 text-center"
            style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="relative z-10">
              <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Специальный вечер?</p>
              <h2 className="text-5xl md:text-7xl text-[var(--color-text)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                ЗАБРОНИРУЙ СТОЛ
              </h2>
              <p className="text-[var(--color-text-muted)] mb-10 max-w-md mx-auto">
                День рождения, корпоратив или особенный вечер — мы создадим идеальную атмосферу.
              </p>
              <Link
                href="/contacts#booking"
                className="inline-flex items-center gap-2 h-14 px-10 text-sm tracking-widest uppercase font-medium
                  bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)] transition-colors duration-150"
              >
                Забронировать стол <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
