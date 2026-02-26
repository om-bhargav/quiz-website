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
      link: "/mobile",
      color: "amber",
    },
    {
      icon: User,
      title: "profile",
      link: "/mobile/profile",
      color: "sky-blue",
    },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-3 left-1/2 -translate-x-1/2 w-full max-w-lg sm:px-2 z-[100]">
      <div className="flex items-center justify-center gap-3 sm:gap-5 bg-background border-4 sm:border-6 rounded-xl sm:rounded-2xl shadow-[6px_4px_0px_0px] sm:shadow-[8px_5px_0px_0px] border-black">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full place-items-center">
          {ITEMS.map(({ icon: Icon, title, link, color }: any) => {
            const active = pathName.endsWith(link);
            return (
              <Link href={link} key={link} className="max-w-[120px] w-full">
                <div
                  className={`grid place-items-center py-2 sm:py-3 px-2 gap-1 w-full ${
                    active &&
                    colorMap[color] +
                      " border-3 sm:border-4 border-black shadow-[2px_2px_0px_2px_black] rounded-lg sm:rounded-xl"
                  }`}
                >
                  <Icon
                    strokeWidth={3}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <div className="uppercase text-center font-extrabold text-sm sm:text-lg">
                    {title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}