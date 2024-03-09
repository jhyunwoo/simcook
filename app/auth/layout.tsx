import { ReactElement, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");

  return <>{children}</>;
}
