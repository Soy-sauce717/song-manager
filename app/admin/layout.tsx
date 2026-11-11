import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore =
    await cookies();

  const auth =
    cookieStore.get(
      "admin-auth"
    )?.value;

  if (auth !== "true") {
    redirect("/login");
  }

  return <>{children}</>;

}
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};