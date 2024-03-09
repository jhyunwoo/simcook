import { ReactElement } from "react";
import SearchForm from "@/app/search-form";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import MenuSuggestion from "@/app/menu-suggestion";
export default function Home(): ReactElement {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8">
      <Link href={"/profile"} className={"fixed top-4 right-4"}>
        <UserCircleIcon className={"size-10"} />
      </Link>
      <div className={"w-full max-w-2xl"}>
        <div className={"text-3xl font-bold"}>SimCook</div>
        <SearchForm />
        <MenuSuggestion />
      </div>
    </div>
  );
}
