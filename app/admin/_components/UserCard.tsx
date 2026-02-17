"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function UserOverviewCard() {
  // 🔹 Dummy user (only important fields)
  const user = {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "USER",
    status: "ACTIVE",
    isProfileComplete: true,
    image: "https://i.pravatar.cc/150?img=12",
    createdAt: new Date("2025-12-02"),
  };

  return (
    <Card className="max-w-md rounded-xl relative shadow-sm">
      <CardContent className="p-6 pb-0 space-y-5">
        {/* Top Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-lg font-semibold">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        {/* Status + Role */}
        <div className="flex gap-2">
          <Badge variant="secondary">
            {user.role}
          </Badge>

          <Badge
            variant={
              user.status === "ACTIVE"
                ? "default"
                : "destructive"
            }
          >
            {user.status}
          </Badge>

          <Badge variant="outline">
            {user.isProfileComplete ? "Profile Complete" : "Incomplete"}
          </Badge>
        </div>

        {/* Meta */}
        <div className="text-sm text-muted-foreground">
          Joined on {user.createdAt.toLocaleDateString()}
        </div>
          <Button variant={"ghost"} size={"icon"} className="absolute text-red-500 hover:text-red-500! right-3 top-3"><Trash2/></Button>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Edit
          </Button>

          {user.status === "ACTIVE" ? (
            <Button  variant="outline" className="flex-1 text-red-500">
              Suspend
            </Button>
          ) : (
            <Button className="flex-1">
              Activate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}