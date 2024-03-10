"use client";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";

function StatusBar({
  title,
  percentage,
}: {
  title: String;
  percentage: number;
}) {
  return (
    <div>
      <div>{title}</div>
      <div className={"w-full h-8 rounded-xl bg-slate-200 relative"}>
        <div
          className={`absolute left-0 top-0 w-[${percentage}%] bg-red-500 z-10 h-8 rounded-xl`}
        />
      </div>
    </div>
  );
}

const diseasesList = ["당뇨", "고혈압", "고지혈증"];
export default function Profile(): ReactElement {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHalal, setIsHalal] = useState(false);
  const [isHindu, setIsHindu] = useState(false);
  const [isLowSalt, setIsLowSalt] = useState(false);
  const [isDiabetes, setIsDiabetes] = useState(false);
  const [isHBP, setIsHBP] = useState(false);
  const [isHyperlipidemia, setIsHyperlipidemia] = useState(false);

  const router = useRouter();

  // 채식 토글 함수
  const toggleVegetarian = () => {
    setIsVegetarian(!isVegetarian);
  };
  const toggleHalal = () => {
    setIsHalal(!isHalal);
  };
  const toggleHindu = () => {
    setIsHindu(!isHindu);
  };
  const toggleLowSalt = () => {
    setIsLowSalt(!isLowSalt);
  };

  const toggleDiabetes = () => {
    setIsDiabetes(!isDiabetes);
  };

  const toggleHBP = () => {
    setIsHBP(!isHBP);
  };

  const toggleHyperlipidemia = () => {
    setIsHyperlipidemia(!isHyperlipidemia);
  };

  useEffect(() => {
    async function updateUserData() {
      await pb.collection("users").update(pb.authStore.model?.id, {
        isVegan: isVegetarian,
        isHalal: isHalal,
        isHindu: isHindu,
        isLowSalt: isLowSalt,
        isDiabetes: isDiabetes,
        isHBP: isHBP,
        isHyperlipidemia: isHyperlipidemia,
      });
    }
    updateUserData();
  }, [
    isDiabetes,
    isHBP,
    isHalal,
    isHindu,
    isHyperlipidemia,
    isLowSalt,
    isVegetarian,
  ]);

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/auth/signin");
    }
    async function getUserData() {
      const userData = await pb
        .collection("users")
        .getOne(pb.authStore.model?.id);
      setIsVegetarian(userData.isVegan);
      setIsLowSalt(userData.isLowSalt);
      setIsHindu(userData.isHindu);
      setIsHalal(userData.isHalal);
      setIsDiabetes(userData.isDaibetes);
      setIsHBP(userData.isHBP);
      setIsHyperlipidemia(userData.isHyperlipidemia);
    }
    getUserData();
  }, [router]);

  return (
    <div className="w-full min-h-screen flex justify-start flex-col p-4 space-y-2">
      <Link href={"/"} className={"flex space-x-2 items-center group"}>
        <ChevronDoubleLeftIcon className={"size-6"} />
        <div className={"group-hover:underline"}>홈</div>
      </Link>
      <div className="text-2xl font-bold">프로필</div>

      <StatusBar title={"총 섭취 칼로리"} percentage={21} />
      {/* 채식 */}
      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>채식</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isVegetarian}
            onChange={toggleVegetarian}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>

      {/* 종교 선택 */}
      {/*할랄, 힌두, 저염*/}
      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>할랄</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isHalal}
            onChange={toggleHalal}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>
      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>힌두</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isHindu}
            onChange={toggleHindu}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>
      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>저염</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isLowSalt}
            onChange={toggleLowSalt}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>

      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>당뇨</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDiabetes}
            onChange={toggleDiabetes}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>
      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>고혈압</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isHBP}
            onChange={toggleHBP}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>
      <div className={"p-2 bg-white rounded-xl flex justify-between"}>
        <div className={"text-lg font-semibold"}>고지혈증</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isHyperlipidemia}
            onChange={toggleHyperlipidemia}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>
      <button
        onClick={() => {
          pb.authStore.clear();
          router.refresh();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
