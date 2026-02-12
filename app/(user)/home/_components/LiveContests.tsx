"use client";
import QuizCard from "@/components/QuizCard";
import React from "react";

export default function LiveContests() {
  return (
    <div className="grid gap-3">
      <div className="flex text-2xl font-extrabold items-center justify-between">
        <div className="uppercase">live contests</div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-4 bg-pink-300 rounded-full animate-pulse" />{" "}
          LIVE
        </div>
      </div>

      <div className="grid gap-5">
        <QuizCard color="green"/>
        <QuizCard color="pink"/>
        <QuizCard color="amber"/>
        <QuizCard color="blue"/>
      </div>
    </div>
  );
}
