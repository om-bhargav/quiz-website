"use client";
import Wrapper from "../../../_components/Wrapper";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { colorMap } from "@/lib/constants";
import ErrorLoading from "@/components/ErrorLoading";
import QuizCard, { HomeQuizCardSkeleton } from "@/components/QuizCard";
import { useParams } from "next/navigation";
import { useInfiniteScroll } from "@/components/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import HomeQuizCard from "@/components/QuizCard";
export default function page() {
  const { subCategoryId } = useParams();
  const { data, isLoading, error, isValidating, observerRef } =
    useInfiniteScroll({
      endpoint: `/api/user/tournaments`,
      fetcher,
      filter: {
        subCategoryId: subCategoryId,
      } as any,
    });

  const tournaments = data ? data.flatMap((page) => page.tournaments) : [];
  const colors = Object.keys(colorMap);
  const n = colors.length;
  return (
    <Wrapper title={"tournaments"}>
      <ErrorLoading
        loading={isLoading}
        dataLength={tournaments.length}
        loaderClassName="p-5"
        loadingCard={HomeQuizCardSkeleton}
        loadingCount={5}
        loadingCols={1}
        loadingRows={5}
        emptyMessage="No Tournaments Found!"
        error={error}
      >
        <div className="grid gap-5 p-5">
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
      {isLoading ||
        (isValidating && (
          <div className="w-full">
            <Loader2 size={20} className="mx-auto animate-spin" />
          </div>
        ))}
      <div ref={observerRef} />
      </ErrorLoading>
    </Wrapper>
  );
}
