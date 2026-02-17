"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy } from "lucide-react";

export default function TournamentCard() {
  // 🔹 Dummy tournament (important fields only)
  const tournament = {
    title: "JavaScript Championship",
    difficulty: "MEDIUM",
    status: "LIVE", // DRAFT | LIVE | COMPLETED
    startTime: new Date("2026-02-25T18:00:00"),
    totalSeats: 500,
    prizePool: 75000,
    entryFee: 99,
  };

  return (
    <Card className="rounded-xl py-2 shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        {/* Title + Status */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {tournament.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tournament.difficulty} Difficulty
            </p>
          </div>

          <Badge
            variant={
              tournament.status === "LIVE"
                ? "default"
                : tournament.status === "DRAFT"
                ? "secondary"
                : "outline"
            }
          >
            {tournament.status}
          </Badge>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Start Time
            </span>
            <span className="font-medium">
              {tournament.startTime.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Total Seats
            </span>
            <span className="font-medium">
              {tournament.totalSeats}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="h-4 w-4" />
              Prize Pool
            </span>
            <span className="font-medium">
              ₹{tournament.prizePool.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Entry Fee
            </span>
            <span className="font-medium">
              ₹{tournament.entryFee}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1">
            Edit
          </Button>

          {tournament.status === "DRAFT" ? (
            <Button className="flex-1">
              Publish
            </Button>
          ) : (
            <Button variant="outline" className="flex-1 text-red-500!">
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}