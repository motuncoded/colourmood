import React, { useEffect, useState } from "react";
import colors from "../components/json/coloring.json";
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
    <div className=" py-4 flex justify-around place-items-center  max-sm:flex-col-reverse max-md:justify-center max-md:flex-col-reverse max-xl:flex-col-reverse  max-lg:flex-col-reverse">
      <div className="max-w-[620px] w-[calc(100% - 2rem)] max-sm:flex flex-col justify-center max-sm:max-w-[340px] max-sm:px-2 max-md:max-w-[440px] max-xl:max-w-[700px] max-lg:max-w-[700px]  px-1   max-xl:px-1 max ">
        <h2 className="text-6xl font-semibold max-sm:text-4xl  ">
          Create beautiful color scheme that works
        </h2>
        <h3 className="pt-4 ">
          Step into a world of emotions and expression. Explore our curated
          palettes, and let the right colors evoke the perfect mood for your
          next project.
        </h3>
        <div className="flex pt-4 ">
          <button
            type="submit"
            onClick={() => router.push("/color")}
            className="p-[.75rem] text-[var(--light-color)] rounded-lg bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors duration-300"
          >
            Explore colors
          </button>
        </div>
      </div>
      <div className="border-[8px] rounded-xl border-[var(--primary-color)]  w-[400px] h-[400px] flex my-4 max-sm:w-[300px] max-sm:h-[300px] max-lg:w-[550px] max-lg:h-[450px]  ">
        {colors[currentIndex].colors.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color.hex,
              width: "200px",
              transition: "background-color 0.5s ease-in-out",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
