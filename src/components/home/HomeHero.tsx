"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import { BLUR_DATA_URL } from "@/lib/imageUtils";

export function HomeHero() {
  const ghostRef  = useRef<HTMLSpanElement>(null);
  const badgeRef  = useRef<HTMLDivElement>(null);
  const line1Ref  = useRef<HTMLSpanElement>(null);
  const line2Ref  = useRef<HTMLSpanElement>(null);
  const subRef    = useRef<HTMLDivElement>(null);
  const metaRef   = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Ghost backdrop text scales down and fades in
      tl.fromTo(
        ghostRef.current,
        { opacity: 0, scale: 1.12 },
        { opacity: 0.3, scale: 1, duration: 2, ease: "power2.out" },
        0
      );

      // "Открыто сейчас" badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.15
      );

      // h1 line 1: "БАР" — clips up with slight skew
      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
        0.3
      );

      // h1 line 2: "КОКТЕЙЛЬ"
      tl.fromTo(
        line2Ref.current,
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
        0.48
      );

      // Description + CTA buttons
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.75
      );

      // Meta strip (address, hours, rating)
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.92
      );

      // Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.2
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-[var(--header-height)]">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/barnight1996/1920/1080"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-[var(--color-bg)] opacity-70" />
      </div>

      {/* Ghost backdrop text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          ref={ghostRef}
          className="text-[22vw] text-[var(--color-bg-surface)] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)", opacity: 0 }}
        >
          КОКТЕЙЛЬ
        </span>
      </div>

      <div className="container-site relative z-10 pb-12 md:pb-24">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-amber-dim)] bg-[var(--color-amber-dim)] mb-8"
          style={{ opacity: 0 }}
        >
          <span className="w-2 h-2 bg-[var(--color-amber)] animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-[var(--color-amber)]">
            Открыто сейчас · Ярославль
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[120px] leading-none mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span ref={line1Ref} className="block text-[var(--color-text)]" style={{ opacity: 0 }}>
            БАР
          </span>
          <span ref={line2Ref} className="block text-gradient" style={{ opacity: 0 }}>
            КОКТЕЙЛЬ
          </span>
        </h1>

        {/* Description + buttons */}
        <div
          ref={subRef}
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          style={{ opacity: 0 }}
        >
          <p className="text-lg text-[var(--color-text-muted)] max-w-md leading-relaxed">
            Легендарный бар в центре Ярославля с 1996 года.
            Авторские коктейли, живая музыка, летняя терраса.
          </p>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 h-12 px-7 text-sm tracking-widest uppercase
                bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)]
                transition-colors duration-150 font-medium"
            >
              Меню <ArrowRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/contacts#booking"
              className="inline-flex items-center gap-2 h-12 px-7 text-sm tracking-widest uppercase
                border border-[var(--color-border-light)] text-[var(--color-text)]
                hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]
                transition-colors duration-150"
            >
              Забронировать
            </Link>
          </div>
        </div>

        {/* Meta strip */}
        <div
          ref={metaRef}
          className="mt-8 md:mt-14 flex flex-wrap gap-4 md:gap-6"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <MapPinIcon size={14} weight="fill" className="text-[var(--color-amber)]" />
            ул. Кирова, 5/23, 2-й этаж
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <ClockIcon size={14} weight="fill" className="text-[var(--color-amber)]" />
            Круглосуточно, 24/7
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <StarIcon size={14} weight="fill" className="text-[var(--color-amber)]" />
            4.9 на 2ГИС (2921 оценка)
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-amber)] to-transparent" />
      </div>
    </section>
  );
}
