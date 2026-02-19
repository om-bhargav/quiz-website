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


export function EditBalanceModal({ user,children,handleUpdate,disabled=false }: {user: any,children: any,handleUpdate: any,disabled:boolean}) {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(user.wallet.balance);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Balance</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
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

          <Button disabled={disabled} onClick={()=>handleUpdate(user.id,balance)}>
            {"Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}