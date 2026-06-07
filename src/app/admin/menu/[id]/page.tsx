import { notFound } from "next/navigation";
import { getMenuItemById } from "@/db/queries";
import { updateMenuItem } from "../actions";
import { MenuItemForm } from "../MenuItemForm";

export const metadata = { title: "Редактировать позицию — Панель управления" };

type Props = { params: Promise<{ id: string }> };

export default async function EditMenuItemPage({ params }: Props) {
  const { id } = await params;
  const item = await getMenuItemById(parseInt(id, 10));
  if (!item) notFound();

  const action = updateMenuItem.bind(null, item.id);

  return (
    <div>
      <h1
        className="text-4xl text-[var(--color-text)] mb-2 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        РЕДАКТИРОВАТЬ
      </h1>
      <p className="text-[var(--color-text-subtle)] text-xs mb-8">{item.name} · ID {item.id}</p>
      <MenuItemForm item={item} action={action} />
    </div>
  );
}
