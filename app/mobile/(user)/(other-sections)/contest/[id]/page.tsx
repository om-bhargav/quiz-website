"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Coins, Zap } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion, Filter, Sparkle, Users } from "lucide-react";
import { colorMap } from "@/lib/constants";
import Link from "next/link";
import SpecialIcon from "@/components/SpecialIcon";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import useGoBack from "@/components/GoBack";
// const quizzes = [
//   {
//     id: 1,
//     title: "IPL Super Quiz 2026",
//     entryFee: "₹50",
//     prizePool: "₹1,00,000",
//     participants: { current: 342, total: 500 },
//     category: "Sports",
//   },
//   {
//     id: 2,
//     title: "Cricket Legends",
//     entryFee: "₹30",
//     prizePool: "₹60,000",
//     participants: { current: 120, total: 200 },
//     category: "Sports",
//   },
//   {
//     id: 3,
//     title: "Bollywood Blockbuster",
//     entryFee: "₹20",
//     prizePool: "₹50,000",
//     participants: { current: 189, total: 300 },
//     category: "Movies",
//   },
//   {
//     id: 4,
//     title: "Hollywood Trivia",
//     entryFee: "₹25",
//     prizePool: "₹45,000",
//     participants: { current: 88, total: 150 },
//     category: "Movies",
//   },
//   {
//     id: 5,
//     title: "Tech Genius Challenge",
//     entryFee: "₹100",
//     prizePool: "₹2,50,000",
//     participants: { current: 456, total: 1000 },
//     category: "Tech",
//   },
//   {
//     id: 6,
//     title: "Code & Gadgets Quiz",
//     entryFee: "₹40",
//     prizePool: "₹80,000",
//     participants: { current: 210, total: 400 },
//     category: "Tech",
//   },
//   {
//     id: 7,
//     title: "World History Masters",
//     entryFee: "₹30",
//     prizePool: "₹75,000",
//     participants: { current: 203, total: 400 },
//     category: "GK",
//   },
//   {
//     id: 8,
//     title: "Science & Geography",
//     entryFee: "₹35",
//     prizePool: "₹55,000",
//     participants: { current: 95, total: 200 },
//     category: "GK",
//   },
//   {
//     id: 9,
//     title: "Robo Wars Quiz",
//     entryFee: "₹60",
//     prizePool: "₹1,20,000",
//     participants: { current: 78, total: 150 },
//     category: "Robotics",
//   },
//   {
//     id: 10,
//     title: "AI & Future Tech",
//     entryFee: "₹45",
//     prizePool: "₹90,000",
//     participants: { current: 134, total: 250 },
//     category: "Robotics",
//   },
//   {
//     id: 11,
//     title: "Bollywood Music Quiz",
//     entryFee: "₹15",
//     prizePool: "₹35,000",
//     participants: { current: 167, total: 300 },
//     category: "Music",
//   },
//   {
//     id: 12,
//     title: "Pop & Rock Legends",
//     entryFee: "₹22",
//     prizePool: "₹42,000",
//     participants: { current: 91, total: 180 },
//     category: "Music",
//   },
// ];
const filters = [
  { id: "all", label: "All Contests" },
  { id: "high", label: "High Stakes (₹2L+)" },
  { id: "medium", label: "Medium (₹50K-₹2L)" },
  { id: "low", label: "Beginner (Under ₹50K)" },
];
export default function page() {
  const { id } = useParams();
  const goBack = useGoBack();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { data, isLoading, error } = useSWR(
    `/api/user/tournaments/${id}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );
  const item = !isLoading && data?.tournament;
  return (
    <div className="flex flex-col h-full justify-start w-full">
      <div className="sticky top-0 z-50 bg-gray-100">
        <div
          className={`min-h-[80px] md:min-h-[100px] 
                            flex flex-col justify-between 
                            p-3 md:p-4 
                            ${colorMap["amber"]} 
                            border-b-6 md:border-b-8 border-black 
                            w-full`}
        >
          <div className="flex justify-start flex-1 gap-3 items-center">
            <SpecialIcon Icon={ArrowLeft} onClick={goBack} />

            <span
              className="text-base md:text-2xl 
                                   font-extrabold uppercase 
                                   leading-tight 
                                   break-words md:whitespace-nowrap"
            >
              contest details
            </span>
          </div>
        </div>
        <div className="my-5 mx-2 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-extrabold uppercase">
              🏆 Highest Prizes
            </div>
            <div
              className="bg-[#6366F1] text-white px-3 py-1 rounded-[8px] border-[2px] border-black text-[10px] font-[900] uppercase"
              style={{
                boxShadow: "2px 2px 0px #000000",
              }}
            >
              Featured
            </div>
          </div>
          <ErrorLoading
            error={error}
            loading={isLoading}
            dataLength={item ? 1 : 0}
            emptyMessage="Tournament Does Not Exist!"
          >
            <QuizCard
              id={item.id}
              prizePool={item.prizePool}
              entryFee={item.entryFee}
              index={0}
              difficulty={item?.difficulty}
              totalSeats={item.totalSeats}
              seatsLeft={item.seatsLeft}
              questions={item.questions}
              title={item.title}
            />
          </ErrorLoading>
        </div>
      </div>
      <div className="grid gap-4 mx-3">
        <div>
          <div className="uppercase text-2xl font-extrabold">
            MORE CONTESTS ({data?.recommendations?.length ?? 0})
          </div>
        </div>
        <div className="grid gap-6">
          <ErrorLoading
            error={error}
            loading={isLoading}
            dataLength={data?.recommendations?.length}
            emptyMessage="No Related Tournaments Found!"
          >
            {data?.recommendations?.map((quiz: any, index: number) => {
              return (
                quiz.id !== item.id && (
                  <QuizCard
                    seatsLeft={quiz.seatsLeft}
                    totalSeats={quiz.totalSeats}
                    key={quiz.id}
                    id={quiz.id}
                    prizePool={quiz.prizePool}
                    entryFee={quiz.entryFee}
                    index={index}
                    difficulty={quiz.difficulty}
                    questions={quiz.totalQuestions}
                    title={quiz.title}
                  />
                )
              );
            })}
          </ErrorLoading>
        </div>
      </div>
    </div>
  );
}

interface QuizCardProps {
  id?: number;
  title: string;
  entryFee: string;
  prizePool: string;
  totalSeats: number;
  seatsLeft: number;
  index: number;
  questions?: number;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

const difficultyColors = {
  EASY: "green",
  MEDIUM: "amber",
  HARD: "pink",
  EXPERT: "purple",
};
const colors = Object.values(difficultyColors);
export function QuizCard({
  id,
  title,
  entryFee,
  prizePool,
  totalSeats,
  seatsLeft,
  index,
  questions = 10,
  difficulty = "MEDIUM",
}: QuizCardProps) {
  const slug = useMemo(() => title.toLowerCase().replace(/\s+/g, "-"), [title]);

  const percentage = useMemo(() => {
    if (!totalSeats) return 0;
    return Math.min(100, ((totalSeats - seatsLeft) / totalSeats) * 100);
  }, [totalSeats]);

  const rotation = index % 2 === 0 ? "-0.6deg" : "0.6deg";
  const color = difficultyColors[difficulty];
  const colors = Object.values(colorMap);
  return (
    <Card
      className={`relative my-3 md:my-4 p-3 md:p-4 rounded-[14px] border-[3px] border-black overflow-hidden
  transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] ${
    colors[Math.floor(Math.random() * colors.length)]
  }`}
      style={{
        boxShadow: "5px 5px 0px #000000",
        transform: `rotate(${rotation})`,
      }}
    >
      <CardContent className="relative z-10 p-0">
        {/* Header */}
        <div className="mb-2 md:mb-3">
          <h3 className="text-[15px] md:text-[18px] font-[900] uppercase leading-snug md:leading-tight mb-2 break-words">
            {title}
          </h3>

          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded-[6px]">
              <Coins className="w-3 h-3" />
              <span className="text-[10px] md:text-[11px] font-[800] uppercase">
                Entry: {entryFee}
              </span>
            </div>

            <div className="flex-1 bg-white/90 px-2 py-1 rounded-[6px] border-[2px] border-black">
              <span className="text-[10px] md:text-[11px] font-[800] uppercase">
                Prize: ₹{prizePool}
              </span>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-2 md:mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 md:w-4 md:h-4 stroke-[2.5px]" />
              <span className="text-[10px] md:text-[11px] font-[800] uppercase">
                {totalSeats - seatsLeft}/{totalSeats} Joined
              </span>
            </div>
            <span className="text-[10px] md:text-[11px] font-[800] uppercase">
              {Math.round(percentage)}%
            </span>
          </div>

          <div className="w-full h-[8px] md:h-[10px] bg-black/20 rounded-[6px] border-[2px] border-black overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Detail Section */}
        <div className="mb-2 md:mb-3 flex items-center justify-end gap-1 md:gap-2">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-[6px] border-[2px] border-black">
            <FileQuestion className="w-3 h-3 stroke-[2.5px]" />
            <span className="text-[10px] md:text-[11px] font-[800] uppercase">
              {questions} Questions
            </span>
          </div>

          <div
            className="flex items-center gap-1 px-2 py-1 rounded-[6px] border-[2px] border-black"
            style={{
              backgroundColor: difficultyColors[difficulty],
            }}
          >
            <Zap className="w-3 h-3 stroke-[2.5px]" />
            <span className="text-[10px] md:text-[11px] font-[800] uppercase">
              {difficulty}
            </span>
          </div>
        </div>

        {/* Button */}
        <Link href={`/mobile/join-quiz/${id}`}>
          <Button
            className="w-full bg-gray-800 hover:bg-black text-white 
        py-5 md:py-7 
        rounded-[10px]
        border-[3px] border-black 
        uppercase font-[900] 
        text-[13px] md:text-[14px]"
            style={{
              boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
            }}
          >
            {"Join Quiz →"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
