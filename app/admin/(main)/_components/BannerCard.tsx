"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import BannerForm from "./BannerForm";
import { WarningModal } from "@/components/WarningModal";

export interface Banner {
  id: string;
  title: string;
  mainHeadline: string;
  subtitle: string;
  image: string;
}

interface BannerCardProps {
  pending: boolean;
  banner: Banner;
  onEdit?: any;
  onDelete?: any;
}

export default function BannerCard({
  pending,
  banner,
  onEdit,
  onDelete,
}: BannerCardProps) {
  return (
    <Card className="group relative pt-0 pb-2 gap-1 w-full max-w-md overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-semibold tracking-tight">
            {banner.title}
          </h3>
          <p className="text-sm text-white/80 line-clamp-1">
            {banner.mainHeadline}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-2 space-y-3">
        <p className="text-sm font-semibold text-muted-foreground leading-relaxed line-clamp-2">
          {banner.subtitle}
        </p>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <BannerForm
            pending={pending}
            handleSubmit={onEdit}
            mode="edit"
            initialData={banner}
          >
            <Button type="button">
              <Pencil />
              Edit Banner
            </Button>
          </BannerForm>
          <WarningModal disabled={pending} onConfirm={async ()=> onDelete(banner.id)} variant="destructive">
          <Button type="button" variant="destructive">
            <Trash2 />
            Delete
          </Button>
          </WarningModal>
        </div>
      </div>
    </Card>
  );
}
