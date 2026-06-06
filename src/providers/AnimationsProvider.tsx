"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Kill all triggers from previous page
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = Number(el.dataset.revealDelay ?? 0);
        const dir = el.dataset.revealFrom; // "left" | "right" | undefined → up

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: dir ? 0 : 52,
            x: dir === "left" ? -52 : dir === "right" ? 52 : 0,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
}
