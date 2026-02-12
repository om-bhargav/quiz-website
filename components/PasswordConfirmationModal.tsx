"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { BadgeCheck, Check, CheckCircle, Loader, Loader2, User, User2, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PasswordConfirmationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-3xl p-10 border-0">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Gradient Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
              <BadgeCheck stroke="var(--primary)" fill="white" className="scale-300"/>
            </div>

            {/* Floating dots */}
            <span className="absolute -top-3 -left-4 w-3 h-3 bg-primary/40 animate-pulse rounded-full" />
            <span className="absolute -top-1 right-0 w-2 h-2 bg-primary/30 animate-pulse rounded-full" />
            <span className="absolute bottom-0 -left-6 w-2 h-2 bg-primary/30 animate-pulse rounded-full" />
            <span className="absolute bottom-3 -right-5 w-3 h-3 bg-primary/40 animate-pulse rounded-full" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-primary">
              Welcome Back!
            </h2>
            <p className="text-muted-foreground text-base">
              You have Successfully reset and created a new password.
            </p>
          </div>
          <Link href={"/"} className="w-full">
          <NextButton text={"Go to Home"}/>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}


function NextButton({
  text = "next",
  variant = "default",
  onClick,
  disabled = false,
}: {
  text?: string;
  variant?: string;
  onClick?: (...props: any) => any;
  disabled?: boolean;
}) {
  return (
    <Button
      variant={variant as any}
      className={`shadow-[0px_4px_1px_0px_var(--second-primary)] uppercase w-full! rounded-full py-6! text-md`}
      onClick={onClick}
      type={"button"}
      disabled={disabled}
    >
      {disabled ? <Loader2 size={20} className="animate-spin" /> : text}
    </Button>
  );
}
