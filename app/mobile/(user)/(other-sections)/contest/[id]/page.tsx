"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import { QuizCard, QuizCardSkeleton } from "../_components/QuizCard";
import Wrapper from "../../_components/Wrapper";
import { useEffect, useMemo, useRef, useState } from "react";
import { colorMap } from "@/lib/constants";
import SpecialIcon from "@/components/SpecialIcon";
import { ArrowLeft } from "lucide-react";
import useGoBack from "@/components/GoBack";
export default function page() {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/user/tournaments/${id}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  const [isShrunk, setIsShrunk] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      setIsShrunk((prev) => {
        if (!prev && scrollValue > 80) return true;
        if (prev && scrollValue < 40) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const recommendations = data?.recommendations ?? [];

  const item = !isLoading && data?.tournament;
  const minHeight = 150; // final locked height
  const goBack = useGoBack();
  return (
    <div className="w-full min-h-screen">
      <div className="sticky top-0 z-100 bg-gray-100 max-h-100 overflow-hidden">
        <div
          className={`max-h-[100px] md:max-h-[100px] 
                    flex flex-col justify-between 
                    p-3 md:p-4 
                    ${colorMap["amber"]} 
                    border-b-6 md:border-b-8 border-black 
                    w-full`}
        >
          <div className="flex justify-start flex-1 gap-3 items-center">
            <SpecialIcon Icon={ArrowLeft} onClick={goBack} />

            <span
              className="text-base
                           font-extrabold uppercase 
                           leading-tight 
                           break-words md:whitespace-nowrap"
            >
              contest details
            </span>
          </div>
        </div>

        <div className="my-5 mx-2 space-y-3 ">
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
            <QuizCard {...item} index={0} shrunk={isShrunk} />
          </ErrorLoading>
        </div>
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
            {recommendations?.map(
              (quiz: any, index: number) =>
                quiz.id !== item?.id && (
                  <QuizCard key={quiz.id} {...quiz} index={index} />
                )
            )}
          </ErrorLoading>
        </div>
      </div>
    </div>
  );
}
