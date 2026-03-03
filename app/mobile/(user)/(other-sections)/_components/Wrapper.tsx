"use client";
import SpecialIcon from "@/components/SpecialIcon";
import { colorMap } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import React from "react";
import useGoBack from "@/components/GoBack";

interface Props extends React.PropsWithChildren {
  title: string;
}

export default function Wrapper({ children, title }: Props) {
  const goBack = useGoBack();

  return (
    <div className="min-h-full w-full">
      <div
        className={`sticky top-0 z-100 min-h-[80px] md:min-h-[100px] 
                    flex flex-col justify-between 
                    p-3 md:p-4 
                    ${colorMap["amber"]} 
                    border-b-6 md:border-b-8 border-black 
                    w-full`}
      >
        <div className="flex justify-start flex-1 gap-3 items-center">
          <SpecialIcon Icon={ArrowLeft} onClick={goBack} />

          <span
            className="text-base
                           font-extrabold uppercase 
                           leading-tight 
                           break-words md:whitespace-nowrap"
          >
            {title}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
