import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { FaCopy, FaCheck } from "react-icons/fa6";
import colors from "../components/json/colour.json";

interface ColorInfo {
  hexCode: string;
  rgb: string;
  colorname: string;
}
type CopiedState = {
  [key: string]: boolean;
};
function convertHexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

const ColorList = () => {
  const [colorsList, setColorsList] = useState<ColorInfo[]>([]);
  const [secondaryColorsList, setSecondaryColorsList] = useState<ColorInfo[]>(
    [],
  );
  const [tertiaryColorsList, setTertiaryColorsList] = useState<ColorInfo[]>([]);
  const [copied, setCopied] = useState<CopiedState>({});

  const router = useRouter();

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    return {
      hexCode: color.hexCode,
      rgb: convertHexToRgb(color.hexCode),
      colorname: color.colorname,
    };
  };

  const generateColors = () => {
    const newColors = Array(6)
      .fill(0)
      .map(() => generateRandomColor());
    setColorsList(newColors);
    const newSecondaryColors = Array(6)
      .fill(0)
      .map(() => generateRandomColor());
    setSecondaryColorsList(newSecondaryColors);
    const newTertiaryColors = Array(6)
      .fill(0)
      .map(() => generateRandomColor());
    setTertiaryColorsList(newTertiaryColors);
  };
  useEffect(() => {
    generateColors();
  }, []);

  const handleCopyToClipboard = useCallback(
    (text: string, color: ColorInfo) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied((prevCopied) => ({ ...prevCopied, [color.hexCode]: true }));
          setTimeout(() => {
            setCopied((prevCopied) => ({
              ...prevCopied,
              [color.hexCode]: false,
            }));
          }, 1500);
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
        });
    },
    [],
  );

  return (
    <div className="my-16 max-sm:my-8">
      <ul className="grid grid-cols-6 gap-4  max-sm:grid-cols-2 max-sm:gap-2 mx-4 max-md:grid-cols-3 max-lg:grid-cols-3 max-xl:grid-cols-4">
        {colorsList.map((color: ColorInfo, index) => (
          <li
            key={index}
            className="flex justify-center items-center flex-col mx-4"
          >
            <div
              style={{
                backgroundColor: color.hexCode,
                transition: "background-color 0.5s ease-in-out",
              }}
              className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
            />
            <p className="text-[.9rem] pt-2 max-sm:text-[.75rem] max-sm:text-center 	">
              {color.colorname}
            </p>
            <p className="text-[.9rem] max-sm:text-[.75rem] relative flex justify-center items-center ">
              {" "}
              {color.hexCode}
              <span
                className="mx-1"
                onClick={(e) => handleCopyToClipboard(color.hexCode, color)}
              >
                {copied[color.hexCode] ? (
                  <FaCheck size={16} className="text-green-600" />
                ) : (
                  <FaCopy size={16} className="text-black-600" />
                )}
              </span>
            </p>
            <p className="text-[.9rem] max-sm:text-[.75rem] ">{color.rgb}</p>
          </li>
        ))}
        {secondaryColorsList.map((color: ColorInfo, index) => (
          <li key={index} className="flex justify-center items-center flex-col">
            <div
              style={{
                backgroundColor: color.hexCode,
                transition: "background-color 0.5s ease-in-out",
              }}
              className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
            />
            <p className="text-[.9rem] pt-2 max-sm:text-[.75rem] max-sm:text-center 	">
              {color.colorname}
            </p>
            <p className="text-[.9rem] max-sm:text-[.75rem] relative flex justify-center items-center ">
              {" "}
              {color.hexCode}
              <span
                className="mx-1"
                onClick={(e) => handleCopyToClipboard(color.hexCode, color)}
              >
                {copied[color.hexCode] ? (
                  <FaCheck size={16} className="text-green-600" />
                ) : (
                  <FaCopy size={16} className="text-gray-600" />
                )}
              </span>
            </p>{" "}
            <p className="text-[.9rem] max-sm:text-[.75rem] ">{color.rgb}</p>
          </li>
        ))}
        {tertiaryColorsList.map((color: ColorInfo, index) => (
          <li
            key={index}
            className="flex justify-center items-center flex-col "
          >
            <div
              style={{
                backgroundColor: color.hexCode,
                transition: "background-color 0.5s ease-in-out",
              }}
              className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
            />
            <p className="text-[.9rem] pt-2 max-sm:text-[.75rem] max-sm:text-center">
              {color.colorname}
            </p>
            <p className="text-[.9rem] max-sm:text-[.75rem] relative flex justify-center items-center ">
              {" "}
              {color.hexCode}
              <span
                className="mx-1"
                onClick={(e) => handleCopyToClipboard(color.hexCode, color)}
              >
                {copied[color.hexCode] ? (
                  <FaCheck size={16} className="text-green-600" />
                ) : (
                  <FaCopy size={16} className="text-gray-600" />
                )}
              </span>
            </p>{" "}
            <p className="text-[.9rem] max-sm:text-[.75rem]">{color.rgb}</p>
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
  );
};

export default ColorList;
