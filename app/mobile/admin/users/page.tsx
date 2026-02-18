"use client";
import React from "react";
import UserManagementCard from "../_components/UserCard";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import toast from "react-hot-toast";

export default function page() {
  const {
    data,
    isLoading: loading,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/admin/users", fetcher);
  const handleStatusUpdate = async (userId: string,status: string) => {
    try {
      const request = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        body:JSON.stringify({
         status: status
        })
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    }   
  };
  const handleDelete = async (userId: string) => {
    try {
      const request = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-w-full space-y-5">
      <h1 className="text-3xl font-bold">Users Management</h1>
      <ErrorLoading error={error} loading={loading || isValidating} dataLength={data?.users?.length} emptyMessage="No Users Found">
        <div className="grid xl:grid-cols-3 gap-5">
          {data?.users?.map((user: any, index: number) => {
            return (
              <UserManagementCard
                handleStatusUpdate={handleStatusUpdate}
                handleDelete={handleDelete}
                user={user}
                key={index}
              />
            );
          })}
        </div>
      </ErrorLoading>
    </div>
  );
}
