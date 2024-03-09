"use client";
import { pb } from "@/lib/pocketbase";
import { ReactElement, useEffect, useState } from "react";

export default function Recipe(): ReactElement {
  const [recipeList, setRecipeList] = useState<any | null>();
  useEffect(() => {
    async function getCookData() {
      const data = await pb.collection("cook").getFullList();
      console.log(data);
      setRecipeList(data);
    }
    getCookData();
  }, []);

  return <div>{recipeList}</div>;
}
