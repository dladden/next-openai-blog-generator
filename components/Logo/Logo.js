import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex-row inline-flex px-4 py-4">
      <div className=" mr-2">
        <Image src="/textflow-02.svg" alt="me" width="42" height="42" />
      </div>
      <div className=" flex items-center justify-center text-lg text-zinc-500 font-medium  font-logo">
        textFlow AI
      </div>
    </div>
  );
};
