import React from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Image from "next/image";
import classNames from "classnames";
// Import global styles

const Navbar = (props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg inline-flex mr-2">
        <Image src="/textflow-02.svg" alt="me" width="42" height="42" />
      </div>
      <div className="flex font-medium items-center justify-center font-logo">
        textFlow AI
      </div>
      <div className="flex-grow"></div> {/** spacer */}
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
