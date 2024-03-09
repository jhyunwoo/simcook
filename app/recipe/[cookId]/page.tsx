"use client";

import { ReactElement, useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import Link from "next/link";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

export default function Recipe({
  params,
}: {
  params: { cookId: string };
}): ReactElement {
  const [recipe, setRecipe] = useState<any>();
  const [option, setOption] = useState<"basic" | "custom">("basic");

  function handleOption() {
    setOption(option === "basic" ? "custom" : "basic");
  }

  useEffect(() => {
    async function getCookRecipe() {
      const data = await pb.collection("cook").getOne(params.cookId);
      setRecipe(data);
    }
    getCookRecipe();
  }, [params.cookId]);

  return (
    <div className={"w-full min-h-screen flex flex-col p-4"}>
      <Link href={"/"} className={"flex space-x-2 items-center group py-2"}>
        <ChevronDoubleLeftIcon className={"size-6"} />
        <div className={"group-hover:underline"}>홈</div>
      </Link>
      <div className={"text-2xl font-bold"}>{recipe?.foodName}</div>
      <div className={"flex w-full justify-end space-x-2"}>
        <button
          type={"button"}
          onClick={handleOption}
          className={`${option === "basic" ? "bg-rose-500 text-white" : ""} p-1 px-2 rounded-lg`}
        >
          기본 설정
        </button>
        <button
          type={"button"}
          onClick={handleOption}
          className={`${option === "custom" ? "bg-rose-500 text-white" : ""} p-1 px-2 rounded-lg`}
        >
          커스텀
        </button>
      </div>
      <div>난이도: {recipe?.difficulty}/5</div>
      <div>
        {recipe?.tools?.map((data: any, index: number) => (
          <div key={index} className={"flex space-x-2"}>
            <div>{data?.ToolName}</div>
          </div>
        ))}
      </div>
      <div>
        {recipe?.ingredient?.map((data: any, index: number) => (
          <div key={index} className={"flex space-x-2"}>
            <div>{data?.IngredientName}</div>
            <div>{data?.amount}</div>
          </div>
        ))}
      </div>
      <div>
        {recipe?.recipe?.map((data: string, index: number) => (
          <div key={index}>{data}</div>
        ))}
      </div>
    </div>
  );
}
