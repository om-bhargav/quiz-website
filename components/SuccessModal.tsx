"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Loader, User, User2, X } from "lucide-react";

export default function SuccessModal({
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
              <User color="white" fill="white" className="scale-200"/>
            </div>

            {/* Floating dots */}
            <span className="absolute -top-3 -left-4 w-3 h-3 bg-primary/40 animate-pulse rounded-full" />
            <span className="absolute -top-1 right-0 w-2 h-2 bg-primary/30 animate-pulse rounded-full" />
            <span className="absolute bottom-0 -left-6 w-2 h-2 bg-primary/30 animate-pulse rounded-full" />
            <span className="absolute bottom-3 -right-5 w-3 h-3 bg-primary/40 animate-pulse rounded-full" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-purple-600">
              Successful!
            </h2>
            <p className="text-muted-foreground text-base">
              Please wait a moment, we are preparing for you...
            </p>
          </div>

          {/* Animated Loader */}
          <Loader className="animate-spin"/>
        </div>
      </DialogContent>
    </Dialog>
  );
}