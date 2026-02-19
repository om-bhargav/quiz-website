"use client";
import SpecialIcon from "@/components/SpecialIcon";
import { colorMap } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
interface Props extends React.PropsWithChildren {
    title: string;
}
export default function Wrapper({ children,title }: Props) {
  return (
    <div className="min-h-full w-full">
      <div
        className={`min-h-[100px] flex flex-col p-4 flex justify-between ${colorMap["amber"]} border-b-8 border-black w-full`}
      >
        <div className="flex justify-start flex-1 gap-3 items-center">
          <Link href={"/profile"} className="w-[100px]">
            <SpecialIcon Icon={ArrowLeft} />
          </Link>
          <span className="text-lg md:text-2xl font-extrabold uppercase md:whitespace-nowrap">
            {title}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
