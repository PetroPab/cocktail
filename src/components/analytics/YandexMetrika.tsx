"use client";

import { useEffect } from "react";

// Замените на реальный номер счётчика из кабинета Яндекс Метрики
const COUNTER_ID = process.env.NEXT_PUBLIC_YM_COUNTER ?? "";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    ymConfig?: unknown;
  }
}

function initMetrika() {
  if (!COUNTER_ID || typeof window === "undefined" || window.ym) return;

  const id = Number(COUNTER_ID);

  (function (m, e, t, r, i, k, a) {
    // @ts-expect-error — Yandex Metrika inline init
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    // @ts-expect-error
    m[i].l = +new Date();
    // @ts-expect-error
    k = e.createElement(t), a = e.getElementsByTagName(t)[0];
    // @ts-expect-error
    k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  window.ym!(id, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: false,
  });
}

export function YandexMetrika() {
  useEffect(() => {
    if (!COUNTER_ID) return;

    const consent = localStorage.getItem("cocktail-cookie-consent");
    if (consent === "accepted") initMetrika();

    const handler = () => initMetrika();
    window.addEventListener("ym-consent-accepted", handler);
    return () => window.removeEventListener("ym-consent-accepted", handler);
  }, []);

  return null;
}
