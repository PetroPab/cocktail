"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ctxRef    = useRef<ReturnType<typeof gsap.context> | null>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // ── Page enter fade-in ─────────────────────────────────────────────────
    gsap.fromTo(wrapper,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "opacity" }
    );

    // Kill stale scroll triggers and previous GSAP context
    cancelAnimationFrame(rafRef.current);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ctxRef.current?.revert();
    ctxRef.current = null;

    // ── Defer reveal setup to next frame ───────────────────────────────────
    // requestAnimationFrame ensures scroll position is accurate and DOM is painted
    rafRef.current = requestAnimationFrame(() => {
      ctxRef.current = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const delay = Number(el.dataset.revealDelay ?? 0);
          const dir   = el.dataset.revealFrom; // "left" | "right" | undefined

          const from: gsap.TweenVars = {
            opacity: 0,
            y: dir ? 0 : 44,
            x: dir === "left" ? -44 : dir === "right" ? 44 : 0,
          };
          const to: gsap.TweenVars = {
            opacity: 1, y: 0, x: 0,
            duration: 0.75,
            ease: "power3.out",
          };

          // If element is already within the visible viewport (e.g. on refresh
          // while scrolled down), skip ScrollTrigger and animate right away.
          const rect   = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.92;

          if (inView) {
            gsap.fromTo(el, from, { ...to, delay: delay + 0.1 });
          } else {
            gsap.fromTo(el, from, {
              ...to,
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      });
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctxRef.current?.revert();
      ctxRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  // Wrapper div: used by GSAP for page-enter fade. Must be a box element
  // (not display:contents) so opacity animates correctly.
  return <div ref={wrapperRef}>{children}</div>;
}
