import React, { useState, useEffect } from "react";
import colorEmotion from "./json/coloremotion.json";
import { GrPrevious, GrNext } from "react-icons/gr";

interface Color {
  colorname: string;
  hexCode: string;
  mood: string;
  shades: { shadeName: string; hexCode: string }[];
}

const ColorMoodSlider: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    setSelectedColor(colorEmotion[index]);
  };

  useEffect(() => {
    setSelectedColor(colorEmotion[activeSlide]);
  }, [activeSlide]);
  const getContrastingColor = (hexCode: string) => {
    const r = parseInt(hexCode.substring(1, 3), 16);
    const g = parseInt(hexCode.substring(3, 5), 16);
    const b = parseInt(hexCode.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? "black" : "white";
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold">
        {" "}
        Color Your{" "}
        <span className="bg-gradient-to-r from-[var(--dark-green)] to-[var(--primary-color)] bg-clip-text text-transparent">
          Emotions
        </span>
      </h2>
      {selectedColor && (
        <div className="flex justify-between max-sm:flex-col max-sm:pt-4 max-md:flex-col">
          <div className="flex flex-col p-4 items-center">
            <div
              style={{ backgroundColor: selectedColor?.hexCode }}
              className="w-[200px] h-[150px] rounded-lg shadow-lg  relative "
            >
              <div
                style={{
                  color: getContrastingColor(selectedColor?.hexCode),
                }}
                className="absolute text-gray-400 top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition duration-300 flex justify-center items-center text-lg"
              >
                {selectedColor?.hexCode}
              </div>
            </div>
            <h2 className="text-2xl font-bold pt-2">
              {selectedColor?.colorname}
            </h2>
            <h4 className="text-center py-5 flex flex-col items-center">
              {selectedColor.mood.split(", ").map((mood, index) => (
                <span key={index} className="">
                  {mood}
                  <div className="border-gray-500  border-t-2 w-10 mx-auto" />
                </span>
              ))}
            </h4>
          </div>
          <div>
            <ul className="grid grid-cols-4 gap-2 max-sm:grid-cols-2 max-md:grid-cols-3 max-xl:grid-cols-2 ">
              {selectedColor.shades.map((shade, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center m-2 relative"
                >
                  <div
                    style={{ backgroundColor: shade.hexCode }}
                    className="w-[150px] h-[125px] mx-[.75rem] rounded-xl"
                  >
                    <div
                      style={{
                        color: getContrastingColor(shade.hexCode),
                      }}
                      className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition duration-300 flex justify-center items-center text-lg "
                    >
                      {shade.hexCode}
                    </div>
                  </div>
                  <span>{shade.shadeName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className=" flex justify-center my-8">
        {activeSlide >= 1 && (
          <button
            className=" px-4 py-2 rounded-md bg-gray-300 mr-4"
            onClick={() =>
              handleSlideChange(
                (activeSlide - 1 + colorEmotion.length) % colorEmotion.length,
              )
            }
          >
            <GrPrevious />
          </button>
        )}
        <button
          className="next-button px-4 py-2 rounded-md bg-gray-300"
          onClick={() =>
            handleSlideChange((activeSlide + 1) % colorEmotion.length)
          }
          disabled={activeSlide === colorEmotion.length - 1}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default ColorMoodSlider;
