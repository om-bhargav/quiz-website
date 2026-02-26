"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ErrorLoading from "@/components/ErrorLoading";
import { Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryModal from "../../_components/CategoryModal";
import toast from "react-hot-toast";
import { WarningModal } from "@/components/WarningModal";

type SubCategory = {
  id: string;
  name: string;
  createdAt: string;
};

export default function SubCategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const {
    data: category,
    isLoading: loading,
    error: categoryError,
  } = useSWR(`/api/categories?categoryId=${id}`, fetcher);
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    `/api/subcategories?categoryId=${id}`,
    fetcher
  );

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const [pending, setPending] = useState(false);
  // Open edit modal
  const handleEdit = (sub: SubCategory) => {
    setInitialData(sub);
    setEditOpen(true);
  };
  // Save edit
  const handleSave = async (data: any) => {
    setPending(true);
    try {
      const request = await fetch(`/api/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, categoryId: id }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      mutate();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    await fetch(`/api/subcategories`, {
      method: "DELETE",
      body: JSON.stringify({ subCategoryId: id }),
    });

    mutate();
  };

  const handleUpdate = async (data: any) => {
    setPending(true);
    try {
      const request = await fetch(`/api/subcategories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subCategoryId: initialData?.id,categoryId: initialData?.categoryId,...data }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      mutate();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">{category?.category?.name}</div>
        <Button
          size={"lg"}
          onClick={() => {
            setInitialData(null);
            setOpen(true);
          }}
        >
          Add Subcategory +
        </Button>
      </div>
      <ErrorLoading
        loading={isLoading || isValidating}
        error={error}
        dataLength={data?.subcategories?.length}
        emptyMessage="No Subcategories Found!"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {data?.subcategories?.map((sub: SubCategory) => (
            <SubCategoryCard
              key={sub.id}
              sub={sub}
              pending={pending}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </ErrorLoading>
      <CategoryModal
        isSubCategory={true}
        open={open}
        onClose={setOpen}
        onSubmit={handleSave}
        pending={pending}
      />
      <CategoryModal
        isSubCategory={true}
        open={editOpen}
        onClose={setEditOpen}
        initialData={initialData}
        onSubmit={handleUpdate}
        pending={pending}
      />
    </div>
  );
}

type SubCategoryCardProps = {
  sub: SubCategory;
  onEdit: (sub: SubCategory) => void;
  onDelete: (id: string) => void;
  pending: boolean;
};

function SubCategoryCard({ sub, onEdit, onDelete,pending }: SubCategoryCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{sub.name}</CardTitle>

        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={() => onEdit(sub)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <WarningModal disabled={pending} onConfirm={() => onDelete(sub.id)} variant="destructive">
          <Button
            size="icon"
            variant="outline"
            className="text-red-500!"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          </WarningModal>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Created: {new Date(sub.createdAt).toLocaleDateString()}
      </CardContent>
    </Card>
  );
}
