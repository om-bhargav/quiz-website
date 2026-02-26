"use client";

import { Card } from "@/components/ui/card";
import { colorMap } from "@/lib/constants";
import { DollarSign } from "lucide-react";

export default function PrizesSection() {
  return (
      <Card className={`gap-2 relative shadow-[10px_10px_0px_0px] rounded-2xl border-4 border-black py-6 px-4 flex flex-col items-center justify-center text-center space-y-2 ${colorMap["blue"]}`}>
        
        {/* Icon */}
        <DollarSign className="w-20 h-20 text-black stroke-[3]" />

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-black">
          WIN UP TO ₹10 LAKHS
        </h2>

        {/* Subtitle */}
        <p className="text-lg font-semibold text-black/80 tracking-wide">
          COMPETE IN DAILY TOURNAMENTS
        </p>
      </Card>
  );
}
