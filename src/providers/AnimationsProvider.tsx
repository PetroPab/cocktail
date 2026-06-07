"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ctxRef    = useRef<ReturnType<typeof gsap.context> | null>(null);
  const rafRef    = useRef<number>(0);
  const raf2Ref   = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Page enter fade-in on every navigation
    gsap.fromTo(wrapper,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "opacity" }
    );

    // Kill stale triggers and context from previous page
    cancelAnimationFrame(rafRef.current);
    cancelAnimationFrame(raf2Ref.current);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ctxRef.current?.revert();
    ctxRef.current = null;

    // Defer to next frame so the DOM is painted
    rafRef.current = requestAnimationFrame(() => {
      ctxRef.current = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const delay = Number(el.dataset.revealDelay ?? 0);
          const dir   = el.dataset.revealFrom; // "left" | "right" | undefined

          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: dir ? 0 : 44,
              x: dir === "left" ? -44 : dir === "right" ? 44 : 0,
            },
            {
              opacity: 1, y: 0, x: 0,
              duration: 0.75,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
                // Recalculate positions on window resize
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // First refresh: fires triggers already past their start point
      // (handles normal page load at top + navigation)
      ScrollTrigger.refresh();

      // Second refresh one frame later: catches browsers that restore
      // scroll position asynchronously after the first RAF
      raf2Ref.current = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(raf2Ref.current);
      ctxRef.current?.revert();
      ctxRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return <div ref={wrapperRef}>{children}</div>;
}
