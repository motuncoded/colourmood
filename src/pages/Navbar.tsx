"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { PiBookOpenUserFill } from "react-icons/pi";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { inter } from "../styles/fonts";

const Logo = () => (
  <header className="flex justify-center items-center">
    <h1 className="text-[36px]  bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
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
      className={`${isActive ? "bg-[var(--primary-color)] text-[var(--light-color)]" : ""} mr-2  max-sm:mr-0 my-2  px-4 py-2 rounded `}
    >
      <Link href={href} className="text-[1rem]">
        {children}
      </Link>
    </li>
  );
};

const NavList = () => (
  <nav aria-label="Main navigation">
    <ul className="flex justify-center items-center py-4 max-sm:flex-col  ">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/color">Color palettes</NavItem>
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
    <div
      className={`${inter.className} h-[80px] p-4 flex justify-between items-center`}
    >
      <Logo />
      <div className="hidden sm:flex justify-center items-center">
        <NavList />
      </div>
      {/* Mobile view */}
      <div className="sm:hidden ">
        {menu && (
          <div
            className={` lg:hidden absolute top-[50px] left-0 w-full z-[999] bg-[var(--background-color)] flex flex-col justify-center place-items-center`}
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
