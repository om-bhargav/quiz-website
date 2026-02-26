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
import { ImageToBase64 } from "@/lib/ImageToBase64";
import toast from "react-hot-toast";
import Image from "next/image";

type Category = {
  id?: string;
  name: string;
  image: string;
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
  isSubCategory = false,
}: Props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setImage(initialData.image);
    } else {
      setName("");
      setImage(null);
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name Cannot Be Empty!");
      return;
    }
    if (!isSubCategory && !image) {
      toast.error("Please Upload Image!");
      return;
    }
    if (isSubCategory) {
      await onSubmit({
        id: initialData?.id,
        name,
      } as any);
    } else {
      await onSubmit({
        id: initialData?.id,
        name,
        image: image!,
      });
    }
    // console.log(name, image);
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
          {!isSubCategory && (
            <>
              {image && (
                <div className="relative w-full min-h-70 grid gap-2">
                  <Image
                    src={image}
                    alt={"Logo Image"}
                    className="object-fit"
                    fill
                  />
                </div>
              )}
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  {initialData ? "Change" : "Upload"} Image
                </label>
                <Input
                  name="image"
                  placeholder="Select Image"
                  type="file"
                  onChange={async (e) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      const base64Image = await ImageToBase64(file);
                      setImage(base64Image);
                    }
                  }}
                  disabled={pending}
                />
              </div>
            </>
          )}
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              {isSubCategory ? "SubCategory" : "Category"} Name
            </label>
            <Input
              name="name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose()}
              disabled={pending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? "Saving..." : initialData ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
