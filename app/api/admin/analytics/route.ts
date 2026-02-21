import { checkAdmin } from "@/lib/checkAuth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { subDays, startOfMonth } from "date-fns";
function getLast7Days() {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  return days;
}

function getLast12Months() {
  const months = [];
  const today = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(d);
  }

  return months;
}
export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const now = new Date();

    const weekAgo = subDays(now, 7);
    const monthAgo = startOfMonth(now);

    const totalUsers = await prisma.user.count();

    const totalQuizzes = await prisma.tournament.count();

    const totalVisitorsAgg = await prisma.logTraffic.aggregate({
      _sum: { views: true },
    });

    const totalVisitors = totalVisitorsAgg._sum.views ?? 0;

    const tournaments = await prisma.tournament.findMany({
      include: {
        registration: true,
      },
    });

    const totalRevenue = tournaments.reduce((acc: number, t: any) => {
      return acc + t.entryFee * t.registration.length;
    }, 0);

    const weeklyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: weekAgo } },
      _count: true,
    });

    const weeklyQuizzes = await prisma.tournament.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: weekAgo } },
      _count: true,
    });

    const weeklyVisitors = await prisma.logTraffic.findMany({
      where: { date: { gte: weekAgo } },
      orderBy: { date: "asc" },
    });

    const weeklyRevenueData = tournaments
      .filter((t) => t.createdAt >= weekAgo)
      .map((t) => ({
        date: t.createdAt,
        revenue: t.entryFee * t.registration.length,
      }));

    const monthlyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: monthAgo } },
      _count: true,
    });

    const monthlyQuizzes = await prisma.tournament.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: monthAgo } },
      _count: true,
    });

    const monthlyVisitors = await prisma.logTraffic.findMany({
      where: { date: { gte: monthAgo } },
      orderBy: { date: "asc" },
    });

    const monthlyRevenueData = tournaments
      .filter((t) => t.createdAt >= monthAgo)
      .map((t) => ({
        date: t.createdAt,
        revenue: t.entryFee * t.registration.length,
      }));
    const weekDates = getLast7Days();

    const formattedWeekly = {
      users: weekDates.map((date) => {
        const found = weeklyUsers.find(
          (u) =>
            new Date(u.createdAt).toLocaleDateString("en-IN") ===
            date.toLocaleDateString("en-IN")
        );

        return {
          date: date.toLocaleDateString("en-IN"),
          value: found?._count ?? 0,
        };
      }),

      quizzes: weekDates.map((date) => {
        const found = weeklyQuizzes.find(
          (q) =>
            new Date(q.createdAt).toLocaleDateString("en-IN") ===
            date.toLocaleDateString("en-IN")
        );

        return {
          date: date.toLocaleDateString("en-IN"),
          value: found?._count ?? 0,
        };
      }),

      visitors: weekDates.map((date) => {
        const found = weeklyVisitors.find(
          (v) =>
            new Date(v.date).toLocaleDateString("en-IN") ===
            date.toLocaleDateString("en-IN")
        );

        return {
          date: date.toLocaleDateString("en-IN"),
          value: found?.views ?? 0,
        };
      }),

      revenue: weekDates.map((date) => {
        const found = weeklyRevenueData.find(
          (r) =>
            new Date(r.date).toLocaleDateString("en-IN") ===
            date.toLocaleDateString("en-IN")
        );

        return {
          date: date.toLocaleDateString("en-IN"),
          value: found?.revenue ?? 0,
        };
      }),
    };

    /* ---------------- FORCE FULL 12 MONTHS ---------------- */

    const monthDates = getLast12Months();

    const formattedMonthly = {
      users: monthDates.map((date) => {
        const found = monthlyUsers.find(
          (u) =>
            new Date(u.createdAt).getMonth() === date.getMonth() &&
            new Date(u.createdAt).getFullYear() === date.getFullYear()
        );

        return {
          date: date.toLocaleDateString("en-IN", { month: "short" }),
          value: found?._count ?? 0,
        };
      }),

      quizzes: monthDates.map((date) => {
        const found = monthlyQuizzes.find(
          (q) =>
            new Date(q.createdAt).getMonth() === date.getMonth() &&
            new Date(q.createdAt).getFullYear() === date.getFullYear()
        );

        return {
          date: date.toLocaleDateString("en-IN", { month: "short" }),
          value: found?._count ?? 0,
        };
      }),

      visitors: monthDates.map((date) => {
        const found = monthlyVisitors.find(
          (v) =>
            new Date(v.date).getMonth() === date.getMonth() &&
            new Date(v.date).getFullYear() === date.getFullYear()
        );

        return {
          date: date.toLocaleDateString("en-IN", { month: "short" }),
          value: found?.views ?? 0,
        };
      }),

      revenue: monthDates.map((date) => {
        const found = monthlyRevenueData.find(
          (r) =>
            new Date(r.date).getMonth() === date.getMonth() &&
            new Date(r.date).getFullYear() === date.getFullYear()
        );

        return {
          date: date.toLocaleDateString("en-IN", { month: "short" }),
          value: found?.revenue ?? 0,
        };
      }),
    };
    return NextResponse.json({
      totals: {
        totalUsers,
        totalQuizzes,
        totalRevenue,
        totalVisitors,
      },
      weekly: formattedWeekly,
      monthly: formattedMonthly,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to load analytics" },
      { status: 500 }
    );
  }
}
