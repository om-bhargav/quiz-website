"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMAIL_PATTERN } from "@/lib/constants";

// const AVAILABLE_STATUS = ["ACTIVE", "SUSPENDED"];
const ROLES = ["USER","ADMIN"];
export function EditUserModal({
  user,
  children,
  handleUpdate,
  disabled = false,
}: {
  user: any;
  children: any;
  handleUpdate: any;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(user.wallet.balance);
  const [email,setEmail] = useState(user.email);
  const [role,setRole] = useState(user.role);
  // const [status, setStatus] = useState(user.status);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Balance</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              disabled={disabled}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger name={"role"} className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Balance</Label>
            <Input
              type="number"
              value={balance}
              disabled={disabled}
              onChange={(e) => setBalance(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            disabled={disabled}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={disabled}
            onClick={() => handleUpdate(user.id,email,role, balance)}
          >
            {"Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
