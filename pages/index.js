import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Img from "../public/textflow-cover-02.svg";
import { Logo } from "@/components/Logo";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <div className=" bg-gradient-to-tl from-neutral-100 to-white-200 w-full relative ">
      {/* IMAGE */}
      <div className=" w-screen h-screen overflow-hidden flex justify-center relative items-end">
        <Image src={Img} alt="textFlow Hero" className="absolute"></Image>
        <div className=" absolute top-0 left-0">
          <Logo />
        </div>
        {/* Version */}
        <div className="absolute top-0 right-0 px-4 py-6">
          <span className="ml-2 text-sm text-zinc-500 font-medium font-logo">
            v1.0
          </span>
        </div>
        <div className="absolute text-6xl bottom-0 left-0 h-16 w-16 px-10 py-[23rem]">
          <h4>Blog. Faster.</h4>
        </div>
        <div className="absolute text-zinc-500 text-xl bottom-0 left-0 h-16 w-100 px-10 py-[15.5rem]">
          <h1 className="mb-4">
            Create Optimized Blog Posts for your website.
          </h1>

          <Link
            href="blog-post/new"
            className="inline-flex bg-transparent hover:bg-neutral-900 text-neutral-900 font-semibold hover:text-white border border-neutral-800 hover:border-transparent rounded text-center items-center px-4 py-2"
          >
            <span className="px-2">Start Now</span>
            <ArrowSmallRightIcon className=" w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}
