import React, { useState } from "react";
import { roboto_mono } from "@/styles/fonts";
import { GetColorName } from "hex-color-to-color-name";

interface ColorInfo {
  hex: string;
  rgb: string;
  colorName: string;
}

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = `#${r.toString(16).padStart(2, "0").toUpperCase()}${g.toString(16).padStart(2, "0").toUpperCase()}${b.toString(16).padStart(2, "0").toUpperCase()}`;
  const rgb = `rgb(${r},${g},${b})`;
  const colorName = GetColorName(hex); // returns 'Black'

  return { hex, rgb, colorName };
};

const ColorList = () => {
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [secondaryColors, setSecondaryColors] = useState<ColorInfo[]>([]);
  const [tertiaryColors, setTertiaryColors] = useState<ColorInfo[]>([]);
  const [generated, setGenerated] = useState(false);


  const generateColors = () => {
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      newColors.push(generateRandomColor());
    }
    setColors(newColors);
    const newSecondaryColors = [];
    for (let i = 0; i < 5; i++) {
      newSecondaryColors.push(generateRandomColor());
    }
    setSecondaryColors(newSecondaryColors);
    const newTertiaryColors = [];
    for (let i = 0; i < 6; i++) {
      newTertiaryColors.push(generateRandomColor());
    }
    setTertiaryColors(newTertiaryColors);
    setGenerated(true);
    };

  return (
    <div className={`${roboto_mono.className}`}>
      <h2 className="text-center text-2xl">A World of Vibrant Hues</h2>
      <div className="max-w-[100%] w-[calc(100% - 2rem)] m-auto">
        <ul className="grid grid-cols-6 gap-4 pt-4 max-sm:grid-cols-3 max-sm:gap-2 mx-4 max-md:grid-cols-3 max-lg:grid-cols-3 max-xl:grid-cols-4">
          {colors.map((color: ColorInfo, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col mx-4"
            >
              <div
                style={{ backgroundColor: color.hex }}
                className="w-[200px] h-[200px] mx-[.75rem] max-sm:w-[85px] max-sm:h-[85px] max-sm:mx-[.4rem]"
              />
              <p className="text-[.9rem] max-sm:text-[.65rem] max-sm:text-center 	">
                {color.colorName}
              </p>
              <p className="text-[.9rem] max-sm:text-[.65rem]  ">
                {" "}
                {color.hex}
              </p>
              <p className="text-[.9rem] max-sm:hidden">{color.rgb}</p>
            </li>
          ))}
          {secondaryColors.map((color: ColorInfo, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col"
            >
              <div
                style={{ backgroundColor: color.hex }}
                className="w-[200px] h-[200px] mx-[.75rem] max-sm:w-[85px] max-sm:h-[85px] max-sm:mx-[.25rem]"
              />
              <p className="text-[.9rem] max-sm:text-[.65rem] max-sm:text-center 	">
                {color.colorName}
              </p>
              <p className="text-[.9rem] max-sm:text-[.65rem] "> {color.hex}</p>
              <p className="text-[.9rem] max-sm:hidden">{color.rgb}</p>
            </li>
          ))}
          {tertiaryColors.map((color: ColorInfo, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col "
            >
              <div
                style={{ backgroundColor: color.hex }}
                className="w-[200px] h-[200px] mx-[.75rem] max-sm:w-[85px] max-sm:h-[85px] max-sm:mx-[.25rem]"
              />
              <p className="text-[.9rem] max-sm:text-[.65rem] max-sm:text-center">
                {color.colorName}
              </p>
              <p className="text-[.9rem] max-sm:text-[.65rem] "> {color.hex}</p>
              <p className="text-[.9rem] max-sm:hidden">{color.rgb}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center my-4">
          <button
            type="submit"
            onClick={generateColors}
            className="bg-[var(--primary-color)] hover:text-[var(--secondary-color)]
         text-[var(--light)] px-4 py-2 rounded-xl"
          >
            {generated ? "Regenerate" : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorList;
