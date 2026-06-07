# Бар Коктейль — AI Agent Instructions

## Проект

Сайт для бара «Коктейль» (Ярославль, ул. Кирова, 5/23). Работает с 1996 года. Папка проекта: `d:/Projects/cocktail/`.
Цель: **витрина заведения + CMS для владельца**. Не e-commerce, не сбор персональных данных.
Бронирование через телефон / Telegram, без форм сбора ПД.

---

## Stack (версии важны — у всех breaking changes)

- **Next.js 16.2.7** App Router — `params` является Promise, всегда `await params`
- **React 19.2.4**
- **Tailwind v4** — конфиг в `src/app/globals.css` под `@theme {}`, без `tailwind.config.ts`
- **Phosphor Icons 2.1.7** — иконки с суффиксом Icon: `ArrowRightIcon`, `MapPinIcon`, `PhoneIcon`
  - Серверные компоненты → `@phosphor-icons/react/dist/ssr`
  - Клиентские компоненты (`"use client"`) → `@phosphor-icons/react`
- **GSAP 3.12.5** — только через `@/lib/gsap`, не напрямую из `gsap`; ScrollTrigger зарегистрирован там же
- **Drizzle ORM 0.45.2** + **@neondatabase/serverless 1.1.0** — PostgreSQL на Neon
- **clsx + tailwind-merge** — через `cn()` из `@/lib/utils`
- **Шрифты локальные**: Stolzl Display (display/заголовки) + RF Tone (body) через `localFont` в `layout.tsx`
  - Переменные: `--font-display`, `--font-body` (переопределяют заглушки в `@theme {}`)

---

## Ключевые архитектурные решения

### Публичный сайт — частично статичный

Данные **меню** и **акций** — статичные массивы в файлах (`MenuClient.tsx`, `promo/page.tsx`).
**Новости** и **настройки** (режим работы, контакты) — динамические, из БД.
**Отзывы и факты** — хардкод (реальные данные, не меняются часто).

Бронирование — ссылка на `tel:` или Telegram.

### База данных (Neon PostgreSQL + Drizzle ORM)

`src/db/schema.ts` — 3 таблицы:
- `menuItems` — позиции меню (name, price, weight, desc, badge, img, category, section, position, active)
- `posts` — новости и статьи (slug, title, excerpt, content, date, category, tag, img, published)
- `settings` — пары ключ/значение (hours, address, phone, telegram)

`src/db/queries.ts` — 9+ функций с `unstable_cache` (тег `"menu"` / `"posts"` / `"settings"`, revalidate 3600).

`src/db/index.ts` — подключение (требует `DATABASE_URL` в env).

`src/db/seed.ts` — начальное заполнение БД (полное меню + 4 новости).

⚠️ **Данные меню НА ФРОНТЕ** всё ещё хардкодированы в `MenuClient.tsx` и `page.tsx`. БД для меню используется только в админ-панели. Фронт и БД пока не синхронизированы.

### Аутентификация (Admin-only)

`src/lib/auth.ts` — HMAC-SHA256 на Web Crypto API (совместим с Edge Runtime, не требует bcryptjs).
- Сессия: HttpOnly cookie `cocktail-session`, 7 дней, SameSite=Lax
- Пароль задаётся через `ADMIN_PASSWORD` (env)
- Нет next-auth — всё написано с нуля

`src/middleware.ts` — проверяет сессию перед любым `/admin/*` маршрутом.

### Кэширование Server Actions

После изменений в админ-панели вызывается `revalidateTag(tag)`:
- `"menu"` — для позиций меню
- `"posts"` — для новостей
- `"settings"` — для настроек

### Cookie-баннер

`src/components/ui/CookieBanner.tsx` — клиентский компонент.
- Хранит согласие в `localStorage` (ключ `cocktail-cookie-consent`)
- При `accepted` → диспатчит `ym-consent-accepted` (слушает YandexMetrika)
- Без сбора ПД, без ссылки на /privacy (страница не существует)

### Age Gate (18+)

`src/components/ui/AgeGate.tsx` — fixed overlay z-[10000], localStorage (`cocktail-age-verified`). Повторно не показывается.

### GSAP-анимации

`src/providers/AnimationsProvider.tsx` — оборачивает children в `<div ref>`:
- При смене pathname → GSAP fade-in страницы (opacity 0→1)
- Сканирует `[data-reveal]` → fade + translateY, `data-reveal-from="left|right"` → translateX
- `data-reveal-delay="0.15"` — задержка в секундах (строка)
- Двойной `ScrollTrigger.refresh()` (сразу + второй RAF) для обработки async scroll restoration

`src/components/ui/AnimatedCounter.tsx` — **IntersectionObserver** (не ScrollTrigger). Форматы: `"1996"`→int, `"50+"`→suffix, `"4.9"`→decimal, `"24/7"`→static (no animation).

### Дизайн-система — "LIQUID NIGHT"

Тема в `src/app/globals.css` → `@theme {}`:

| Токен | Значение | Назначение |
|---|---|---|
| `--color-bg` | `oklch(13% 0 0)` | near-black фон |
| `--color-bg-surface` | `oklch(18% 0 0)` | карточки/секции |
| `--color-bg-elevated` | `oklch(24% 0 0)` | hover-состояния |
| `--color-amber` | `oklch(63% 0.12 288)` | основной акцент (фиолетовый) |
| `--color-amber-hover` | `oklch(70% 0.14 288)` | hover для amber |
| `--color-amber-dim` | `oklch(63% 0.12 288 / 0.15)` | подложка amber (активные пункты меню) |
| `--color-magenta` | `oklch(99% 0.08 103)` | кремовый акцент |
| `--color-text` | `oklch(100% 0 0)` | белый текст |
| `--color-text-muted` | `oklch(55% 0 0)` | вторичный текст |
| `--color-text-subtle` | `oklch(38% 0 0)` | третичный текст |
| `--color-border` | `oklch(26% 0 0)` | границы |
| `--color-border-light` | `oklch(33% 0 0)` | светлые границы (hover) |

**Border radius = 0**: все `--radius-*: 0px`. Никаких `rounded-*` классов — острые края везде.

**CSS-классы:**

| Класс | Назначение |
|---|---|
| `.container-site` | Центрированный контейнер max-width 1280px |
| `.grain::after` | Анимированная текстура зерна на `<body>` |
| `.text-gradient` | Цвет amber на тексте |
| `.glass` | Поверхность: bg-surface + border |
| `.marquee-track` | Бесконечная прокрутка текста |
| `.link-line` | Анимированное подчёркивание при hover |
| `.scrollbar-none` | Скрывает scrollbar |
| `.clip-slant` | Диагональный clip-path для секций |
| `.img-wrap` | Скелетон-шимер пока загружается изображение |
| `.btn-shimmer` | Световой блик скользит по кнопке при hover (через `::after`) |
| `.logo-neon` | Пульсирующее неоновое свечение (логотип в хедере) |

**btn-shimmer** — добавлять на все важные CTA-кнопки. Работает через CSS `::after` pseudo-element, не требует обёртки или дополнительного JSX.

### Z-index иерархия

- Header: `z-[200]` (через `var(--z-sticky)`)
- Sticky menu nav: `z-[100]`
- Grain overlay: `z-[9999]`
- AgeGate: `z-[10000]`
- CookieBanner: `z-[var(--z-toast)]` = 500

### Sticky nav в /menu — критично

- `position: sticky; top: 72px` — **явный пиксель**, НЕ `var(--header-height)` (браузерный баг)
- `overflow-x` **НЕ установлен** на `html` и `body` — ломает `position: sticky`
- Overflow только на конкретных секциях, не на html/body

### Реальные данные заведения

- Адрес: ул. Кирова, 5/23, 2-й этаж, Ярославль, 150000
- Телефон: +7 (4852) 33-73-56 → `tel:+74852337356`
- Работает: круглосуточно, 24/7
- Рейтинг: 4.9 на 2ГИС и Яндекс (2921 оценка)
- Основано: 1996 год
- Telegram: `t.me/s/cocktailbar_yar`
- VK: `vk.com/bar_cocktail`
- Instagram: `instagram.com/cocktail_bar_yar`
- Яндекс.Карты (iframe embed): `https://yandex.ru/map-widget/v1/?ol=biz&oid=1357359355`
- Яндекс.Карты (ссылка): `https://yandex.ru/maps/org/kokteyl/1357359355/`
- 2ГИС отзывы: `https://2gis.ru/yaroslavl/firm/3941177954980665/tab/reviews`

---

## Переменные окружения

```env
DATABASE_URL        # PostgreSQL connection string (Neon)
ADMIN_PASSWORD      # Пароль для входа в /admin
NEXT_PUBLIC_YM_ID   # Yandex Metrika ID (опционально)
```

---

## Commands

```bash
pnpm dev          # Dev server (порт 3003)
pnpm build        # Production build
pnpm start        # Production server
pnpm typecheck    # TypeScript check — запускать перед деплоем
pnpm lint         # ESLint

pnpm db:push      # Применить schema.ts к БД (Drizzle migrations)
pnpm db:seed      # Начальное заполнение БД (позиции меню + новости)
pnpm db:studio    # Drizzle Studio — просмотр/редактирование данных в браузере
```

---

## File Map

### `src/app/` — маршруты

| Файл | Что делает |
|---|---|
| `layout.tsx` | Root layout: шрифты Stolzl Display + RF Tone, metadata, grain, AgeGate, AnimationsProvider, CookieBanner, YandexMetrika |
| `globals.css` | Дизайн-система: `@theme {}`, базовые стили, все утилиты. Без `overflow-x` на html/body |
| `page.tsx` | **Главная**: HomeHero, marquee, AnimatedCounter stats, 8 авторских коктейлей (статичные), фото-стрип, соцсети, CTA бронирования |
| `menu/page.tsx` | **Меню**: заголовок + `<MenuClient />` |
| `menu/MenuClient.tsx` | `"use client"` — tabs БАР/КУХНЯ, sticky nav (top: 72px), карточки, IntersectionObserver активной категории. Данные **хардкодированы** в массивах BAR и KITCHEN |
| `about/page.tsx` | **О нас**: timeline 1996→сейчас, 4 ценности, последние 3 новости из БД (fallback: src/data/news.ts), CTA |
| `contacts/page.tsx` | **Контакты**: адрес/телефон/часы, Yandex Maps iframe (`?ol=biz&oid=1357359355`), секция `#booking` с кнопками Позвонить + Telegram |
| `reviews/page.tsx` | **Отзывы**: платформы 2ГИС/Яндекс (SVG иконки из /icons/), рейтинг 4.9, прогресс-бары, 6 избранных отзывов |
| `promo/page.tsx` | **Акции**: 4 плитки WEEKLY (Пн-Чт), 3 PROMOS (DJ-ночи, Именинник, Студентам), CTA Позвонить/Telegram. Среда — Phosphor GiftIcon |
| `news/page.tsx` | **Новости**: список posts из БД (articles + news), fallback на src/data/news.ts |
| `news/[slug]/page.tsx` | **Статья**: динамический роут, данные из БД или fallback |
| `admin/layout.tsx` | Layout для /admin/*: проверка сессии, навигация |
| `admin/page.tsx` | **Дашборд**: статистика (кол-во меню, новостей, настройки) |
| `admin/login/page.tsx` | **Вход**: форма с паролем (ADMIN_PASSWORD) |
| `admin/login/actions.ts` | Server Action: loginAction (HMAC проверка, set cookie) |
| `admin/menu/page.tsx` | **Список меню**: таблица всех позиций, группировка section→category |
| `admin/menu/new/page.tsx` | Форма добавления позиции меню |
| `admin/menu/[id]/page.tsx` | Форма редактирования позиции |
| `admin/menu/actions.ts` | Server Actions: createMenuItem, updateMenuItem, deleteMenuItem + revalidateTag("menu") |
| `admin/menu/MenuItemForm.tsx` | Форма позиции меню (клиентский компонент) |
| `admin/menu/DeleteButton.tsx` | Кнопка удаления с подтверждением |
| `admin/news/page.tsx` | **Список новостей**: таблица с фильтром published/draft |
| `admin/news/new/page.tsx` | Форма создания новости/статьи |
| `admin/news/[id]/page.tsx` | Форма редактирования |
| `admin/news/actions.ts` | Server Actions: createPost, updatePost, deletePost + revalidateTag("posts") |
| `admin/news/PostForm.tsx` | Форма поста (клиентский компонент) |
| `admin/news/DeletePostButton.tsx` | Кнопка удаления с подтверждением |
| `admin/settings/page.tsx` | **Настройки**: форма режима работы, адреса, телефона, telegram |
| `admin/settings/actions.ts` | Server Action: saveSettings + revalidateTag("settings") |

### `src/components/`

| Файл | Что делает |
|---|---|
| `layout/Header.tsx` | `"use client"` — fixed z-200: логотип с `.logo-neon` (белый + пульсирующее свечение), nav, кнопка "Забронировать" с `.btn-shimmer`, мобильное меню |
| `layout/Footer.tsx` | Серверный — читает `getSettings()` из БД (часы работы), marquee, контакты, соцсети VK/TG/Instagram (SVG иконки из /icons/), копирайт, 18+ |
| `home/HomeHero.tsx` | `"use client"` — hero главной, GSAP timeline stagger анимация |
| `ui/AgeGate.tsx` | `"use client"` — fixed overlay 18+, localStorage |
| `ui/CookieBanner.tsx` | `"use client"` — GDPR-баннер, localStorage, диспатчит `ym-consent-accepted` |
| `ui/AnimatedCounter.tsx` | `"use client"` — IntersectionObserver + GSAP: "1996"→int, "50+"→suffix, "4.9"→decimal, "24/7"→static |
| `analytics/YandexMetrika.tsx` | Слушает `ym-consent-accepted`, инициализирует Яндекс.Метрику |

### `src/providers/`

| Файл | Что делает |
|---|---|
| `AnimationsProvider.tsx` | `"use client"` — `<div ref>`: page fade-in при смене маршрута, `[data-reveal]` → GSAP ScrollTrigger, двойной refresh |

### `src/db/`

| Файл | Что делает |
|---|---|
| `index.ts` | Подключение к Neon (DATABASE_URL) |
| `schema.ts` | 3 таблицы: menuItems, posts, settings |
| `queries.ts` | 9+ функций с unstable_cache (revalidate 3600) |
| `seed.ts` | Начальное заполнение БД |

### `src/lib/`

| Файл | Что делает |
|---|---|
| `utils.ts` | `cn()` — clsx + tailwind-merge |
| `gsap.ts` | GSAP + ScrollTrigger (client-only) |
| `auth.ts` | Web Crypto HMAC-SHA256 сессии для /admin |
| `imageUtils.ts` | `BLUR_DATA_URL` — тёмный SVG placeholder для next/image |

### `src/data/`

| Файл | Что делает |
|---|---|
| `news.ts` | Статичные новости + статьи (fallback когда БД пуста). Тип `Post`, функции `formatDate()`, `getLatestPosts()` |

### `src/middleware.ts`

Проверяет сессию перед `/admin/*`. Использует `auth.ts`. Edge-совместим.

### `public/`

```
logo-cocktail-1line.svg    — логотип в одну строку (201×36, для хедера)
logo-cocktail-2lines.svg   — логотип в две строки (130×48, для футера)
icon-cocktail.svg          — иконка

favicon.svg / favicon.ico / favicon-96.png
apple-icon.png (180×180)
icon-192.png / icon-512.png (PWA manifest)
site.webmanifest

icons/
  vk-icon.svg              — fill="#9D8EDB"
  tg-icon.svg              — fill="#9D8EDB"
  instagram-icon.svg       — fill="#9D8EDB" (загружен клиентом)
  yandexmaps-icon.svg      — красный pin Яндекса, viewBox only (no width/height)
  2gis.svg                 — fill="#00B956"
```

---

## Git-коммиты

Коммиты **на русском языке**, коротко, без упоминания AI, нейросетей или инструментов разработки. Только суть изменений.

```
# Правильно
исправлен sticky nav в меню
добавлены gsap-анимации на главной
обновлены цены в меню

# Неправильно
feat: fix sticky nav using Claude
Co-Authored-By: Claude ...
сгенерировано с помощью ИИ
```

---

## Меню — структура данных (MenuClient.tsx)

### Типы рендеринга категорий

| Флаг | Поведение |
|---|---|
| *(по умолчанию)* | Стандартная сетка карточек без чипов |
| `groupByBadge: true` | Группировка по полю `badge` → подзаголовки |
| `coloredBadges: true` | Карточки с фото `aspect-[4/5]` + цветные чипы (авторские коктейли) |

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

### Авторские коктейли (AUTHORED_BADGE_STYLE в MenuClient.tsx)

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

1. **Иконки в серверных компонентах** — из `@phosphor-icons/react/dist/ssr`
2. **Иконки в клиентских компонентах** — из `@phosphor-icons/react`
3. **Иконки с суффиксом Icon** — `ArrowRightIcon`, `MapPinIcon`, `PhoneIcon` и т.д.
4. **Sticky + overflow** — НИКОГДА `overflow-x: hidden/clip` на `html` или `body`. Ломает `position: sticky`. Overflow только на конкретных секциях.
5. **Sticky top** — явные пиксели (`top-[72px]`), не `var(--header-height)` в sticky-контексте
6. **Цветовые токены** — через `var(--color-amber)`, не хардкод hex/oklch (кроме AUTHORED_BADGE_STYLE)
7. **Border radius = 0** — никаких `rounded-*` классов. Острые края везде.
8. **GSAP** — только из `@/lib/gsap`, не из `gsap` напрямую
9. **Данные меню (фронт)** — обновлять в массивах `src/app/menu/MenuClient.tsx`. БД-таблица `menuItems` используется только в /admin
10. **Server Actions** — все изменения данных в /admin через Server Actions + `revalidateTag()`
11. **Blur placeholder** — использовать `BLUR_DATA_URL` из `@/lib/imageUtils` для `next/image placeholder="blur"`
12. **CTA-кнопки** — добавлять класс `btn-shimmer` на все важные кнопки (Забронировать, Позвонить, Telegram и т.д.)

---

## Что сделано (✅)

- ✅ Дизайн-система LIQUID NIGHT — токены, шрифты Stolzl Display + RF Tone, все утилиты
- ✅ 7 публичных страниц: главная, меню, о нас, контакты, отзывы, акции, новости
- ✅ Header: fixed z-200, лого `.logo-neon` (белый + пульсирующее свечение), `.btn-shimmer` на Забронировать
- ✅ Footer: читает режим работы из БД, соцсети через SVG-иконки (VK/TG/Instagram все фиолетовые)
- ✅ AgeGate (18+ overlay, localStorage, без повторного показа)
- ✅ Cookie-баннер (localStorage, диспатч ym-consent-accepted)
- ✅ GSAP: AnimationsProvider (data-reveal, page fade-in), HomeHero stagger, AnimatedCounter (IntersectionObserver)
- ✅ Меню: tabs БАР/КУХНЯ, sticky nav (top: 72px), IntersectionObserver, groupByBadge, coloredBadges, карточки aspect-[4/5]
- ✅ Реальные данные заведения + реальное меню с ценами
- ✅ База данных PostgreSQL (Neon) + Drizzle ORM
- ✅ Полная админ-панель (/admin): меню, новости, настройки
- ✅ Аутентификация (Web Crypto HMAC, HttpOnly cookie, middleware)
- ✅ Система новостей (/news, /news/[slug]) с fallback на статичные данные
- ✅ Динамические настройки (режим работы, контакты через /admin/settings)
- ✅ Yandex Maps iframe в /contacts
- ✅ Логотипы (1-line / 2-lines SVG), все иконки платформ и соцсетей
- ✅ Favicon.ico + SVG + PNG + web manifest (PWA-ready)
- ✅ `.btn-shimmer` на всех ключевых CTA (Забронировать, Позвонить, Telegram, Написать отзыв и др.)
- ✅ Build проходит, все публичные страницы статически пререндерятся

## Что НЕ сделано / Placeholder

- ❌ **Реальные фото** — используются picsum.photos, нужны интерьер, коктейли, терраса
- ❌ **Синхронизация меню фронт ↔ БД** — MenuClient.tsx хардкодирован, изменения через /admin/menu не отражаются на сайте
- ❌ **Yandex Metrika ID** — счётчик подключён, нужен реальный ID (`NEXT_PUBLIC_YM_ID`)
- ❌ **OG-image** (1200×630) — нужна для превью в соцсетях
- ❌ **Privacy policy** (`/privacy`) — страница не существует
- ❌ **Деплой** — не настроен (рекомендуется Vercel)
- ❌ **Актуальные цены** — уточнить у владельца, обновить в MenuClient.tsx
