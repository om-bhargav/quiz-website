import React from "react";
import Image from "next/image";
import {
  Clock,
  PuzzleIcon,
  Trophy,
  Watch,
  Wallet,
  History,
  CreditCard,
  LogOut,
} from "lucide-react";

import MenuItemCard from "./_components/MenuItemCard";
export default function page() {
  const menuItems = [
    {
      Icon: Trophy,
      title: "Played Quiz",
      subtitle: "24",
      color: "amber"
    },
    {
      Icon: Wallet,
      title: "Wallet",
      subtitle: "₹5,240",
      color: "green"
    },
    {
      Icon: History,
      title: "Transaction History",
      subtitle: null,
      color: "sky-blue"
    },
    {
      Icon: CreditCard,
      title: "Withdraw",
      subtitle: null,
      color: "pink"
    },
    {
      Icon: LogOut,
      title: "Logout",
      subtitle: null,
      color: "yellow"
    },
  ];
  return (
    <div className="w-full grid gap-7 p-5 w-full mx-auto">
      <div className="space-y-4">
        <h3 className="uppercase text-3xl font-extrabold">My profile</h3>
        <div className="flex flex-col relative p-8 gap-5 overflow-hidden items-center bg-amber-300 border-5 border-black min-h-[340px] rounded-xl shadow-[10px_10px_0px_5px_black]">
          <div className="flex w-full gap-6 justify-start items-center">
            <div className="h-30 w-30 relative rounded-xl overflow-hidden border-5 border-black shadow-[5px_5px_0px_0px_black]">
              <Image fill alt={"Loading"} src={"/trophee.png"} />
            </div>
            <div className="grid gap-3">
              <div className="text-2xl font-extrabold uppercase">
                Rahul Kumar
              </div>
              <div className="text-lg lowercase">Rahul123@gmail.com</div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 h-full w-full gap-6">
            <div className="flex flex-col items-center justify-between py-6 bg-white border-3 border-black rounded-xl shadow-[5px_5px_0px_0px_black]">
              <div>
                <Clock strokeWidth={3} />
              </div>
              <div className="font-extrabold text-2xl">4567</div>
              <div className="uppercase text-muted-background font-bold">
                tokens
              </div>
            </div>
            <div className="flex flex-col items-center justify-between py-6 bg-white border-3 border-black rounded-xl shadow-[5px_5px_0px_0px_black]">
              <div>
                <Trophy strokeWidth={3} />
              </div>
              <div className="font-extrabold text-2xl">435</div>
              <div className="uppercase text-muted-background font-bold">
                quizes
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="uppercase text-2xl font-extrabold">menu</h2>
        <div className="grid gap-3">
          {menuItems
            .map((item, index) => {
              return <MenuItemCard item={item} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}
