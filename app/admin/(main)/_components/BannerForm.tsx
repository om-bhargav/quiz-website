"use client";

import { useEffect, useState } from "react";
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
import { ImageToBase64 } from "@/lib/ImageToBase64";
import { Banner } from "./BannerCard";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  pending: boolean;
  initialData?: Banner;
  mode: "create" | "edit";
  handleSubmit: (data: Banner, mode: "create" | "edit") => Promise<void>;
}

export default function BannerForm({
  initialData,
  pending,
  mode,
  children,
  handleSubmit,
}: Props) {
  const [open, setOpen] = useState(false);

  // 🔹 Individual states
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [mainHeadline, setMainHeadline] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // 🔹 Populate on edit
  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setTitle(initialData.title);
      setMainHeadline(initialData.mainHeadline);
      setSubtitle(initialData.subtitle);
      setImage(initialData.image);
    }else{
      resetForm();
    }
  }, [initialData]);

  // 🔹 Reset form (for create mode or after submit)
  const resetForm = () => {
    setId("");
    setTitle("");
    setMainHeadline("");
    setSubtitle("");
    setImage(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Banner = {
      id,
      title,
      mainHeadline,
      subtitle,
      image: image!
    };

    await handleSubmit(data, mode);

    if (mode === "create") resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="uppercase">
            {mode === "create" ? "Create" : "Edit"} Banner
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              disabled={pending}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter banner title"
            />
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <Label>Main Headline</Label>
            <Input
              value={mainHeadline}
              disabled={pending}
              onChange={(e) => setMainHeadline(e.target.value)}
              placeholder="Enter main headline"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              disabled={pending}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle"
            />
          </div>

           {/* Image Upload */}
           <Label>{mode === "edit" ? "Change Image" : "Upload Image"}</Label>
          <div className="space-y-3">
            {image && (
              <div className="relative w-full h-40 rounded-md overflow-hidden border">
                <Image
                  src={image}
                  alt="Banner Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <Input
              type="file"
              disabled={pending}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const base64 = await ImageToBase64(file);
                  setImage(base64);
                }
              }}
            />
          </div>

          {/* Footer inside form */}
           <DialogFooter>
             <Button
              type="button"
              variant="ghost"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}