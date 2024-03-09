"use client";

import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { pb } from "@/lib/pocketbase";
import Link from "next/link";

type Inputs = {
  cookName: string;
};

export default function SearchForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [search, setSearch] = useState<any[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const cookData = await pb.collection("cook").getList(1, 10, {
      filter: `foodName~'${data.cookName}'`,
    });
    setSearch(cookData.items);
    if (cookData.totalItems === 0) {
      alert("레시피를 찾을 수 없습니다.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "bg-white flex justify-center rounded-full focus-within:ring-rose-500 focus-within:ring-2 mt-2"
        }
      >
        <input
          {...register("cookName")}
          className={"w-full rounded-full outline-none pl-4 text-xl"}
        />
        <button type={"submit"}>
          <MagnifyingGlassCircleIcon className={"size-10 text-rose-500"} />
        </button>
      </form>

      <div
        className={"flex flex-col space-y-1 items-center justify-center mt-4"}
      >
        {search.map((data) => (
          <Link
            key={data.id}
            className={
              "flex w-full justify-start flex-col bg-white p-2 rounded-lg"
            }
            href={`/recipe/${data.id}`}
          >
            <div className={"text-lg"}>{data.foodName}</div>
            <div>난이도: {data.difficulty}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
