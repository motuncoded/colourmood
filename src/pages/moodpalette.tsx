import palettes from "../components/json/mood_colors.json";
import React, { useState } from "react";

type ColorInfo = {
  hexCode: string;
};

type Palette = {
  mood: string;
  colors: string[];
};

type CopiedState = {
  [key: string]: boolean;
};

function getAllPalettes(): Palette[] {
  return palettes;
}

const MoodPalette = () => {
  const [lengthVisible, setLengthVisible] = useState(6);
  const [copied, setCopied] = useState<CopiedState>({});
  const allPalettes = getAllPalettes();
  const hasMore = lengthVisible < allPalettes.length;

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to get contrasting color
  const getContrastingColor = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return brightness > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Function to handle "View More" button click
  const handleViewMore = () => {
    setLengthVisible((prevLength) => prevLength + 6);
  };

  return (
    <div className="pt-[5rem] py-[2rem] min-h-[100vh]">
      <h2
        style={{ fontSize: "clamp(1.25rem, 5vw, 2.25rem)" }}
        className="text-center py-2 font-semibold text-[var(--primary-color)]"
      >
        Trending Mood Palettes
      </h2>
      <div>
        <div className="grid grid-cols-3 gap-3 p-4 max-sm:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 place-items-center">
          {allPalettes.slice(0, lengthVisible).map((palette, index) => (
            <div
              key={index}
              className="bg-[var(--light)] shadow-lg p-[0.5rem] rounded-lg"
            >
              <ul>
                {shuffleArray(palette.colors)
                  .slice(0, 6)
                  .map((color, colorIndex) => (
                    <li
                      key={colorIndex}
                      style={{
                        backgroundColor: color,
                        display: "inline-block",
                      }}
                      className={`relative w-[75px] max-sm:text-[.75rem] max-md:text-[.85rem]  max-xl:text-[.85rem] max-sm:w-[60px] max-xl:w-[60px] h-[150px] ${
                        colorIndex === 0 ? "rounded-l-xl" : ""
                      } ${colorIndex === 5 ? "rounded-r-lg" : ""}`}
                    >
                      <span
                        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                        style={{ color: getContrastingColor(color) }}
                      >
                        {color}
                      </span>
                    </li>
                  ))}
              </ul>
              <div>
                <h2
                  style={{
                    fontSize: "clamp(1rem, 5vw, 1.25rem)",
                    background: palette.colors[0],
                    color: getContrastingColor(palette.colors[0]),
                  }}
                  className="overflow-x-auto truncate text-xl font-bold rounded-md px-4 py-2"
                >
                  {palette.mood}
                </h2>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center items-center p-2">
            <button
              className="relative bg-[var(--primary-color)] text-[var(--light)] px-4 py-2 rounded
              transition transform duration-300 hover:scale-110 hover:bg-accent focus:outline-none"
              onClick={handleViewMore}
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodPalette;
