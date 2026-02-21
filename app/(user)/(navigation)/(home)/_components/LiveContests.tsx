"use client";
import QuizCard from "@/components/QuizCard";
import { colorMap } from "@/lib/constants";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

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

export default function LiveContests({ selected, setSelected }: Props) {
  const [data,setData] = useState({tournaments:[]});
  const [error,setError] = useState("");
  const [isLoading,setLoading] = useState(false);
  const colors = Object.keys(colorMap);
  const n = colors.length;
  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try{
        const request = await fetch(`/api/user/tournaments/${selected!=="all" ? `?categoryId=${selected}`:"" }`);
        const response = await request.json();
        if(!response.success){
          throw Error(response.message);
        }
        setData({tournaments:response.tournaments});
        setLoading(false);
        setError("");
      }catch(err: any){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  },[selected]);
  return (
    <div className="grid gap-3">
      <div className="flex text-2xl font-extrabold items-center justify-between">
        {/* <div className="uppercase">{selected===0 ? "all":quizzes.filter((item)=>item.id===selected)[0].title}</div> */}
        <div className="uppercase">ALL</div>
        <div className="flex gap-2 items-center">
          <div
            className={`h-3 w-3 rounded-full animate-pulse ${colorMap["purple"]}`}
          />{" "}
          LIVE
        </div>
      </div>

      <ErrorLoading loading={isLoading} error={error} emptyMessage="No Tournaments Found!" dataLength={data?.tournaments?.length}>
        <div className="grid gap-5">
          {data?.tournaments?.map((quiz: any, index: number) => {
            return (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                prizePool={quiz.prizePool}
                index={index}
                id={quiz.id}
                color={colors[index % n]}
                category={quiz.category}
                totalSeats ={quiz.totalSeats}
                seatsLeft={quiz.seatsLeft}
              />
            );
          })}
        </div>
      </ErrorLoading>
    </div>
  );
}
