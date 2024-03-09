"use client";

import { ReactElement } from "react";
import { signIn } from "next-auth/react";

export default function SignInButton(): ReactElement {
  return (
    <div className={"w-full"}>
      <button
        type={"button"}
        onClick={() => signIn("kakao")}
        className={
          "bg-yellow-400 text-white font-semibold text-lg rounded-lg text-center w-full p-2 hover:bg-yellow-500 transition duration-150"
        }
      >
        카카오로 로그인
      </button>
    </div>
  );
}
