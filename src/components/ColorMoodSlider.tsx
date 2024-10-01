import React, { useState } from "react";
import colorEmotion from "./json/coloremotion.json";
import { GrPrevious, GrNext } from "react-icons/gr";

const ITEMS_PER_PAGE = 3;

const ColorMoodSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  const getContrastingColor = (hexCode: string) => {
    const r = parseInt(hexCode.substring(1, 3), 16);
    const g = parseInt(hexCode.substring(3, 5), 16);
    const b = parseInt(hexCode.substring(5, 7), 16);
       const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return brightness > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Calculate the start and end index for the current page
  const startIndex = activeSlide * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold">
        Color Your{" "}
        <span className="bg-gradient-to-r from-[var(--dark-green)] to-[var(--primary-color)] bg-clip-text text-transparent">
          Emotions
        </span>
      </h2>
      <div className="flex flex-col items-center mt-6">
        <div className="flex justify-center items-center overflow-x-auto space-x-4">
          {colorEmotion.slice(startIndex, endIndex).map((color, index) => {
            const boxSize =
              index === 1
                ? { width: "300px", height: "250px" }
                : { width: "200px", height: "200px" };
            return (
              <div
                key={index + startIndex}
                style={{
                  backgroundColor: color.hexCode,
                  width: boxSize.width,
                  height: boxSize.height,
                }}
                className="rounded-lg shadow-lg relative flex flex-col items-center justify-center transition-transform duration-300"
                onClick={() => handleSlideChange(index + startIndex)}
              >
                <div className="flex  space-x-4 ">
                  <h3
                    style={{
                      color: getContrastingColor(color.hexCode),
                    }}
                    className=" font-bold"
                  >
                    {color.colorname}
                  </h3>
                  <h4
                    style={{
                      color: getContrastingColor(color.hexCode),
                    }}
                    className=" "
                  >
                    {color.hexCode}
                  </h4>
                </div>
                <h5 className="text-center py-2 flex flex-col items-center">
                  {color.mood.split(", ").map((mood, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: getContrastingColor(color.hexCode),
                      }}
                    >
                      {mood}
                      <div className="border-gray-500 border-t-2 w-10 mx-auto" />
                    </span>
                  ))}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center my-8">
        <button
          aria-label="Previous colors"
          className={`px-4 py-2 rounded-md mr-4 bg-[var(--light-gray)] }`}
          onClick={() => handleSlideChange(activeSlide - 1)}
          disabled={activeSlide === 0} 
        >
          <GrPrevious />
        </button>

        <button
          aria-label="Next colors"
          className={`next-button px-4 py-2 rounded-md bg-[var(--light-gray)] }`}
          onClick={() => handleSlideChange(activeSlide + 1)}
          disabled={endIndex >= colorEmotion.length} 
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default ColorMoodSlider;
