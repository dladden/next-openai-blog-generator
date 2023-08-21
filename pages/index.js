import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Img from "../public/textflow-cover-02.svg";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className=" bg-gradient-to-tl from-neutral-100 to-white-200 w-full relative ">
      <div className=" w-screen h-screen overflow-hidden flex justify-center relative items-end">
        <Image src={Img} alt="textFlow Hero" className="absolute"></Image>
        <div className=" absolute top-0 left-0 z-10">
          <Logo />
        </div>
      </div>
    </div>
  );
}
