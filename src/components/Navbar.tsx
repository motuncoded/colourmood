"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import Signin from "./Signin";

const Logo = () => (
  <div className="flex justify-center items-center">
    <h1
      className="bg-gradient-to-b from-[var(--primary-color)] via-[var(--dark-green)] to-[var(--secondary-color)] 
        bg-clip-text text-transparent"
      style={{
        fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
      }}
    >
      colourmood
    </h1>
  </div>
);

interface NavItemProps {
  href: string;
  children: ReactNode;
  onClose?: () => void;
}

const NavItem = ({ href, children, onClose }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <li
      className={`mr-2 max-sm:mr-0 my-2 px-4 py-2 rounded transition-colors duration-300 ${
        isActive
          ? "bg-[var(--primary-color)] rounded-lg text-[var(--background-color)] hover:text-[var(--secondary-color)]"
          : ""
      }`}
    >
      <Link
        href={href}
        className="text-[1rem]"
        onClick={() => onClose && onClose()}
      >
        {children}
      </Link>
    </li>
  );
};

interface NavListProps {
  onSignInOpen: () => void;
  onClose?: () => void;
}

const NavList = ({ onSignInOpen, onClose }: NavListProps) => (
  <nav aria-label="Main navigation">
    <ul className="flex justify-center items-center py-4 max-sm:flex-col max-md:flex-col lg:flex lg:gap-4">
      <NavItem href="/" onClose={onClose}>
        Home
      </NavItem>
      <NavItem href="/moodpalette" onClose={onClose}>
        Mood palettes
      </NavItem>
      <NavItem href="/gradient" onClose={onClose}>
        Gradients
      </NavItem>
      <NavItem href="/blog" onClose={onClose}>
        Blog
      </NavItem>
      <li
        className="mr-2 max-sm:mr-0 my-2 px-4 py-2 rounded transition-colors duration-300
          hover:bg-[var(--primary-color)] rounded-lg hover:text-[var(--secondary-color)]"
      >
        <button onClick={onSignInOpen}>Sign In</button>
      </li>
      <li
        className="mr-2 max-sm:mr-0 my-2 px-4 py-2 rounded transition-colors duration-300
          hover:bg-[var(--primary-color)] rounded-lg hover:text-[var(--secondary-color)]"
      >
        <button>Sign Up</button>
      </li>
    </ul>
  </nav>
);

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [isSigninOpen, setSigninOpen] = useState(false);

  const toggleMenu = () => setMenu((prevMenu) => !prevMenu);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky top-0 left-0 w-full h-[80px] p-4 flex justify-between items-center bg-[var(--background-color)] z-50">
      <Logo />
      {/* Static menu for large screens */}
      <div className="hidden lg:flex justify-center items-center">
        <NavList onSignInOpen={() => setSigninOpen(true)} onClose={closeMenu} />
      </div>
      {/* Mobile and Medium Screens View */}
      <div className="flex lg:hidden">
        {menu && (
          <div
            className="absolute top-[65px] left-0 w-full z-[999] bg-[var(--background-color)] flex flex-col justify-center items-center"
            style={{ padding: "16px" }}
          >
            <NavList
              onSignInOpen={() => setSigninOpen(true)}
              onClose={closeMenu}
            />
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
      <Signin isOpen={isSigninOpen} onClose={() => setSigninOpen(false)} />
    </div>
  );
}
