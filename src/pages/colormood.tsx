import React, { useState, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import ColorData from "../components/colours.json";
import ColorList from "./ColorList";

interface HexCode {
  mood1: string;
  mood2: string;
  mood3: string;
}

interface Item {}

type ColorDataType = Item[];

export default function Color() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return ColorData;

    return ColorData.filter(
      (item) =>
        item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hexCodes.some(
          (hex) =>
            hex.mood1.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hex.mood2.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hex.mood3.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
  }, [searchTerm]);

  // Handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchTerm(e.currentTarget.value); // Assuming you want to use the button's value, which might need adjustment based on your actual implementation
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
            aria-label="Search by hex code or mood"
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className="bg-blue-500 hover:bg-blue-700 text-white ml-4 px-4 py-2 rounded-xl"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      {searchTerm === "" ? (
        <ColorList />
      ) : filteredData.length > 0 ? (
        <div className="max-w-[100%] w-[calc(100% - 2rem)] m-auto">
          <ul className="grid grid-cols-6 gap-4 pt-4 max-sm:grid-cols-3 max-sm:gap-2 mx-4 max-md:grid-cols-3 max-lg:grid-cols-3 max-xl:grid-cols-4">
            {filteredData.map((item) => (
              <li
                key={item.id}
                className="flex justify-center items-center flex-col mx-4"
              >
                <div className="flex justify-center items-center flex-col">
                  <div
                    style={{ backgroundColor: item.color }}
                    className="w-[200px] h-[200px] mx-[.75rem] max-sm:w-[85px] max-sm:h-[85px] max-sm:mx-[.4rem] rounded-lg shadow-lg"
                    aria-label={`Color: ${item.color}`}
                  />
                  <p className="uppercase">{item.color}</p>
                  {item.hexCodes.map((hex, index) => (
                    <div key={index} className="flex">
                      <p className="pr-2">{`${hex.mood1}, ${hex.mood2} and ${hex.mood3}`}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center mt-4">No results found.</p>
      )}
    </div>
  );
}
