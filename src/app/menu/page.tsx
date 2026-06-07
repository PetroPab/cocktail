import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuClient } from "./MenuClient";
import type { Category } from "./MenuClient";
import { getMenuItems } from "@/db/queries";
import type { MenuItemRow } from "@/db/schema";

export const metadata: Metadata = {
  title: "Меню — Бар Коктейль Ярославль",
  description: "Авторские коктейли, горячее, стритфуд, пицца, вино и многое другое. Меню бара Коктейль на ул. Кирова, 5/23, Ярославль.",
  alternates: { canonical: "https://kokteil-bar.ru/menu" },
};

const BAR_META: Array<Omit<Category, "items">> = [
  { id: "authored",  label: "Авторские",      coloredBadges: true },
  { id: "cocktails", label: "Коктейли" },
  { id: "shots",     label: "Шоты" },
  { id: "tinctures", label: "Настойки" },
  { id: "beer",      label: "Пиво",           groupByBadge: true },
  { id: "whisky",    label: "Виски",          groupByBadge: true },
  { id: "spirits",   label: "Крепкие",        groupByBadge: true },
  { id: "wine",      label: "Вино",           groupByBadge: true },
  { id: "nonalc",    label: "Безалкогольное", groupByBadge: true },
  { id: "hotdrinks", label: "Горячие",        groupByBadge: true },
];

const KITCHEN_META: Array<Omit<Category, "items">> = [
  { id: "sharing",    label: "На компанию" },
  { id: "hot",        label: "Горячее" },
  { id: "streetfood", label: "Стритфуд" },
  { id: "salads",     label: "Салаты" },
  { id: "cold",       label: "Холодные закуски" },
  { id: "soups",      label: "Супы" },
  { id: "pasta",      label: "Паста" },
  { id: "pizza",      label: "Пицца" },
  { id: "sides",      label: "Гарниры" },
  { id: "desserts",   label: "Десерты" },
];

function toMenuItem(r: MenuItemRow) {
  return {
    name: r.name,
    price: r.price,
    weight: r.weight ?? undefined,
    desc: r.description ?? undefined,
    badge: r.badge ?? undefined,
    img: r.img ?? undefined,
  };
}

function buildCategories(
  meta: Array<Omit<Category, "items">>,
  rows: MenuItemRow[],
  section: string,
): Category[] {
  return meta
    .map((m) => ({
      ...m,
      items: rows.filter((r) => r.section === section && r.category === m.id).map(toMenuItem),
    }))
    .filter((c) => c.items.length > 0);
}

export default async function MenuPage() {
  const dbItems = await getMenuItems();

  let barOverride: Category[] | undefined;
  let kitchenOverride: Category[] | undefined;

  if (dbItems.length > 0) {
    barOverride = buildCategories(BAR_META, dbItems, "bar");
    kitchenOverride = buildCategories(KITCHEN_META, dbItems, "kitchen");
  }

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
        <MenuClient barOverride={barOverride} kitchenOverride={kitchenOverride} />
      </main>
      <Footer />
    </>
  );
}
