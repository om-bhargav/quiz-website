"use client";

import React from "react";
import Wrapper from "../_components/Wrapper";
import { Coins, Plus, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { HandleSkeleton } from "../../(navigation)/profile/_components/HandleSkeleton";

export default function Page() {
  const balance = 5240;
  const tokens = 2450;

  // Container for stagger animation
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // Reusable card animation
  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  const { data, isLoading, error,isValidating } = useSWR("/api/user/wallet", fetcher);
  return (
    <Wrapper title="Wallet">
      <motion.div
        className="p-4 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Balance card */}
        <motion.div
          variants={fadeUp}
          className="rounded-[16px] border-[4px] border-black p-6 bg-gradient-to-br from-[#A5F3A0] to-[#A5F3A0]/80"
          style={{ boxShadow: "6px 6px 0px #000000" }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-6 h-6 stroke-[2.5px]" />
            <span className="text-[12px] font-[800] uppercase text-black/70">
              Available Balance
            </span>
          </div>
          <div className="text-[32px] font-[900] mb-1">
            <HandleSkeleton loading={isLoading || isValidating}>
              ₹{data?.wallet?.balance.toLocaleString("en-IN")}
            </HandleSkeleton>
          </div>
          <p className="text-[12px] font-[700] text-black/60">
            Use for contest entry & withdrawals
          </p>
        </motion.div>

        {/* Tokens card */}
        <motion.div
          variants={fadeUp}
          className="rounded-[14px] border-[3px] border-black p-4 bg-white"
          style={{ boxShadow: "4px 4px 0px #000000" }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[12px] bg-amber-100 border-[2px] border-black flex items-center justify-center">
                <Coins className="w-6 h-6 stroke-[2.5px]" />
              </div>
              <div>
                <p className="text-[14px] font-[800] uppercase text-black/70">
                  Tokens
                </p>
                <div className="text-[22px] font-[900]">
                  <HandleSkeleton loading={isLoading || isValidating}>
                    ₹{data?.wallet?.balance?.toLocaleString()}
                  </HandleSkeleton>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-[700] text-black/60">
              Earn from quizzes
            </span>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={fadeUp} className="pt-2">
          <h2 className="text-[16px] font-[900] uppercase mb-3">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={"/add-money"}
                className="rounded-[14px] border-[3px] border-black p-4 bg-[#A5F3FC] flex items-center gap-3"
                style={{ boxShadow: "4px 4px 0px #000000" }}
              >
                <Plus className="w-6 h-6 stroke-[2.5px]" />
                <span className="text-[14px] font-[800] uppercase">
                  Add Money
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={"/withdraw"}
                className="rounded-[14px] border-[3px] border-black p-4 bg-[#A78BFA] flex items-center gap-3"
                style={{ boxShadow: "4px 4px 0px #000000" }}
              >
                <TrendingUp className="w-6 h-6 stroke-[2.5px]" />
                <span className="text-[14px] font-[800] uppercase">
                  Withdraw
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}
