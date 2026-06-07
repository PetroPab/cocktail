"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSessionCookie } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  const cookieStr = createSessionCookie(adminPassword);
  const [nameVal, ...rest] = cookieStr.split("; ");
  const [, value] = nameVal.split("=");

  cookieStore.set("admin_session", value, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
