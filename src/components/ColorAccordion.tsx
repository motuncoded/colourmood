import React,{useState} from 'react'
import items from "./json/coloremotion.json"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";


interface AccordionItem {
   id: number;
   title: string;
   content: string;
}
type Color = {
  name: string,
  hexCode:string
 }

export default function ColorAccordion() {
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

     const handleItemClick = (index: number) => {
       setActiveIndex(index === activeIndex ? null : index);
     }
  return (
    <section className="rounded-lg  w-full divide-y divide-gray-300">
      <h1
        style={{
          fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
        }}
        className="text-center py-4  font-semibold text-[var(--primary-color)]"
      >
        Explore mood and colors
      </h1>
      {items.map((item, index) => (
        <div key={index} className="divide-y divide-gray-300">
          <div
            className={`
              px-5 py-3 flex justify-between text-gray-700 font-medium text-sm leading-5
              ${activeIndex === index ? "divide-y divide-gray-300" : ""}
            `}
            onClick={() => handleItemClick(index)}
          >
            <h2 className="text-2xl font">{item.title}</h2>
            <button className="">
              {activeIndex === index ? (
                <RiArrowDownSLine size="24" />
              ) : (
                <RiArrowUpSLine size="24" />
              )}
            </button>
          </div>

          {activeIndex === index && (
            <ul className="px-5 text-gray-700 text-sm leading-5 rounded-b-lg grid grid-cols-5 gap-4 max-sm:grid-cols-2 ">
              {item.colours.map((color: Color, colorIndex: number) => (
                <li
                  key={colorIndex}
                  className="my-2 flex items-center flex-col"
                >
                  <div
                    className="w-40 h-40 rounded-lg mr-4"
                    style={{ backgroundColor: color.hexCode }}
                  ></div>
                  <h2 className="text-2xl">{color.name}</h2>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
