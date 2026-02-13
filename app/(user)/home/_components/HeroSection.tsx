"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <div className="flex relative p-8 overflow-hidden items-center bg-amber-300 border-5 border-black min-h-[380px] rounded-xl shadow-[10px_10px_0px_5px_black]">
      <Image
        src={"/trophee.png"}
        className="opacity-20 z-5 object-cover"
        alt={"Bg Image"}
        fill
      />
      <div className="flex h-full justify-between max-w-lg w-full">
        <div className="h-full flex flex-col py-3 justify-between max-w-xs overflow-hidden w-full rounded-xl z-10">
          <div className="uppercase font-extrabold text-3xl">
            Play Quiz & Win Real Money
          </div>
          <div className="font-bold text-lg uppercase">
            Choose a category and start competing
          </div>
          <NextButton text={"Start Playing"} />
        </div>
        <div className="h-[80px] w-[100px] relative">
          <Image
            src={"/trophee.png"}
            className="rounded-lg border-3 w-full h-full object-cover border-black shadow-[5px_5px_0px_1px_black] z-5"
            alt={"Bg Image"}
            fill
          />
        </div>
      </div>
    </div>
  );
}

export function NextButton({ text }: any) {
  return (
    <Button
      className={`bg-black max-w-[200px] uppercase text-lg hover:bg-black/90! w-full h-15 text-white shadow-[3px_3px_0px_1px_var(--color-pink-300)]!`}
    >
      {text}
    </Button>
  );
}
