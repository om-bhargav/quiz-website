"use client";
import QuizCard, { HomeQuizCardSkeleton } from "@/components/QuizCard";
import { colorMap } from "@/lib/constants";
import React, { useEffect, useRef, useState } from "react";
import ErrorLoading from "@/components/ErrorLoading";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher";
import { Loader2 } from "lucide-react";
import { useInfiniteScroll } from "@/components/useInfiniteScroll";

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
export default function LiveContests({ selected, setSelected }: Props) {
  const { data, observerRef, isLoading, isValidating, error } =
    useInfiniteScroll({
      endpoint: "/api/user/tournaments",
      fetcher,
      filter: {
        categoryId: selected,
      },
    });
  const tournaments = data ? data.flatMap((item) => item.tournaments) : [];
  const colors = Object.keys(colorMap);
  const n = colors.length;

  return (
    <div className="grid gap-4 sm:gap-5">
      {/* Header */}
      <div className="flex text-lg sm:text-2xl font-extrabold items-center justify-between">
        <div className="uppercase tracking-wide text-sm md:text-md">ALL</div>

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
        loadingCard={HomeQuizCardSkeleton}
        loadingCount={5}
        loadingCols={1}
        loadingRows={5}
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
        {!isLoading && isValidating && (
          <div className="w-full">
            <Loader2 size={20} className="mx-auto animate-spin" />
          </div>
        )}
        <div ref={observerRef} />
    </div>
  );
}
