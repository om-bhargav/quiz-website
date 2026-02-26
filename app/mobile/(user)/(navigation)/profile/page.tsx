"use client";
import Image from "next/image";
import {
  Clock,
  Trophy,
  Wallet,
  History,
  CreditCard,
  LogOut,
} from "lucide-react";

import MenuItemCard from "./_components/MenuItemCard";
import { colorMap } from "@/lib/constants";
import { signOut } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Suspense, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function page() {
  const { data, isLoading, error,isValidating } = useSWR("/api/user/profile", fetcher);

  const menuItems = [
    {
      Icon: Trophy,
      title: "Played Quiz",
      link: "/mobile/played-quiz",
      subtitle: data?.user?.tournamentsLength ?? 0,
      color: "amber",
    },
    {
      Icon: Wallet,
      title: "Wallet",
      link: "/mobile/wallet",
      subtitle: `₹${data?.user?.wallet?.balance ?? 0}`,
      color: "green",
    },
    {
      Icon: History,
      title: "Transaction History",
      link: "/mobile/transactions",
      subtitle: null,
      color: "sky-blue",
    },
    {
      Icon: CreditCard,
      title: "Withdraw",
      link: "/mobile/withdraw",
      subtitle: null,
      color: "pink",
    },
    {
      Icon: LogOut,
      title: "Logout",
      subtitle: null,
      color: "yellow",
      link: "/mobile#",
      action: () => {
        signOut({ redirect: true, callbackUrl: "/mobile/login" });
      },
    },
  ];
  return (
    <div className="w-full grid gap-6 md:gap-7 p-4 md:p-5 mx-auto">
      <div className="space-y-5 md:space-y-6">
        <h3 className="uppercase text-2xl md:text-3xl font-extrabold">
          My profile
        </h3>

        <div
          className={`flex flex-col relative p-5 md:p-8 gap-5 overflow-hidden items-center border-4 md:border-5 border-black min-h-[280px] md:min-h-[340px] rounded-xl shadow-[5px_5px_0px_3px_black] md:shadow-[8px_8px_0px_0px_black] ${colorMap["amber"]}`}
        >
          {/* Top Profile Section */}
          <div className="flex w-full gap-4 md:gap-6 justify-start items-center">
            <div className="h-20 w-20 md:h-30 md:w-30 relative rounded-xl overflow-hidden border-4 md:border-5 border-black shadow-[4px_4px_0px_0px_black] md:shadow-[6px_6px_0px_0px_black]">
              <Avatar className="w-full h-full rounded-none bg-transparent">
                <AvatarImage alt={"Loading"} src={"/trophfee.png"} />
                <AvatarFallback className="bg-transparent uppercase font-bold text-lg text-black">
                  <Suspense fallback={<SkeletonView />}>
                    <HandleLoading loading={isLoading || isValidating}>
                      {data?.user?.name?.[0]}
                    </HandleLoading>
                  </Suspense>
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="grid gap-1 md:gap-3">
              <div className="text-lg md:text-2xl font-extrabold uppercase">
                <HandleLoading loading={isLoading || isValidating}>
                  {data?.user?.name}
                </HandleLoading>
              </div>
              <div className="text-sm md:text-lg! lowercase break-all">
                <HandleLoading loading={isLoading || isValidating}>
                  {data?.user?.email}
                </HandleLoading>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex-1 grid grid-cols-2 h-full w-full gap-4 md:gap-6">
            <div className="flex flex-col items-center justify-between py-4 md:py-6 bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_black] md:shadow-[5px_5px_0px_0px_black]">
              <Clock strokeWidth={3} size={20} className="md:w-6 md:h-6" />
              <div className="font-extrabold text-lg md:text-2xl">
                <HandleLoading loading={isLoading || isValidating}>
                  {data?.user?.wallet?.balance}
                </HandleLoading>
              </div>
              <div className="uppercase text-xs md:text-sm text-muted-background font-bold">
                tokens
              </div>
            </div>

            <div className="flex flex-col items-center justify-between py-4 md:py-6 bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_black] md:shadow-[5px_5px_0px_0px_black]">
              <Trophy strokeWidth={3} size={20} className="md:w-6 md:h-6" />
              <div className="font-extrabold text-lg md:text-2xl">
                <HandleLoading loading={isLoading || isValidating}>
                  {data?.user?.tournamentsLength}
                </HandleLoading>
              </div>
              <div className="uppercase text-xs md:text-sm text-muted-background font-bold">
                quizes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="space-y-3 md:space-y-4">
        <h2 className="uppercase text-xl md:text-2xl font-extrabold">menu</h2>

        <div className="grid gap-2 md:gap-3">
          {menuItems.map((item, index) => {
            return <MenuItemCard index={index} item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

function HandleLoading({
  children,
  loading,
}: {
  loading: boolean;
  children: any;
}) {
  return loading ? <SkeletonView /> : children;
}

function SkeletonView() {
  return <Skeleton className="h-6 w-25 bg-gray-100/80" />;
}
