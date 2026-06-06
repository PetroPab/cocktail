"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ListIcon, XIcon,
  ForkKnifeIcon, TagIcon, InfoIcon, StarIcon, MapPinIcon, ArrowRightIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/menu",     label: "Меню",     Icon: ForkKnifeIcon },
  { href: "/promo",    label: "Акции",    Icon: TagIcon },
  { href: "/about",    label: "О нас",    Icon: InfoIcon },
  { href: "/reviews",  label: "Отзывы",   Icon: StarIcon },
  { href: "/contacts", label: "Контакты", Icon: MapPinIcon },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300",
        "bg-[var(--color-bg)] border-b border-[var(--color-border)]",
        !scrolled && !open && "md:bg-transparent md:border-b-transparent",
      )}
    >
      <div className="container-site">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-6">

          {/* Logo — scrolls to top on "/", navigates home from other pages */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex flex-col leading-none group shrink-0"
          >
            <span
              className="text-2xl tracking-widest text-[var(--color-text)] transition-colors group-hover:text-[var(--color-amber)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              КОКТЕЙЛЬ
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase">
              BAR · YAROSLAVL · 1996
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-xs tracking-[0.14em] uppercase font-extrabold transition-all duration-150",
                  pathname === href
                    ? "text-[var(--color-amber)] bg-[var(--color-amber-dim)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)]",
                )}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Icon size={14} weight="bold" />
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contacts#booking"
              className="hidden md:inline-flex items-center gap-2 h-10 px-5 text-xs tracking-widest uppercase font-semibold
                bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)]
                transition-colors duration-150"
            >
              Забронировать
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-colors duration-150"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
            >
              {open ? <XIcon size={20} weight="bold" /> : <ListIcon size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          "bg-[var(--color-bg)]",
          open ? "max-h-[520px] border-b border-[var(--color-border)]" : "max-h-0",
        )}
        aria-hidden={!open}
      >
        <nav className="container-site flex flex-col py-4 gap-1">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-4 px-4 py-4 transition-colors duration-150 border border-transparent",
                pathname === href
                  ? "text-[var(--color-amber)] bg-[var(--color-amber-dim)] border-[var(--color-amber-dim)]"
                  : "text-[var(--color-text)] hover:text-[var(--color-amber)] hover:bg-[var(--color-bg-surface)]",
              )}
            >
              <Icon
                size={22}
                weight="bold"
                className={pathname === href ? "text-[var(--color-amber)]" : "text-[var(--color-text-subtle)]"}
              />
              <span
                className="text-2xl uppercase leading-none"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {label}
              </span>
              <ArrowRightIcon size={16} weight="bold" className="ml-auto opacity-40" />
            </Link>
          ))}
          <Link
            href="/contacts#booking"
            className="mt-3 flex items-center justify-center gap-2 h-14 text-sm tracking-widest uppercase font-semibold
              bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)] transition-colors"
          >
            Забронировать стол
          </Link>
        </nav>
      </div>
    </header>
  );
}
