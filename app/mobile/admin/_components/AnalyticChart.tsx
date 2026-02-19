"use client";

import * as React from "react";
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "currentColor",
  },
} satisfies ChartConfig;

export function AnalyticChart({title,weeklyData,monthlyData}:{title: string,weeklyData: any,monthlyData: any}) {
  const [timeframe, setTimeframe] = React.useState<"weekly" | "monthly">(
    "weekly"
  );


  const data = timeframe === "weekly" ? weeklyData : monthlyData;

  return (
    <Card className="w-full bg-primary/5 border border-primary/20 shadow-sm rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-6">
        <CardTitle className="text-xl font-bold text-foreground">
          {title} Analytics
        </CardTitle>

        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as "weekly" | "monthly")}
        >
          <SelectTrigger className="w-[120px] rounded-xl h-9 border-primary/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-primary/20">
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 sm:px-6 pb-6">
        {/* text-primary makes chart inherit primary color */}
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full text-primary"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              axisLine={false}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent className="bg-primary/5 border border-primary/20 shadow-xl rounded-xl" />
              }
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="currentColor"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}