"use client";
import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionCard({txn,row}:{txn: any,row: any}) {
  return (
    <motion.div
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
  );
}

export function TransactionCardSkeleton() {
  return (
    <Card
      className="rounded-[14px] gap-0 border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_black]"
    >
      {/* Title */}
      <Skeleton className="h-[16px] w-[140px] mb-2 rounded-md" />

      {/* Date */}
      <Skeleton className="h-[12px] w-[180px] mb-3 rounded-md" />

      {/* Badges Row */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <Skeleton className="h-[26px] w-[90px] rounded-[6px]" />
        <Skeleton className="h-[26px] w-[90px] rounded-[6px]" />
      </div>

      {/* Amount + Tokens */}
      <div className="mt-3 flex items-center justify-between">
        <Skeleton className="h-[18px] w-[80px] rounded-md" />
        <Skeleton className="h-[24px] w-[70px] rounded-[6px]" />
      </div>
    </Card>
  )
}