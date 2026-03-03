"use client";
import QuizCard from "@/components/QuizCard";
import { colorMap } from "@/lib/constants";
import React, { useEffect, useRef, useState } from "react";
import ErrorLoading from "@/components/ErrorLoading";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher";
import { Loader2 } from "lucide-react";

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
// const { data, isLoading, isValidating, error } = useSWR(
//   `/api/user/tournaments/${
//     selected !== "all" ? `?categoryId=${selected}` : ""
//   }`,
//   fetcher
// );
export default function LiveContests({ selected, setSelected }: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.nextCursor) return null;

    const baseUrl = `/api/user/tournaments`;
    const params = new URLSearchParams();

    if (pageIndex > 0) {
      params.append("cursor", previousPageData.nextCursor);
    }

    if (selected !== "all") {
      params.append("categoryId", selected);
    }

    return `${baseUrl}?${params.toString()}`;
  };
  const { data, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(getKey,fetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateFirstPage: true,
      keepPreviousData: false, // 👈 important
    });
  const hasMore = data
  ? data[data.length - 1]?.nextCursor !== null
  : true;
  const tournaments = data ? data.flatMap((item) => item.tournaments) : [];
  const colors = Object.keys(colorMap);
  const n = colors.length;
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isValidating) {
        if(hasMore){
          setSize((prev) => prev + 1);
        }
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isValidating, setSize]);

  return (
    <div className="grid gap-4 sm:gap-5">
      {/* Header */}
      <div className="flex text-lg sm:text-2xl font-extrabold items-center justify-between">
        <div className="uppercase tracking-wide">ALL</div>

        <div className="flex gap-1.5 sm:gap-2 items-center text-sm sm:text-base">
          <div
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full animate-pulse ${colorMap["purple"]}`}
          />
          <span className="uppercase">LIVE</span>
        </div>
      </div>

      {/* List */}
      <ErrorLoading
        loading={isLoading}
        error={error}
        emptyMessage="No Tournaments Found!"
        dataLength={tournaments.length}
      >
        <div className="grid gap-3 sm:gap-5">
          {tournaments?.map((quiz: any, index: number) => {
            return (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                prizePool={quiz.prizePool}
                index={index}
                id={quiz.id}
                color={colors[index % n]}
                category={quiz.category}
                totalSeats={quiz.totalSeats}
                seatsLeft={quiz.seatsLeft}
              />
            );
          })}
        </div>
      </ErrorLoading>
      {isLoading ||
        (isValidating && (
          <div className="w-full">
            <Loader2 size={20} className="mx-auto animate-spin" />
          </div>
        ))}
      <div ref={observerRef} />
    </div>
  );
}
