"use client";
import { ReactElement, useState } from "react";

export default function Profile(): ReactElement {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const diseasesList = ["당뇨", "고혈압", "고지혈증", "비타민 및 영양소 결핍"];

  // 채식 토글 함수
  const toggleVegetarian = () => {
    setIsVegetarian(!isVegetarian);
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

  return (
    <div className="w-full h-screen grid justify-center">
      <div className="text-xl font-bold">프로필</div>

      {/* 채식 */}
      <fieldset>
        <legend>채식</legend>
        <label>
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={toggleVegetarian}
          />
          채식
        </label>
      </fieldset>

      <fieldset>
        <legend>영양소 및 비타민</legend>
      </fieldset>

      {/* 종교 선택 */}
      <fieldset>
        <legend>종교</legend>
        <select
          value={selectedReligion}
          onChange={(e) => handleReligionSelect(e.target.value)}
        >
          <option value="">선택하세요</option>
          <option value="이슬람교">이슬람교</option>
          <option value="힌두교">힌두교</option>
          <option value="그외">그외</option>
        </select>
      </fieldset>

      {/* 질병 선택 */}
      <fieldset>
        <legend>질병</legend>
        <ul>
          {diseasesList.map((disease, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedDiseases.includes(disease)}
                  onChange={() => handleDiseaseSelect(disease)}
                />
                {disease}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}
