"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Sofa, Ticket, Trophy } from "lucide-react";
import toast from "react-hot-toast";

export default function TournamentCard({ tournament ,setEditOpen,setInitialData,handleDelete}: any) {
  const startTime = new Date(tournament?.startTime).toLocaleTimeString();
  const startDate = new Date(tournament?.startTime).toLocaleDateString();

  return (
    <Card className="rounded-xl w-full py-2 shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        {/* Title + Status */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{tournament.title}</h3>
            <Badge>{tournament.difficulty}</Badge>
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
          <Button variant="outline" className="flex-1 text-red-500!" onClick={handleDelete}>
            Delete
          </Button>

          {/* {tournament.status === "DRAFT" ? (
            <Button className="flex-1">Publish</Button>
          ) : (
            <Button variant="outline" className="flex-1 text-red-500!">
              Close
            </Button>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
