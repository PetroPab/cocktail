import { MenuItemForm } from "../MenuItemForm";
import { createMenuItem } from "../actions";

export const metadata = { title: "Добавить позицию — Панель управления" };

export default function NewMenuItemPage() {
  return (
    <div>
      <h1
        className="text-4xl text-[var(--color-text)] mb-8 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        НОВАЯ ПОЗИЦИЯ
      </h1>
      <MenuItemForm action={createMenuItem} />
    </div>
  );
}
