"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import { QuizCard, QuizCardSkeleton } from "../_components/QuizCard";
import Wrapper from "../../_components/Wrapper";
import { useEffect, useState } from "react";
export default function page() {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/user/tournaments/${id}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  const recommendations = data?.recommendations ?? [];

  const item = !isLoading && data?.tournament;
  return (
    <Wrapper title="contest details">
        <div className="my-5 mx-2 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm sm:text-base md:text-2xl font-extrabold uppercase">
              🏆 Highest Prizes
            </div>
            <div
              className="bg-[#6366F1] text-white px-3 py-1 rounded-[8px] border-[2px] border-black text-[9px] sm:text-[10px] font-[900] uppercase"
              style={{ boxShadow: "2px 2px 0px #000000" }}
            >
              Featured
            </div>
          </div>
          <ErrorLoading
            error={error}
            loadingCard={QuizCardSkeleton}
            loadingCount={1}
            loading={isLoading}
            dataLength={item ? 1 : 0}
            emptyMessage="Tournament Does Not Exist!"
          >
            <QuizCard {...item} index={0} />
          </ErrorLoading>
        </div>

      <div className="grid gap-4 mx-3">
        <div className="uppercase text-sm sm:text-base md:text-2xl font-extrabold">
          MORE CONTESTS ({data?.recommendations?.length ?? 0})
        </div>

        <div className="grid gap-2">
          <ErrorLoading
            error={error}
            loadingCard={QuizCardSkeleton}
            loadingCount={5}
            loading={isLoading}
            dataLength={recommendations?.length}
            emptyMessage="No Related Tournaments Found!"
          >
            {recommendations?.map((quiz: any, index: number) => (
              quiz.id !== item?.id && (
                <QuizCard key={quiz.id} {...quiz} index={index} />
              )
            ))}
          </ErrorLoading>
        </div>
      </div>
    </Wrapper>
  );
}

