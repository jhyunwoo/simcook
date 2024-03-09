import { ReactElement } from "react";
import SignInButton from "@/app/auth/signin-button";

export default function Page(): ReactElement {
  return (
    <div className={"w-full h-screen flex items-center justify-center"}>
      <div className={"bg-white p-4 rounded-xl w-full max-w-2xl"}>
        <div className={"text-xl font-bold"}>SimCook</div>
        <SignInButton />
      </div>
    </div>
  );
}
