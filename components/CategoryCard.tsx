import { colorMap } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
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
  eventsCount,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${color && colorMap[color]}
        flex-shrink-0
        w-full h-full!
        rounded-[16px]
        border-[3px]
        overflow-hidden
        text-center
        transition-all duration-300
        hover:scale-102
        active:scale-101
        focus:outline-none focus:ring-4 focus:ring-black/20
        px-1 py-2
        ${selected ? "border-black" : "border-gray-300 bg-gray-50"}
      `}
      style={{
        boxShadow: selected
          ? "5px 5px 0px #000000"
          : "2px 2px 0px rgba(0,0,0,0.1)",
      }}
    >
      {/* Avatar */}
      <Avatar className="
        flex
        w-[48px] h-[48px]
        sm:w-[56px] sm:h-[56px]
        my-1
        mx-auto
        border-3 border-black
        items-center justify-center
      ">
        <AvatarImage
          alt={name}
          src={image}
          className={`w-full h-full object-cover ${
            selected ? "" : "grayscale"
          }`}
        />
        <AvatarFallback className="w-full uppercase h-full text-base sm:text-lg font-extrabold text-black">
          {name[0]}
        </AvatarFallback>
      </Avatar>

      {/* Name */}
      <div className="p-1">
        <p
          className={`
            text-[11px]
            sm:text-[12px]
            font-[900]
            uppercase
            leading-tight
            truncate
            mb-1
            ${selected ? "text-black" : "text-gray-500"}
          `}
        >
          {name}
        </p>
      </div>

      {/* Events Count */}
      <div className="px-1 sm:px-2">
        <p
          className="
            font-[900]
            py-1.5 px-2
            sm:p-2
            text-[10px]
            sm:text-xs
            uppercase
            leading-tight
            bg-foreground
            text-background
            rounded-xl
            truncate
            mb-1
          "
        >
          {eventsCount}
        </p>
      </div>
    </button>
  );
}


export function CategoryCardSkeleton() {
  return (
    <div
      className="
        flex-shrink-0
        w-full
        rounded-[16px]
        border-[3px] border-gray-200
        bg-card
        overflow-hidden
        px-2 py-2
      "
      style={{
        boxShadow: "2px 2px 0px rgba(0,0,0,0.1)",
      }}
    >
      {/* Avatar Skeleton */}
      <div className="flex justify-center my-2 sm:my-3">
        <Skeleton className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full" />
      </div>

      {/* Name Skeleton */}
      <div className="p-1 flex justify-center">
        <Skeleton className="h-[12px] sm:h-[14px] w-3/4 rounded-md" />
      </div>

      {/* Events Count Skeleton */}
      <div className="px-1 sm:px-2 flex justify-center mt-2">
        <Skeleton className="h-[24px] sm:h-[28px] w-2/3 rounded-xl" />
      </div>
    </div>
  );
}