import { ReactElement } from "react";
import Link from "next/link";
export default function Home(): ReactElement {
  return (
    <div className="w-full h-screen grid grid-cols-1 grid-rows-1">
      <div>Home Page</div>
      <Link href="/profile">프로필 페이지 이동</Link>
    </div>
  );
}
