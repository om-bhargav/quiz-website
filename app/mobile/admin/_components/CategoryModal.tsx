"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = {
  id?: string;
  name: string;
};

interface Props {
  pending: boolean;
  open: boolean;
  onClose: any;
  initialData?: Category | null;
  onSubmit: (data: Category) => Promise<void>;
  isSubCategory?: boolean;
}

export default function CategoryModal({
  pending,
  open,
  onClose,
  initialData,
  onSubmit,
  isSubCategory=false
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName("");
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
      await onSubmit({
        id: initialData?.id,
        name,
      });
      onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">{isSubCategory ? "SubCategory":"Category"} Name</label>
            <Input
              name="name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            //   disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            //   disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={pending || !name.trim()}
            >
              {pending
                ? "Saving..."
                : initialData
                ? "Update"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}