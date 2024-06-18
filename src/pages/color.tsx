import React, { useState, useEffect } from "react";
interface ColorInfo {
  hex: string;
  rgb: string;
  colorName: string;
}

export default function Color() {
  const [colors, setColors] = useState<ColorInfo[]>([]);

  useEffect(() => {
    fetch('https://csscolorsapi.com/api/colors')
      .then(response => response.json())
      .then(data => setColors(data.colors))
      .catch(error => console.error(error));
  }, []);

  const generateColors = () => {
    const newColors = [];
    for (let i = 0; i < 10; i++) {
      newColors.push(generateRandomColor());
    }
    setColors(newColors);
  };
  return (
    <div className=" max-w-[1000px] w-[calc(1000px * 2rem)] m-auto">
      <div className="grid grid-cols-4 gap-6 p-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="bg-[var(--light)] flex flex-col justify-center items-center p-4"
          >
            <div
              style={{
                backgroundColor: color.hex,
                width: "200px",
                height: "200px",
              }}
            />
            <p>Color : {color.name}</p>
            <p>Hex: {color.hex}</p>
            <p>RGB: {color.rgb}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={generateColors}
          className=" bg-[var(--primary-color)] 
      p-[.75rem] text-[var(--secondary-color)] rounded"
        >
          Generate New Colors
        </button>
      </div>
    </div>
  );
}
