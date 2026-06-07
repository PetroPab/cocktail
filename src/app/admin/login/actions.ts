"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSessionCookie, COOKIE_NAME } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    redirect("/admin/login?error=1");
  }

  const cookieStr = await createSessionCookie(adminPassword);
  const value = cookieStr.split(";")[0].split("=").slice(1).join("=");

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
