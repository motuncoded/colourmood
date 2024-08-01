import React, { useState, useEffect } from "react";
import coloursJson from "../components/json/colour.json";

interface Color {
  hexCode: string;
  colorname: string;
  mood: string;
  mood1: string;
  mood2: string; // Add more mood properties as needed
}

interface MoodProps {
  selectedMood: string;
}

const Mood: React.FC<MoodProps> = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [moodIndex, setMoodIndex] = useState<number>(0);

  const colors: Color[] = coloursJson.filter(
    (color) => color.mood !== undefined,
  ) as Color[];

  const allMoods = [
    ...new Set(
      colors.flatMap((color) => [color.mood, color.mood1, color.mood2]),
    ),
  ];

  useEffect(() => {
    const moods: string[] = [...new Set(colors.map((color) => color.mood))];
    const mood1s: string[] = [...new Set(colors.map((color) => color.mood1))];
    const mood2s: string[] = [...new Set(colors.map((color) => color.mood2))];

    const intervalId = setInterval(() => {
      setMoodIndex((prevIndex) => (prevIndex + 1) % allMoods.length);
      const newIndex = moodIndex % allMoods.length; // ensure newIndex is within bounds
      if (newIndex < allMoods.length && allMoods[newIndex] !== selectedMood) {
        setSelectedMood(allMoods[newIndex]);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [allMoods, moodIndex]);

  const filteredColors: Color[] = selectedMood
    ? colors.filter((color) => {
        if (color.mood === selectedMood) return true;
        if (color.mood1 === selectedMood) return true;
        if (color.mood2 === selectedMood) return true;
        return false;
      })
    : colors;

  return (
    <div className="min-h-[80vh] max-w-[1280px] w-[calc(100% - 2rem)] m-auto px-8">
      <h2 className="text-3xl  font-semibold ">
        What color are you?{" "}
        <span className=" bg-gradient-to-r from-[var(--dark-green)] to-[var(--primary-color)] bg-clip-text text-transparent">
          {selectedMood}
        </span>
      </h2>
      <div className="grid grid-cols-6 gap-4 my-8">
        {filteredColors.map((color: Color, index: number) => (
          <div
            key={index}
            style={{
              backgroundColor: color.hexCode,
              transition: "background-color 0.5s ease-in-out",
              filter: "brightness(1)",
            }}
            className="w-[200px] h-[125px] rounded-lg flex justify-center items-center text-white"
            onClick={() => setSelectedMood(color.mood)}
          >
            <span className="text-lg font-medium">{color.colorname}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mood;
