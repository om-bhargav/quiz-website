"use client";
import ErrorLoading from "@/components/ErrorLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import UserManagementCard from "../_components/UserCard";
import { EMAIL_PATTERN } from "@/lib/constants";

export default function page() {
  const {
    data,
    isLoading: loading,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/admin/users", fetcher);
  const [sending, setSending] = useState(false);
  const users = data?.users;
  const [searchedUsers, setSearchedUsers] = useState(users);
  useEffect(() => {
    setSearchedUsers(users);
  }, [users]);
  const handleStatusUpdate = async (userId: string, status: string) => {
    try {
      setSending(true);
      const request = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          status: status,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };
  const handleDelete = async (userId: string) => {
    try {
      setSending(true);
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
    } finally {
      setSending(false);
    }
  };
  const handleUpdate = async (
    userId: string,
    email: string,
    role: string,
    updatedBalance: number
  ) => {
    if(!EMAIL_PATTERN.test(email)){
      toast.error("Email Doesn't Match the expected Pattern!");
      return;
    }
    try {
      setSending(true);
      const request = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ role: role,email: email,balance: updatedBalance }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as any);
    const {searchValue} = Object.fromEntries(formData);
    if(!searchValue){
      setSearchedUsers(users);
      
    }else{
      const targetName = (searchValue as string).toLocaleLowerCase();
      setSearchedUsers(users?.filter((user: any)=>{
        const currentName = (user.name as string).toLocaleLowerCase();
        return currentName.includes(targetName);
      }));
    }
  };
  return (
    <div className="min-w-full space-y-5">
      <div className="flex flex-col md:flex-row w-full gap-5 justify-between md:items-center">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <Input name="searchValue" placeholder="Search"/>
          <Button type="submit">Search</Button>
        </form>
      </div>
      <ErrorLoading
        error={error}
        loading={loading || isValidating}
        dataLength={searchedUsers?.length}
        emptyMessage="No Users Found"
      >
        <div className="grid xl:grid-cols-3 gap-5">
          {searchedUsers?.map((user: any, index: number) => {
            return (
              <UserManagementCard
                loading={sending}
                handleStatusUpdate={handleStatusUpdate}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
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
