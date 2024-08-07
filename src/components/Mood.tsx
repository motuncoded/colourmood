import React, { useState, useEffect } from "react";
import colors from "./json/coloursmood.json";
import { useRouter } from "next/router";

interface Color {
  hexCode: string;
  colorname: string;
  mood: string;
}

interface MoodProps {
  selectedMood: string;
}

const Mood: React.FC<MoodProps> = () => {
  const [selectedMood, setSelectedMood] =
    useState<string>("happy and cheerful");
  const [moodIndex, setMoodIndex] = useState<number>(1);
  const [showMoods, setShowMoods] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const allMoods = [...new Set(colors.map((color: Color) => color.mood))];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMoodIndex((prevIndex) => (prevIndex + 1) % allMoods.length);
      const newIndex = moodIndex % allMoods.length; // ensure newIndex is within bounds
      if (newIndex < allMoods.length && allMoods[newIndex] !== selectedMood) {
        setSelectedMood(allMoods[newIndex]);
      }
    }, 8000);
    return () => clearInterval(intervalId);
  }, [colors, moodIndex]);

  const filteredColors: Color[] = colors.filter(
    (color) => color.mood === selectedMood,
  );

  const getContrastingColor = (hexCode: string) => {
    const r = parseInt(hexCode.substring(1, 3), 16);
    const g = parseInt(hexCode.substring(3, 5), 16);
    const b = parseInt(hexCode.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? "black" : "white";
  };
  const router = useRouter();

  return (
    <div className="max-w-[1280px] w-[calc(100% - 1rem)] m-auto max-xl:px-2  py-8 max-sm:max-w-[340px] max-md:max-w-[540px] max-xl:max-w-[700px]">
      <h2 className="text-3xl  font-semibold ">
        What color are you?{" "}
        <span className=" bg-gradient-to-r from-[var(--dark-green)] to-[var(--primary-color)] bg-clip-text text-transparent">
          {selectedMood}
        </span>
      </h2>
      <div className="grid grid-cols-6 gap-4 my-8 max-sm:grid-cols-2 max-md:grid-cols-3 max-xl:grid-cols-3 items-center ">
        {filteredColors.map((color: Color, index: number) => (
          <div
            key={index}
            style={{
              backgroundColor: color.hexCode,
              transition: "background-color 0.5s ease-in-out",
            }}
            className=" w-[200px] max-sm:w-[125px] h-[50px] max-sm:h-[50px] rounded-lg flex justify-center items-center"
          >
            <span
              style={{
                color: getContrastingColor(color.hexCode),
              }}
              className="text-lg font-medium max-sm:text-sm"
            >
              {color.colorname}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={() => router.push("/colormood")}
          className="p-[.65rem] border-[2px] border-[var(--primary-color)] bg-[var(--light-color)] rounded-lg text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors duration-300"
        >
          Explore more
        </button>
      </div>
    </div>
  );
};

export default Mood;
