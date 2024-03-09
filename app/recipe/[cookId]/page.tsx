"use client";

import { ReactElement, useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import Link from "next/link";

import Image from "next/image";

import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

export default function Recipe({
  params,
}: {
  params: { cookId: string };
}): ReactElement {
  const [recipe, setRecipe] = useState<any>();
  const [option, setOption] = useState<"basic" | "custom">("basic");
  const [userData, setUserData] = useState<any>();
  const [aiSuggestion, setAiSuggestion] = useState<string>("");

  function handleOption() {
    setOption(option === "basic" ? "custom" : "basic");
  }

  useEffect(() => {
    async function getUserData() {
      const user = await pb.collection("users").getOne(pb.authStore.model?.id);
      setUserData(user);
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getCookRecipe() {
      const data = await pb.collection("cook").getOne(params.cookId);
      setRecipe(data);
    }
    getCookRecipe();
  }, [params.cookId]);

  useEffect(() => {
    async function getCustomRecipe() {
      if (option === "custom") {
        const requestRecipe = await fetch(`/api/custom`, {
          method: "PUT",
          body: JSON.stringify({
            recipe: recipe,
            userInfo: userData,
          }),
        });
        const jsonRecipe = await requestRecipe.json();
        setAiSuggestion(jsonRecipe.result);
      }
    }
    getCustomRecipe();
  }, [option, recipe, recipe?.foodName, userData]);

  return (
    <div className={"w-full min-h-screen flex flex-col p-4 space-y-2"}>
      <Link href={"/"} className={"flex space-x-2 items-center group py-2"}>
        <ChevronDoubleLeftIcon className={"size-6"} />
        <div className={"group-hover:underline"}>홈</div>
      </Link>

      <div className={"text-2xl font-bold py-4"}>{recipe?.foodName}</div>
      <div className={"flex w-full justify-end space-x-2 py-4"}>
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

      <div className={"flex flex-row  p-2 bg-white rounded-xl"}>
        <div className="basis-1/3">난이도: {recipe?.difficulty}/5</div>
        <div className="basis-1/3">조리 시간: {recipe?.time}분</div>
        <div className="basis-1/3">제작자: {recipe?.writer}</div>
      </div>
      <div className="py-4 p-2 bg-white rounded-xl">
        요리 도구:
        {recipe?.tools?.map((data: any, index: number) => (
          <div key={index} className={"flex space-x-2"}>
            <div>{data?.ToolName}</div>
          </div>
        ))}
      </div>

      <div className="py-4 p-2 bg-white rounded-xl">
        요리 재료:
        {recipe?.ingredient?.map((data: any, index: number) => (
          <div key={index} className={"flex space-x-2"}>
            <div>{data?.IngredientName}</div>
            <div>{data?.amount}</div>
          </div>
        ))}
      </div>
      {aiSuggestion && (
        <div className={"bg-white p-2 rounded-lg"}>
          <div className={"text-lg font-semibold"}>AI 추천</div>
          <div>{aiSuggestion}</div>
        </div>
      )}
      <div className="py-4 p-2 bg-white rounded-xl">
        레시피:
        {recipe?.recipe?.map((data: any, index: number) => (
          <div key={index}>{data?.text}</div>
        ))}
      </div>
    </div>
  );
}
