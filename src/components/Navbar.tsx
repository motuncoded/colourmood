"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";

const Logo = () => (
  <header className="flex justify-center items-center">
    <h1
      className="bg-gradient-to-b from-[var(--primary-color)] via-[var(--dark-green)] to-[var(--secondary-color)]
     bg-clip-text text-transparent  "
      style={{
        fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
      }}
    >
      colour mood
    </h1>
  </header>
);

interface NavItemProps {
  href: string;
  children: ReactNode;
}

const NavItem = ({ href, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <li
      className={`${isActive ? "bg-[var(--primary-color)] rounded-xl text-[var(--light-color)] hover:text-[var(--secondary-color)] transition-colors duration-300" : ""} mr-2  max-sm:mr-0 my-2  px-4 py-2 rounded  max-md:mr-0 `}
    >
      <Link href={href} className="text-[1rem]">
        {children}
      </Link>
    </li>
  );
};

const NavList = () => (
  <nav aria-label="Main navigation">
    <ul className="flex justify-center items-center py-4 max-sm:flex-col max-md:py-2 ">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/palette">Color palettes</NavItem>
      <NavItem href="/gradient">Gradients</NavItem>
      <NavItem href="/blog">Blog</NavItem>
      <NavItem href="/signin">Sign in</NavItem>
    </ul>
  </nav>
);

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };
  return (
    <div className="h-[80px] p-4 flex justify-between items-center ">
      <Logo />
      <div className="hidden sm:flex justify-center items-center md:flex md:justify-center md:items-center">
        <NavList />
      </div>
      {/* Mobile view */}
      <div className="sm:hidden md-hidden">
        {menu && (
          <div
            className={`lg:hidden  absolute top-[65px] left-0 w-full z-[999] bg-[var(--light-color)] flex flex-col justify-center place-items-center`}
            style={{ padding: "16px" }}
          >
            <NavList />
          </div>
        )}
        <button
          className="flex justify-center py-2 text-[var(--primary-color)]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menu}
        >
          {menu ? <LiaTimesSolid size="24" /> : <IoIosMenu size="24" />}
        </button>
      </div>
    </div>
  );
}
