import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuClient } from "./MenuClient";

export const metadata: Metadata = {
  title: "Меню — Бар Коктейль Ярославль",
  description: "Авторские коктейли, горячее, стритфуд, пицца, вино и многое другое. Меню бара Коктейль на ул. Кирова, 5/23, Ярославль.",
  alternates: { canonical: "https://kokteil-bar.ru/menu" },
};

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[var(--header-height)]">
        <div className="py-10 container-site">
          <h1
            className="text-6xl md:text-8xl leading-none text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            МЕНЮ
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)] text-sm tracking-wide">
            Ул. Кирова, 5/23 · Ярославль · Круглосуточно
          </p>
        </div>
        <MenuClient />
      </main>
      <Footer />
    </>
  );
}
