"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { colorMap } from "@/lib/constants";
export default function TabsComponent() {
  const pathName = usePathname();
  const ITEMS = [
    {
      icon: Home,
      title: "home",
      link: "/home",
      color: "amber"
    },
    {
      icon: User,
      title: "profile",
      link: "/profile",
      color: "sky-blue"
    },
  ];
  return (
    <div className="max-w-lg w-full flex items-center justify-center gap-5 px-8 py-4 bg-background shadow-[5px_5px_0px_5px_black]  h-30 fixed z-100 bottom-5 border-6 rounded-2xl border-black">
      <div className="grid grid-cols-2 gap-5 w-full place-items-center">
        {ITEMS.map(({icon: Icon,title,link,color}:any) => {
          const active = pathName.startsWith(link); 
          return (
            <Link href={link} key={link} className="max-w-[120px] w-full!">
            <div className={`h-full place-items-center p-3 gap-1 grid w-full! ${active && colorMap[color]+" border-4 border-black shadow-[2px_2px_0px_2px_black] rounded-xl"}`}>
              <Icon strokeWidth={3} />
              <div className="uppercase text-center font-extrabold text-lg uppercase">
                {title}
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
