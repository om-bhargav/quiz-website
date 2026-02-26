"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, Calendar, Clock, Currency, Sofa, Ticket, Trophy } from "lucide-react";
import { WarningModal } from "@/components/WarningModal";
import { difficultyColors } from "@/lib/constants";
export default function TournamentCard({ tournament ,setEditOpen,setInitialData,handleDelete,loading}:{
  tournament: any ;
  setEditOpen: any;
  setInitialData: any;
  handleDelete: any;
  loading: boolean
}) {
  const startTime = new Date(tournament?.startTime).toLocaleTimeString();
  const startDate = new Date(tournament?.startTime).toLocaleDateString("en-GB").replaceAll("/","-");
  return (
    <Card className="rounded-xl w-full py-2 shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        {/* Title + Status */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{tournament.title}</h3>
            <Badge className={`${difficultyColors[tournament?.difficulty]}`}>{tournament.difficulty}</Badge>
          </div>

          <Badge
            className={`animate-pulse ${tournament.status==="LIVE" && "bg-green-500"}`}
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
              Start Date
            </span>
            <span className="font-medium">{startDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Start Time
            </span>
            <span className="font-medium">{startTime}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Ticket className="h-4 w-4" />
              Entry Fee
            </span>
            <span className="font-medium">₹{tournament.entryFee}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Sofa className="h-4 w-4" />
              Total Seats
            </span>
            <span className="font-medium">{tournament.totalSeats}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="h-4 w-4" />
              Winning Seats
            </span>
            <span className="font-medium">{tournament.winningSeats}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <BadgeIndianRupee className="h-4 w-4" />
              Prize Pool
            </span>
            <span className="font-medium">
              ₹{tournament.prizePool.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="default" className="flex-1" onClick={()=>{setInitialData(tournament);setEditOpen(true)}}>
            Edit
          </Button>
          <WarningModal disabled={loading} onConfirm={handleDelete} variant="destructive">
          <Button variant="outline" className="flex-1 text-red-500!">
            Delete
          </Button>
          </WarningModal>
        </div>
      </CardContent>
    </Card>
  );
}
