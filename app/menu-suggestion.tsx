"use client";

import { ReactElement, useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";

export default function MenuSuggestion(): ReactElement {
  const [suggest, setSuggest] = useState<any>();
  useEffect(() => {
    async function getSuggestion() {
      const suggestion = await pb
        .collection("cook")
        .getList(1, 4, { sort: `@random` });
      setSuggest(suggestion.items);
      console.log(suggestion.items);
    }
    getSuggestion();
  }, []);
  console.log(suggest);
  return (
    <div
      className={
        "w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4"
      }
    >
      {suggest?.map((data: any, index: number) => (
        <Link
          href={`/recipe/${data?.id}`}
          key={index}
          className={"w-full rounded-xl bg-white aspect-1 relative z-0"}
        >
          <Image
            src={data?.recipe[data?.recipe?.length - 1]?.image}
            alt={"photo"}
            width={300}
            height={300}
            unoptimized={true}
            className={
              "aspect-1 object-cover absolute top-0 z-0 w-full rounded-xl"
            }
          />
          <div
            className={
              "z-20 absolute bottom-4 right-4 text-white text-lg sm:text-xl lg:text-2xl font-bold"
            }
          >
            {data?.foodName}
          </div>
          <div
            className={
              "w-full h-full aspect-1 bg-slate-800/50 z-10 absolute top-0 rounded-xl"
            }
          />
        </Link>
      ))}
    </div>
  );
}
