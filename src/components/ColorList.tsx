import { useState, useEffect, useCallback } from "react";
import { GetColorName } from "hex-color-to-color-name";
import { useRouter } from "next/router";
import { FaCopy } from "react-icons/fa6";

interface ColorInfo {
  hex: string;
  rgb: string;
  colorName: string;
}
const CopyAlert = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50"
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white rounded-lg p-4 text-lg text-center"
        style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}
      >
        <p>Copied to clipboard!</p>
      </div>
    </div>
  );
};

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = `#${r.toString(16).padStart(2, "0").toUpperCase()}${g.toString(16).padStart(2, "0").toUpperCase()}${b.toString(16).padStart(2, "0").toUpperCase()}`;
  const rgb = `rgb(${r},${g},${b})`;
  const colorName = GetColorName(hex);

  return { hex, rgb, colorName };
};

const ColorList = () => {
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [secondaryColors, setSecondaryColors] = useState<ColorInfo[]>([]);
  const [tertiaryColors, setTertiaryColors] = useState<ColorInfo[]>([]);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const generateColors = () => {
    const newColors = [];
    for (let i = 0; i < 6; i++) {
      newColors.push(generateRandomColor());
    }
    setColors(newColors);
    const newSecondaryColors = [];
    for (let i = 0; i < 6; i++) {
      newSecondaryColors.push(generateRandomColor());
    }
    setSecondaryColors(newSecondaryColors);
    const newTertiaryColors = [];
    for (let i = 0; i < 6; i++) {
      newTertiaryColors.push(generateRandomColor());
    }
    setTertiaryColors(newTertiaryColors);
  };
  useEffect(() => {
    generateColors();
  }, []);
  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); 
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  }, []);

  return (
    <div className="my-16 max-sm:my-8">
      <div className="max-w-[100%] w-[calc(100% - 2rem)] m-auto">
        <ul className="grid grid-cols-6 gap-4  max-sm:grid-cols-2 max-sm:gap-2 mx-4 max-md:grid-cols-3 max-lg:grid-cols-3 max-xl:grid-cols-4">
          {colors.map((color: ColorInfo, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col mx-4"
            >
              <div
                style={{
                  backgroundColor: color.hex,
                  transition: "background-color 0.5s ease-in-out",
                }}
                className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
              />
              <p className="text-[.9rem] pt-2 max-sm:text-[.65rem] max-sm:text-center 	">
                {color.colorName}
              </p>
              <p
                className="text-[.9rem] max-sm:text-[.65rem] relative flex justify-center items-center "
                onClick={() => handleCopyToClipboard(color.hex)}
              >
                {" "}
                {color.hex}
                <span className=" mx-1">
                  <FaCopy className="text-gray-600 md:text-lg lg:text-xl" />
                </span>
              </p>
              <p className="text-[.9rem] max-sm:text-[.65rem] ">{color.rgb}</p>
            </li>
          ))}
          {secondaryColors.map((color: ColorInfo, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col"
            >
              <div
                style={{
                  backgroundColor: color.hex,
                  transition: "background-color 0.5s ease-in-out",
                }}
                className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
              />
              <p className="text-[.9rem] pt-2 max-sm:text-[.65rem] max-sm:text-center 	">
                {color.colorName}
              </p>
              <p
                className="text-[.9rem] max-sm:text-[.65rem] relative flex justify-center items-center "
                onClick={() => handleCopyToClipboard(color.hex)}
              >
                {" "}
                {color.hex}
                <span className=" mx-1">
                  <FaCopy size={16} className="text-gray-600" />
                </span>
              </p>{" "}
              <p className="text-[.9rem] max-sm:text-[.65rem] ">{color.rgb}</p>
            </li>
          ))}
          {tertiaryColors.map((color: ColorInfo, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col "
            >
              <div
                style={{
                  backgroundColor: color.hex,
                  transition: "background-color 0.5s ease-in-out",
                }}
                className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
              />
              <p className="text-[.9rem] pt-2 max-sm:text-[.65rem] max-sm:text-center">
                {color.colorName}
              </p>
              <p
                className="text-[.9rem] max-sm:text-[.65rem] relative flex justify-center items-center "
                onClick={() => handleCopyToClipboard(color.hex)}
              >
                {" "}
                {color.hex}
                <span className=" mx-1">
                  <FaCopy size={16} className="text-gray-600" />
                </span>
              </p>{" "}
              <p className="text-[.9rem] max-sm:text-[.65rem]">{color.rgb}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center  py-4">
          <button
            type="submit"
            onClick={generateColors}
            className="bg-[var(--button-color)] hover:text-[var(--secondary-color)]
         text-[var(--light)] px-4 py-2 rounded-xl"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorList;
