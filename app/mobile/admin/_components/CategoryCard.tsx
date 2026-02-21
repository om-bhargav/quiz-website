"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit2, Layers, Trash2 } from "lucide-react";
import Link from "next/link";
import { WarningModal } from "@/components/WarningModal";
import { useState } from "react";
type Category = {
  id: string;
  name: string;
  createdAt: string;
  _count?: {
    tournaments: number;
    subCategories: number;
  };
};

export default function CategoryCard({
  loading,
  category,
  handleEditOpen,
  handleDelete,
}: {
  loading: boolean,
  category: Category;
  handleEditOpen: any;
  handleDelete: any;
}) {

  return (
    <Card className="rounded-2xl relative shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
        <Badge variant="secondary">Category</Badge>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Counts */}
        <div className="flex justify-between">
          <div>
            <p className="text-muted-foreground text-xs">Tournaments</p>
            <p className="font-semibold">{category._count?.tournaments ?? 0}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">SubCategories</p>
            <p className="font-semibold">
              {category._count?.subCategories ?? 0}
            </p>
          </div>
        </div>
        <Link href={`/mobile/admin/categories/${category.id}`}>
          <Button
            variant="outline"
            className="
                w-full mt-2 
                rounded-xl 
                border-primary/30 
                bg-primary/5 
                hover:bg-primary 
                hover:text-white 
                hover:shadow-md 
                transition-all duration-300
                flex items-center justify-center gap-2
              ">
            <Layers className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
            <span className="font-medium tracking-wide">
              Manage SubCategories
            </span>
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="grid gap-3">
        <Separator />
        {/* Created Date */}
        <div className="flex my-0 items-center justify-between">
          <p className="text-muted-foreground text-xs">
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              onClick={() => handleEditOpen(category)}
              size={"icon"}
            >
              <Edit2 />
            </Button>
            <WarningModal disabled={loading} onConfirm={()=>handleDelete(category.id)} variant="destructive">
            <Button
              variant={"outline"}
              className="text-red-500!"
              size={"icon"}
            >
              <Trash2 />
            </Button>
            </WarningModal>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
