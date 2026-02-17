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
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const {data,isLoading,error} = useSWR(`/api/user/tournaments/${id}`,fetcher);
  const item = !isLoading && data?.tournament;
  return (
    <div className="flex flex-col h-full justify-start w-full">
      <div className="sticky top-0 z-50 bg-gray-100">
        <div
          className={`min-h-[100px] flex flex-col p-4 flex justify-between ${colorMap["amber"]} border-b-8 border-black w-full`}
        >
          <div className="flex justify-between flex-1 gap-4 items-center">
            <Link href={"/"} className="w-[100px]">
              <SpecialIcon Icon={ArrowLeft} />
            </Link>
            <span className="text-lg md:text-2xl font-extrabold uppercase md:whitespace-nowrap">
              Contest details
            </span>
          <SpecialIcon onClick={()=>setFilterOpen(!filterOpen)} Icon={Filter} />
          </div>
          {/* Filter Dropdown */}
          {filterOpen && (
            <div className="w-full my-3 pb-4">
              <div
                className="bg-white rounded-[12px] border-[3px] border-black p-3"
                style={{
                  boxShadow: "4px 4px 0px #000000",
                }}
              >
                <p className="text-[12px] font-[800] uppercase mb-2 text-black/60">
                  Filter by Prize
                </p>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setSelectedFilter(filter.id);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] border-[2px] border-black text-[13px] font-[800] uppercase transition-all ${
                        selectedFilter === filter.id
                          ? "bg-[#A5F3FC]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      style={{
                        boxShadow:
                          selectedFilter === filter.id
                            ? "2px 2px 0px #000000"
                            : "none",
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="my-5 mx-2 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-extrabold uppercase">
              🏆 Highest Prizes
            </div>
            <div className={`text-sm border-3 px-2 py-1 text-background shadow-[2px_2px_0px_0px_black]  border-black font-bold uppercase rounded-xl ${colorMap["purple"]}`}>
              Featured
            </div>
          </div>
          <ErrorLoading error={error} loading={isLoading}>
            <QuizCard
            id={item.id}
            prizePool={item.prizePool}
            entryFee={item.entryFee}
            index={0}
            difficulty={item?.difficulty?.toLowerCase()}
            totalSeats={item.totalSeats}
            winningSeats={item.winningSeats}
            questions={item.questions}
            title={item.title}
            />
            </ErrorLoading>
        </div>
      </div>
      <div className="grid gap-4 mx-3">
        <div>
          <div className="uppercase text-2xl font-extrabold">
            MORE CONTESTS (0)
          </div>
        </div>
        <div className="grid gap-6">
          {/* {quizzes.map((quiz) => {
            return (
              quiz.id !== item.id && (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  prizePool={quiz.prizePool}
                  entryFee={quiz.entryFee}
                  index={0}
                  difficulty={"Expert"}
                  participants={quiz.participants}
                  questions={10}
                  title={quiz.title}
                />
              )
            );
          })} */}
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
  winningSeats: number
  index: number;
  questions?: number;
  difficulty: "easy" | "medium" | "hard" | "expert";
}

const difficultyColors = {
  easy: "green",
  medium: "amber",
  hard: "pink",
  expert: "purple",
};
const colors = Object.values(difficultyColors);
export function QuizCard({
  id,
  title,
  entryFee,
  prizePool,
  totalSeats,
  winningSeats,
  index,
  questions = 10,
  difficulty = "medium",
}: QuizCardProps) {
  const slug = useMemo(() => title.toLowerCase().replace(/\s+/g, "-"), [title]);

  const percentage = useMemo(() => {
    if (!totalSeats) return 0;
    return Math.min(100, (winningSeats / totalSeats) * 100);
  }, [totalSeats]);

  const rotation = index % 2 === 0 ? "-0.6deg" : "0.6deg";

  const color = difficultyColors[difficulty];
  return (
    <Card
      className={`relative my-4 p-4 rounded-[14px] border-[3px] border-black overflow-hidden
                   transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] ${colorMap[color]}`}
      style={{
        boxShadow: "6px 6px 0px #000000",
        transform: `rotate(${rotation})`,
      }}
    >
      <CardContent className="relative z-10 p-0">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-[18px] font-[900] uppercase leading-tight mb-2">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded-[6px]">
              <Coins className="w-3 h-3" />
              <span className="text-[11px] font-[800] uppercase">
                Entry: {entryFee}
              </span>
            </div>

            <div className="flex-1 bg-white/90 px-2 py-1 rounded-[6px] border-[2px] border-black">
              <span className="text-[11px] font-[800] uppercase">
                Prize: {prizePool}
              </span>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 stroke-[2.5px]" />
              <span className="text-[11px] font-[800] uppercase">
                {winningSeats}/{totalSeats} Joined
              </span>
            </div>
            <span className="text-[11px] font-[800] uppercase">
              {Math.round(percentage)}%
            </span>
          </div>

          <div className="w-full h-[10px] bg-black/20 rounded-[6px] border-[2px] border-black overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Detail Only Section */}
        <div className="mb-3 flex items-center justify-end gap-2">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-[6px] border-[2px] border-black">
            <FileQuestion className="w-3 h-3 stroke-[2.5px]" />
            <span className="text-[11px] font-[800] uppercase">
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
            <span className="text-[11px] font-[800] uppercase">
              {difficulty}
            </span>
          </div>
        </div>

        {/* Button */}
        <Button
          className="w-full bg-gray-800 hover:bg-black text-white py-7 text-xl rounded-[10px]
                       border-[3px] border-black uppercase font-[900] text-[14px]"
          style={{
            boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
          }}
        >
          {"Join Quiz →"}
        </Button>
      </CardContent>

      {/* Spots Left Badge */}
      {totalSeats - winningSeats <= 50 && (
        <div
          className="absolute -top-2 -right-2 bg-[#6366F1] text-white px-3 py-1
                       rounded-[8px] border-[2px] border-black text-[10px]
                       font-[900] uppercase rotate-3 z-20"
          style={{
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          {totalSeats - winningSeats} Spots Left!
        </div>
      )}
    </Card>
  );
}
