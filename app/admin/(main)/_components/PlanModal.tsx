"use client";

import { useState, useEffect } from "react";
import { PlanType } from "@/types/plan";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  loading: boolean;
  mode: "create" | "edit";
  plan?: PlanType;
  children?: React.ReactNode;
  onSuccess?: any;
}
const initialData = {
  title: "",
  description: "",
  tokens: 0,
  price: 0,
  status: "DRAFT" as PlanType["status"],
};
export function PlanFormModal({
  loading,
  mode,
  plan,
  children,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<any>(initialData);

  // Prefill when editing
  useEffect(() => {
    setForm(initialData);
    if (mode === "edit" && plan) {
      setForm({
        id: plan.id,
        title: plan.title,
        description: plan.description,
        tokens: plan.tokens,
        price: plan.price,
        status: plan.status,
      });
    }
  }, [mode, plan]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Plan" : "Update Plan"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tokens</Label>
              <Input
                type="number"
                value={form.tokens}
                onChange={(e) => handleChange("tokens", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(val) => handleChange("status", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">DRAFT</SelectItem>
                <SelectItem value="ACTIVATED">ACTIVATED</SelectItem>
                <SelectItem value="DEACTIVATED">DEACTIVATED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={async () => {
              await onSuccess(form);
              setOpen(false);
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
