"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "cocktail-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("ym-consent-accepted"));
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-toast)] w-[calc(100%-3rem)] max-w-xl"
      role="dialog"
      aria-label="Согласие на использование cookies"
    >
      <div className="glass rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
          Мы используем файлы cookie для аналитики и рекламы (Яндекс.Метрика, VK Pixel).
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 h-10 text-xs tracking-widest uppercase
              bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)]
              transition-colors duration-150"
          >
            Принять
          </button>
          <button
            onClick={decline}
            className="flex-1 h-10 text-xs tracking-widest uppercase
              border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-light)] hover:text-[var(--color-text)]
              transition-colors duration-150"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}
