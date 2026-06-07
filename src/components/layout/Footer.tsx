import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, ClockIcon, InstagramLogoIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getSettings } from "@/db/queries";

const NAV = [
  { href: "/menu",     label: "Меню" },
  { href: "/promo",    label: "Акции" },
  { href: "/about",    label: "О нас" },
  { href: "/news",     label: "Новости" },
  { href: "/reviews",  label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Social = {
  href: string;
  label: string;
  handle: string;
} & ({ iconSrc: string } | { Icon: PhosphorIcon });

const SOCIALS: Social[] = [
  { href: "https://vk.com/bar_cocktail",               label: "ВКонтакте", handle: "vk.com/bar_cocktail",      iconSrc: "/icons/vk-icon.svg" },
  { href: "https://t.me/s/cocktailbar_yar",            label: "Telegram",  handle: "t.me/cocktailbar_yar",     iconSrc: "/icons/tg-icon.svg" },
  { href: "https://instagram.com/cocktail_bar_yar",    label: "Instagram", handle: "@cocktail_bar_yar",        Icon: InstagramLogoIcon },
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
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-amber)] transition-colors duration-150"
              >
                {"iconSrc" in s ? (
                  <Image
                    src={s.iconSrc}
                    alt={s.label}
                    width={18}
                    height={18}
                    className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <s.Icon size={18} weight="fill" className="shrink-0 text-[var(--color-text-subtle)] group-hover:text-[var(--color-amber)] transition-colors" />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-none mb-0.5">{s.label}</span>
                  <span className="text-[10px] text-[var(--color-text-subtle)]">{s.handle}</span>
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
