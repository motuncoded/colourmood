import React, { useState, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import { GetColorName } from "hex-color-to-color-name";
import { colorNamesToHexCodes } from "./colornames";
import ColorList from "./ColorList";

interface ColorNamesToHexCodes {
  [key: string]: string;
}
type ResultState = {
  hexCode: string;
  colorName: string;
  shades: string[];
};

function getShades(hexCode: string): string[] {
  const shades: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const shadeHex = lightenDarkenColor(hexCode, i * 20);
    shades.push(shadeHex);
  }
  return shades;
}

function lightenDarkenColor(hexCode: string, amount: number): string {
  const hex = hexCode.replace(/^#/, "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));

  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

export default function Color() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState({
    hexCode: "",
    colorName: "",
    shades: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getHexCode = (colorName: string) => {
    return (
      colorNamesToHexCodes[colorName.toUpperCase()] ||
      colorNamesToHexCodes[colorName.toLowerCase()] ||
      ""
    );
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (searchTerm.startsWith("#")) {
      // Search by hex code
      const colorName = GetColorName(searchTerm);
      const shades = getShades(searchTerm);
      setResult({ hexCode: searchTerm, colorName, shades });
    } else {
      // Search by color name
      const hexCode = getHexCode(searchTerm);
      if (hexCode) {
        const shades = getShades(hexCode);
        setResult({ hexCode, colorName: searchTerm, shades });
      } else {
        setResult({ hexCode: "", colorName: "", shades: [] });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <div className="bg-transparent w-2/5 border p-2 rounded flex justify-start items-center shadow-md">
          <BsSearch aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Input a hex code or mood"
            className="bg-transparent w-4/5 outline-none ml-4"
            aria-label="Search by hex code or name of color "
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className=" bg-[var(--button-color)] p-[.6rem] text-[var(--light-color)] rounded hover:text-[var(--secondary-color)] mx-4"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      {searchTerm === "" ? (
        <ColorList />
      ) : (
        <ul className="grid grid-cols-6 gap-4 pt-4 max-sm:grid-cols-3 max-sm:gap-2 mx-4 max-md:grid-cols-3 max-lg:grid-cols-3 max-xl:grid-cols-4">
          {result.hexCode && result.colorName && (
            <li className="flex justify-center items-center flex-col mx-4">
              <div className="flex justify-center items-center flex-col">
                <div
                  style={{ backgroundColor: result.hexCode }}
                  className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg"
                  aria-label={`Color: ${result.hexCode}`}
                />
                <p className="uppercase">{result.hexCode}</p>
                <p className="">{result.colorName}</p>
                <div className="px-4 my-4">
                  <h4 className="text-[1.5rem] font-bold py-4">
                    Monochromatic
                  </h4>
                  {result.shades.map((shade, index) => (
                    <div key={index} className=" my-2 ">
                      <div
                        style={{ backgroundColor: shade }}
                        className="w-[200px] h-[50px] mx-[.75rem ] rounded-lg shadow-lg"
                        aria-label={`Shade ${index + 1}: ${shade}`}
                      />
                      <p className="uppercase">{shade}</p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
