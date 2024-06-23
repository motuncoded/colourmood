import React from "react";

type ColorPalette = string[];

const Monochromatic = () => {
  const [palette, setPalette] = React.useState<string[]>([]);

  const generateColors = () => {
    const newPalette = [];
    const randomColor = getRandomColor();
    const baseHex = `#${randomColor.r.toString(16).padStart(2, "0")}${randomColor.g.toString(16).padStart(2, "0")}${randomColor.b.toString(16).padStart(2, "0")}`;

    for (let i = 0; i < 5; i++) {
      const shadeBrightness = 0.2 + i * 0.2; // adjust brightness from 0.2 to 1.0
      const shadeRgb = {
        r: Math.round(randomColor.r * shadeBrightness),
        g: Math.round(randomColor.g * shadeBrightness),
        b: Math.round(randomColor.b * shadeBrightness),
      };
      const shadeHex = `#${shadeRgb.r.toString(16).padStart(2, "0")}${shadeRgb.g.toString(16).padStart(2, "0")}${shadeRgb.b.toString(16).padStart(2, "0")}`;
      newPalette.push(shadeHex);
    }

    setPalette(newPalette);
  };

  return (
    <div className="monochromatic-palette">
      <h1>Monochromatic Color Palette</h1>
      <ul className="flex justify-center">
        {palette.map((color, index) => (
          <li
            key={index}
            style={{ backgroundColor: color, color: "#eee" }}
            className="w-[200px] h-[150px]"
          >
            {color}
          </li>
        ))}
      </ul>
      <button
        type="submit"
        onClick={generateColors}
        className="bg-[var(--primary-color)] hover:text-[var(--secondary-color)]
         text-[var(--light)] px-4 py-2 rounded-xl"
      >
        Generate
      </button>
    </div>
  );
};

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
};

export default Monochromatic;
