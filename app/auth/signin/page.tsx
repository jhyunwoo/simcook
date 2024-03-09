import { ReactElement } from "react";
import SignInButton from "@/app/auth/signin/singin-button";

export default function SignIn(): ReactElement {
  return (
    <div className={"w-full h-screen flex items-center justify-center p-8"}>
      <div
        className={
          "w-full max-w-2xl bg-white p-4 rounded-xl shadow-lg flex flex-col items-center"
        }
      >
        <div className={"text-2xl font-semibold p-4"}>SimCook 로그인</div>
        <SignInButton />
      </div>
    </div>
  );
}
