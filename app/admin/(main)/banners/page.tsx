"use client";
import ErrorLoading from "@/components/ErrorLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
import BannerCard, { Banner } from "../_components/BannerCard";
import BannerForm from "../_components/BannerForm";
import toast from "react-hot-toast";

export default function page() {
  const { data, isLoading, isValidating, error, mutate } = useSWR(
    "/api/banner",
    fetcher,
    {
        revalidateOnFocus: false
    }
  );
  const loading = isLoading;
  const banners = data?.data ?? [];
  const [pending, setPending] = useState(false);
  const handleUpsert = async (data: Banner, mode: "create" | "edit") => {
    console.log(data,mode);
    try {
      setPending(true);
      const url = "/api/banner/" + (mode === "create" ? "" : data.id);
      const method = mode === "create" ? "POST" : "PUT";
      const request = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message || `Banner ${mode==="create" ? "Created":"Updated"} Successfully!`);
      mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const onDelete = async (id: string)=>{
    try{
        setPending(true);
        const request = await fetch(`/api/banner/${id}`,{method:"DELETE"});
        const response = await request.json();
        if(!response.success){
            throw Error(response.message);
        }
        toast.success(response.message);
        mutate();
    }catch(error: any){
        toast.error(error.message);
    }finally{
        setPending(false);
    }
  };
  return (
    <div className="min-w-full space-y-5">
      <h1 className="text-xl md:text-3xl font-bold flex max-md:flex-col gap-4 md:items-center justify-between">
        <div>Banners Management</div>
        <div className="flex flex-col md:flex-row gap-4">
          <BannerForm
            handleSubmit={handleUpsert}
            pending={pending}
            mode="create"
          >
            <Button size={"lg"}>Add Banner +</Button>
          </BannerForm>
        </div>
      </h1>
      <ErrorLoading
        loading={loading}
        error={error}
        dataLength={banners.length}
        emptyMessage="No Banners Added!"
      >
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {banners.map((banner: Banner) => {
            return (
              <BannerCard onEdit={handleUpsert} onDelete={onDelete} key={banner.id} pending={pending} banner={banner} />
            );
          })}
        </div>
      </ErrorLoading>
    </div>
  );
}
