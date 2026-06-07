"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WineIcon, ForkKnifeIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type MenuItem = {
  name: string;
  weight?: string;
  price: number;
  desc?: string;
  badge?: string;
  img?: string;
};

export type Category = {
  id: string;
  label: string;
  items: MenuItem[];
  groupByBadge?: boolean;
  coloredBadges?: boolean;
};

// ── Badge colors for Авторские ────────────────────────────────────────────
const AUTHORED_BADGE_STYLE: Record<string, { borderColor: string; color: string; bg: string }> = {
  "Стронг":    { borderColor: "oklch(60% 0.22 15)",  color: "oklch(60% 0.22 15)",  bg: "oklch(60% 0.22 15 / 0.12)" },
  "Саур":      { borderColor: "oklch(70% 0.17 55)",  color: "oklch(70% 0.17 55)",  bg: "oklch(70% 0.17 55 / 0.12)" },
  "Хайбол":    { borderColor: "oklch(65% 0.18 200)", color: "oklch(65% 0.18 200)", bg: "oklch(65% 0.18 200 / 0.12)" },
  "Баблс":     { borderColor: "oklch(65% 0.28 340)", color: "oklch(65% 0.28 340)", bg: "oklch(65% 0.28 340 / 0.12)" },
  "Милк панч": { borderColor: "oklch(65% 0.14 270)", color: "oklch(65% 0.14 270)", bg: "oklch(65% 0.14 270 / 0.12)" },
  "Шорт":      { borderColor: "oklch(65% 0.18 145)", color: "oklch(65% 0.18 145)", bg: "oklch(65% 0.18 145 / 0.12)" },
};

// ── БАР ────────────────────────────────────────────────────────────────────
const BAR: Category[] = [
  {
    id: "authored",
    label: "Авторские",
    coloredBadges: true,
    items: [
      { name: "Эль Чоко",     price: 540, badge: "Стронг",     desc: "Настой смородины дополняется шоколадным ликёром, а всё это подчёркивается освежающими оттенками мартини фиеро и биттера", img: "https://picsum.photos/seed/elchoko/400/300" },
      { name: "Бали Цар",     price: 540, badge: "Стронг",     desc: "Яркий вишнёвый вкус и аромат с нотками миндаля, сладостью мартини фиеро и лёгкой горчинкой", img: "https://picsum.photos/seed/balitzar/400/300" },
      { name: "Чойс Бойз",    price: 540, badge: "Стронг",     desc: "Дикое сочетание арктической тинктуры со сладостью можжевелового ликёра, ароматом ели и горечью абсента", img: "https://picsum.photos/seed/choiceboys/400/300" },
      { name: "Гуччи",        price: 540, badge: "Саур",       desc: "Бархатный коктейль с ярким вкусом манго, сбалансированный сладостью рома, терпкостью текилы и горечью водки и джина", img: "https://picsum.photos/seed/guccisour/400/300" },
      { name: "Хани Мани",    price: 540, badge: "Саур",       desc: "Изысканный коктейль на основе медового виски с добавлением ликёра бузины", img: "https://picsum.photos/seed/honeymoney/400/300" },
      { name: "Авеллино",     price: 540, badge: "Саур",       desc: "Кисло-сладкий коктейль с тонким ароматом лета. Дынная настойка с тибетской ромашкой в сочетании с ликёром юдзу и мусом из зелёного чая", img: "https://picsum.photos/seed/avellino/400/300" },
      { name: "Вэри Бэрри",   price: 540, badge: "Хайбол",    desc: "Настой лесных ягод в сочетании с джином и ягодной содовой", img: "https://picsum.photos/seed/veryberry/400/300" },
      { name: "Советский",    price: 540, badge: "Хайбол",    desc: "Освежающий и лёгкий: цитрусовая кислинка, сладость груши и травянистые ноты джина", img: "https://picsum.photos/seed/sovetsky/400/300" },
      { name: "Павалло",      price: 540, badge: "Хайбол",    desc: "Тропическое сочетание наливки из личи с апельсином и содовой из соцветий пассифлоры", img: "https://picsum.photos/seed/pavallo/400/300" },
      { name: "Ловеррис",     price: 540, badge: "Баблс",     desc: "Сладость ягод ежевики, цветочные ноты лаванды и освежающая лёгкость игристого вина", img: "https://picsum.photos/seed/loveris/400/300" },
      { name: "Глория",       price: 540, badge: "Баблс",     desc: "Аромат розового персика с жасмином и кислинка просекко", img: "https://picsum.photos/seed/gloria/400/300" },
      { name: "Лампоне",      price: 540, badge: "Баблс",     desc: "Новый взгляд на классическое сочетание малины, лайма и мяты", img: "https://picsum.photos/seed/lampone/400/300" },
      { name: "Деликат",      price: 540, badge: "Милк панч",  desc: "Необычное сочетание ореховых нот кокоса и миндаля со сдержанной сладостью томатной воды", img: "https://picsum.photos/seed/delikat/400/300" },
      { name: "Флай зе Скай", price: 540, badge: "Милк панч",  desc: "Настой груши с ароматом ликёра банан-бузина и лёгкой кислинкой", img: "https://picsum.photos/seed/flythesky/400/300" },
      { name: "Лав из…",      price: 540, badge: "Шорт",      desc: "Микс банана, клубники и ванили напоминает аромат той самой жвачки из детства", img: "https://picsum.photos/seed/lovefrom/400/300" },
      { name: "Фреш мулл",    price: 540, badge: "Шорт",      desc: "Свежий взгляд на всем известный Московский мул", img: "https://picsum.photos/seed/freshmull/400/300" },
    ],
  },
  {
    id: "cocktails",
    label: "Коктейли",
    items: [
      { name: "Мартини фиеро & тоник", weight: "400 мл", price: 570 },
      { name: "Лонг-айленд айс ти",    weight: "400 мл", price: 590 },
      { name: "Тропический айс ти",    weight: "400 мл", price: 590 },
      { name: "Босфорд-тоник",         weight: "400 мл", price: 590 },
      { name: "Окхард дайкири",        weight: "150 мл", price: 590 },
      { name: "Окхард Колада",         weight: "300 мл", price: 590 },
      { name: "Май тай",               weight: "400 мл", price: 590 },
      { name: "Зомби",                 weight: "400 мл", price: 590 },
      { name: "Мартини Негрони",       weight: "300 мл", price: 590 },
      { name: "Аперол спритц",         weight: "300 мл", price: 590 },
      { name: "Олд фешн",              weight: "300 мл", price: 590 },
      { name: "Маргарита",             weight: "150 мл", price: 590 },
      { name: "Белый русский",         weight: "300 мл", price: 590 },
      { name: "Пенициллин",            weight: "300 мл", price: 650 },
      { name: "Виски сауэр",           weight: "300 мл", price: 590 },
    ],
  },
  {
    id: "shots",
    label: "Шоты",
    items: [
      { name: "Б-52",               weight: "50 мл", price: 450 },
      { name: "Облака",             weight: "50 мл", price: 450 },
      { name: "Мираж",              weight: "50 мл", price: 450 },
      { name: "Боярский",           weight: "50 мл", price: 280 },
      { name: "Ярославская собака", weight: "50 мл", price: 220 },
      { name: "Окхард шот",         weight: "50 мл", price: 450 },
    ],
  },
  {
    id: "tinctures",
    label: "Настойки",
    items: [
      { name: "Лесные ягоды",      weight: "40 мл", price: 200 },
      { name: "Арктическая",       weight: "40 мл", price: 200 },
      { name: "Дыня-ромашка",      weight: "40 мл", price: 200 },
      { name: "Малиновая мята",    weight: "40 мл", price: 200 },
      { name: "Вишня-чабрец",      weight: "40 мл", price: 200 },
      { name: "Лимон-лайм",        weight: "40 мл", price: 200 },
      { name: "Сливочная коровка", weight: "40 мл", price: 200 },
      { name: "Личи-апельсин",     weight: "40 мл", price: 200 },
    ],
  },
  {
    id: "beer",
    label: "Пиво",
    groupByBadge: true,
    items: [
      { name: "Abbe brune",            weight: "300 / 500 мл", price: 410, desc: "500 мл — 470 ₽ · Тёмный эль в бельгийском стиле",       badge: "Бочковое" },
      { name: "Spaten",                weight: "300 / 500 мл", price: 410, desc: "500 мл — 470 ₽ · Светлый лагер в немецком стиле",        badge: "Бочковое" },
      { name: "Amberweiss",            weight: "300 / 500 мл", price: 410, desc: "500 мл — 470 ₽ · Светлое пшеничное нефильтрованное",     badge: "Бочковое" },
      { name: "El capulco",            weight: "400 мл",       price: 470, desc: "Светлый лагер в мексиканском стиле",                     badge: "Бутылочное" },
      { name: "Hoegaarden Cherry",     weight: "440 мл",       price: 470, desc: "Вишнёвый бланш в бельгийском стиле",                    badge: "Бутылочное" },
      { name: "Stella Artois безалк.", weight: "440 мл",       price: 470, desc: "Светлый безалкогольный лагер",                           badge: "Бутылочное" },
      { name: "Бабл бир манго",        weight: "400 мл",       price: 500, desc: "Фруктовые шарики в сочетании с солодовым напитком",      badge: "Бабл бир" },
      { name: "Бабл бир вишня",        weight: "400 мл",       price: 500, desc: "Фруктовые шарики в сочетании с солодовым напитком",      badge: "Бабл бир" },
      { name: "Бабл бир кокос",        weight: "400 мл",       price: 500, desc: "Фруктовые шарики в сочетании с солодовым напитком",      badge: "Бабл бир" },
    ],
  },
  {
    id: "whisky",
    label: "Виски",
    groupByBadge: true,
    items: [
      { name: "Monkey Shoulder",     weight: "40 мл", price: 780, badge: "Шотландия" },
      { name: "William Lawson's",    weight: "40 мл", price: 450, badge: "Шотландия" },
      { name: "Dewar's White Label", weight: "40 мл", price: 480, badge: "Шотландия" },
      { name: "Dewar's 8 Caribbean", weight: "40 мл", price: 500, badge: "Шотландия" },
      { name: "Dewar's 12",          weight: "40 мл", price: 530, badge: "Шотландия" },
      { name: "Jameson",             weight: "40 мл", price: 530, badge: "Ирландия" },
      { name: "Hinch",               weight: "40 мл", price: 780, badge: "Ирландия" },
      { name: "Jack Daniel's",       weight: "40 мл", price: 650, badge: "Америка" },
      { name: "Old Virginia",        weight: "40 мл", price: 450, badge: "Америка" },
    ],
  },
  {
    id: "spirits",
    label: "Крепкие",
    groupByBadge: true,
    items: [
      { name: "Ararat cherry",      weight: "40 мл", price: 390, badge: "Коньяк" },
      { name: "Ararat apricot",     weight: "40 мл", price: 390, badge: "Коньяк" },
      { name: "Ararat koffee",      weight: "40 мл", price: 390, badge: "Коньяк" },
      { name: "Ararat 3",           weight: "40 мл", price: 390, badge: "Коньяк" },
      { name: "Ararat 5",           weight: "40 мл", price: 430, badge: "Коньяк" },
      { name: "Torres 5",           weight: "40 мл", price: 450, badge: "Коньяк" },
      { name: "Hennessy VS",        weight: "40 мл", price: 600, badge: "Коньяк" },
      { name: "Hennessy VSOP",      weight: "40 мл", price: 800, badge: "Коньяк" },
      { name: "Baron Otard VS",     weight: "40 мл", price: 550, badge: "Коньяк" },
      { name: "Baron Otard VSOP",   weight: "40 мл", price: 750, badge: "Коньяк" },
      { name: "Olmeca Silver",      weight: "40 мл", price: 450, badge: "Текила" },
      { name: "Olmeca Gold",        weight: "40 мл", price: 470, badge: "Текила" },
      { name: "Gintl",              weight: "40 мл", price: 360, badge: "Джин" },
      { name: "Bombay Sapphire",    weight: "40 мл", price: 450, badge: "Джин" },
      { name: "Bosford",            weight: "40 мл", price: 360, badge: "Джин" },
      { name: "Oakheart Original",  weight: "40 мл", price: 380, badge: "Ром" },
      { name: "El Boko White",      weight: "40 мл", price: 350, badge: "Ром" },
      { name: "El Boko Black",      weight: "40 мл", price: 350, badge: "Ром" },
      { name: "Ярославская мягкая", weight: "40 мл", price: 250, badge: "Водка" },
      { name: "Tolga",              weight: "40 мл", price: 290, badge: "Водка" },
      { name: "Beringoff",          weight: "40 мл", price: 330, badge: "Водка" },
      { name: "Grey Goose",         weight: "40 мл", price: 490, badge: "Водка" },
      { name: "Martini Fiero",      weight: "40 мл", price: 280, badge: "Вермут" },
      { name: "Martini Rosso",      weight: "40 мл", price: 280, badge: "Вермут" },
      { name: "Martini Bianco",     weight: "40 мл", price: 280, badge: "Вермут" },
      { name: "Martini Extra Dry",  weight: "40 мл", price: 280, badge: "Вермут" },
      { name: "Branca Menta",       weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Fernet-Branca",      weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Jägermeister",       weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Cointreau",          weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Kahlua",             weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Aperol",             weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Martini Reserva Bitter", weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Sambuca",            weight: "40 мл", price: 430, badge: "Ликёр" },
      { name: "Absinthe",           weight: "40 мл", price: 430, badge: "Ликёр" },
    ],
  },
  {
    id: "wine",
    label: "Вино",
    groupByBadge: true,
    items: [
      { name: "CURICANO",                  weight: "750 мл", price: 2500, desc: "Чили · Совиньон блан · Сухое",           badge: "Белое" },
      { name: "Chateau Tamagne Delicate",  weight: "750 мл", price: 2600, desc: "Россия · Бианка / Шардоне · Сухое",      badge: "Белое" },
      { name: "ZB Riesling",              weight: "750 мл", price: 2600, desc: "Россия · Рислинг · Полусухое",            badge: "Белое" },
      { name: "Whistling Track",          weight: "750 мл", price: 3700, desc: "Новая Зеландия · Совиньон блан · Сухое",  badge: "Белое" },
      { name: "Puente Sur",               weight: "750 мл", price: 2500, desc: "Аргентина · Каберне Совиньон · Полусухое", badge: "Красное" },
      { name: "Black Falls Creek",        weight: "750 мл", price: 2500, desc: "ЮАР · Пинотаж · Сухое",                  badge: "Красное" },
      { name: "Twin Rivers",              weight: "750 мл", price: 3700, desc: "Австралия · Шираз · Полусухое",           badge: "Красное" },
      { name: "Chateau Tamagne Delicate", weight: "750 мл", price: 2600, desc: "Россия · Бианка / Шардоне · Сухое",      badge: "Розовое" },
      { name: "Prosecco Tintonelli DOC",  weight: "750 мл", price: 3500, desc: "Италия · Глера · Сухое",                  badge: "Игристое" },
      { name: "Martini Asti DOCG",        weight: "750 мл", price: 3900, desc: "Италия · Мускат белый · Сладкое",         badge: "Игристое" },
      { name: "Martini Prosecco DOC",     weight: "750 мл", price: 3900, desc: "Италия · Глера · Сухое",                  badge: "Игристое" },
      { name: "Martini Rosé DOC",         weight: "750 мл", price: 3900, desc: "Италия · Глера / Пино Неро · Сухое",      badge: "Игристое" },
      { name: "Bourgeois Prosecco Style", weight: "750 мл", price: 2250, desc: "Россия · Сухое",                          badge: "Игристое" },
      { name: "Puente Sur",               weight: "150 мл", price: 500,  desc: "Аргентина · Полусухое · Красное",         badge: "По бокалу" },
      { name: "CURICANO",                 weight: "150 мл", price: 500,  desc: "Чили · Совиньон блан · Белое",            badge: "По бокалу" },
      { name: "Bourgeois Prosecco Style", weight: "150 мл", price: 450,  desc: "Россия · Игристое",                       badge: "По бокалу" },
    ],
  },
  {
    id: "nonalc",
    label: "Безалкогольное",
    groupByBadge: true,
    items: [
      { name: "Бар Коктейль",        weight: "500 мл", price: 200, desc: "Негазированная артезианская вода",  badge: "Вода" },
      { name: "Dausuz",              weight: "500 мл", price: 280, desc: "Стекло · газ / негаз · Кавказ",    badge: "Вода" },
      { name: "Rich Cola",           weight: "330 мл", price: 250,                                            badge: "Софт" },
      { name: "Rich Tonic",          weight: "330 мл", price: 250,                                            badge: "Софт" },
      { name: "Добрый апельсин",     weight: "250 мл", price: 200,                                            badge: "Софт" },
      { name: "Добрый лимон-лайм",   weight: "250 мл", price: 200,                                            badge: "Софт" },
      { name: "Burn",                weight: "330 мл", price: 250,                                            badge: "Энергетик" },
      { name: "Фреш апельсин",       weight: "250 мл", price: 450,                                            badge: "Фреш" },
      { name: "Фреш грейпфрут",      weight: "250 мл", price: 450,                                            badge: "Фреш" },
      { name: "Фреш яблоко",         weight: "250 мл", price: 450,                                            badge: "Фреш" },
      { name: "Фреш морковь",        weight: "250 мл", price: 450,                                            badge: "Фреш" },
      { name: "Лайм-мята",           weight: "400 мл", price: 380, desc: "1 л — 680 ₽",                      badge: "Лимонад" },
      { name: "Грейпфрут-перец",     weight: "400 мл", price: 380, desc: "1 л — 680 ₽",                      badge: "Лимонад" },
      { name: "Апероль спритц",      weight: "400 мл", price: 380, desc: "1 л — 680 ₽",                      badge: "Лимонад" },
      { name: "Кавказский мулл",     weight: "400 мл", price: 380, desc: "1 л — 680 ₽",                      badge: "Лимонад" },
      { name: "Манго-ваниль",        weight: "450 мл", price: 400,                                            badge: "Бабл ти" },
      { name: "Клубника-шоколад",    weight: "450 мл", price: 400,                                            badge: "Бабл ти" },
      { name: "Черника-малина",      weight: "450 мл", price: 400,                                            badge: "Бабл ти" },
      { name: "Ванильный",           weight: "300 мл", price: 390,                                            badge: "Милкшейк" },
      { name: "Малиновый",           weight: "300 мл", price: 390,                                            badge: "Милкшейк" },
      { name: "Шоколадный",          weight: "300 мл", price: 390,                                            badge: "Милкшейк" },
    ],
  },
  {
    id: "hotdrinks",
    label: "Горячие",
    groupByBadge: true,
    items: [
      { name: "Кения",               weight: "1 л",    price: 550, badge: "Чай классика" },
      { name: "Иван-чай",            weight: "1 л",    price: 550, badge: "Чай классика" },
      { name: "Сенча",               weight: "1 л",    price: 550, badge: "Чай классика" },
      { name: "Молочный улун",       weight: "1 л",    price: 550, badge: "Чай классика" },
      { name: "Наглый фрукт",        weight: "1 л",    price: 550, badge: "Чай классика" },
      { name: "Таёжный сбор",        weight: "1 л",    price: 550, badge: "Чай домашний" },
      { name: "Горы Алтая",          weight: "1 л",    price: 550, badge: "Чай домашний" },
      { name: "Горная лаванда",      weight: "1 л",    price: 550, badge: "Чай домашний" },
      { name: "Марокканская мята",   weight: "1 л",    price: 550, badge: "Чай домашний" },
      { name: "Тибетская ромашка",   weight: "1 л",    price: 550, badge: "Чай домашний" },
      { name: "Облепиха",            weight: "300 мл", price: 390, badge: "Нечайный чай" },
      { name: "Брусника-имбирь",     weight: "300 мл", price: 390, badge: "Нечайный чай" },
      { name: "Клубника-чили",       weight: "300 мл", price: 390, badge: "Нечайный чай" },
      { name: "Малина-можжевельник", weight: "300 мл", price: 390, badge: "Нечайный чай" },
      { name: "Эспрессо",                              price: 200, badge: "Кофе" },
      { name: "Двойной эспрессо",                      price: 250, badge: "Кофе" },
      { name: "Американо",                             price: 200, badge: "Кофе" },
      { name: "Капучино",                              price: 300, badge: "Кофе" },
      { name: "Латте",                                 price: 300, badge: "Кофе" },
      { name: "Раф",                                   price: 300, badge: "Кофе" },
      { name: "Матча латте",                           price: 300, badge: "Кофе", desc: "Альтернативное молоко +100 ₽" },
    ],
  },
];

// ── КУХНЯ ──────────────────────────────────────────────────────────────────
const KITCHEN: Category[] = [
  {
    id: "sharing",
    label: "На компанию",
    items: [
      { name: "Сет настоек",            weight: "8 шт",      price: 1450, desc: "Все вкусы в одном предложении" },
      { name: "Братц шот-сет",          weight: "4 шт",      price: 750,  desc: "Клоэ, Банни Бу, Ясмин, Кул Кэт" },
      { name: "Игривый сет",            weight: "5 бокалов", price: 2550, desc: "Игристое и яркая подача" },
      { name: "Сет «Хорошая компания»", weight: "540 г",     price: 850,  desc: "Сырные палочки, стрипсы, крылья, картофельные шарики + 2 соуса" },
      { name: "Гриль-сет",              weight: "780 г",     price: 995,  desc: "Колбаски, гренки, луковые кольца, крылья + 2 соуса" },
      { name: "Пивная тарелка",         weight: "530 г",     price: 595,  desc: "Гренки, фри, стрипсы + соус чесночный" },
      { name: "Сет «Картофельный»",     weight: "600 г",     price: 600,  desc: "Хашбрауны, фри, дольки, конусы и батат фри + 3 соуса" },
      { name: "Смэш-бургер сет",        weight: "600 г",     price: 990,  desc: "Классический, сырный и пикантный" },
    ],
  },
  {
    id: "hot",
    label: "Горячее",
    items: [
      { name: "Треска под устрично-сливочным соусом", weight: "150 г", price: 690, desc: "Треска на подушке из соуса, помидоры черри и микрозелень",                          badge: "новинка" },
      { name: "Томлёные рёбра под соусом барбекю",    weight: "260 г", price: 720, desc: "Свиные рёбрышки, помидоры черри, микрозелень",                                       badge: "новинка" },
      { name: "Гриль-колбаски «Баварские» (свинина)", weight: "250 г", price: 445, desc: "2 колбаски с деревенским картофелем, квашеной капустой и барбекю-соусом" },
      { name: "Гриль-колбаски «Баварские» (говядина)",weight: "250 г", price: 490, desc: "2 колбаски с деревенским картофелем, квашеной капустой и барбекю-соусом" },
      { name: "Куриные крылья",                       weight: "400 г", price: 590, desc: "Баффало (острые) или Азиатские (сладкие). Подаются с морковью, сельдереем и соусом" },
      { name: "Грудка на гриле с овощами в темпуре",  weight: "350 г", price: 595, desc: "Филе курицы с овощами в хрустящей темпуре, соусы гриль и терияки" },
      { name: "Свинина BBQ",                          weight: "300 г", price: 690, desc: "Сочный стейк из шеи, обжаренный до корочки, с дымным соусом барбекю" },
      { name: "Чикен-кеса с чеддером",                weight: "200 г", price: 395, desc: "Кесадилья с курицей, чеддером, помидорами, соусом цезарь и острыми перчиками" },
      { name: "Карри-чикен «Сливочный Бангкок»",      weight: "300 г", price: 445, desc: "Курица в хрустящей панировке с овощами и мягким сливочно-карри соусом" },
      { name: "«Коктейль» бургер с говядиной",        weight: "340 г", price: 590, desc: "Котлета из говядины, чеддер, томаты, луковое варенье, корнишоны, салат айсберг. С картофелем фри" },
      { name: "Смэш-бургер",                          weight: "200 г", price: 380, desc: "Классический / Сырный / Пикантный. В комбо за 990 ₽" },
    ],
  },
  {
    id: "streetfood",
    label: "Стритфуд",
    items: [
      { name: "Крабовые крокеты",                         weight: "200 г", price: 375 },
      { name: "Сырные шарики",                            weight: "130 г", price: 400 },
      { name: "Куриные стрипсы",                          weight: "150 г", price: 400 },
      { name: "Гренки чесночные",                         weight: "220 г", price: 220 },
      { name: "Мидии сливочные",                          weight: "400 г", price: 650 },
      { name: "Мидии в запечённом сырно-сметанном соусе", weight: "250 г", price: 575, desc: "С сыром гауда, сметаной, укропом и соусом терияки" },
      { name: "Камамбер запечёный",                       weight: "280 г", price: 780, desc: "С томатами, брускетами и брусничным соусом" },
      { name: "Кольца кальмара",                          weight: "180 г", price: 400 },
      { name: "Креветки в панировке",                     weight: "130 г", price: 400 },
      { name: "Фиш & Чипс",                              weight: "300 г", price: 495, desc: "Филе трески, картофель фри, соус тар-тар" },
    ],
  },
  {
    id: "salads",
    label: "Салаты",
    items: [
      { name: "Цезарь с курицей",            weight: "210 г", price: 550 },
      { name: "Цезарь с креветками",         weight: "200 г", price: 650 },
      { name: "Салат с баклажанами и фетой", weight: "245 г", price: 380, desc: "Обжаренные баклажаны, черри, сыр фета, сладкий чили и кунжут" },
      { name: "Фермерский",                  weight: "210 г", price: 375, desc: "Огурцы, помидоры и красный лук с деревенским маслом прямого отжима" },
      { name: "Коул Слоу",                   weight: "240 г", price: 175 },
      { name: "Осуми",                       weight: "220 г", price: 380, desc: "Пекинская капуста, огурцы, морковь, курица, креветки и заправка с икрой тобито", badge: "вернули!" },
    ],
  },
  {
    id: "cold",
    label: "Холодные закуски",
    items: [
      { name: "Ростбиф",          weight: "90 г",  price: 495, desc: "Говядина с бальзамическим соусом" },
      { name: "Крепкое застолье", weight: "330 г", price: 450, desc: "Сельдь слабой соли с картофелем и маринованным луком" },
      { name: "Сырное плато",     weight: "250 г", price: 550, desc: "Пармезан, чеддер, бри, дорблю, моцарелла + соус брусника" },
      { name: "Домашнее сало",    weight: "195 г", price: 395, desc: "Пять тостов с деревенским салом, подаётся с хреном" },
      { name: "Цезарь сэндвич",   weight: "200 г", price: 450, desc: "Вкус легендарного цезаря с курицей в формате сытного сэндвича", badge: "новинка" },
    ],
  },
  {
    id: "soups",
    label: "Супы",
    items: [
      { name: "Солянка по-домашнему", weight: "300 г", price: 450 },
      { name: "Том Ям",               weight: "450 г", price: 650 },
    ],
  },
  {
    id: "pasta",
    label: "Паста",
    items: [
      { name: "Карбонара",                     weight: "280 г", price: 545 },
      { name: "Феттучини с курицей и грибами", weight: "300 г", price: 545 },
      { name: "Паста с креветками и шпинатом", weight: "300 г", price: 590 },
      { name: "Сырная паста",                  weight: "300 г", price: 495 },
    ],
  },
  {
    id: "pizza",
    label: "Пицца",
    items: [
      { name: "Сырная",          weight: "390 г", price: 595 },
      { name: "Маргарита",       weight: "440 г", price: 595 },
      { name: "Пепперони",       weight: "440 г", price: 595 },
      { name: "Ветчина — грибы", weight: "470 г", price: 595 },
      { name: "Мясная",          weight: "510 г", price: 595 },
    ],
  },
  {
    id: "sides",
    label: "Гарниры",
    items: [
      { name: "Картофель фри",               weight: "150 г", price: 225 },
      { name: "Картофельные дольки",         weight: "150 г", price: 225 },
      { name: "Рис с овощами WOK",           weight: "100 г", price: 190 },
      { name: "Батат фри с пармезаном",      weight: "150 г", price: 290 },
      { name: "Хашбрауны со сметаной 3 шт", weight: "180 г", price: 250 },
    ],
  },
  {
    id: "desserts",
    label: "Десерты",
    items: [
      { name: "Наполеон",                    weight: "130 г", price: 370, desc: "Коржи из слоёного теста и крем на белом шоколаде" },
      { name: "Медовик",                     weight: "130 г", price: 370, desc: "На натуральном мёде с нежным сметанным кремом" },
      { name: "Сникерс",                     weight: "130 г", price: 370, desc: "Легендарный вкус + авторское видение" },
      { name: "Шоколадный фондан",           weight: "190 г", price: 425, desc: "Горячий кекс с жидкой лавой внутри, подаётся с мороженым" },
      { name: "Шарик ванильного мороженого", weight: "50 г",  price: 150 },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function groupByBadge(items: MenuItem[]): [string, MenuItem[]][] {
  const map = new Map<string, MenuItem[]>();
  for (const item of items) {
    const key = item.badge ?? "";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return Array.from(map.entries());
}

// ── MenuCard ───────────────────────────────────────────────────────────────
function MenuCard({
  item,
  showBadge = false,
  badgeStyle,
}: {
  item: MenuItem;
  showBadge?: boolean;
  badgeStyle?: { borderColor: string; color: string; bg: string };
}) {
  return (
    <div className="group bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-amber)] transition-colors duration-200 flex flex-col">
      {item.img && (
        <div className="relative h-44 overflow-hidden shrink-0">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[var(--color-bg)] opacity-20" />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg leading-tight text-[var(--color-text)] group-hover:text-[var(--color-amber)] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.name}
          </h3>
          {showBadge && item.badge && (
            <span
              className="shrink-0 text-[9px] tracking-widest uppercase px-1.5 py-0.5 leading-none"
              style={
                badgeStyle
                  ? {
                      border: `1px solid ${badgeStyle.borderColor}`,
                      color: badgeStyle.color,
                      background: badgeStyle.bg,
                    }
                  : {
                      border: "1px solid var(--color-amber)",
                      color: "var(--color-amber)",
                    }
              }
            >
              {item.badge}
            </span>
          )}
        </div>

        {item.desc && (
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
        )}

        <div className="flex items-end justify-between mt-auto pt-3 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-subtle)]">{item.weight ?? ""}</span>
          <span
            className="text-lg text-[var(--color-amber)] leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.price} ₽
          </span>
        </div>
      </div>
    </div>
  );
}

// ── CategorySection ────────────────────────────────────────────────────────
function CategorySection({ cat }: { cat: Category }) {
  const heading = (
    <div className="flex items-baseline gap-3 mb-6 border-b border-[var(--color-border)] pb-3">
      <h2
        className="text-3xl md:text-5xl text-[var(--color-text)] leading-none"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {cat.label.toUpperCase()}
      </h2>
      <span className="text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)]">
        {cat.items.length} позиций
      </span>
    </div>
  );

  // Authored cocktails — full cards with colored badge chips
  if (cat.coloredBadges) {
    return (
      <section id={cat.id}>
        {heading}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
          {cat.items.map((item) => (
            <MenuCard
              key={`${cat.id}-${item.name}`}
              item={item}
              showBadge={true}
              badgeStyle={item.badge ? AUTHORED_BADGE_STYLE[item.badge] : undefined}
            />
          ))}
        </div>
      </section>
    );
  }

  // Categories grouped by badge field → subheadings
  if (cat.groupByBadge) {
    const groups = groupByBadge(cat.items);
    return (
      <section id={cat.id}>
        {heading}
        <div className="flex flex-col gap-8">
          {groups.map(([groupLabel, items]) => (
            <div key={groupLabel}>
              {groupLabel && (
                <h3
                  className="text-xs tracking-[0.3em] uppercase text-[var(--color-amber)] mb-3"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
                >
                  {groupLabel}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {items.map((item) => (
                  <MenuCard
                    key={`${cat.id}-${item.name}-${item.price}`}
                    item={item}
                    showBadge={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Standard — no badges, no grouping
  return (
    <section id={cat.id}>
      {heading}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {cat.items.map((item) => (
          <MenuCard
            key={`${cat.id}-${item.name}`}
            item={item}
            showBadge={!!item.badge}
          />
        ))}
      </div>
    </section>
  );
}

// ── MenuClient ─────────────────────────────────────────────────────────────
type Tab = "bar" | "kitchen";

export function MenuClient({
  barOverride,
  kitchenOverride,
}: {
  barOverride?: Category[];
  kitchenOverride?: Category[];
} = {}) {
  const BAR_DATA = barOverride ?? BAR;
  const KITCHEN_DATA = kitchenOverride ?? KITCHEN;
  const [tab, setTab] = useState<Tab>("bar");
  const [activeId, setActiveId] = useState<string>(BAR_DATA[0].id);
  const navRef = useRef<HTMLDivElement>(null);
  const categories = tab === "bar" ? BAR_DATA : KITCHEN_DATA;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = navRef.current?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - 72 - navH - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const cats = tab === "bar" ? BAR_DATA : KITCHEN_DATA;
    setActiveId(cats[0].id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const cats = tab === "bar" ? BAR_DATA : KITCHEN_DATA;
    const navH = navRef.current?.offsetHeight ?? 120;
    const topMargin = -(72 + navH);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: `${topMargin}px 0px -55% 0px`, threshold: 0 },
    );

    cats.forEach((cat: Category) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tab]);

  return (
    <>
      {/* ── Sticky nav: BAR/КУХНЯ tabs + category links ───────────────── */}
      <div
        ref={navRef}
        className="sticky top-[72px] z-[100] bg-[var(--color-bg)]"
      >
        {/* Contained nav box — border on all sides except top (header acts as top) */}
        <div className="container-site">
          <div className="border-x border-b border-[var(--color-border)]">

            {/* BAR / КУХНЯ tab switcher */}
            <div className="grid grid-cols-2 border-b border-[var(--color-border)]">
              <button
                onClick={() => setTab("bar")}
                className={cn(
                  "flex items-center justify-center gap-2 py-3.5 md:py-4 text-sm tracking-[0.15em] uppercase transition-colors duration-150 font-semibold border-r border-[var(--color-border)]",
                  tab === "bar"
                    ? "bg-[var(--color-amber)] text-[var(--color-bg)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)]",
                )}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <WineIcon size={16} weight="fill" />
                Бар
              </button>
              <button
                onClick={() => setTab("kitchen")}
                className={cn(
                  "flex items-center justify-center gap-2 py-3.5 md:py-4 text-sm tracking-[0.15em] uppercase transition-colors duration-150 font-semibold",
                  tab === "kitchen"
                    ? "bg-[var(--color-amber)] text-[var(--color-bg)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)]",
                )}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <ForkKnifeIcon size={16} weight="fill" />
                Кухня
              </button>
            </div>

            {/* Category links */}
            <nav
              className="flex overflow-x-auto scrollbar-none md:overflow-visible"
              aria-label="Категории"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={cn(
                    "shrink-0 md:grow md:shrink md:basis-auto",
                    "px-4 py-2.5 text-[10px] tracking-wider uppercase transition-colors duration-150",
                    "border-r border-[var(--color-border)] last:border-r-0 font-semibold text-center whitespace-nowrap",
                    activeId === cat.id
                      ? "text-[var(--color-amber)] bg-[var(--color-bg-surface)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-amber)] hover:bg-[var(--color-bg-surface)]",
                  )}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

          </div>
        </div>
      </div>

      {/* ── Menu content ─────────────────────────────────────────────────── */}
      <div className="container-site py-8 md:py-12 flex flex-col gap-10 md:gap-16">
        {categories.map((cat) => (
          <CategorySection key={cat.id} cat={cat} />
        ))}
      </div>

      <div className="container-site pb-12">
        <p className="text-xs text-[var(--color-text-subtle)] border-t border-[var(--color-border)] pt-6">
          Цены указаны в рублях. Меню может обновляться — уточняйте у бармена или официанта. 18+
        </p>
      </div>
    </>
  );
}
