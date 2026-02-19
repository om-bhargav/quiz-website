"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { AlertTriangle, Info, Trash2 } from "lucide-react";

type Variant = "destructive" | "warning" | "info";

interface WarningModalProps {
  variant?: Variant;
  onConfirm: any;
  children: ReactNode;
  disabled: boolean;
}

export function WarningModal({
  variant = "destructive",
  onConfirm,
  children,
  disabled
}: WarningModalProps) {
  const variantConfig = {
    destructive: {
      title: "Delete Item?",
      description:
        "This action cannot be undone. This will permanently delete this item.",
      confirmText: "Delete",
      cancelText: "Cancel",
      icon: <Trash2 className="h-6 w-6 text-red-500" />,
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      title: "Are you sure?",
      description:
        "You have unsaved changes. Leaving now may result in data loss.",
      confirmText: "Continue",
      cancelText: "Stay",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
      button: "bg-yellow-500 hover:bg-yellow-600 text-black",
    },
    info: {
      title: "Confirm Action",
      description: "Please confirm that you want to proceed with this action.",
      confirmText: "Confirm",
      cancelText: "Cancel",
      icon: <Info className="h-6 w-6 text-blue-500" />,
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const current = variantConfig[variant];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="w-[95%] sm:max-w-md rounded-2xl p-6">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-muted p-3">
            {current.icon}
          </div>

          <AlertDialogTitle className="text-lg sm:text-xl font-semibold">
            {current.title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-muted-foreground">
            {current.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AlertDialogCancel className="w-full sm:w-auto">
            {current.cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={async () => await onConfirm() }
            disabled={disabled}
            className={cn(
              "w-full sm:w-auto text-white transition-all",
              current.button
            )}
          >
            {disabled ? "Please wait..." : current.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
