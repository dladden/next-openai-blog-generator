import React from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Image from "next/image";
import classNames from "classnames";
import { Logo } from "../Logo";
// Import global styles

const Navbar = (props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <Logo />
      <div className="flex-grow"></div> {/** spacer */}
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
