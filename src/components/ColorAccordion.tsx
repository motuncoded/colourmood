import React, { useState } from "react";
import items from "./json/coloremotion.json";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}
type Color = {
  name: string;
  hexCode: string;
};

export default function ColorAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <section className="rounded-lg  w-full divide-y divide-gray-300">
      <h2
        style={{
          fontSize: "clamp(1.5rem, 5vw, 2.25rem )",
        }}
        className="text-center py-4  font-semibold text-[var(--primary-color)]"
      >
        Explore moods and colors
      </h2>
      {items.map((item, index) => (
        <div key={index} className="divide-y divide-gray-300">
          <div
            className={`
              px-5 py-3 flex justify-between text-gray-700 font-medium text-sm leading-5
              ${activeIndex === index ? "divide-y divide-gray-300 " : ""}
            `}
            onClick={() => handleItemClick(index)}
          >
            <h3 className="text-2xl font">{item.title}</h3>
            <button className="">
              {activeIndex === index ? (
                <RiArrowUpSLine size="24" />
              ) : (
                <RiArrowDownSLine size="24" />
              )}
            </button>
          </div>
          <div
            className={`accordion-content ${activeIndex === index ? "open" : ""}`}
          >
            {activeIndex === index && (
              <ul className=" py-4 px-4 text-gray-700 text-sm leading-5 rounded-b-lg grid grid-cols-5 gap-4 max-sm:grid-cols-2 ">
                {item.colours.map((color: Color, colorIndex: number) => (
                  <li key={colorIndex} className="mt-2 flex flex-col">
                    <div
                      className="w-30 h-20 rounded-lg"
                      style={{ backgroundColor: color.hexCode }}
                    ></div>
                    <div className="flex justify-between">
                      <h2 className="text-[1rem] px-2 pt-2">{color.name}</h2>
                      <h2 className="text-[1rem] px-2 pt-2">{color.hexCode}</h2>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
