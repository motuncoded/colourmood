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
};

interface Item {}

type ColorDataType = Item[];

export default function Color() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return ColorData; 

export default function Color() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState({
    hexCode: "",
    colorName: "",
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
      setResult({ hexCode: searchTerm, colorName, });
    } else {
      // Search by color name
      const hexCode = getHexCode(searchTerm);
      if (hexCode) {
        const colorName = GetColorName(hexCode); // Set colorName to the result of GetColorName(hexCode)
        setResult({ hexCode, colorName});
      } else {
        setResult({ hexCode: "", colorName: "" });
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
              </div>
            </li>
          )}
        </ul>

      )}
    </div>
  );
}
