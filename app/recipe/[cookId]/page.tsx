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
      <Image
        src={recipe?.recipe[recipe?.recipe?.length - 1]?.image}
        alt={"Food Image"}
        width={300}
        height={300}
        unoptimized={true}
        className={"mx-auto rounded-xl shadow-lg"}
      />

      <div className={"flex flex-row  p-2 bg-white rounded-xl"}>
        <div className="basis-1/3">난이도: {recipe?.difficulty}/5</div>
        <div className="basis-1/3">조리 시간: {recipe?.time}분</div>
        <div className="basis-1/3">제작자: {recipe?.writer}</div>
      </div>
      <div className="py-4 p-4 bg-white rounded-xl grid grid-cols-2">
        <div className={"text-lg font-semibold col-span-2 p-2"}>요리 도구</div>
        {recipe?.tools?.map((data: any, index: number) => (
          <div key={index} className={"flex space-x-2"}>
            <div>{data?.ToolName}</div>
          </div>
        ))}
      </div>

      <div className="py-4 p-4 bg-white rounded-xl grid grid-cols-2">
        <div className={"text-lg font-semibold col-span-2 p-2"}>요리 재료</div>
        {recipe?.ingredient?.map((data: any, index: number) => (
          <div key={index} className={"flex space-x-2"}>
            <div>{data?.IngredientName}</div>
            <div>{data?.amount}</div>
          </div>
        ))}
      </div>
      <div className="py-4 p-4 bg-white rounded-xl grid grid-cols-2">
        <div className={"text-lg font-semibold col-span-2 p-2"}>영양 정보</div>
        <div>칼로리: {recipe?.nutrition[0]?.cal}Kcal</div>
        <div>탄수화물: {recipe?.nutrition[0]?.carbohydrate}g</div>
        <div>단백질: {recipe?.nutrition[0]?.protein}g</div>
        <div>지방: {recipe?.nutrition[0]?.fat}g</div>
        <div>나트륨: {recipe?.nutrition[0]?.sodium}mg</div>
        <div>당류: {recipe?.nutrition[0]?.sugar}g</div>
      </div>
      {aiSuggestion && (
        <div className={"bg-white p-2 rounded-lg"}>
          <div className={"text-lg font-semibold"}>AI 추천</div>
          <div>{aiSuggestion}</div>
        </div>
      )}
      <div className="py-4 p-2 bg-white rounded-xl">
        <div className={"text-lg font-semibold p-2"}>레시피</div>
        {recipe?.recipe?.map((data: any, index: number) => (
          <div key={index} className={"p-1"}>
            {data?.text}
          </div>
        ))}
      </div>
    </div>
  );
}
