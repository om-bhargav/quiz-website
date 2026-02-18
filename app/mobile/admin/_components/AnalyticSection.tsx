"use client";

import useSWR from "swr";
import { AnalyticCard } from "./AnalyticCard";
import { IndianRupee, ShoppingCart, Users } from "lucide-react";
import { AnalyticChart } from "./AnalyticChart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AnalyticsSection() {
  // const { data, isLoading, error } = useSWR(
  //     "/api/admin/analytics/summary",
  //     fetcher
  // );
  const data = {
    revenue: {
      total: 128450.75,
      changePercent: 12.46, // positive = growth
    },
    orders: {
      total: 864,
      changePercent: -3.28, // negative = drop
    },
    visitors: {
      total: 12458,
      changePercent: 8.91,
    },
  };

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="h-44 bg-[#FFF8F1] rounded-2xl animate-pulse"
//           />
//         ))}
//         <div className="col-span-3">
//           <div className="h-44 bg-white rounded-2xl animate-pulse" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-red-500">Failed to load analytics</p>;
//   }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
      <AnalyticCard
        title="Total Revenue"
        icon={<IndianRupee size={22} />}
        val={`₹${data.revenue.total}`}
        rates={Math.abs(data.revenue.changePercent).toFixed(2)}
        isUp={data.revenue.changePercent >= 0}
      />

      <AnalyticCard
        title="Orders"
        icon={<ShoppingCart size={22} />}
        val={data.orders.total.toString()}
        rates={Math.abs(data.orders.changePercent).toFixed(2)}
        isUp={data.orders.changePercent >= 0}
      />

      <AnalyticCard
        title="Visitors"
        icon={<Users size={22} />}
        val={data.visitors.total.toString()}
        rates={Math.abs(data.visitors.changePercent).toFixed(2)}
        isUp={data.visitors.changePercent >= 0}
      />
      <div className="col-span-3">
        <AnalyticChart />
      </div>
    </div>
  );
}
