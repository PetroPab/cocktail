"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

// Parses "1996"→{n:1996,suf:"",dec:0}  "50+"→{n:50,suf:"+",dec:0}  "4.9"→{n:4.9,suf:"",dec:1}
// Returns null for non-numeric values like "24/7"
function parse(value: string): { n: number; suf: string; dec: number } | null {
  if (value.includes("/")) return null;
  const suf = value.replace(/[\d.]/g, "");
  const n = parseFloat(value.replace(/[^\d.]/g, ""));
  if (isNaN(n)) return null;
  return { n, suf, dec: value.includes(".") ? 1 : 0 };
}

export function AnimatedCounter({ value, className, style, duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = parse(value);
    if (!parsed) return;

    const { n, suf, dec } = parsed;
    let ctx: ReturnType<typeof gsap.context> | null = null;

    // IntersectionObserver instead of ScrollTrigger — fires correctly regardless
    // of scroll position on mount (handles page refresh anywhere on the page).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const obj = { v: 0 };
        ctx = gsap.context(() => {
          gsap.to(obj, {
            v: n,
            duration,
            ease: "power2.out",
            onUpdate() {
              el.textContent = obj.v.toFixed(dec) + suf;
            },
          });
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      ctx?.revert();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
