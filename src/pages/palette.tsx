import { roboto_flex } from "@/styles/fonts";
import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { FaCopy, FaCheck } from "react-icons/fa6";
import colors from "../components/json/colour.json";

interface NavItemProps {
  href: string;
  children: ReactNode;
}

interface ColorInfo {
  hex: string;
  rgb: string;
  colorName: string;
}
type CopiedState = {
  [key: string]: boolean;
};
const ColorPalette = () => {
  const [palettes, setPalettes] = useState<Array<string[]>>([]);
  const [hasMore, setHasMore] = useState(false);
  const [copied, setCopied] = useState<CopiedState>({});

  const generatePalettes = () => {
    const newPalettes: string[][] = [];
    for (let i = 0; i < 12; i++) {
      const palette: string[] = [];

      for (let j = 0; j < 5; j++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex].hexCode;
        palette.push(color);
      }
      newPalettes.push(palette);
    }
    setPalettes((prevPalettes) => [...prevPalettes, ...newPalettes]);
  };
  useEffect(() => {
    generatePalettes();
    setHasMore(true); // Set hasMore to true after the first batch of palettes is generated
  }, []);

  const handleLoadMore = () => {
    generatePalettes();
  };

  const getContrastingColor = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return brightness > 0.5 ? "#000000" : "#FFFFFF";
  };
  const handleCopyToClipboard = useCallback((text: string, hex: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied((prevCopied) => ({ ...prevCopied, [hex]: true }));
        setTimeout(() => {
          setCopied((prevCopied) => ({ ...prevCopied, [hex]: false }));
        }, 1500);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  }, []);

  return (
    <div className={`${roboto_flex}`}>
      <h2 className="text-4xl text-center py-4  font-semibold text-[var(--primary-color)]">
        Trending color palettes
      </h2>

      <div className="grid grid-cols-3 gap-3 p-4 max-sm:grid-cols-1 place-items-center max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2">
        {palettes.map((palette, paletteIndex) => (
          <ul key={paletteIndex}>
            {palette.map((color, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: color,
                  display: "inline-block",
                }}
                className={` ${index === 0 ? "rounded-l-lg" : ""} ${index === palette.length - 1 ? "rounded-r-lg" : ""} relative w-[75px] h-[150px]`}
              >
                <span
                  className="absolute top-0 left-0 w-full h-full flex justify-center flex-col items-center text-sm opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                  style={{ color: getContrastingColor(color) }}
                  onClick={(e) => handleCopyToClipboard(color, color)}
                >
                  {color}
                  {copied[color] ? (
                    <FaCheck size={16} className="text-green-600" />
                  ) : (
                    <FaCopy size={16} className="text-black-900 " />
                  )}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center items-center p-2">
          <button
            className="bg-[var(--primary-color)]
         text-[var(--light)] px-4 py-2 rounded"
            onClick={handleLoadMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
