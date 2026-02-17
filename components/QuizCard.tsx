"use client";

import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { colorMap } from "@/lib/constants";

interface HomeQuizCardProps {
  id: number;
  title: string;
  prizePool: string;
  index: number;
  color: string; // 🔥 now required from props
}

export default function HomeQuizCard({
  id,
  title,
  prizePool,
  index,
  color,
}: HomeQuizCardProps) {
  // const slug = useMemo(
  //   () => title.toLowerCase().replace(/\s+/g, "-"),
  //   [title]
  // );

  const rotation = index % 2 === 0 ? "-0.9deg" : "0.8deg";

  return (
    <Link
      href={`/contest/${id}`}
      className="block live-card-fade-in focus:outline-none"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <Card
        className={`relative h-32 rounded-[14px] border-[3px] border-black overflow-hidden 
                   transition-transform duration-200 
                   hover:scale-[1.02] active:scale-[0.98] ${colorMap[color]}`}
        style={{
          boxShadow: "4px 4px 0px #000000",
          transform: `rotate(${rotation})`,
        }}
      >
        <CardContent className="relative z-10 p-4 flex items-center justify-between gap-3 h-full">
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-[900] uppercase leading-tight mb-1">
              {title}
            </h3>

            <div className="flex items-center gap-1">
              <span className="text-[11px] font-[800] uppercase text-black/60">
                Prize:
              </span>
              <span className="text-[16px] font-[900]">
                {prizePool}
              </span>
            </div>
          </div>

          <div
            className="w-[48px] h-[48px] bg-black rounded-[10px] border-[3px] border-black 
                       flex items-center justify-center flex-shrink-0"
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            <ArrowRight className="w-6 h-6 stroke-[3px] text-white" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}