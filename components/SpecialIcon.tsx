import React from "react";

export default function SpecialIcon({ Icon,onClick }: {Icon: any,onClick?: any}) {
  return (
    <div onClick={onClick} className="min-h-[70px] min-w-[70px]!  flex items-center justify-center border-4 border-black shadow-[5px_5px_0px_0px_black] max-w-[80px] rounded-xl bg-background w-full">
      <Icon className="h-6 w-6 stroke-[3px]" />
    </div>
  );
}
