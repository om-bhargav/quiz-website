"use client";

import React, { useState } from "react";
import Wrapper from "../_components/Wrapper";
import { CreditCard, Loader2, Plus, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Page() {
  const [amount, setAmount] = useState("");
  const [pending, setPending] = useState(false);
  const minAdd = 100;
  const maxAdd = 50000;

  const numAmount = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  const canAdd = numAmount >= minAdd && numAmount <= maxAdd;

  // Stagger container
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Reusable fade up animation
  const fadeUp: any = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const request = await fetch("/api/user/add-money", {
        method: "POST",
        body: JSON.stringify({
          money: amount,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Error Occured!");
    } finally {
      setPending(false);
    }
  };
  return (
    <Wrapper title="Add Money">
      <motion.form
        onSubmit={handleSubmit}
        className="p-4 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header Card */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          className="rounded-[14px] border-[3px] border-black p-4 bg-[#A5F3A0] shadow-[4px_4px_0px_#000]"
        >
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-5 h-5 stroke-[2.5px]" />
            <span className="text-[12px] font-[800] uppercase">
              Add to wallet
            </span>
          </div>
          <p className="text-[13px] font-[700] text-black/70">
            Min ₹{minAdd} · Max ₹{maxAdd.toLocaleString()}
          </p>
        </motion.div>

        {/* Amount Input */}
        <motion.div variants={fadeUp}>
          <label className="text-[12px] font-[800] uppercase text-black/70 mb-2 block">
            Amount (₹)
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter amount"
            className="w-full rounded-[12px] border-[3px] border-black px-4 py-3 text-[18px] font-[900] focus:outline-none focus:ring-4 focus:ring-[#A78BFA] shadow-[3px_3px_0px_#000]"
          />
        </motion.div>

        {/* Preset Buttons */}
        <motion.div variants={fadeUp} className="flex gap-2 flex-wrap">
          {[100, 500, 1000, 2000, 5000, 10000].map((preset) => (
            <motion.button
              key={preset}
              type="button"
              onClick={() => setAmount(String(preset))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-[10px] border-[2px] border-black py-2 px-3 text-[13px] font-[800] uppercase bg-white hover:bg-[#A5F3FC] shadow-[2px_2px_0px_#000]"
            >
              ₹{preset >= 1000 ? preset / 1000 + "K" : preset}
            </motion.button>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          variants={fadeUp}
          className="rounded-[12px] border-[2px] border-black p-3 bg-[#A5F3FC]/50 flex gap-2 shadow-[2px_2px_0px_#000]"
        >
          <CreditCard className="w-5 h-5 flex-shrink-0 stroke-[2.5px]" />
          <p className="text-[12px] font-[700] text-black/80">
            You will be redirected to a secure payment gateway. Amount will be
            credited to your wallet after successful payment.
          </p>
        </motion.div>

        {/* Add Button */}
        <motion.button
          variants={fadeUp}
          whileHover={canAdd ? { scale: 1.03 } : {}}
          whileTap={canAdd ? { scale: 0.97 } : {}}
          type="submit"
          disabled={pending || !canAdd}
          className={`w-full py-4 rounded-[14px] border-[4px] border-black uppercase font-[900] text-[18px] tracking-wide flex items-center justify-center gap-2 shadow-[6px_6px_0px_#000] ${
            (canAdd && !pending)
              ? "bg-[#6366F1] text-white"
              : "bg-gray-300 text-black/50 cursor-not-allowed"
          }`}
        >
          {pending && <Loader2 size={20} className="animate-spin"/>}
          <Plus className="w-6 h-6" />
          {canAdd ? `Add ₹${numAmount.toLocaleString()}` : "Enter amount"}
        </motion.button>
      </motion.form>
    </Wrapper>
  );
}
