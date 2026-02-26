"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../../../_components/Wrapper";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Medal, Home, FileQuestion, Trophy } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import toast from "react-hot-toast";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Page() {
  const { id } = useParams();
  const [ending, setEnding] = useState(false);
  const [canFetchLeaderBoard, setCanFetchLeaderBoard] = useState(false);
  useEffect(() => {
    const updateData = async () => {
      setEnding(true);
      try {
        const request = await fetch(`/api/user/tournaments/${id}/end`, {
          method: "POST",
        });
        const response = await request.json();
        if (!response.success) {
          throw Error(response.message);
        }
      } catch (error: any) {
        // toast.error(error.message);
      } finally {
        setEnding(false);
        setCanFetchLeaderBoard(true);
      }
    };
    updateData();
  }, []);
  const { data, isLoading, isValidating, error } = useSWR(
    canFetchLeaderBoard ? `/api/user/tournaments/${id}/leaderboard` : null,
    fetcher
  );
  const leaderboard = data?.leaderboard;
  const loading = isLoading || isValidating || ending;
  const top3 = leaderboard?.slice(0, 3);
  const rest = leaderboard?.slice(3);
  return (
    <Wrapper title="LeaderBoard">
      {/* 🏆 PODIUM */}
      <ErrorLoading
        error={error}
        loading={loading}
        dataLength={top3?.length}
        emptyMessage="No Users Played!"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 pt-6 pb-4"
        >
          <div className="relative rounded-[20px] border-[4px] border-black bg-gradient-to-b from-amber-100 to-amber-50 min-h-[200px] flex flex-col justify-end shadow-[8px_8px_0px_#000]">
            <div className="absolute top-3 left-0 right-0 text-center text-[12px] font-[800] uppercase text-black/70">
              Winners
            </div>

            <div className="flex md:items-end max-md:items-center justify-center max-md:flex-col md:gap-10 pb-6 pt-14 px-2">
              {top3?.map((player: any, index: number) => {
                const isFirst = index === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col items-center w-[110px]"
                  >
                    <div
                      className={`w-${isFirst ? "16" : "14"} h-${
                        isFirst ? "16" : "14"
                      } rounded-full border-[3px] border-black flex items-center justify-center mb-3 shadow-[4px_4px_0px_#000] ${
                        isFirst ? "bg-[#FFDB58]" : "bg-white"
                      }`}
                    >
                      {isFirst ? (
                        <Trophy className="w-7 h-7 text-amber-600" />
                      ) : (
                        <Medal className="w-6 h-6 text-gray-600" />
                      )}
                    </div>

                    <div className="rounded-[14px] border-[3px] border-black px-3 py-2 text-center bg-white shadow-[5px_5px_0px_#000]">
                      <p className="text-[12px] font-[900] uppercase truncate">
                        {player.name}
                      </p>
                      <p className="text-[11px] font-[700] text-black/80">
                        {formatTime(player.time)}
                      </p>
                      <p className="text-[11px] font-[700] text-black/80">
                        {player.score}
                      </p>
                    </div>

                    <div className="mt-2 px-3 py-1 border-[2px] border-black text-[13px] font-[900] rounded-[8px] bg-[#6366F1] text-white">
                      #{player.rank}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </ErrorLoading>
      {/* 📋 ALL PLAYERS */}
      <div className="px-4">
        <h2 className="text-[16px] font-[900] uppercase mb-3">All Players</h2>
        <ErrorLoading
          error={error}
          loading={loading}
          dataLength={rest?.length}
          emptyMessage="No More Users!"
        >
          <div className="rounded-[14px] border-[3px] border-black bg-white overflow-hidden shadow-[5px_5px_0px_#000]">
            {rest?.map((player: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 border-b-[2px] border-black last:border-b-0 ${
                  player?.isMe ? "bg-[#6366F1]/15" : ""
                }`}
              >
                <span className="w-8 text-[14px] font-[900] text-center">
                  #{player.rank}
                </span>

                <div className="flex-1">
                  <p className="text-[14px] font-[800] uppercase truncate">
                    {player.name} {player?.isMe && "(You)"}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-[700] text-black/70">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(player.time)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileQuestion className="w-3.5 h-3.5" />
                      {player.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ErrorLoading>
      </div>

      {/* 🏠 BACK BUTTON */}
      <div className="px-4 pt-6 pb-10">
        <Link
          href="/mobile"
          className="w-full py-4 rounded-[14px] border-[4px] border-black bg-[#6366F1] text-white uppercase font-[900] text-[18px] flex items-center justify-center gap-2 shadow-[6px_6px_0px_#000] active:translate-y-[2px]"
        >
          <Home className="w-6 h-6" />
          Go Back Home
        </Link>
      </div>
    </Wrapper>
  );
}
