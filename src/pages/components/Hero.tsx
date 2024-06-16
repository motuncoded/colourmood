import { roboto_mono } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import colors from "./coloring.json";
import { inherits } from "util";
function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevQuote) => (prevQuote + 1) % colors.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div
      className={`${roboto_mono.className} flex justify-around place-items-center  mt-6 max-sm:flex-col-reverse`}
    >
      <div className="w-[600px] max-sm:flex flex-col justify-center max-sm:w-[400px]">
        <h2 className="text-6xl font-semibold max-sm:text-4xl">
          Create beautiful color scheme that works
        </h2>
        <h3>
          Feeling adventurous? Try our feature or create your own custom palette
          with our intuitive tool.{" "}
        </h3>
        <div className="flex mt-6  ">
          <button
            type="submit"
            className=" bg-[var(--primary-color)] p-[.75rem] text-[var(--secondary-color)] rounded"
          >
            Explore palettes
          </button>
        </div>
      </div>
      <div className="border-[8px] rounded-xl border-[var(--primary-color)]  w-[400px] h-[400px] flex my-4 ">
        {colors[currentIndex].colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color.hex, width: "200px" }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
