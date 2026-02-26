"use client";

import React, { useEffect } from "react";
import Wrapper from "../_components/Wrapper";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import ErrorLoading from "@/components/ErrorLoading";

const DUMMY_TXN = [
  {
    id: 1,
    type: "credit",
    label: "Contest Win - Bollywood Quiz",
    amount: 500,
    date: "15 Feb 2025",
  },
  {
    id: 2,
    type: "debit",
    label: "Entry Fee - IPL Super Quiz",
    amount: 50,
    date: "15 Feb 2025",
  },
  {
    id: 3,
    type: "credit",
    label: "Contest Win - Cricket Legends",
    amount: 1000,
    date: "11 Feb 2025",
  },
  {
    id: 4,
    type: "debit",
    label: "Entry Fee - Tech Genius",
    amount: 100,
    date: "14 Feb 2025",
  },
  {
    id: 5,
    type: "credit",
    label: "Added to Wallet",
    amount: 2000,
    date: "10 Feb 2025",
  },
  {
    id: 6,
    type: "debit",
    label: "Entry Fee - World History",
    amount: 30,
    date: "12 Feb 2025",
  },
];

export default function Page() {
  // Stagger container
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  // Row animation
  const row: any = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const { data, isLoading, error,isValidating } = useSWR("/api/user/transactions", fetcher);
  return (
    <Wrapper title="Transaction History">
      <div className="p-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <ErrorLoading
            className="grid gap-5"
            loading={isLoading}
            error={error}
            dataLength={data?.data?.length}
            emptyMessage="No Transactions Found!"
          >
            {data?.data?.map((txn: any) => (
              <motion.div
                key={txn.id}
                variants={row}
                whileHover={{ scale: 1.02 }}
                initial="hidden"
                animate="show"
                className="rounded-[14px] border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_black]"
              >
                {/* Title */}
                <p className="text-[15px] font-[900] uppercase mb-1 truncate">
                  {txn.type === "CREDIT" ? "Wallet Credit" : "Wallet Debit"}
                </p>

                {/* Date */}
                <p className="text-[11px] font-[700] text-black/60 mb-3">
                  {new Date(txn.createdAt).toLocaleString()}
                </p>

                <div className="flex flex-wrap gap-2 items-center justify-between">
                  {/* TYPE BADGE */}
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800] ${
                      txn.type === "CREDIT" ? "bg-[#A5F3A0]" : "bg-[#E8D4DC]"
                    }`}
                  >
                    {txn.type === "CREDIT" ? (
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                    {txn.type}
                  </span>

                  {/* STATUS BADGE */}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800] ${
                      txn.status === "DONE"
                        ? "bg-[#A5F3A0]"
                        : txn.status === "PENDING"
                        ? "bg-[#FFDB58]"
                        : txn.status === "FAILED"
                        ? "bg-[#FCA5A5]"
                        : txn.status === "CANCELLED"
                        ? "bg-gray-300"
                        : "bg-[#A78BFA] text-white"
                    }`}
                  >
                    {txn.status}
                  </span>
                </div>

                {/* Amount + Tokens Row */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-[16px] font-[900] ${
                      txn.type === "CREDIT" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {txn.type === "CREDIT" ? "+" : "-"}₹{txn.amount}
                  </span>

                  {txn.tokens > 0 && (
                    <span className="text-[12px] font-[800] bg-[#A5F3FC] px-2 py-1 rounded-[6px] border-[2px] border-black">
                      {txn.tokens} Tokens
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </ErrorLoading>
        </motion.div>
      </div>
    </Wrapper>
  );
}
