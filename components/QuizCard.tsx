"use client";

import { useMemo } from "react";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { colorMap } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeQuizCardProps {
  id: number;
  title: string;
  prizePool: string;
  index: number;
  color: string;
  category: any;
  totalSeats: any;
  seatsLeft: number;
}

export default function HomeQuizCard({
  id,
  title,
  prizePool,
  index,
  color,
  category,
  totalSeats,
  seatsLeft
}: HomeQuizCardProps) {

  const rotation = index % 2 === 0 ? "-0.9deg" : "0.8deg";

  return (
    <Link
      href={`/mobile/contest/${id}`}
      className="block live-card-fade-in focus:outline-none"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <Card
        className={`relative min-h-[120px] sm:min-h-32 
                    py-2 sm:py-3 
                    rounded-[14px] border-[3px] border-black 
                    overflow-hidden transition-transform duration-200 
                    hover:scale-[1.02] active:scale-[0.98] 
                    ${colorMap[color]}`}
        style={{
          boxShadow: "4px 4px 0px #000000",
          transform: `rotate(${rotation})`,
        }}
      >
        <CardContent className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-3 h-full">
          
          <div className="space-y-2 sm:space-y-3 min-w-0 flex-1">
            
            {/* Category Badge */}
            <div className="px-3 py-1 sm:px-4 sm:py-1.5 
                            text-xs sm:text-sm 
                            uppercase font-extrabold 
                            bg-gray-100 border-3 rounded-full border-black 
                            w-fit">
              {category.name}
            </div>

            <div className="min-w-0">
              
              {/* Title */}
              <h3 className="text-base sm:text-xl 
                             font-[900] uppercase 
                             leading-snug sm:leading-tight 
                             mb-1 break-words">
                {title}
              </h3>

              {/* Prize */}
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm 
                                 font-[800] uppercase 
                                 text-black/60">
                  Prize:
                </span>
                <span className="text-base sm:text-lg font-[900]">
                  ₹{prizePool}
                </span>
              </div>

              {/* Players */}
              <div className="flex items-center gap-1 text-black/60">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-md font-bold">
                  {totalSeats - seatsLeft} / {totalSeats} Played
                </span>
              </div>
            </div>
          </div>

          {/* Arrow Button */}
          <div
            className="w-10 h-10 sm:w-[48px] sm:h-[48px] 
                       bg-black rounded-[10px] border-[3px] border-black 
                       flex items-center justify-center flex-shrink-0"
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3px] text-white" />
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}

interface HomeQuizCardSkeletonProps {
  index: number;
}

export function HomeQuizCardSkeleton({
  index,
}: HomeQuizCardSkeletonProps) {
  const rotation = index % 2 === 0 ? "-0.9deg" : "0.8deg";

  return (
    <div
      className="block"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <Card
        className="
          relative
          min-h-[120px] sm:min-h-32
          py-2 sm:py-3
          rounded-[14px]
          border-[3px] border-border
          overflow-hidden
        "
        style={{
          transform: `rotate(${rotation})`,
        }}
      >
        <CardContent className="p-3 sm:p-4 flex items-center justify-between gap-3 h-full">
          
          {/* Left Content */}
          <div className="space-y-2 sm:space-y-3 min-w-0 flex-1">

            {/* Category Badge */}
            <Skeleton className="h-6 sm:h-7 w-24 rounded-full" />

            <div className="space-y-2">
              
              {/* Title */}
              <Skeleton className="h-4 sm:h-6 w-3/4 rounded-md" />

              {/* Prize Row */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 sm:h-4 w-12 rounded-md" />
                <Skeleton className="h-4 sm:h-5 w-20 rounded-md" />
              </div>

              {/* Players Row */}
              <Skeleton className="h-3 sm:h-4 w-32 rounded-md" />

            </div>
          </div>

          {/* Arrow Button Skeleton */}
          <Skeleton className="w-10 h-10 sm:w-[48px] sm:h-[48px] rounded-[10px]" />

        </CardContent>
      </Card>
    </div>
  );
}