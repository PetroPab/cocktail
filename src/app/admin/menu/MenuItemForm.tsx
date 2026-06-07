import type { MenuItemRow } from "@/db/schema";

const BAR_CATEGORIES = [
  { id: "authored",  label: "Авторские" },
  { id: "cocktails", label: "Коктейли" },
  { id: "shots",     label: "Шоты" },
  { id: "tinctures", label: "Настойки" },
  { id: "beer",      label: "Пиво" },
  { id: "whisky",    label: "Виски" },
  { id: "spirits",   label: "Крепкие" },
  { id: "wine",      label: "Вино" },
  { id: "nonalc",    label: "Безалкогольное" },
  { id: "hotdrinks", label: "Горячие" },
];

const KITCHEN_CATEGORIES = [
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

const inputCls = "w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] px-3 h-9 text-sm outline-none focus:border-[var(--color-amber)] transition-colors";
const labelCls = "block text-[10px] tracking-widest uppercase text-[var(--color-text-subtle)] mb-1";

export function MenuItemForm({ item, action }: { item?: MenuItemRow; action: (fd: FormData) => Promise<void> }) {
  const isBar = item ? item.section === "bar" : true;
  const categories = isBar ? BAR_CATEGORIES : KITCHEN_CATEGORIES;

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">

      {/* Section */}
      <div>
        <label className={labelCls}>Раздел</label>
        <select name="section" defaultValue={item?.section ?? "bar"}
          className={inputCls + " appearance-none"}>
          <option value="bar">Бар</option>
          <option value="kitchen">Кухня</option>
        </select>
        <p className="text-xs text-[var(--color-text-subtle)] mt-1">При смене раздела перезагрузите страницу для обновления категорий</p>
      </div>

      {/* Category */}
      <div>
        <label className={labelCls}>Категория</label>
        <select name="category" defaultValue={item?.category ?? "cocktails"}
          className={inputCls + " appearance-none"}>
          {[...BAR_CATEGORIES, ...KITCHEN_CATEGORIES].map((c) => (
            <option key={c.id} value={c.id}>{c.label} ({c.id.startsWith("sharing") || c.id === "hot" || c.id === "streetfood" || c.id === "salads" || c.id === "cold" || c.id === "soups" || c.id === "pasta" || c.id === "pizza" || c.id === "sides" || c.id === "desserts" ? "кухня" : "бар"})</option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label className={labelCls}>Название *</label>
        <input type="text" name="name" required defaultValue={item?.name ?? ""}
          className={inputCls} />
      </div>

      {/* Price */}
      <div>
        <label className={labelCls}>Цена (₽) *</label>
        <input type="number" name="price" required defaultValue={item?.price ?? 0} min={0}
          className={inputCls} />
      </div>

      {/* Weight */}
      <div>
        <label className={labelCls}>Объём / вес</label>
        <input type="text" name="weight" defaultValue={item?.weight ?? ""}
          placeholder="напр. 300 мл / 200 г" className={inputCls} />
      </div>

      {/* Badge */}
      <div>
        <label className={labelCls}>Бейдж / подгруппа</label>
        <input type="text" name="badge" defaultValue={item?.badge ?? ""}
          placeholder="напр. Стронг / Бочковое / Коньяк" className={inputCls} />
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>Описание</label>
        <textarea name="description" defaultValue={item?.description ?? ""}
          rows={3}
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] px-3 py-2 text-sm outline-none focus:border-[var(--color-amber)] transition-colors resize-none" />
      </div>

      {/* Image */}
      <div>
        <label className={labelCls}>URL изображения</label>
        <input type="url" name="img" defaultValue={item?.img ?? ""}
          placeholder="https://..." className={inputCls} />
      </div>

      {/* Position */}
      <div>
        <label className={labelCls}>Позиция (сортировка)</label>
        <input type="number" name="position" defaultValue={item?.position ?? 0} min={0}
          className={inputCls} />
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input type="checkbox" name="active" id="active"
          defaultChecked={item ? item.active : true}
          className="w-4 h-4 accent-[var(--color-amber)]" />
        <label htmlFor="active" className={labelCls + " mb-0"}>Активна (показывать в меню)</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="h-10 px-6 text-xs tracking-widest uppercase bg-[var(--color-amber)] text-[var(--color-bg)] hover:opacity-90 transition-opacity"
        >
          {item ? "Сохранить" : "Создать"}
        </button>
        <a
          href="/admin/menu"
          className="h-10 px-6 text-xs tracking-widest uppercase border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-amber)] hover:border-[var(--color-amber)] transition-colors inline-flex items-center"
        >
          Отмена
        </a>
      </div>
    </form>
  );
}
