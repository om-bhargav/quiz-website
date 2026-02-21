"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../../../_components/Wrapper";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import { HandleSkeleton } from "@/app/(user)/(navigation)/profile/_components/HandleSkeleton";
import toast from "react-hot-toast";

// const MOCK_QUESTIONS = [
//   {
//     id: 1,
//     question: "Who won the IPL 2024 title?",
//     options: [
//       "Kolkata Knight Riders",
//       "Mumbai Indians",
//       "Chennai Super Kings",
//       "Royal Challengers Bangalore",
//     ],
//     correctIndex: 0,
//   },
//   {
//     id: 2,
//     question: "How many teams participate in the IPL?",
//     options: ["8", "10", "12", "14"],
//     correctIndex: 1,
//   },
//   {
//     id: 3,
//     question: "Which country has won the most Cricket World Cups?",
//     options: ["India", "Australia", "West Indies", "England"],
//     correctIndex: 1,
//   },
// ];

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
    `/api/user/tournaments/${id}/join`,
    fetcher
  );
  const tournament = data?.tournament;
  const QUESTIONS = tournament?.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeConsumed, setTimeConsumed] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const question = QUESTIONS?.[currentIndex];
  const loading = isLoading;
  useEffect(() => {
    if (tournament?.durationPerQ) {
      setTimeConsumed(tournament.durationPerQ);
    }
  }, [data]);

  useEffect(() => {
    if (!tournament?.durationPerQ) return;
    if (timeConsumed <= 0) return;
    if (submitting) return;
    const interval = setInterval(() => {
      setTimeConsumed((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeConsumed, tournament?.durationPerQ]);

const submitAnswer = async (questionId: string,optionId: string,timeTaken: number) => {
  setSubmitting(true);
    try {
      const request = await fetch(`/api/user/tournaments/${id}/answer`, {
        method: "POST",
        body: JSON.stringify({
          questionId: questionId,
          optionId: optionId,
          timeTaken: timeTaken
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
}
// const endTournament = async (tournamentId: string) => {
//     setSubmitting(true);
//     try {
//       const request = await fetch(`/api/user/tournaments/${id}/end`, {
//         method: "POST"
//       });
//       const response = await request.json();
//       if (!response.success) {
//         throw Error(response.message);
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setSubmitting(false);
//     }
// }
  const handleNext = async () => {
    if (selectedOption) {
      // console.log(question?.id,selectedOption,tournament?.durationPerQ - timeConsumed);
      await submitAnswer(question?.id,selectedOption,tournament?.durationPerQ - timeConsumed);
      if(currentIndex===(QUESTIONS?.length-1)){
          toast.success("Tournament Played Successfully!");
      }
    }
    if (currentIndex >= QUESTIONS?.length - 1) return;
    setCurrentIndex((i) => i + 1);
    setTimeConsumed(tournament?.durationPerQ);
    setSelectedOption(null);
  };
  const goToHome = async () => {
    await handleNext();
    router.push(`/`);
  };

  useEffect(() => {
    if (timeConsumed === 0) {
      if (currentIndex < (QUESTIONS?.length || 0) - 1) {
        console.log(currentIndex);
        handleNext();
      }
    }
  }, [timeConsumed]);

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const getOptionStyle = (optionId: string) => {
    if (selectedOption === null)
      return "bg-white border-black hover:bg-gray-50";

    const isSelected = selectedOption === optionId;
    const isCorrectOption = optionId === question.correctIndex;

    if (isSelected && isCorrectOption)
      return "bg-green-400 border-green-600 text-white";

    if (isSelected && !isCorrectOption)
      return "bg-red-400 border-red-600 text-white";

    if (isCorrectOption) return "bg-green-400 border-green-600 text-white";

    return "bg-white border-black/30 text-black/60";
  };

  return (
    <Wrapper
      title={`Question ${currentIndex + 1} of ${
        QUESTIONS?.length ?? "Loading..."
      }`}
    >
      <ErrorLoading
        loading={loading}
        error={error}
        dataLength={question ? 1 : 0}
        emptyMessage="No Questions Were Added!"
      >
        <div className="p-4 space-y-6">
          {/* Timer */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center gap-2 bg-[#A5F3FC] rounded-[12px] py-3 border-[3px] border-black shadow-[4px_4px_0px_#000]"
          >
            <Clock className="w-5 h-5 stroke-[2.5px]" />
            <span className="text-[14px] font-[800] uppercase">Time:</span>
            <span className="text-[18px] font-[900] tabular-nums">
              {String(Math.floor(timeConsumed / 60)).padStart(2, "0")}:
              {String(timeConsumed % 60).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFDB58] rounded-[16px] p-5 border-[4px] border-black shadow-[6px_6px_0px_#000]"
            >
              <p className="text-[18px] font-[900] uppercase leading-snug">
                <HandleSkeleton loading={loading}>
                  {question?.text}
                </HandleSkeleton>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Options */}
          <div className="space-y-3">
            {question?.options?.map((option: any) => (
              <motion.button
                whileTap={{ scale: 0.97 }}
                key={option.id}
                type="button"
                disabled={submitting}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full rounded-[14px] p-4 border-[3px] text-left flex items-center justify-between gap-3 transition-all shadow-[4px_4px_0px_#000] ${getOptionStyle(
                  option.id
                )}`}
              >
                <span className="text-[15px] font-[800] uppercase flex-1">
                  {option.text}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Feedback + Next */}
          <AnimatePresence>
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="pt-2"
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={submitting}
                  onClick={
                    currentIndex < QUESTIONS?.length - 1
                      ? handleNext
                      : goToHome
                  }
                  className="w-full py-4 rounded-[14px] border-[4px] border-black bg-[#6366F1] text-white uppercase font-[900] text-[18px] shadow-[6px_6px_0px_#000] active:translate-y-[2px]"
                >
                  {currentIndex < QUESTIONS?.length - 1
                    ? submitting ? "Submitting...":"Next Question →"
                    :submitting ? "Finishing...":"Finish Quiz → Go To Home"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ErrorLoading>
    </Wrapper>
  );
}
