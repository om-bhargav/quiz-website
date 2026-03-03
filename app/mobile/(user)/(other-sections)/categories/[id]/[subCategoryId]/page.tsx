"use client";
import Wrapper from "../../../_components/Wrapper";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { colorMap } from "@/lib/constants";
import ErrorLoading from "@/components/ErrorLoading";
import QuizCard from "@/components/QuizCard";
import { useParams } from "next/navigation";
export default function page() {
  const {subCategoryId} = useParams();
  const { data, isLoading, error, isValidating } = useSWR(
    `/api/user/tournaments?subCategoryId=${subCategoryId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );
  const tournaments = data?.tournaments ?? [];
  const loading = isLoading || isValidating;
  const colors = Object.keys(colorMap);
  const n = colors.length;
  return (
    <Wrapper title={"tournaments"}>
      <ErrorLoading
        loading={loading}
        dataLength={tournaments.length}
        emptyMessage="No Tournaments Found!"
        error={error}
      >
        <div className="grid gap-3 p-5">
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
    </Wrapper>
  );
}
