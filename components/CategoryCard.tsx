import { colorMap } from "@/lib/constants";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CategoryCardProps {
  id: string | null;
  name: string;
  image: string;
  color: string;
  eventsCount?: number;
  selected?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  id,
  name,
  image,
  color,
  selected = false,
  onClick,
  eventsCount
}: CategoryCardProps) {
  // const isAllContest = id === "default";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        color && colorMap[color]
      } flex-shrink-0 w-full h-full! rounded-[16px] border-[3px] overflow-hidden text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-black/20 ${
        selected ? "border-black" : "border-gray-300 bg-gray-50"
      }`}
      style={{
        boxShadow: selected
          ? "5px 5px 0px #000000"
          : "2px 2px 0px rgba(0,0,0,0.1)",
      }}
    >
      {/* Rounded image – none for All Contest */}
        <Avatar className="flex w-[56px] h-[56px] my-3 mx-auto border-3 border-black items-center justify-center">
          <AvatarImage>
            <Image
              fill
              src={image}
              alt={name}
              className={`w-full h-full object-cover ${
                selected ? "" : "grayscale"
              }`}
            />
          </AvatarImage>
          <AvatarFallback className="w-full uppercase h-full text-lg font-extrabold text-black">
            {name[0]}
          </AvatarFallback>
        </Avatar>
      {/* ) : (
        <div
          className={`mx-auto mt-2.5 w-[56px] h-[56px] rounded-full border-[2px] border-black flex-shrink-0 flex items-center justify-center ${
            selected ? "bg-amber-100/80" : "bg-gray-200"
          }`}
        >
          <span
            className={`text-[18px] font-[900] ${
              selected ? "text-black/80" : "text-gray-500"
            }`}
          >
            All
          </span>
        </div>
      )} */}
      <div className="p-1 pb-1">
        <p
          className={`text-[12px] font-[900] uppercase leading-tight truncate mb-1 ${
            selected ? "text-black" : "text-gray-500"
          }`}
        >
          {name}
        </p>
      </div>
        <div className="px-2">
        <p
          className={`font-[900] p-2 text-xs uppercase leading-tight bg-foreground text-background rounded-xl truncate mb-1`}
          >
          {eventsCount}
        </p>
      </div>
    </button>
  );
}
