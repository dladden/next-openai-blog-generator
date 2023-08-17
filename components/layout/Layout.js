import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { UseUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";
/*
Layout will rander the layout and will take on value from children
 */
export const Layout = ({ children, props }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    /*
    SIDEBAR: Using h-screen-"height of the screen" to set 
    up the sidebar which does not moves with the rest of the screen
     */
    <div className="grid min-h-screen grid-rows-header">
      <div className="bg-white shadow-sm z-10">
        <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
      </div>
      {/* SIDEBAR */}
      <div className="grid md:grid-cols-sidebar bg-white">
        <div className="flex flex-col text-white overflow-hidden">
          {/* HEADER & LOGO & NEW-POST */}
          <div className="bg-neutral-200 px-4">
            <div>logo</div>
            <Link
              href="blog-post/new"
              className="bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white py-2 px-4 border border-neutral-800 hover:border-transparent rounded tracking-wider w-full text-center flex items-center justify-center"
            >
              {/* Responsive PlusIcon */}
              <PlusIcon className="w-5 h-6 mr-1 " />
              <span className="hidden md:inline">New Post</span>
            </Link>
          </div>
          {/* POST LIST */}
          <div className="flex-1 overflow-auto h-72 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-400 to-neutral-300">
            post list
          </div>
          {/* USER & LOGOUT */}
          <div className="bg-neutral-200">
            <Link href="/credit-purchase">tokens</Link>
            <div>user logout</div>
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};
