import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import {
  PlusIcon,
  ChevronLeftIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
/*
Layout will rander the layout and will take on value from children
 */
export const Layout = ({ props, children }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(true);
  // const [showSidebar, setShowSidebar] = useState(false);
  // console.log(showSidebar);
  return (
    /*
    SIDEBAR: Using h-screen-"height of the screen" to set 
    up the sidebar which does not moves with the rest of the screen
     */
    <div className="grid min-h-screen grid-rows-header">
      <div className="bg-white shadow-sm z-10">
        <Navbar />
        {/* <Navbar onMenuButtonClick={() => setShowSidebar()} /> */}
      </div>
      {/*---------------- SIDEBAR ----------------*/}
      <div className="flex  bg-white">
        <div
          className={`flex ${
            open ? "w-72" : "w-20"
          }  duration-200 h-screen flex-col text-white overflow-hidden`}
        >
          {/*---------------- NEW-POST-BUTTON ----------------*/}
          <div
            className={`bg-neutral-200 space-y-4 px-4 mt-[64px] ${
              open && "inline-flex space-y-0"
            } duration-200 p-4 justify-between`}
          >
            <Link
              href="blog-post/new"
              className=" bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white border border-neutral-800 hover:border-transparent rounded text-center flex items-center px-2 "
            >
              <PlusIcon className="flex-none w-7 h-7" />
              <span className={`${!open && "scale-0"} px-2`}>New Post</span>
            </Link>
            <ChevronLeftIcon
              onClick={() => setOpen(!open)}
              className={` w-12 bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white border border-neutral-800 hover:border-transparent rounded text-center flex items-center justify-start cursor-pointer ${
                !open && "rotate-180"
              }`}
            />
          </div>
          {/*---------------- POST LIST ----------------*/}
          <div className=" flex-1 overflow-auto h-72 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-400 to-neutral-300">
            post list
            {/*---------------- CREDITS ----------------*/}
            <div
              className={`absolute bottom-0 left-4 w-auto h-[8.6rem] ${
                !open && "w-[3rem] h-[8.6rem]"
              } duration-200`}
            >
              <Link
                className="bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white border border-neutral-800 hover:border-transparent rounded text-center flex items-center py-2 px-3 space-x-4"
                href="/credit-purchase"
              >
                <WalletIcon className="flex-none w-5 h-6" />
                <span className={`${!open && "scale-0"}`}>Credits:</span>
              </Link>
            </div>
          </div>
          {/*---------------- USER & LOGOUT ----------------*/}
          <div className="bg-neutral-200">
            <div
              className={`${
                open && "flex "
              } items-center gap-2 border-t border-t-black/60 h-20 px-2`}
            >
              {!!user ? (
                <>
                  <div className="min-w=[50px]">
                    <Image
                      src={user.picture}
                      alt={user.name}
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="">
                    <div className={`font-bold ${!open && "scale-0"}`}>
                      {user.email}
                    </div>
                    <div className={`text-sm ${!open && "scale-0"}`}>
                      <Link href="/api/auth/logout">logout</Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link href="/api/auth/login">login</Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt-[64px]">{children}</div>
      </div>
    </div>
  );
};