"use client";
import React, { useState } from "react";
import PlanCard from "../_components/PlanCard";
import { Button } from "@/components/ui/button";
import ErrorLoading from "@/components/ErrorLoading";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { PlanType } from "@/types/plan";
import { PlanFormModal } from "../_components/PlanModal";
import toast from "react-hot-toast";

export default function page() {
  const {
    data,
    isLoading: loading,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/admin/plans", fetcher);
  const [pending, setPending] = useState(false);
  const handleDelete = async (planId: string) => {
    setPending(true);
    try {
      const request = await fetch("/api/admin/plans", {
        method: "DELETE",
        body: JSON.stringify({
          id: planId,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Error Occured!");
    } finally {
      setPending(false);
    }
  };
  const handleEdit = async (plan: PlanType) => {
    setPending(true);
    try {
      const request = await fetch("/api/admin/plans",{
        method:"PUT",
        body:JSON.stringify(plan)
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
    //   toast.success(response.message);
    } catch (error: any) {
        toast.error(error.message || "Error Occured!");
    } finally {
      setPending(false);
    }
  };
  const handleSave = async (plan: PlanType) => {
    setPending(true);
    try {
      const request = await fetch("/api/admin/plans",{
        method:"POST",
        body:JSON.stringify(plan)
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
    //   toast.success(response.message);
    } catch (error: any) {
        toast.error(error.message || "Error Occured!");
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="min-w-full space-y-5">
      <h1 className="text-xl md:text-3xl font-bold flex items-center justify-between">
        <div>Plans Management</div>
        <PlanFormModal loading={pending} mode="create" onSuccess={handleSave}>
          <Button size={"lg"}>Add Plan +</Button>
        </PlanFormModal>
      </h1>
      <ErrorLoading
        loading={loading || isValidating}
        error={error}
        dataLength={data?.plans?.length}
        emptyMessage="No Tournaments Exist!"
      >
        <div className="grid xl:grid-cols-3 gap-5">
          {data?.plans?.map((plan: any) => {
            return (
              <PlanCard
                loading={pending}
                onDelete={handleDelete}
                onEdit={handleEdit}
                key={plan.id}
                plan={plan}
              />
            );
          })}
        </div>
      </ErrorLoading>
    </div>
  );
}
