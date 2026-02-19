import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  icon: React.ReactNode;
  val: string;
  rates?: string;
  isUp?: boolean;
}

export function AnalyticCard({
  title,
  icon,
  val,
  rates,
  isUp = true,
}: Props) {
  return (
    <div className="w-full h-48 bg-primary/5 rounded-2xl p-6 flex flex-col justify-between 
      border border-primary/20 shadow-sm 
      hover:shadow-md hover:-translate-y-[2px] transition-all duration-200">

      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
          <div className="mt-2 h-[2px] w-8 bg-primary/60 rounded-full" />
        </div>

        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-2">
        <div>
          <h2 className="max-md:text-lg md:text-2xl font-bold break-all text-foreground leading-none tracking-tight">
            {val}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Total
          </p>
        </div>

        {rates && (
          <div className="flex items-center gap-1.5 text-sm">
            <span
              className={cn(
                "font-bold",
                isUp ? "text-green-500" : "text-destructive"
              )}
            >
              {isUp ? "+" : ""}
              {rates}%
            </span>

            <span className="text-muted-foreground font-medium">
              vs last week
            </span>
          </div>
        )}
      </div>
    </div>
  );
}