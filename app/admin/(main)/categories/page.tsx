"use client";
import React, { useState } from "react";
import UserManagementCard from "../_components/UserCard";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import toast from "react-hot-toast";
import CategoryCard from "../_components/CategoryCard";
import { Button } from "@/components/ui/button";
import CategoryModal from "../_components/CategoryModal";

export default function page() {
  const {
    data,
    isLoading: loading,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/categories", fetcher);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const [pending, setPending] = useState(false);
  const handleEditOpen = (category: any) => {
    setInitialData(category);
    setEditOpen(true);
  };
  const handleSave = async (data: any) => {
    setPending(true);
    try {
      const request = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const handleUpdate = async (data: any) => {
    setPending(true);
    try {
      const request = await fetch(`/api/categories/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const handleDelete = async (categoryId: string) => {
    setPending(true);
    try {
      const request = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="min-w-full space-y-5">
      <h1 className="text-xl md:text-3xl font-bold flex items-center justify-between">
        <div>Categories Management</div>
        <Button
          size={"lg"}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Category +
        </Button>
      </h1>
      <ErrorLoading
        error={error}
        loading={loading || isValidating}
        dataLength={data?.categories?.length}
        emptyMessage="No Categories Found!"
      >
        <div className="grid xl:grid-cols-3 gap-5">
          {data?.categories?.map((category: any) => {
            return (
              <CategoryCard
                loading={pending}
                handleDelete={handleDelete}
                handleEditOpen={handleEditOpen}
                key={category.id}
                category={category}
              />
            );
          })}
        </div>
      </ErrorLoading>
      <CategoryModal
        pending={pending}
        open={open}
        onClose={setOpen}
        onSubmit={handleSave}
      />
      <CategoryModal
        pending={pending}
        open={editOpen}
        onClose={setEditOpen}
        initialData={initialData}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
