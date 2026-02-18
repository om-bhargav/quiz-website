"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function UserOverviewCard({
  user,
  handleDelete,
  handleStatusUpdate,
}: {
  user: any;
  handleDelete: any;
  handleStatusUpdate: any;
}) {
  return (
    <Card className="w-full! rounded-xl relative shadow-sm">
      <CardContent className="p-6 pb-0 space-y-5">
        {/* Top Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Status + Role */}
        <div className="flex gap-2">
          <Badge variant="secondary">{user.role}</Badge>

          <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
            {user.status}
          </Badge>

          <Badge variant="outline">
            {user.isProfileComplete ? "Profile Complete" : "Incomplete"}
          </Badge>
        </div>

        {/* Meta */}
        <div className="text-sm text-muted-foreground">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </div>
        <Button
          onClick={async () => await handleDelete(user.id)}
          variant={"ghost"}
          size={"icon"}
          className="absolute text-red-500 hover:text-red-500! right-3 top-3"
        >
          <Trash2 />
        </Button>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Edit
          </Button>

          <Button
            onClick={async () =>
              await handleStatusUpdate(user.id,
                user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
              )
            }
            variant={user.status === "ACTIVE" ? "outline" : "default"}
            className={`flex-1 ${user.status === "ACTIVE" && "text-red-500!"}`}
          >
            {user.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
