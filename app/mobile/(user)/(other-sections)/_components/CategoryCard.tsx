import Link from "@/components/AppLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colorMap } from "@/lib/constants";

export interface Category {
  id: string | null;
  name: string;
  image: string;
  tournamentsSize?: number;
}

interface CategoryCardProps {
  redirectBase: string;
  color: string;
  category: Category;
  selected?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  redirectBase,
  color,
  category,
  onClick,
}: CategoryCardProps) {
  const { name, image, tournamentsSize } = category;

  return (
    <Link className="w-full" href={`${redirectBase}/${category.id}`}>
    <button
      type="button"
      onClick={onClick}
      className={`
        ${color && colorMap[color]}
        flex-shrink-0
        w-full h-full
        mx-auto 
        rounded-[16px]
        border-[3px]
        overflow-hidden
        text-center
        transition-all duration-300
        hover:scale-[1.02]
        active:scale-[0.97]
        focus:outline-none focus:ring-4 focus:ring-black/20
        px-2 py-2
        border-gray-300 bg-gray-50
      `}
      style={{
        boxShadow:"5px 5px 0px #000000"
      }}
    >
      {/* Avatar */}
      <Avatar
        className="
        flex
        w-[48px] h-[48px]
        sm:w-[56px] sm:h-[56px]
        my-2 sm:my-3
        mx-auto
        border-3 border-black
        items-center justify-center
      "
      >
        <AvatarImage
          alt={name}
          src={image}
          className={`w-full h-full object-cover`}
        />
        <AvatarFallback className="w-full uppercase h-full text-base sm:text-lg font-extrabold text-black">
          {name?.[0]}
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
            text-black}
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
          {tournamentsSize ?? 0}
        </p>
      </div>
    </button>
    </Link>
  );
}