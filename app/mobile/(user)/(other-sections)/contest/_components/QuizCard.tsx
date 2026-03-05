import Link from "@/components/AppLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { colorMap } from "@/lib/constants";
import { Coins, FileQuestion, Radio, Users, Zap } from "lucide-react";
import { useMemo } from "react";

interface QuizCardProps {
  id?: number;
  title: string;
  entryFee: string;
  prizePool: string;
  totalSeats: number;
  seatsLeft: number;
  status: string;
  startTime: string;
  windowOpenTime: string;
  endTime: string;
  index: number;
  questions?: number;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  styles?: any;
}

const difficultyColors = {
  EASY: "green",
  MEDIUM: "amber",
  HARD: "pink",
  EXPERT: "purple",
};

export function QuizCard({
  id,
  title,
  entryFee,
  prizePool,
  totalSeats,
  seatsLeft,
  index,
  startTime,
  windowOpenTime,
  questions = 10,
  difficulty = "MEDIUM",
  styles={},
  endTime,
  status
}: QuizCardProps) {
  const percentage = useMemo(() => {
    if (!totalSeats) return 0;
    return Math.min(100, ((totalSeats - seatsLeft) / totalSeats) * 100);
  }, [totalSeats, seatsLeft]);

  const rotation = index % 2 === 0 ? "-0.6deg" : "0.6deg";
  const colors = Object.values(colorMap);
  const startTimeObject = new Date(startTime);
  const now = new Date();
  const diff = startTimeObject.getTime() - now.getTime();
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );
  let message = "";
  let styleForMe = "";
  switch(status){
    case "PUBLISHED":
      message = `Registrations will open in ${daysLeft>0 ? `${daysLeft} Days, `:""} ${hoursLeft>0 ? `${hoursLeft} Hours, `:""} ${minutesLeft>0 ? `${minutesLeft} Minutes`:""}`
      styleForMe = "text-yellow-500";
      break;
    case "LIVE":
      message = `Registrations Are Open, Register Now!`
      styleForMe = "text-green-500";
      break;
    default:
      message = `Event is ${status}`;
      styleForMe = "text-red-500";
      break;
  }
  return (
    <Card
      className={`relative my-3 md:my-4 p-3 md:p-4 rounded-[14px] border-[3px] border-black overflow-hidden
      transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] ${
        colors[index%colors.length]
      }`}

      style={{
        boxShadow: "5px 5px 0px #000000",
        transform: `rotate(${rotation})`,
        ...styles
      }}
    >
      <CardContent className="relative z-10 p-0">

        <div className="mb-2 md:mb-3">
          <h3 className="text-[13px] sm:text-[15px] md:text-[18px] font-[900] uppercase leading-snug md:leading-tight mb-2 break-words">
            {title}
          </h3>

          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded-[6px]">
              <Coins className="w-3 h-3" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[800] uppercase">
                Entry: {entryFee}
              </span>
            </div>

            <div className="flex-1 bg-white/90 px-2 py-1 rounded-[6px] border-[2px] border-black">
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[800] uppercase">
                Prize: ₹{prizePool}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-2 md:mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 md:w-4 md:h-4 stroke-[2.5px]" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[800] uppercase">
                {totalSeats - seatsLeft}/{totalSeats} Joined
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[800] uppercase">
              {Math.round(percentage)}%
            </span>
          </div>

          <div className="w-full h-[8px] md:h-[10px] bg-black/20 rounded-[6px] border-[2px] border-black overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="mb-2 md:mb-3 flex items-center justify-end gap-1 md:gap-2">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-[6px] border-[2px] border-black">
            <FileQuestion className="w-3 h-3 stroke-[2.5px]" />
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[800] uppercase">
              {questions} Questions
            </span>
          </div>

          <div
            className="flex items-center gap-1 px-2 py-1 rounded-[6px] border-[2px] border-black"
            style={{ backgroundColor: difficultyColors[difficulty] }}
          >
            <Zap className="w-3 h-3 stroke-[2.5px]" />
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[800] uppercase">
              {difficulty}
            </span>
          </div>
          
        </div>
          <div className={`flex items-center gap-1 pt-1 pb-2 animate-pulse ${styleForMe}`}>
            <Radio className="w-3 h-3 stroke-[2.5px]" />
            <span className="text-[10px] sm:text-[15px] font-[400] uppercase">
              {message}
            </span>
          </div>

        <Link href={`/mobile/join-quiz/${id}`}>
          <Button
            className="w-full bg-gray-800 hover:bg-black text-white 
            py-5 md:py-7 rounded-[10px] border-[3px] border-black 
            uppercase font-[900] text-[12px] sm:text-[13px] md:text-[14px]"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
          >
            Join Quiz →
          </Button>
        </Link>

      </CardContent>
    </Card>
  );
}


interface QuizCardSkeletonProps {
  index: number;
}

export function QuizCardSkeleton({ index }: QuizCardSkeletonProps) {
  const rotation = index % 2 === 0 ? "-0.6deg" : "0.6deg";

  return (
    <Card
      className="
        relative my-3 md:my-4
        p-3 md:p-4
        rounded-[14px]
        border-[3px] border-black
        overflow-hidden
      "
      style={{
        boxShadow: "5px 5px 0px #000000",
        transform: `rotate(${rotation})`,
      }}
    >
      <CardContent className="relative z-10 p-0 space-y-3">

        {/* Title */}
        <div>
          <Skeleton className="h-4 sm:h-5 md:h-6 w-3/4 rounded-md mb-3" />

          {/* Entry + Prize Row */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-[6px]" />
            <Skeleton className="flex-1 h-6 rounded-[6px]" />
          </div>
        </div>

        {/* Progress Section */}
        <div>
          <div className="flex justify-between mb-1">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-3 w-8 rounded-md" />
          </div>

          <Skeleton className="w-full h-[8px] md:h-[10px] rounded-[6px]" />
        </div>

        {/* Questions + Difficulty */}
        <div className="flex justify-end gap-2">
          <Skeleton className="h-6 w-28 rounded-[6px]" />
          <Skeleton className="h-6 w-20 rounded-[6px]" />
        </div>

        {/* Button */}
        <Skeleton className="w-full h-[56px] md:h-[64px] rounded-[10px]" />

      </CardContent>
    </Card>
  );
}