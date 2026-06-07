import { loginAction } from "./actions";

export const metadata = { title: "Вход — Панель управления" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-sm">
        <p
          className="text-4xl text-[var(--color-text)] mb-2 leading-none"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
        >
          КОКТЕЙЛЬ
        </p>
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-text-subtle)] mb-10">
          Панель управления
        </p>

        <form action={loginAction} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--color-text-subtle)] mb-2">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4 h-11 text-sm outline-none focus:border-[var(--color-amber)] transition-colors"
            />
          </div>
          {error && (
            <p className="text-xs text-red-400">Неверный пароль</p>
          )}
          <button
            type="submit"
            className="h-11 px-6 text-xs tracking-widest uppercase bg-[var(--color-amber)] text-[var(--color-bg)] hover:opacity-90 transition-opacity"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
