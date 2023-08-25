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
    <div className="grid flex-row h-screen">
      <div className="bg-white shadow-sm z-10">
        <Navbar />
        {/* <Navbar onMenuButtonClick={() => setShowSidebar()} /> */}
      </div>
      {/*---------------- SIDEBAR ----------------*/}
      <div className="flex h-full max-h-screen overflow-y-auto  bg-white">
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
            <Link href="blog-post/new" className=" btn flex px-2 ">
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
          <div className="relative flex-1 overflow-auto h-72 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-400 to-neutral-300">
            <div>post list post list</div>
          </div>
          {/*---------------- USER & LOGOUT ----------------*/}
          <div className="bg-neutral-200">
            <div
              className={`${
                open && "flex "
              } items-center gap-2 border-t border-t-black/60 h-[8rem] px-2`}
            >
              <div className="">
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
                    <div>
                      <div className={`font-bold ${!open && "scale-0"}`}>
                        {user.email}
                      </div>
                      <div className="">
                        <Link href="/api/auth/logout">logout</Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href="/api/auth/login">login</Link>
                )}
              </div>
            </div>
            {/*---------------- CREDITS ----------------*/}
            <div
              className={`absolute bottom-0 mb-4 left-4 w-auto  ${
                !open && "w-[3rem]"
              } duration-200`}
            >
              <Link
                className="bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white border border-neutral-800 hover:border-transparent rounded text-center flex items-center py-2 px-2 space-x-6"
                href="/credit-purchase"
              >
                <WalletIcon className="flex-none w-5 h-6" />
                <span className={`${!open && "scale-0"} flex-1`}>Credits:</span>
                <span className={`${!open && "scale-0"} flex-1`}>20</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-[64px] w-full max-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
