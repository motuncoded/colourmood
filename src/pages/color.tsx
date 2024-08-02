import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import colors from "../components/json/colour.json";
import ColorList from "../components/ColorList";



type ResultState = {
  hexCode: string;
  colorName: string;
  rgb: string;
}[];

export default function Color() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<ResultState>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
}

 

  function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const handleSearch = (searchTerm: string) => {
    const filteredColors = colors.filter((color) => {
      const colorName = color.colorname.toLowerCase();
      const hexCode = color.hexCode.toLowerCase();
      return (
        colorName.includes(searchTerm.toLowerCase()) ||
        hexCode.includes(searchTerm.toLowerCase())
      );
    });

    const result = filteredColors.map((color) => ({
      hexCode: color.hexCode,
      colorName: color.colorname,
      rgb: hexToRgb(color.hexCode), // Convert hex to RGB
    }));

    setResult(result);
  };

  return (
    <div>
      <div className="flex justify-center items-center my-4">
 
        <div className="bg-transparent w-2/5 border p-2 rounded flex justify-start items-center shadow-md max-sm:w-3/5 sm:w-3/5">
          <BsSearch aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search by hex code or name of color"
            className="bg-transparent w-4/5 outline-none ml-4 "
            style={{
              fontSize: "clamp(.875rem, 5vw, .75rem)",
            }}
            aria-label="Search by hex code or name of color "
          />
        </div>
        <button
          type="button"
          onClick={() => handleSearch(searchTerm)}
          className=" bg-[var(--button-color)] px-[.75rem] py-[.5rem] text-[var(--light-color)] rounded-xl hover:text-[var(--secondary-color)] mx-4"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      {searchTerm === "" && <ColorList />}
      {searchTerm !== "" && result.length > 0 && (
        <div className="my-16 max-sm:my-8">
          <ul className="grid grid-cols-6 gap-4  max-sm:grid-cols-2 max-sm:gap-2 mx-4 max-md:grid-cols-3 max-lg:grid-cols-3 max-xl:grid-cols-4">
                      {result.map((color, index) => (
                          <li
                              key={index}
                              className="flex justify-center max-sm:justify-center "
                          >
                              <div className="flex flex-col  justify-center items-center  font-medium  p-2 ">
                                  <div
                                      style={{ backgroundColor: color.hexCode }}
                                      className="w-[200px] h-[50px] mx-[.75rem ] rounded-xl max-sm:w-[150px]"
                                      aria-label={`Color: ${color.hexCode}`}
                                  />
                                  <p className="text-[.9rem] pt-2 max-sm:text-[.65rem]  max-sm:text-center">
                                      {color.colorName}
                                  </p>
                                  <p className="text-[.9rem] max-sm:text-[.65rem] max-sm:text-center">
                                      {color.hexCode}
                                  </p>
                                  <p className="text-[.9rem] max-sm:text-[.65rem] uppercase max-sm:text-center">
                                      {color.rgb}
                                  </p>
                              </div>
                          </li>
                      ))}
            </ul>

        </div>
      )}
    </div>
  );
}
