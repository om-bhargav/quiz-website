"use client";

import { useState } from "react";
import Wrapper from "../../_components/Wrapper";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Users,
  FileQuestion,
  Clock,
  Zap,
  Trophy,
  CheckCircle2,
  Wallet,
  Loader2,
} from "lucide-react";
import { SlideToContinueModal } from "@/components/SlideToContinueModal";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { HandleSkeleton } from "@/app/mobile/(user)/(navigation)/profile/_components/HandleSkeleton";
import toast from "react-hot-toast";
import Link from "next/link";

const difficultyColors = {
  EASY: "bg-[#A5F3A0]",
  MEDIUM: "bg-[#FFDB58]",
  HARD: "bg-[#A78BFA]",
  EXPERT: "bg-[#F97316]",
};

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [showSlideModal, setShowSlideModal] = useState(false);

  const handleJoinContest = () => {
    if (canJoin) setShowSlideModal(true);
  };

  const handleSlideConfirm = () => {
    setShowSlideModal(false);
    router.push(`/join-quiz/${id}/play`);
  };

  const { data, isLoading, isValidating } = useSWR(
    `/api/user/tournaments/${id}`,
    fetcher
  );
  const {
    data: dwallet,
    isLoading: wloading,
    isValidating: wvalidating,
  } = useSWR("/api/user/wallet", fetcher);
  const {
    data: registration,
    isLoading: registrationLoading,
    isValidating: registrationValidating,
    mutate
  } = useSWR(`/api/user/tournaments/${id}/check-registration`, fetcher);
  const loading =
    isLoading ||
    isValidating ||
    wloading ||
    wvalidating ||
    registrationLoading ||
    registrationValidating;
  const tournament = data?.tournament;
  const wallet = dwallet?.wallet;
  const progress =
    ((tournament?.totalSeats - tournament?.seatsLeft) /
      tournament?.totalSeats) *
    100;
  const userWalletBalance = wallet?.balance;
  const entryFee = parseInt(tournament?.entryFee ?? ""?.replace(/[₹,]/g, ""));
  const tournamentStatus = tournament?.status;
  const canJoin = userWalletBalance >= entryFee;
  const isRegistered = registration?.success === true;
  const registrationData = registration?.registration;
  const hasPlayed = registrationData?.status==="PLAYED";
  const [pending,setPending] = useState(false);
  let buttonLabel = "";
  let isDisabled = true;
  let onClickHandler: (() => void) | undefined = undefined;
  const handleRegister = async () =>{
    try{  
      setPending(true);
      const request = await fetch(`/api/user/tournaments/${id}/register`,{
        method: "POST",
        body: JSON.stringify({
          tournamentId: id
        })
      })
      const response = await request.json();
      if(!response.success){
        throw Error(response.message);
      }
      toast.success(response.message);
      mutate();
    }catch(error: any){
      toast.error(error.message);
    }finally{
      setPending(false);
    }
  };
  switch (tournamentStatus) {
    case "DRAFT":
      buttonLabel = "⏳ Contest hasn't started yet";
      break;

    case "PUBLISHED":
      if (isRegistered) {
        buttonLabel = "✅ Registered";
      } else {
        buttonLabel = "🎯 Register Now";
        isDisabled = pending;
        onClickHandler = handleRegister;
      }
      break;

    case "LIVE":
      if (isRegistered) {
        if(hasPlayed){
          buttonLabel = "Already Played ✅";
          isDisabled = true;
        }else{
          buttonLabel = "🚀 Join Quiz";
          isDisabled = false;
          onClickHandler = handleJoinContest;
        }
      } else {
        buttonLabel = "❌ Registration Closed";
      }
      break;

    case "COMPLETED":
      buttonLabel = "🏁 Contest has ended";
      break;
  }
  return (
    <Wrapper title="Join contest">
      {/* Header */}
      <div className="p-4">
        <div className="relative bg-[#FFDB58] rounded-[16px] p-5 border-[4px] border-black overflow-hidden shadow-[6px_6px_0px_#000]">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1754300681803-61eadeb79d10"
              alt="Contest background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-[24px] font-[900] uppercase mb-4">
              <HandleSkeleton loading={loading}>
                {tournament?.title}
              </HandleSkeleton>
            </h2>

            {/* Prize + Entry */}
            <div className="flex gap-2 mb-4">
              <div className="bg-white rounded-[10px] px-3 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000]">
                <p className="text-[10px] font-[800] uppercase text-black/60">
                  Prize Pool
                </p>
                <div className="text-[20px] font-[900]">
                  <HandleSkeleton loading={loading}>
                    ₹{tournament?.prizePool}
                  </HandleSkeleton>
                </div>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000]">
                <p className="text-[10px] font-[800] uppercase text-black/60">
                  Entry Fee
                </p>
                <div className="text-[20px] font-[900]">
                  <HandleSkeleton loading={loading}>
                    ₹{tournament?.entryFee}
                  </HandleSkeleton>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="flex justify-between text-[12px] font-[800] uppercase mb-1">
              <span>
                <HandleSkeleton loading={loading}>
                  {tournament?.totalSeats - tournament?.seatsLeft}/
                  {tournament?.totalSeats}{" "}
                </HandleSkeleton>
                Joined
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="w-full h-[10px] bg-black/20 rounded-[6px] border-[2px] border-black overflow-hidden">
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contest Info */}
      <div className="px-4 pb-4">
        <h3 className="text-[18px] font-[900] uppercase mb-3">Contest Info</h3>

        <div className="grid grid-cols-2 gap-3">
          <InfoCard
            icon={<FileQuestion />}
            value={
              <HandleSkeleton loading={loading}>
                {tournament?.totalQuestions}
              </HandleSkeleton>
            }
            label="Questions"
            bg="bg-[#A5F3FC]"
          />
          <InfoCard
            icon={<Clock />}
            value={
              <HandleSkeleton loading={loading}>
                {tournament?.durationPerQ}
              </HandleSkeleton>
            }
            label="Seconds Duration Per Question"
            bg="bg-[#A78BFA]"
          />
          <InfoCard
            icon={<Zap />}
            value={
              <HandleSkeleton loading={loading}>
                {tournament?.difficulty}
              </HandleSkeleton>
            }
            label="Difficulty"
            bg={
              difficultyColors[
                tournament?.difficulty as keyof typeof difficultyColors
              ]
            }
          />
          <InfoCard
            icon={<Trophy />}
            value={
              <HandleSkeleton loading={loading}>
                Top {tournament?.winningSeats}
              </HandleSkeleton>
            }
            label="Win Prizes"
            bg="bg-[#A5F3A0]"
          />
        </div>
      </div>

      {/* Wallet */}
      <div className="px-4 pb-4">
        <div
          className={`rounded-[12px] p-4 border-[3px] border-black flex justify-between items-center shadow-[4px_4px_0px_#000] ${
            canJoin ? "bg-[#A5F3A0]" : "bg-[#FFDB58]"
          }`}
        >
          <span className="font-[800] uppercase">Your Balance:</span>
          <span className="text-[18px] font-[900]">
            <HandleSkeleton loading={loading}>
              ₹{userWalletBalance}
            </HandleSkeleton>
          </span>
        </div>
      </div>

      {/* Join Button */}
      <div className="px-4 pb-6">
        <button
          disabled={isDisabled || loading}
          onClick={onClickHandler}
          className={`w-full py-4 rounded-[14px] border-[4px] border-black uppercase font-[900] text-[18px] shadow-[6px_6px_0px_#000] ${
            !isDisabled
              ? "bg-[#6366F1] text-white active:translate-y-[2px]"
              : "bg-gray-300 text-black/40 cursor-not-allowed"
          }`}
        >
          {(pending || loading) ? <Loader2 className="mx-auto animate-spin"/>:buttonLabel}
        </button>
        {
          tournamentStatus==="COMPLETED" &&
          <Link href={`/mobile/join-quiz/${id}/leaderboard`}> 
          <button
          disabled={loading}
          className={`w-full mt-4 py-4 rounded-[14px] border-[4px] border-black uppercase font-[900] text-[18px] shadow-[6px_6px_0px_#000] bg-[#6366F1] text-white active:translate-y-[2px]`}
          >
          Go To LeaderBoard
        </button>
          </Link>
        }
      </div>

      <SlideToContinueModal
        isOpen={showSlideModal}
        onClose={() => setShowSlideModal(false)}
        onConfirm={handleSlideConfirm}
      />
    </Wrapper>
  );
}

/* Reusable Info Card */
function InfoCard({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: any;
  label: string;
  bg: string;
}) {
  return (
    <div
      className={`${bg} rounded-[12px] p-4 border-[3px] border-black shadow-[4px_4px_0px_#000]`}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-[18px] font-[900]">{value}</div>
      <p className="text-[10px] font-[800] uppercase text-black/60">{label}</p>
    </div>
  );
}
