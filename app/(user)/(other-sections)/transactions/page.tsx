"use client"

import React from "react"
import Wrapper from "../_components/Wrapper"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

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
]

export default function Page() {
  // Stagger container
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  }

  // Row animation
  const row: any = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  }

  return (
    <Wrapper title="Transaction History">
      <div className="p-4">
        <motion.div
          className="rounded-[14px] border-[3px] border-black overflow-hidden bg-white"
          style={{ boxShadow: "5px 5px 0px #000000" }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {DUMMY_TXN.map((txn) => (
            <motion.div
              key={txn.id}
              variants={row}
              whileHover={{ scale: 1.01 }}
              className={`flex items-center gap-3 px-4 py-3 border-b-[2px] border-black last:border-b-0 ${
                txn.type === "credit"
                  ? "bg-[#A5F3A0]/20"
                  : "bg-[#E8D4DC]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-[10px] border-[2px] border-black flex items-center justify-center flex-shrink-0 ${
                  txn.type === "credit"
                    ? "bg-[#A5F3A0]"
                    : "bg-[#A78BFA]"
                }`}
              >
                {txn.type === "credit" ? (
                  <ArrowDownLeft className="w-5 h-5 stroke-[2.5px]" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5px]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-[800] uppercase truncate">
                  {txn.label}
                </p>
                <p className="text-[11px] font-[700] text-black/60">
                  {txn.date}
                </p>
              </div>

              <span
                className={`text-[15px] font-[900] ${
                  txn.type === "credit"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Wrapper>
  )
}