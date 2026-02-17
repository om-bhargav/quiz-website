"use client";
import React from "react";
import { colorMap } from "@/lib/constants";
import SpecialIcon from "@/components/SpecialIcon";
import { ChevronRight } from "lucide-react";
interface Item {
  title: string;
  Icon: any;
  subtitle: string | null;
  color: string;
  action?: any;
}
export default function MenuItemCard({ item,index }: { item: Item,index: number }) {
  const Icon = item.Icon;
  return (
    <button
      key={index}
      onClick={item.action ? item.action :()=>{}}
      className={`w-full cursor-pointer rounded-[14px] p-4 border-[3px] border-black flex items-center justify-between transition-transform hover:translate-y-[1px] ${colorMap[item.color]}`}      
      style={{
        boxShadow: "4px 4px 0px #000000",
        transform: `rotate(${index % 2 === 0 ? "-0.3deg" : "0.3deg"})`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-[48px] h-[48px] bg-white rounded-[10px] border-[3px] border-black flex items-center justify-center"
          style={{
            boxShadow: "2px 2px 0px #000000",
          }}
        >
          <Icon className="w-5 h-5 stroke-[2.5px]" />
        </div>
        <div className="text-left">
          <p className="text-[15px] font-[900] uppercase">{item.title}</p>
          {item.subtitle && (
            <p className="text-[12px] font-[700] text-black/60">{item.subtitle}</p>
          )}
        </div>
      </div>
      <ChevronRight className="w-6 h-6 stroke-[3px]" />
    </button>
  );
}
