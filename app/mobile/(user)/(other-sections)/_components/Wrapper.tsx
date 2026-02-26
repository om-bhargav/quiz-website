"use client";
import SpecialIcon from "@/components/SpecialIcon";
import { colorMap } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import useGoBack from "@/components/GoBack";
interface Props extends React.PropsWithChildren {
    title: string;
}
export default function Wrapper({ children,title }: Props) {
  const goBack = useGoBack();
  return (
    <div className="min-h-full w-full">
      <div
        className={`min-h-[100px] flex flex-col p-4 flex justify-between ${colorMap["amber"]} border-b-8 border-black w-full`}
      >
        <div className="flex justify-start flex-1 gap-3 items-center">
            <SpecialIcon Icon={ArrowLeft} onClick={goBack}/>
          <span className="text-lg md:text-2xl font-extrabold uppercase md:whitespace-nowrap">
            {title}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
