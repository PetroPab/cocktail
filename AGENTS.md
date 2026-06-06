# Бар Коктейль — AI Agent Instructions

## Проект

Сайт-витрина для бара «Коктейль» (Ярославль, ул. Кирова, 5/23). Работает с 1996 года. Папка проекта: `d:/Projects/cocktail/`.
Цель сайта: **не e-commerce, не сбор персональных данных** — только витрина заведения для молодой аудитории.
Бронирование через телефон / Telegram, без форм сбора ПД.

## Stack (версии важны — у всех breaking changes)

- **Next.js 16.2.7** App Router — `params` является Promise, всегда `await params`
- **React 19.2.4**
- **Tailwind v4** — конфиг живёт в `src/app/globals.css` под `@theme {}`, без `tailwind.config.ts`
- **Phosphor Icons 2.1.x** — иконки переименованы: `ArrowRight` → `ArrowRightIcon`, `MapPin` → `MapPinIcon` и т.д.
  - В **серверных компонентах** импорт из `@phosphor-icons/react/dist/ssr`
  - В **клиентских компонентах** (`"use client"`) импорт из `@phosphor-icons/react`
- **GSAP 3** — анимации подключены через `src/lib/gsap.ts`; ScrollTrigger зарегистрирован там же
- **clsx + tailwind-merge** — через `cn()` из `@/lib/utils`
- **Шрифты локальные**: Stolzl Display (display/заголовки) + RF Tone (body) через `localFont` в `layout.tsx`

## Ключевые архитектурные решения

### Статический сайт без базы данных
- Нет Drizzle, нет next-auth, нет Zustand
- Все данные (меню, акции, отзывы) — статичные массивы прямо в файлах страниц
- Бронирование — ссылка на телефон `tel:` или Telegram `t.me/`

### Cookie-баннер
- `src/components/ui/CookieBanner.tsx` — клиентский компонент
- Хранит согласие в `localStorage` (ключ `cocktail-cookie-consent`)
- При `accepted` — диспатчит событие `ym-consent-accepted` (слушает YandexMetrika)
- Без сбора персональных данных (только рекламные пиксели)
- Подключён в `src/app/layout.tsx`

### Age Gate (заглушка 18+)
- `src/components/ui/AgeGate.tsx` — клиентский компонент, fixed overlay z-[10000]
- Хранит согласие в `localStorage` (ключ `cocktail-age-verified`)
- При первом визите спрашивает возраст; повторно не показывается

### GSAP-анимации
- `src/lib/gsap.ts` — регистрирует ScrollTrigger один раз, client-only
- `src/providers/AnimationsProvider.tsx` — layout-level клиентский компонент (Fragment)
  - Слушает `usePathname`, при смене маршрута убивает все ScrollTriggers и создаёт новые
  - Сканирует `[data-reveal]` элементы → fade + translateY (или translateX при `data-reveal-from="left|right"`)
  - `data-reveal-delay="0.15"` — задержка в секундах (строка)
- `src/components/home/HomeHero.tsx` — Hero-секция главной, GSAP timeline (stagger)
- `src/components/ui/AnimatedCounter.tsx` — счётчик цифр с ScrollTrigger

### Дизайн-система — "LIQUID NIGHT"
Тема определена в `src/app/globals.css` под `@theme {}`:

| Токен | Значение | Назначение |
|---|---|---|
| `--color-bg` | `oklch(13% 0 0)` | near-black фон |
| `--color-bg-surface` | `oklch(18% 0 0)` | карточки/секции |
| `--color-bg-elevated` | `oklch(24% 0 0)` | hover-состояния |
| `--color-amber` | `oklch(63% 0.12 288)` | основной акцент (фиолетовый) |
| `--color-magenta` | `oklch(99% 0.08 103)` | кремовый акцент |
| `--color-text` | `oklch(100% 0 0)` | белый текст |
| `--color-text-muted` | `oklch(55% 0 0)` | вторичный текст |
| `--color-border` | `oklch(26% 0 0)` | границы |

**Важно про border-radius**: все токены `--radius-*` = `0px`. Никакого скругления нигде — острые края везде. Не использовать `rounded-*` классы Tailwind.

**CSS-классы:**
- `.container-site` — центрированный контейнер max-width 1280px, padding-inline responsive
- `.grain::after` — анимированная текстура зерна на `<body>`
- `.text-gradient` — amber-цвет на тексте (`color: var(--color-amber)`)
- `.glass` — поверхность: `bg-surface` + `border`
- `.marquee-track` — бесконечная прокрутка текста
- `.link-line` — анимированное подчёркивание при hover
- `.scrollbar-none` — скрывает scrollbar (для overflow-x навигации меню)

### Z-index иерархия
- Header: `z-[200]` (через `var(--z-sticky)`)
- Sticky menu nav: `z-[100]`
- Grain overlay: `z-[9999]`
- AgeGate: `z-[10000]`
- CookieBanner: `z-[var(--z-toast)]` = 500

### Sticky nav в /menu — критично
- `position: sticky; top: 72px` — **явный пиксель**, НЕ `var(--header-height)` (браузерный баг с CSS-переменными в sticky)
- `overflow-x` **НЕ установлен** на `html` и `body` — любой `overflow-x: hidden/clip` на корневых элементах ломает `position: sticky`
- Overflow ставить только на конкретные секции (`.overflow-hidden`), не на html/body

### Реальные данные заведения
- Адрес: ул. Кирова, 5/23, 2-й этаж, Ярославль, 150000
- Телефон: +7 (4852) 33-73-56 → `tel:+74852337356`
- Работает: круглосуточно, 24/7
- Рейтинг: 4.9 на 2ГИС (2921 оценка)
- Основано: 1996 год
- Telegram: `t.me/kokteilbar` (placeholder — уточнить реальный)
- Яндекс.Карты: `https://yandex.ru/maps/org/kokteyl/1357359355/`
- 2ГИС отзывы: `https://2gis.ru/yaroslavl/firm/3941177954980665/tab/reviews`

---

## File Map

### `src/app/` — маршруты

| Файл | Что делает |
|---|---|
| `layout.tsx` | Root layout: шрифты Stolzl Display + RF Tone (localFont), metadata, grain на body, AgeGate, AnimationsProvider, CookieBanner, YandexMetrika |
| `globals.css` | Дизайн-система: `@theme {}` токены, базовые стили, утилиты. Без `overflow-x` на html/body |
| `page.tsx` | **Главная**: HomeHero (GSAP), marquee-тикер, факты с AnimatedCounter, 8 авторских коктейлей, фото-стрип, соцсети, CTA бронирования |
| `menu/page.tsx` | **Меню**: заголовок + `<MenuClient />` |
| `menu/MenuClient.tsx` | `"use client"` — tabs БАР/КУХНЯ, sticky nav, карточки, IntersectionObserver активной категории |
| `about/page.tsx` | **О нас**: timeline 1996→сейчас, вводный текст, 4 ценности, CTA |
| `contacts/page.tsx` | **Контакты**: адрес/телефон/часы, WhatsApp/Telegram, секция `#booking` |
| `reviews/page.tsx` | **Отзывы**: платформы 2ГИС/Яндекс с CTA, рейтинг 4.9, прогресс-бары, 6 избранных отзывов |
| `promo/page.tsx` | **Акции**: 6 акций (счастливые часы, DJ-ночи, именинник, студентам, корпоративы, терраса) |

### `src/components/`

| Файл | Что делает |
|---|---|
| `layout/Header.tsx` | `"use client"` — fixed header z-200: логотип (scroll-to-top на `/`), nav (font-extrabold), CTA, мобильное меню |
| `layout/Footer.tsx` | Серверный — marquee, контакты, навигация, соцсети VK/Telegram/Instagram, копирайт, 18+ |
| `home/HomeHero.tsx` | `"use client"` — hero главной, GSAP timeline stagger (ghost → badge → h1×2 → sub → meta → scroll-indicator) |
| `ui/AgeGate.tsx` | `"use client"` — fixed overlay 18+, localStorage |
| `ui/CookieBanner.tsx` | `"use client"` — GDPR-баннер, localStorage, диспатчит `ym-consent-accepted` |
| `ui/AnimatedCounter.tsx` | `"use client"` — GSAP ScrollTrigger счётчик: "1996"→int, "50+"→suffix, "4.9"→decimal, "24/7"→static |

### `src/providers/`

| Файл | Что делает |
|---|---|
| `AnimationsProvider.tsx` | `"use client"` Fragment — `[data-reveal]` → GSAP ScrollTrigger, re-init при смене маршрута |

### `src/lib/`

| Файл | Что делает |
|---|---|
| `utils.ts` | `cn()` — обёртка clsx + tailwind-merge |
| `gsap.ts` | Регистрирует GSAP + ScrollTrigger (client-only), экспортирует `{ gsap, ScrollTrigger }` |

### `src/components/analytics/`

| Файл | Что делает |
|---|---|
| `YandexMetrika.tsx` | Слушает `ym-consent-accepted`, инициализирует счётчик Яндекс.Метрики |

---

## Git-коммиты

Коммиты пишутся **на русском языке**, коротко, без упоминания AI, нейросетей или инструментов разработки. Только суть изменений.

```
# Правильно
исправлен sticky nav в меню
добавлены gsap-анимации на главной
обновлены цены в меню
правки дизайна карточек

# Неправильно
feat: fix sticky nav using Claude
Co-Authored-By: Claude ...
сгенерировано с помощью ИИ
```

## Commands

```bash
pnpm dev        # Dev server (порт 3003)
pnpm build      # Production build
pnpm start      # Production server
pnpm typecheck  # TypeScript check — запускать перед деплоем
pnpm lint       # ESLint
```

---

## Меню — структура данных (MenuClient.tsx)

### Типы рендеринга категорий

| Флаг | Поведение |
|---|---|
| *(по умолчанию)* | Стандартная сетка карточек без чипов |
| `groupByBadge: true` | Группировка по полю `badge` → подзаголовки, без чипов на карточках |
| `coloredBadges: true` | Карточки с фото + цветные чипы по стилю (авторские коктейли) |

### БАР — категории

| id | label | тип |
|---|---|---|
| `authored` | Авторские | coloredBadges |
| `cocktails` | Коктейли | стандарт |
| `whisky` | Виски | groupByBadge |
| `beer` | Пиво | groupByBadge |
| `strong` | Крепкие | groupByBadge |
| `wine` | Вино | groupByBadge |
| `nonalcoholic` | Безалкогольное | groupByBadge |
| `hot` | Горячие напитки | groupByBadge |
| `shots` | Шоты | стандарт |

### Авторские коктейли (цвета чипов)

| Стиль | Цвет |
|---|---|
| Стронг | `oklch(60% 0.22 15)` — красный |
| Саур | `oklch(70% 0.17 55)` — amber |
| Хайбол | `oklch(65% 0.18 200)` — teal |
| Баблс | `oklch(65% 0.28 340)` — magenta |
| Милк панч | `oklch(65% 0.14 270)` — purple |
| Шорт | `oklch(65% 0.18 145)` — green |

### КУХНЯ — категории

`snacks` (Закуски), `salads` (Салаты), `cold` (Холодные закуски), `soups` (Супы), `pasta` (Паста), `pizza` (Пицца), `sides` (Гарниры), `desserts` (Десерты)

---

## Правила разработки

1. **Иконки в серверных компонентах** — импортировать из `@phosphor-icons/react/dist/ssr`
2. **Иконки в клиентских компонентах** — импортировать из `@phosphor-icons/react`
3. **Иконки с суффиксом Icon** — `ArrowRightIcon`, `MapPinIcon`, `PhoneIcon` и т.д.
4. **Sticky + overflow** — НИКОГДА не ставить `overflow-x: hidden/clip` на `html` или `body`. Это ломает `position: sticky`. Overflow только на конкретных секциях.
5. **Sticky top** — использовать явные пиксели (`top-[72px]`), не `var(--header-height)` в sticky-контексте
6. **Цветовые токены** — через `var(--color-amber)`, не захардкоженные hex/oklch значения (кроме AUTHORED_BADGE_STYLE в MenuClient)
7. **Border radius = 0** — никаких `rounded-*` классов. Все `--radius-*: 0px`. Острые края везде.
8. **GSAP** — импортировать только из `@/lib/gsap`, не из `gsap` напрямую
9. **Данные меню** — обновлять в массивах в `src/app/menu/MenuClient.tsx`
10. **Нет базы данных** — всё статично, не вводить Drizzle/Prisma/ORM
11. **Нет auth** — не вводить next-auth

---

## Что сделано (✅)

- ✅ Дизайн-система LIQUID NIGHT — токены, шрифты Stolzl Display + RF Tone, утилиты
- ✅ Все 6 страниц: главная, меню, о нас, контакты, отзывы, акции
- ✅ Header: fixed, мобильное меню, логотип scroll-to-top на главной, font-extrabold nav
- ✅ Footer: marquee, контакты, соцсети, Instagram disclaimer ("запрещена в РФ")
- ✅ AgeGate (18+ overlay, localStorage, без повторного показа)
- ✅ Cookie-баннер (localStorage, диспатч ym-consent-accepted, без ссылки на несуществующую /privacy)
- ✅ GSAP: AnimationsProvider (`data-reveal` + `data-reveal-from` + `data-reveal-delay`), HomeHero stagger timeline, AnimatedCounter
- ✅ Меню: tabs БАР/КУХНЯ, sticky category nav (top: 72px), IntersectionObserver, подкатегории (groupByBadge), цветные чипы авторских
- ✅ Реальные данные заведения + реальное меню с ценами
- ✅ Ссылки на 2ГИС, Яндекс.Карты, телефон, Telegram
- ✅ Build проходит, все страницы статически преднерированы
- ✅ Sticky nav работает: убран `overflow-x` с html/body, явный `top: 72px`

## Что НЕ сделано / Placeholder

- ❌ **Реальные фото** — используются picsum.photos, нужны фото интерьера, коктейлей, террасы
- ❌ **Реальный Telegram** — `t.me/kokteilbar` placeholder, уточнить у клиента
- ❌ **Реальные VK/Instagram** — handles placeholder
- ❌ **Yandex Metrika ID** — счётчик подключён, но нужен реальный ID от клиента
- ❌ **OG-image** (1200×630) — нужна для соцсетей
- ❌ **favicon** — стоит стандартный Next.js, нужен брендированный
- ❌ **Privacy policy** (`/privacy`) — страница не существует (ссылка убрана из CookieBanner)
- ❌ **Карта** — в /contacts фото вместо Yandex Maps iframe
- ❌ **Деплой** — не настроен (Vercel или другой хостинг)
- ❌ **Актуальные цены меню** — нужно уточнить у владельца
