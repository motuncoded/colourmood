import colors from "../components/json/colour.json";

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
  const randomColor = getRandomColor();
  return (
    <section>
      <h2
        style={{
          fontSize: "calc(.8rem + 2vw)",
        }}
        className="text-center py-4  font-semibold text-[var(--primary-color)]"
      >
        Explore gradients
      </h2>
      <div className="">
        <ul className="grid grid-cols-3 gap-4 place-items-center">
          {colors.map((color: ColorInfo, index) => {
              const randomColor = getRandomColor();

            return (
              <li key={index} className="flex">
                <div
                  style={{
                    background: `linear-gradient(to right, ${color.hexCode}, ${randomColor})`,
                    transition: "background-color 0.5s ease-in-out",
                  }}
                  className="w-[200px] h-[100px] mx-[.75rem ] rounded-lg shadow-lg max-sm:w-[125px]"
                />
                <div className="flex flex-col justify-center mx-2">
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
    </section>
  );
}
