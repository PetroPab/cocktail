import type { Metadata } from "next";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/imageUtils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPinIcon as MapPin, PhoneIcon as Phone, ClockIcon as Clock, TelegramLogoIcon as TelegramLogo, WhatsappLogoIcon as WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Контакты и бронирование — Бар Коктейль Ярославль",
  description: "Адрес: ул. Кирова, 5/23, 2-й этаж, Ярославль. Телефон: +7 (4852) 33-73-56. Работаем круглосуточно. Бронирование столов.",
  alternates: { canonical: "https://kokteil-bar.ru/contacts" },
};

export default function ContactsPage() {
  const bookingHref = "https://t.me/s/cocktailbar_yar";
  const phoneHref = "tel:+74852337356";
  const waHref = "https://wa.me/74852337356";
  const mapsHref = "https://yandex.ru/maps/org/kokteyl/1357359355/";

  return (
    <>
      <Header />
      <main className="pt-[var(--header-height)]">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/kokteilbar-entrance/1920/900"
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
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Контакты</p>
            <h1
              className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[96px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              НАЙДИ НАС
              <br />
              <span className="text-gradient">В ЦЕНТРЕ</span>
              <br />ЯРОСЛАВЛЯ
            </h1>
          </div>
        </section>

        {/* Info + Map */}
        <section className="container-site pt-16 md:pt-24 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Info cards */}
            <div data-reveal className="flex flex-col gap-4">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-[var(--radius-lg)] p-7 flex gap-5 hover:border-[var(--color-amber)] transition-colors duration-200 group"
              >
                <MapPin size={24} weight="fill" className="text-[var(--color-amber)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Адрес</p>
                  <p className="text-lg text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors leading-snug">
                    ул. Кирова, 5/23, 2-й этаж<br />
                    <span className="text-sm text-[var(--color-text-muted)]">Ярославль, 150000</span>
                  </p>
                  <p className="text-xs text-[var(--color-amber)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Открыть в Яндекс Картах →
                  </p>
                </div>
              </a>

              <a
                href={phoneHref}
                className="glass rounded-[var(--radius-lg)] p-7 flex gap-5 hover:border-[var(--color-amber)] transition-colors duration-200 group"
              >
                <Phone size={24} weight="fill" className="text-[var(--color-amber)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Телефон</p>
                  <p className="text-lg text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors">
                    +7 (4852) 33-73-56
                  </p>
                </div>
              </a>

              <div className="glass rounded-[var(--radius-lg)] p-7 flex gap-5">
                <Clock size={24} weight="fill" className="text-[var(--color-amber)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Режим работы</p>
                  <p className="text-lg text-[var(--color-text)]">Круглосуточно, 24/7</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">Без выходных и праздников</p>
                </div>
              </div>

              {/* Messenger links */}
              <div className="flex gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass rounded-[var(--radius-lg)] p-5 flex items-center gap-3 hover:border-[oklch(65%_0.2_145)] transition-colors duration-200 group"
                >
                  <WhatsappLogo size={20} weight="fill" className="text-[oklch(65%_0.2_145)] shrink-0" />
                  <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">WhatsApp</span>
                </a>
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass rounded-[var(--radius-lg)] p-5 flex items-center gap-3 hover:border-[oklch(65%_0.2_220)] transition-colors duration-200 group"
                >
                  <TelegramLogo size={20} weight="fill" className="text-[oklch(65%_0.2_220)] shrink-0" />
                  <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">Telegram</span>
                </a>
              </div>
            </div>

            {/* Interior photo + map link */}
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden min-h-[400px] block"
            >
              <Image
                src="https://picsum.photos/seed/kokteilbar-interior/800/600"
                alt="Интерьер бара Коктейль"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[var(--color-bg)] opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
                <MapPin size={40} weight="fill" className="text-[var(--color-amber)]" />
                <p className="text-[var(--color-text)] text-lg leading-snug">
                  ул. Кирова, 5/23, 2-й этаж<br />
                  <span className="text-[var(--color-text-muted)] text-sm">Ярославль</span>
                </p>
                <span className="inline-flex items-center h-11 px-6 text-xs tracking-widest uppercase
                  bg-[var(--color-amber)] text-[var(--color-bg)] group-hover:bg-[var(--color-amber-hover)] transition-colors">
                  Открыть на карте →
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Booking section */}
        <section id="booking" className="bg-[var(--color-bg-surface)] py-24">
          <div className="container-site">
            <div data-reveal className="max-w-2xl">
              <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)] mb-4">Бронирование</p>
              <h2
                className="text-5xl md:text-7xl text-[var(--color-text)] mb-6 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ЗАБРОНИРУЙ
                <br />
                <span className="text-gradient">СТОЛ</span>
              </h2>
              <p className="text-[var(--color-text-muted)] mb-10 leading-relaxed max-w-lg">
                Для бронирования стола свяжитесь с нами по телефону или напишите в мессенджер.
                Мы подберём лучшее место для вашего вечера — будь то романтический ужин,
                день рождения или корпоратив.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-3 h-14 px-8 text-sm tracking-widest uppercase font-medium
                    bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)] transition-colors"
                >
                  <Phone size={18} weight="bold" />
                  Позвонить
                </a>
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 h-14 px-8 text-sm tracking-widest uppercase
                    border border-[var(--color-border-light)] text-[var(--color-text)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]
                    transition-colors"
                >
                  <TelegramLogo size={18} weight="fill" />
                  Написать в Telegram
                </a>
              </div>

              <div className="mt-10 glass rounded-[var(--radius-lg)] p-6 max-w-md">
                <p className="text-xs tracking-widest uppercase text-[var(--color-text-subtle)] mb-3">Важно знать</p>
                <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
                  <li className="flex gap-2"><span className="text-[var(--color-amber)]">—</span> Бронь принимается за 2 часа до визита</li>
                  <li className="flex gap-2"><span className="text-[var(--color-amber)]">—</span> Для больших компаний (10+) рекомендуем звонить</li>
                  <li className="flex gap-2"><span className="text-[var(--color-amber)]">—</span> Вход 18+, при входе возможна проверка документов</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
