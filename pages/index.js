import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Img from "../public/textflow-cover-02.svg";

export default function Home() {
  return (
    <div className=" w-screen h-screen overflow-hidden flex justify-center relative items-end">
      <Image src={Img} alt="textFlow cover"></Image>
    </div>
  );
}
