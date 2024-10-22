import React, { useEffect, useState } from "react";
import colors from "../components/json/coloring.json";
import { useRouter } from "next/router";
import { FaComment, FaHeart, FaShareAlt } from "react-icons/fa";
import { BiDotsVertical } from "react-icons/bi";

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
    <section className="w-full flex justify-between gap-4 max-sm:grid max-sm:grid-cols-1 max-sm:place-items-start max-xl:grid max-xl:grid-cols-1 max-xl:place-items-start   max-lg:grid-cols-1  max-lg:place-items-start">
      <div className="py-8  max-sm:flex flex-col max-sm:py-0 justify-center  max-sm:my-4 max-md:my-4 ">
        <h2 className="text-5xl font-semibold max-sm:text-4xl w-4/6 max-sm:w-full max-md:w-full max-lg:w-full ">
          Create beautiful color mood scheme that works
        </h2>
        <h3 className="pt-4 w-3/6 max-sm:w-full max-md:w-full max-lg:w-full ">
          Step into a world of emotions and expression, explore our curated
          palettes and let the right colors evoke the perfect mood for your next
          project.
        </h3>
        <div className="flex pt-4  ">
          <button
            type="submit"
            onClick={() => router.push("/color")}
            className="p-[.75rem] text-[var(--light-color)] rounded-lg bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors duration-300"
          >
            Explore colors
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center md:my-4 ">
        <div className="rounded-lg  bg-transparent border-[2px] border-[var(--gray)] max-w-[350px] h-[350px] flex flex-col max-sm:max-w-[325px]  ">
          <div className="py-[.85rem] flex justify-end text-gray-500">
            <BiDotsVertical size="22" />
          </div>
          <div className="flex justify-center  flex-grow  overflow-hidden border-y-[2px] border-[var(--gray)]">
            {colors[currentIndex].colors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color.hex,
                  transition: "background-color 0.5s ease-in-out",
                }}
                className="w-[200px]"
              ></div>
            ))}
          </div>
          <ul className="flex py-4">
            <li className="mr-4 ml-2 text-gray-500 ">
              <FaHeart />
            </li>
            <li className="mr-4 ml-2  text-gray-500">
              <FaComment />
            </li>
            <li className="mr-4 ml-2  text-gray-500 ">
              <FaShareAlt />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Hero;
