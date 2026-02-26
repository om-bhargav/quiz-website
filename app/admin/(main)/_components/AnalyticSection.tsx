"use client";

import useSWR from "swr";
import { AnalyticCard } from "./AnalyticCard";
import {
  IndianRupee,
  Mouse,
  ShoppingCart,
  TextCursor,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { AnalyticChart } from "./AnalyticChart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AnalyticsSection() {
  const { data, isLoading, error } = useSWR("/api/admin/analytics", fetcher);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 mt-3 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-44 bg-primary/10 rounded-2xl animate-pulse"
            />
          ))}
        </div>
          <div className="grid md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-100 bg-primary/10 rounded-2xl animate-pulse"
          />
        ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to load analytics</p>;
  }

  return (
    <div className="flex flex-col gap-6 mt-3 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-3 w-full">
        <AnalyticCard
          title="Total Users"
          icon={<UserPlus size={22} />}
          val={`${data.totals.totalUsers}`}
          // rates={Math.abs(data.revenue.changePercent).toFixed(2)}
          // isUp={data.revenue.changePercent >= 0}
        />

        <AnalyticCard
          title="Total Revenue"
          icon={<IndianRupee size={22} />}
          val={`₹${data.totals.totalRevenue}`}
          // rates={Math.abs(data.revenue.changePercent).toFixed(2)}
          // isUp={data.revenue.changePercent >= 0}
        />

        <AnalyticCard
          title="Total Quizes"
          icon={<Trophy size={22} />}
          val={data.totals.totalQuizzes.toString()}
          // rates={Math.abs(data.orders.changePercent).toFixed(2)}
          // isUp={data.orders.changePercent >= 0}
        />

        <AnalyticCard
          title="Visitors"
          icon={<Users size={22} />}
          val={data.totals.totalVisitors.toString()}
          // rates={Math.abs(data.visitors.changePercent).toFixed(2)}
          // isUp={data.visitors.changePercent >= 0}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5 space-y-4">
        <AnalyticChart
          weeklyData={data.weekly.users}
          monthlyData={data.monthly.users}
          title={"Users"}
        />
        <AnalyticChart
          weeklyData={data.weekly.revenue}
          monthlyData={data.monthly.revenue}
          title={"Revenue"}
        />
        <AnalyticChart
          weeklyData={data.weekly.quizzes}
          monthlyData={data.monthly.quizzes}
          title={"Quizzes"}
        />
        <AnalyticChart
          weeklyData={data.weekly.visitors}
          monthlyData={data.monthly.visitors}
          title={"Visitors"}
        />
      </div>
    </div>
  );
}
