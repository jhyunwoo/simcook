"use client";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";

const diseasesList = ["당뇨", "고혈압", "고지혈증"];
export default function Profile(): ReactElement {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHalal, setIsHalal] = useState(false);
  const [isHindu, setIsHindu] = useState(false);
  const [isLowsalt, setIsLowsalt] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);

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
  const toggleLowsalt = () => {
    setIsLowsalt(!isLowsalt);
  };
  // 종교 선택 함수
  const handleReligionSelect = (religion: string) => {
    setSelectedReligion(religion);
  };

  // 질병 선택 함수
  const handleDiseaseSelect = (disease: string) => {
    if (selectedDiseases.includes(disease)) {
      setSelectedDiseases(selectedDiseases.filter((item) => item !== disease));
    } else {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/auth/signin");
    }
  }, [router]);

  return (
    <div className="w-full min-h-screen flex justify-start flex-col p-4 space-y-2">
      <Link href={"/"} className={"flex space-x-2 items-center group"}>
        <ChevronDoubleLeftIcon className={"size-6"} />
        <div className={"group-hover:underline"}>홈</div>
      </Link>
      <div className="text-2xl font-bold">프로필</div>
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
            checked={isLowsalt}
            onChange={toggleLowsalt}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>

      {/* 질병 선택 */}
      <div className={"p-2 bg-white rounded-lg"}>
        <legend>질병</legend>
        <div className={"grid grid-cols-3"}>
          {diseasesList.map((disease, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedDiseases.includes(disease)}
                  onChange={() => handleDiseaseSelect(disease)}
                />
                {disease}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
