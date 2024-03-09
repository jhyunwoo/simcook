"use client";

import { ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

type Inputs = {
  cookName: string;
};

export default function SearchForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
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
  );
}
