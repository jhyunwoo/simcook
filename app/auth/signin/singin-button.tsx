"use client";

import { ReactElement, useEffect } from "react";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

export default function SignInButton(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.push("/profile");
    }
  }, [router]);

  return (
    <div className={"w-full"}>
      <button
        type={"button"}
        onClick={async () => {
          await pb.collection("users").authWithOAuth2({ provider: "google" });
          router.refresh();
        }}
        className={
          "bg-blue-400 text-white font-semibold text-lg rounded-lg text-center w-full p-2 hover:bg-blue-500 transition duration-150"
        }
      >
        구글로 로그인
      </button>
    </div>
  );
}
