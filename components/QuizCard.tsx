"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { colorMap } from "@/lib/constants";
export default function QuizCard({color}:{color: string}) {
  const joined = 342;
  const total = 500;
  const percentage = Math.round((joined / total) * 100);

  return (

      <Card className={`relative shadow-[10px_10px_0px_0px] rounded-3xl border-4 border-black ${colorMap?.[color]} p-6 gap-3`}>

        {/* Title */}
        <h2 className="text-2xl font-extrabold tracking-wide text-black">
          IPL SUPER QUIZ 2026
        </h2>

        {/* Entry + Prize Row */}
        <div className="flex gap-4 items-center">
          {/* Entry Badge */}
          <div className="bg-black font-extrabold! text-white px-4 py-2 rounded-xl text-sm">
            ENTRY: ₹50
          </div>

          {/* Prize Box */}
          <div className="flex-1 font-bold md:font-extrabold! border-2 border-black rounded-xl px-4 py-2 text-black bg-[#d9d9d9]">
            PRIZE: ₹1,00,000
          </div>
        </div>

        {/* Joined Row */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-black font-semibold text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} />
              {joined}/{total} JOINED
            </div>
            <span>{percentage}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-transparent rounded-full border-2 border-black overflow-hidden">
            <div
              className="h-full bg-black"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Join Button */}
        <Button className="w-full rounded-lg bg-black hover:bg-black text-white text-lg font-extrabold py-8 shadow-[4px_4px_0px_0px_var(--color-gray-600)]">
          JOIN QUIZ →
        </Button>
      </Card>
  );
}
