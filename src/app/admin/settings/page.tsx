import { getAllSettings } from "@/db/queries";
import { saveSettings } from "./actions";

export const metadata = { title: "Настройки — Панель управления" };

const STANDARD_SETTINGS: Array<{ key: string; label: string; placeholder?: string }> = [
  { key: "hours",    label: "Режим работы",          placeholder: "Круглосуточно, 24/7" },
  { key: "address",  label: "Адрес",                  placeholder: "ул. Кирова, 5/23, 2-й этаж, Ярославль" },
  { key: "phone",    label: "Телефон",                placeholder: "+7 (4852) 33-73-56" },
  { key: "telegram", label: "Telegram",               placeholder: "t.me/s/cocktailbar_yar" },
];

const inputCls = "w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] px-3 h-9 text-sm outline-none focus:border-[var(--color-amber)] transition-colors";
const labelCls = "block text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] mb-1";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const allSettings = await getAllSettings();
  const settingsMap = Object.fromEntries(allSettings.map((s) => [s.key, s.value]));
  const standardKeys = new Set(STANDARD_SETTINGS.map((s) => s.key));
  const customSettings = allSettings.filter((s) => !standardKeys.has(s.key));

  return (
    <div>
      <h1
        className="text-4xl text-[var(--color-text)] mb-2 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        НАСТРОЙКИ
      </h1>
      <p className="text-xs text-[var(--color-text-subtle)] mb-8">Режим работы и другие данные, отображаемые на сайте.</p>

      {saved && (
        <div className="mb-6 px-4 py-3 bg-green-900/30 border border-green-500/30 text-green-400 text-sm">
          Настройки сохранены
        </div>
      )}

      {!allSettings.length && (
        <p className="mb-6 text-[var(--color-text-muted)] text-sm">
          База пустая. Запустите <code className="text-[var(--color-amber)]">pnpm db:seed</code>, затем обновите здесь.
        </p>
      )}

      <form action={saveSettings} className="flex flex-col gap-5 max-w-xl">
        <div className="border border-[var(--color-border)] p-5 flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase text-[var(--color-amber)]">Основные</p>
          {STANDARD_SETTINGS.map((s) => (
            <div key={s.key}>
              <label className={labelCls}>{s.label}</label>
              <input
                type="text"
                name={s.key}
                defaultValue={settingsMap[s.key] ?? ""}
                placeholder={s.placeholder}
                className={inputCls}
              />
            </div>
          ))}
        </div>

        {customSettings.length > 0 && (
          <div className="border border-[var(--color-border)] p-5 flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase text-[var(--color-amber)]">Дополнительные</p>
            {customSettings.map((s, i) => (
              <div key={s.key} className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Ключ</label>
                  <input type="text" name={`ckey_${i}`} defaultValue={s.key} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Значение</label>
                  <input type="text" name={`cval_${i}`} defaultValue={s.value} className={inputCls} />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="h-10 px-6 text-xs tracking-widest uppercase bg-[var(--color-amber)] text-[var(--color-bg)] hover:opacity-90 transition-opacity w-fit"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
