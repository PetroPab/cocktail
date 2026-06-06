"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "cocktail-age-verified";

export function AgeGate() {
  const [status, setStatus] = useState<"hidden" | "gate" | "denied">("hidden");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setStatus("gate");
  }, []);

  const confirm = () => {
    localStorage.setItem(STORAGE_KEY, "yes");
    setStatus("hidden");
  };

  const deny = () => setStatus("denied");

  if (status === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6"
      style={{ background: "oklch(6% 0.02 285 / 0.97)", backdropFilter: "blur(8px)" }}
    >
      {status === "gate" ? (
        <div className="max-w-md w-full text-center flex flex-col items-center gap-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-amber-dim)] bg-[var(--color-amber-dim)]">
            <span className="text-xs tracking-[0.4em] uppercase text-[var(--color-amber)]">18+</span>
          </div>

          {/* Heading */}
          <div>
            <h1
              className="text-[18vw] sm:text-[120px] leading-none text-[var(--color-text)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              СТОП,
              <br />
              <span className="text-gradient">ДРУГ</span>
            </h1>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Закон обязывает нас спросить кое-что важное.
              <br />
              Ну и мы, честно говоря, тоже хотим знать.
            </p>
          </div>

          {/* Question */}
          <p
            className="text-3xl text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ТЕБЕ УЖЕ ИСПОЛНИЛОСЬ 18?
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={confirm}
              className="flex-1 h-14 text-sm tracking-widest uppercase font-medium
                bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-[var(--color-amber-hover)]
                transition-colors duration-150"
            >
              Да, я взрослый
            </button>
            <button
              onClick={deny}
              className="flex-1 h-14 text-sm tracking-widest uppercase
                border border-[var(--color-border)] text-[var(--color-text-muted)]
                hover:border-[var(--color-border-light)] hover:text-[var(--color-text)]
                transition-colors duration-150"
            >
              Нет, я малыш
            </button>
          </div>

          <p className="text-xs text-[var(--color-text-subtle)] max-w-xs leading-relaxed">
            Нажимая «Да», ты подтверждаешь, что тебе исполнилось 18 лет
            и употребление алкоголя в твоей стране законно.
          </p>
        </div>

      ) : (
        <div className="max-w-sm w-full text-center flex flex-col items-center gap-8">
          <p
            className="text-[22vw] sm:text-[140px] leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-subtle)" }}
          >
            ОК
          </p>
          <div className="flex flex-col gap-3">
            <p
              className="text-2xl text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              УВАЖАЕМ ЧЕСТНОСТЬ
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
              Мы будем ждать тебя здесь.
              <br />
              Ул. Кирова, 5/23, Ярославль.
              <br />
              Никуда не уйдём — мы работаем 24/7.
            </p>
          </div>
          <button
            onClick={confirm}
            className="text-xs text-[var(--color-text-subtle)] underline underline-offset-4 hover:text-[var(--color-text-muted)] transition-colors"
          >
            Ой, я ошибся — мне всё-таки 18
          </button>
        </div>
      )}
    </div>
  );
}
