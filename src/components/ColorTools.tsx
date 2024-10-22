import Link from "next/link";

const sections = [
  {
    title: "Tools",
    items: [
      { text: "Color palettes generator", href: "/colorpalette" },
      { text: "Color picker", href: "/color-picker" },
      { text: "Colors generator", href: "/list-of-colors" },
      { text: "Browse gradients", href: "/browse-gradients" },
      { text: "Create a gradient", href: "/create-gradient" },
      { text: "Make a gradient palette", href: "/make-gradient-palette" },
    ],
  },
];

export default function ColorTools () {
  return (
    <div className="py-5 ">
      <div className="">
        {sections.map((section) => (
          <div key={section.title} className="p-4">
            <h2 className="text-3xl font-semibold mb-4 text-[var(--dark-green)]">
              {section.title}
            </h2>
            <ul className="list-none mb-0 grid grid-cols-3 max-sm:flex max-sm:flex-col max-xl:flex max-xl:flex-col ">
              {section.items.map((item) => (
                <li key={item.text} className="py-2">
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
