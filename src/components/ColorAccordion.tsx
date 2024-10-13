import React,{useState} from 'react'
import items from  "./json/coloremotion.json"

interface AccordionItem {
   id: number;
   title: string;
   content: string;
 }

export default function ColorAccordion() {
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

     const handleItemClick = (index: number) => {
       setActiveIndex(index === activeIndex ? null : index);
     }
  return (
    <div className=" rounded-lg shadow-md w-full">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 ">
          <div
            className={`
              px-5 py-3 text-left text-gray-700 font-medium text-sm leading-5
              ${activeIndex === index ? "bg-gray-100" : ""}
            `}
            onClick={() => handleItemClick(index)}
          >
            <h1 className='text-3xl'>{item.title}</h1>
            <button className="float-right">
              {activeIndex === index ? (
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 14.586l3.293-3.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 10.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>

          {activeIndex === index && (
            <ul className="px-5 py-3 text-gray-700 text-sm leading-5 rounded-b-lg">
              <li
                style={{
                  width: "50px",
                  height: "50px",

                }}
                className=''>{ }</li>
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
