"use client";

import React, { useEffect } from "react";
import Wrapper from "../_components/Wrapper";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import ErrorLoading from "@/components/ErrorLoading";
import TransactionCard, { TransactionCardSkeleton } from "./_components/TransactionCard";

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

  const { data, isLoading, error, isValidating } = useSWR(
    "/api/user/transactions",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <Wrapper title="Transaction History">
      <div className="p-4">
        <motion.div variants={container} initial="hidden" animate="show">
          <ErrorLoading
            className="grid gap-5"
            loading={isLoading}
            error={error}
            loadingCard={TransactionCardSkeleton}
            loadingCols={1}
            loadingRows={5}
            loadingCount={5}
            dataLength={data?.data?.length}
            emptyMessage="No Transactions Found!"
          >
            {data?.data?.map((txn: any) => (
              <TransactionCard key={txn.id} txn={txn} row={row} />
            ))}
          </ErrorLoading>
        </motion.div>
      </div>
    </Wrapper>
  );
}
