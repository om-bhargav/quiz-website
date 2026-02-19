"use client";

import React, { useState } from "react";
import Wrapper from "../_components/Wrapper";
import { Wallet, AlertCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const [amount, setAmount] = useState("");
  const balance = 5240;
  const minWithdraw = 100;
  const maxWithdraw = 50000;

  const numAmount = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  const canWithdraw =
    numAmount >= minWithdraw &&
    numAmount <= balance &&
    numAmount <= maxWithdraw;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <Wrapper title="Withdraw">
      <motion.div
        className="p-4 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Available Balance */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          className="rounded-[14px] border-[3px] border-black p-4 bg-[#A5F3A0] shadow-[4px_4px_0px_#000]"
        >
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-5 h-5 stroke-[2.5px]" />
            <span className="text-[12px] font-[800] uppercase">Available</span>
          </div>
          <p className="text-[28px] font-[900]">
            ₹{balance.toLocaleString("en-IN")}
          </p>
        </motion.div>

        {/* Amount Input */}
        <motion.div variants={fadeUp}>
          <label className="text-[12px] font-[800] uppercase text-black/70 mb-2 block">
            Withdraw amount (₹)
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter amount"
            className="w-full rounded-[12px] border-[3px] border-black px-4 py-3 text-[18px] font-[900] focus:outline-none focus:ring-4 focus:ring-[#A78BFA] shadow-[3px_3px_0px_#000]"
          />

          <p className="text-[11px] font-[700] text-black/60 mt-2">
            Min ₹{minWithdraw} · Max ₹{maxWithdraw.toLocaleString()}
          </p>
        </motion.div>

        {/* Preset Buttons */}
        <motion.div variants={fadeUp} className="flex gap-2">
          {[500, 1000, 2000, 5000].map((preset) => (
            <motion.button
              key={preset}
              type="button"
              onClick={() => setAmount(String(preset))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 rounded-[10px] border-[2px] border-black py-2 text-[13px] font-[800] uppercase bg-white hover:bg-[#A78BFA]/30 shadow-[2px_2px_0px_#000]"
            >
              ₹{preset}
            </motion.button>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          variants={fadeUp}
          className="rounded-[12px] border-[2px] border-black p-3 bg-amber-50 flex gap-2 shadow-[2px_2px_0px_#000]"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 stroke-[2.5px]" />
          <p className="text-[12px] font-[700] text-black/80">
            Withdrawals are processed within 24–48 hours to your registered bank
            account.
          </p>
        </motion.div>

        {/* Withdraw Button */}
        <motion.button
          variants={fadeUp}
          whileHover={canWithdraw ? { scale: 1.03 } : {}}
          whileTap={canWithdraw ? { scale: 0.97 } : {}}
          type="button"
          disabled={!canWithdraw}
          className={`w-full py-4 rounded-[14px] border-[4px] border-black uppercase font-[900] text-[18px] tracking-wide flex items-center justify-center gap-2 shadow-[6px_6px_0px_#000] ${
            canWithdraw
              ? "bg-[#6366F1] text-white"
              : "bg-gray-300 text-black/50 cursor-not-allowed"
          }`}
        >
          <CreditCard className="w-6 h-6" />
          {canWithdraw
            ? `Withdraw ₹${numAmount.toLocaleString()}`
            : "Enter amount"}
        </motion.button>
      </motion.div>
    </Wrapper>
  );
}
