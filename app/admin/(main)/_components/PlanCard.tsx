"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlanType } from "@/types/plan";
import { WarningModal } from "@/components/WarningModal";
import { PlanFormModal } from "./PlanModal";
interface Props {
  plan: PlanType;
  loading: boolean;
  onEdit?: any;
  onDelete?: any;
}

export default function PlanCard({ plan, onEdit, onDelete ,loading}: Props) {
  const statusColor = {
    DRAFT: "bg-gray-500",
    ACTIVATED: "bg-green-600",
    DEACTIVATED: "bg-red-600",
  };

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          {plan.title}
        </CardTitle>

        <Badge className={`${statusColor[plan.status]} text-white`}>
          {plan.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {plan.description}
        </p>

        <div className="flex justify-between text-sm font-medium">
          <span>Tokens:</span>
          <span>{plan.tokens.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm font-medium">
          <span>Price:</span>
          <span>₹ {plan.price.toLocaleString()}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <PlanFormModal loading={loading} mode="edit" plan={plan} onSuccess={onEdit}>
        <Button
          variant="outline"
          size="sm"
        >
          Edit
        </Button>
        </PlanFormModal>
        <WarningModal onConfirm={() => onDelete?.(plan.id)} disabled={loading} variant="destructive">
        <Button
          variant="destructive"
          size="sm"
          >
          Delete
        </Button>
          </WarningModal>
      </CardFooter>
    </Card>
  );
}