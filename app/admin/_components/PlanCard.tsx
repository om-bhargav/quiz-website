"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PlanCard() {
  // 🔹 Dummy Plan Data
  const plan = {
    name: "Pro Plan",
    price: 499,
    billingCycle: "Monthly",
    status: "ACTIVE", // ACTIVE | INACTIVE
    features: [
      "Unlimited Tournaments",
      "Priority Support",
      "Advanced Analytics",
    ],
    createdAt: new Date("2026-01-10"),
  };

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition">
      <CardContent className="px-6 py-2 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">
              ₹{plan.price} / {plan.billingCycle}
            </p>
          </div>

          <Badge
            variant={plan.status === "ACTIVE" ? "default" : "secondary"}
          >
            {plan.status}
          </Badge>
        </div>

        {/* Features */}
        <div className="space-y-2 text-sm">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Meta */}
        <div className="text-xs text-muted-foreground">
          Created on {plan.createdAt.toLocaleDateString()}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1">
            Edit
          </Button>

          {plan.status === "ACTIVE" ? (
            <Button variant="outline" className="flex-1 text-red-500">
              Deactivate
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