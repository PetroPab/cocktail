import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AgeGate } from "@/components/ui/AgeGate";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { AnimationsProvider } from "@/providers/AnimationsProvider";

const stolzl = localFont({
  src: [
    { path: "./fonts/Stolzl_Display.otf",      weight: "400" },
    { path: "./fonts/Stolzl_Display_Bold.otf", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

const rfTone = localFont({
  src: [
    { path: "./fonts/RF_Tone_Light.otf",    weight: "300" },
    { path: "./fonts/RF_Tone_Regular.otf",  weight: "400" },
    { path: "./fonts/RF_Tone_Semibold.otf", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Бар Коктейль — Ярославль с 1996 года",
  description:
    "Легендарный коктейль-бар в центре Ярославля. 50+ авторских коктейлей, живая музыка, летняя терраса. Работаем круглосуточно. Кирова, 5/23.",
  keywords: ["бар ярославль", "коктейль бар ярославль", "бар кирова ярославль", "коктейли ярославль", "ночной бар ярославль"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Бар Коктейль — Ярославль с 1996 года",
    description: "Легендарный коктейль-бар в центре Ярославля. 50+ коктейлей, живая музыка, летняя терраса. Работаем круглосуточно.",
    locale: "ru_RU",
    type: "website",
    url: "https://kokteil-bar.ru",
  },
  alternates: {
    canonical: "https://kokteil-bar.ru",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${stolzl.variable} ${rfTone.variable}`}>
      <body className="grain">
        <AgeGate />
        <AnimationsProvider>
          {children}
        </AnimationsProvider>
        <CookieBanner />
        <YandexMetrika />
      </body>
    </html>
  );
}
