import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import colors from "./colour.json";
import ColorList from "./ColorList";

type ResultState = {
  hexCode: string;
  colorName: string;
  rgb: string;
};

export default function Color() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState({
    hexCode: "",
    colorName: "",
    rgb: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const handleSearchClick = () => {
    if (searchTerm.startsWith("#")) {
      const foundColor = colors.find(
        (color) => color.hexCode === searchTerm.toUpperCase(),
      );
      if (foundColor) {
        const colorInfo = {
          hexCode: foundColor.hexCode,
          colorName: foundColor.colorname,
          rgb: hexToRgb(foundColor.hexCode), // Convert hex to RGB
        };
        setResult(colorInfo);
      } else {
        setResult({ hexCode: "", colorName: "", rgb: "" });
      }
    } else {
      const foundColor = colors.find(
        (color) => color.colorname.toLowerCase() === searchTerm.toLowerCase(),
      );
      if (foundColor) {
        // Extract only the needed properties
        const colorInfo = {
          hexCode: foundColor.hexCode,
          colorName: foundColor.colorname,
          rgb: hexToRgb(foundColor.hexCode), // Convert hex to RGB
        };
        setResult(colorInfo); // Use the adjusted object
      } else {
        setResult({ hexCode: "", colorName: "", rgb: "" }); // Provide a default empty object
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <div className="bg-transparent w-2/5 border p-2 rounded flex justify-start items-center shadow-md max-sm:w-3/5 sm:w-3/5">
          <BsSearch aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Input a hex code or color name"
            className="bg-transparent w-4/5 outline-none ml-4 "
            aria-label="Search by hex code or name of color "
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className=" bg-[var(--button-color)] px-[.75rem] py-[.35rem] text-[var(--light-color)] rounded hover:text-[var(--secondary-color)] mx-4"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      {searchTerm === "" ? (
        <ColorList />
      ) : (
        <div className="my-8 max-w-">
          {result && (
            <ul className="">
              <li className="flex justify-center max-sm:justify-center ">
                <div className="flex flex-col  justify-center items-center  font-medium  p-2 ">
                  <div
                    style={{ backgroundColor: result.hexCode }}
                    className="w-[200px] h-[50px] mx-[.75rem ] rounded-xl"
                    aria-label={`Color: ${result.hexCode}`}
                  />
                  <p className="text-[.9rem]max-sm:text-[.65rem] max-sm:text-center">
                    {result.colorName}
                  </p>
                  <p className="text-[.9rem] max-sm:text-[.65rem] max-sm:text-center">
                    {result.hexCode}
                  </p>
                  <p className="text-[.9rem] max-sm:text-[.65rem] max-sm:text-center">
                    {result.rgb}
                  </p>
                </div>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
