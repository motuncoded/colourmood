import { roboto_mono } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import colors from "./coloring.json";
import { useRouter } from "next/router";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevQuote) => (prevQuote + 1) % colors.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const router = useRouter();
  return (
    <div
      className={`${roboto_mono.className} flex justify-around place-items-center  mt-6 max-sm:flex-col-reverse max-md:flex-col-reverse max-lg:flex-col-reverse `}
    >
      <div className="w-[600px] max-sm:flex flex-col justify-center max-sm:w-[320px] max-lg:w-[700px]">
        <h2 className="text-6xl font-semibold max-sm:text-4xl">
          Create beautiful color scheme that works
        </h2>
        <h3>
          Feeling adventurous? Try our feature or create your own custom palette
          with our intuitive tool.{" "}
        </h3>
        <div className="flex pt-4  pb-8">
          <button
            type="submit"
            onClick={() => router.push("/color")}
            className=" bg-[var(--button-color)] p-[.75rem] text-[var(--light-color)] rounded hover:text-[var(--secondary-color)]"
          >
            Explore colors
          </button>
        </div>
      </div>
      <div className="border-[8px] rounded-xl border-[var(--primary-color)]  w-[400px] h-[400px] flex my-4 max-sm:w-[300px] max-sm:h-[300px] max-lg:w-[550px] max-lg:h-[450px]  ">
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
