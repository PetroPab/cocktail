import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, ClockIcon, TelegramLogoIcon, InstagramLogoIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getSettings } from "@/db/queries";

const NAV = [
  { href: "/menu",     label: "Меню" },
  { href: "/promo",    label: "Акции" },
  { href: "/about",    label: "О нас" },
  { href: "/news",     label: "Новости" },
  { href: "/reviews",  label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

function VkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.045-1.72-1.033-1-1.49-.99-1.746-.99-.356 0-.458.102-.458.596v1.57c0 .426-.136.68-1.254.68-1.846 0-3.896-1.12-5.335-3.203C4.624 10.857 4 8.408 4 7.932c0-.254.102-.49.596-.49h1.744c.444 0 .61.203.78.68.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.95c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.49.763-.49h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.048.17.49-.085.745-.576.745z"/>
    </svg>
  );
}

const SOCIALS = [
  { href: "https://vk.com/bar_cocktail",        label: "ВКонтакте",  handle: "vk.com/bar_cocktail",    Icon: VkIcon },
  { href: "https://t.me/s/cocktailbar_yar",           label: "Telegram",   handle: "t.me/s/cocktailbar_yar",      Icon: TelegramLogoIcon },
  { href: "https://instagram.com/cocktail_bar_yar",  label: "Instagram",  handle: "@cocktail_bar_yar",          Icon: InstagramLogoIcon },
];

export async function Footer() {
  const s = await getSettings();
  const hours = s.hours ?? "Круглосуточно, 24/7";
  return (
    <footer className="border-t border-[var(--color-border)]">
      {/* Marquee */}
      <div className="overflow-hidden py-6 border-b border-[var(--color-border)]">
        <div className="flex">
          <div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="text-[var(--color-border-light)] text-sm tracking-[0.4em] uppercase select-none"
              >
                БАР КОКТЕЙЛЬ · ЯРОСЛАВЛЬ · С 1996 ГОДА ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo-cocktail-2lines.svg"
              alt="Бар Коктейль"
              width={130}
              height={48}
              className="h-12 w-auto mb-5"
            />
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Почти 30 лет в сердце Ярославля. Вкус, музыка и атмосфера.
            </p>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Адрес и контакты</p>
            <div className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
              <MapPinIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
              <span>ул. Кирова, 5/23, 2-й этаж<br />Ярославль, 150000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <PhoneIcon size={18} weight="bold" className="shrink-0 text-[var(--color-amber)]" />
              <a href="tel:+74852337356" className="hover:text-[var(--color-amber)] transition-colors">
                +7 (4852) 33-73-56
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <ClockIcon size={18} weight="bold" className="shrink-0 text-[var(--color-amber)]" />
              <span>{hours}</span>
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Навигация</p>
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-amber)] transition-colors w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Мы в сетях</p>
            {SOCIALS.map(({ href, label, handle, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-amber)] transition-colors duration-150"
              >
                <Icon size={18} weight="fill" className="shrink-0 text-[var(--color-text-subtle)] group-hover:text-[var(--color-amber)] transition-colors" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-none mb-0.5">{label}</span>
                  <span className="text-[10px] text-[var(--color-text-subtle)]">{handle}</span>
                </div>
                <ArrowUpRightIcon size={12} weight="bold" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
            <p className="text-[9px] text-[var(--color-text-subtle)] leading-relaxed mt-1">
              Instagram — Meta Platforms Inc., деятельность признана экстремистской и запрещена в РФ
            </p>
          </div>

        </div>

        <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-subtle)]">
            © {new Date().getFullYear()} Бар Коктейль. Все права защищены.
          </p>
          <p className="text-xs text-[var(--color-text-subtle)]">
            18+ · Алкоголь вреден для здоровья
          </p>
        </div>
      </div>
    </footer>
  );
}
