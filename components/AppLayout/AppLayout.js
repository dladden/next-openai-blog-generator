import { UseUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
/*
AppLayout will rander the layout and will take on value from children
 */
export const AppLayout = ({ children }) => {
  return (
    /*
    Using h-screen-"height of the screen" to set up the sidebar
    which does not moves with the rest of the screen
     */
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        {/* HEADER & LOGO & NEW-POST */}
        <div className=" bg-neutral-200 px-4">
          <div>logo</div>
          <Link
            href="blog-post/new"
            className="bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white py-2 px-4 border border-neutral-800 hover:border-transparent rounded tracking-wider w-full block text-center"
          >
            new post
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
  );
};
