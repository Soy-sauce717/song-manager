"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  formData: FormData
) {
  const password =
    formData.get(
      "password"
    ) as string;

  if (
    password !==
    process.env
      .ADMIN_PASSWORD
  ) {
    redirect(
      "/login?error=1"
    );
  }

  const cookieStore =
    await cookies();

  cookieStore.set(
    "admin-auth",
    "true",
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge:
        60 * 60 * 24 * 30,
    }
  );

  redirect("/admin");
}

export async function logout() {
  const cookieStore =
    await cookies();

  cookieStore.delete(
    "admin-auth"
  );

  redirect("/");
}