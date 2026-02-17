"use client";

import * as React from "react";
import useSWR from "swr";
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

const fetcher = (url: string) => fetch(url).then(res => res.json());

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#f97316",
    },
} satisfies ChartConfig;

export function AnalyticChart() {
    const [timeframe, setTimeframe] =
        React.useState<"weekly" | "monthly">("weekly");

    const { data, isLoading } = useSWR(
        `/api/admin/analytics/revenue?timeframe=${timeframe}`,
        fetcher
    );

    return (
        <Card className="w-full border-none shadow-sm bg-white rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-6">
                <CardTitle className="text-xl font-bold text-slate-800">
                    Revenue Analytics
                </CardTitle>

                <Select
                    value={timeframe}
                    onValueChange={(value) =>
                        setTimeframe(value as "weekly" | "monthly")
                    }
                >
                    <SelectTrigger className="w-[120px] rounded-xl drop-shadow-md font-bold h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 mt-10">
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="px-2 sm:px-6 pb-6">
                {isLoading ? (
                    <div className="h-[300px] animate-pulse bg-slate-100 rounded-xl" />
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[300px] w-full"
                    >
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="date" tickLine={false} axisLine />
                            <YAxis
                                tickFormatter={(value) => `₹${value / 1000}k`}
                                tickLine={false}
                                axisLine
                            />

                            <ChartTooltip
                                content={
                                    <ChartTooltipContent className="bg-white border-slate-100 shadow-xl rounded-xl" />
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#f97316"
                                strokeWidth={3}
                                fill="url(#colorRevenue)"
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
