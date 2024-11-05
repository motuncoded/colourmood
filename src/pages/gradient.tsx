import { useState } from "react";


interface ColorInfo {
  hexCode: string;

}


export default function Gradient() {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
    const initialColors = Array(16)
      .fill(0)
      .map(() => ({ hexCode: getRandomColor() }));
  const [colorsList, setColorsList] = useState<ColorInfo[]>(initialColors);




   const generateColors = () => {
     const newColors = Array(16)
       .fill(0)
       .map(() => ({ hexCode: getRandomColor() }));
     setColorsList(newColors);
   };
  return (
    <section>
      <h2
        style={{
          fontSize: "calc(.8rem + 2vw)",
        }}
        className="text-center pb-8  font-semibold text-[var(--primary-color)]"
      >
        Explore gradients
      </h2>
      <div className="">
        <ul
          className="grid grid-cols-4 gap-4 place-items-center 
        max-sm:grid-cols-2   max-md:grid-cols-2 max-xl:grid-cols-2 "
        >
          {colorsList.map((color: ColorInfo, index) => {
            const randomColor = getRandomColor();

            return (
              <li key={index} className="flex max-sm:flex-col-reverse">
                <div
                  style={{
                    background: `linear-gradient(to right, ${color.hexCode}, ${randomColor})`,
                    transition: "background-color 0.5s ease-in-out",
                  }}
                  className="w-[200px] h-[100px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
                />
                <div className="flex flex-col justify-center mx-2 max-sm:my-2">
                  <div className="flex">
                    <div
                      style={{
                        backgroundColor: color.hexCode,
                      }}
                      className="w-5 h-5 rounded-full mx-2 "
                    />
                    <p>{color.hexCode}</p>
                  </div>
                  <div className="flex ">
                    <div
                      style={{
                        backgroundColor: randomColor,
                      }}
                      className="w-5 h-5 rounded-full mx-2"
                    />
                    <p>{randomColor}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center items-center  my-6">
        <button
          type="submit"
          onClick={generateColors}
          className="bg-[var(--button-color)] hover:text-[var(--secondary-color)]
         text-[var(--light)] px-4 py-2 rounded-xl"
        >
          Regenerate
        </button>
      </div>
    </section>
  );
}
