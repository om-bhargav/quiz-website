"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WarningModal } from "@/components/WarningModal";
import { Trash2 } from "lucide-react";
import { EditUserModal } from "./EditUser";

export default function UserOverviewCard({
  loading,
  user,
  handleDelete,
  handleUpdate,
  handleStatusUpdate,
}: {
  loading: boolean;
  user: any;
  handleDelete: any;
  handleStatusUpdate: any;
  handleUpdate: any;
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

          <Badge className={`${user.status === "ACTIVE" && "bg-green-500!"}`} variant={user.status === "ACTIVE" ? "default" : "destructive"}>
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
        <WarningModal
          disabled={loading}
          onConfirm={async () => await handleDelete(user.id)}
          variant="destructive"
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute text-red-500 hover:text-red-500! right-3 top-3"
          >
            <Trash2 />
          </Button>
        </WarningModal>
        {/* Actions */}
        <div className="flex gap-3">
          <EditUserModal
            disabled={loading}
            user={user}
            handleUpdate={handleUpdate}
          >
            <Button variant="outline" className="flex-1">
              Edit
            </Button>
          </EditUserModal>
          <WarningModal
          disabled={loading}
            onConfirm={async () =>
              await handleStatusUpdate(
                user.id,
                user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
              )
            }
            variant="info"
          >
            <Button
              variant={user.status === "ACTIVE" ? "outline" : "default"}
              className={`flex-1 ${
                user.status === "ACTIVE" ? "text-red-500!":"bg-green-500!"
              }`}
            >
              {user.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE"}
            </Button>
          </WarningModal>
        </div>
      </CardContent>
    </Card>
  );
}
