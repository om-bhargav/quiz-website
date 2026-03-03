"use client";

import { Card } from "@/components/ui/card";
import { colorMap } from "@/lib/constants";
import { DollarSign } from "lucide-react";

export default function PrizesSection() {
  return (
    <Card
      className={`
        relative
        shadow-[8px_8px_0px_0px]
        sm:shadow-[10px_10px_0px_0px]
        rounded-2xl
        border-4 border-black
        py-5 px-4
        sm:py-6 sm:px-6
        flex flex-col items-center justify-center text-center
        space-y-3 sm:space-y-2
        ${colorMap["blue"]}
      `}
    >
      {/* Icon */}
      <DollarSign
        className="
          w-14 h-14
          sm:w-20 sm:h-20
          text-black
          stroke-[2.5]
          sm:stroke-[3]
        "
      />

      {/* Title */}
      <h2
        className="
          text-lg
          sm:text-2xl
          md:text-3xl
          font-extrabold
          text-black
          leading-tight
        "
      >
        WIN UP TO ₹10 LAKHS
      </h2>

      {/* Subtitle */}
      <p
        className="
          text-sm
          sm:text-lg
          font-semibold
          text-black/80
          tracking-wide
        "
      >
        COMPETE IN DAILY TOURNAMENTS
      </p>
    </Card>
  );
}