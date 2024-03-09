import { ReactElement } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function Profile(): Promise<ReactElement> {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return (
    <div>
      <div>Profile Page</div>
    </div>
  );
}
