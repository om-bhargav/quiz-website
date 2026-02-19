"use client";
import React from "react";
import Wrapper from "../_components/Wrapper";
import { Award, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const DUMMY_PLAYED = [
  {
    id: 1,
    title: "IPL Super Quiz 2026",
    date: "15 Feb 2025",
    score: "3/3",
    rank: 4,
    prize: "₹0",
  },
  {
    id: 2,
    title: "Tech Genius Challenge",
    date: "14 Feb 2025",
    score: "2/3",
    rank: 12,
    prize: "₹0",
  },
  {
    id: 3,
    title: "Bollywood Blockbuster",
    date: "13 Feb 2025",
    score: "3/3",
    rank: 2,
    prize: "₹500",
  },
  {
    id: 4,
    title: "World History Masters",
    date: "12 Feb 2025",
    score: "2/3",
    rank: 8,
    prize: "₹0",
  },
  {
    id: 5,
    title: "Cricket Legends",
    date: "11 Feb 2025",
    score: "3/3",
    rank: 1,
    prize: "₹1,000",
  },
];
export default function page() {
  return (
    <Wrapper title="Played Quiz">
      <div className="p-4">
        <div
          className="rounded-[14px] border-[3px] border-black p-4 bg-white mb-4 animate-fade-in"
          style={{ boxShadow: "4px 4px 0px #000000" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 stroke-[2.5px]" />
              <span className="text-[14px] font-[800] uppercase">
                Total Played
              </span>
            </div>
            <span className="text-[24px] font-[900]">24</span>
          </div>
        </div>

        <h2 className="text-[16px] font-[900] uppercase mb-3">
          Recent Quizzes
        </h2>
        <div className="space-y-3 z-200">
          {DUMMY_PLAYED.map((quiz, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5*(index+0.5), ease: "easeOut" }}
              key={quiz.id}
              className={`rounded-[14px] border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_black]`}
            >
              <p className="text-[15px] font-[900] uppercase mb-2">
                {quiz.title}
              </p>
              <p className="text-[11px] font-[700] text-black/60 mb-3">
                {quiz.date}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-[#A5F3A0] px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800]">
                  <Award className="w-3.5 h-3.5" /> {quiz.score}
                </span>
                <span className="inline-flex items-center gap-1 bg-[#A5F3FC] px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800]">
                  Rank #{quiz.rank}
                </span>
                {quiz.prize !== "₹0" && (
                  <span className="inline-flex items-center gap-1 bg-[#FFDB58] px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800]">
                    Won {quiz.prize}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
