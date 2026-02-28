"use client";
import React, { useEffect, useMemo, useState } from "react";
import TournamentCard from "../_components/TournamentCard";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import toast from "react-hot-toast";
import ErrorLoading from "@/components/ErrorLoading";
import { Button } from "@/components/ui/button";
import TournamentModal from "../_components/TournamentModal";
import { Input } from "@/components/ui/input";
export default function page() {
  const {
    data,
    isLoading: loading,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/admin/tournaments", fetcher);
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const events = data?.tournaments;
  const [search, setSearch] = useState("");

  const searchedEvents = useMemo(() => {
    if (!search) return events;

    return events.filter((event: any) =>
      event?.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const handleCreate = async (data: any) => {
    try {
      setPending(true);
      const request = await fetch("/api/admin/tournaments", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      setOpen(false);
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const handleEdit = async (data: any) => {
    try {
      setPending(true);
      const request = await fetch(`/api/admin/tournaments/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      setEditOpen(false);
      await mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const handleDelete = async (tournamentId: string) => {
    try {
      const request = await fetch(`/api/admin/tournaments/${tournamentId}`, {
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
    }
  };
  return (
    <div className="min-w-full space-y-5">
      <h1 className="text-xl md:text-3xl font-bold flex max-md:flex-col gap-4 md:items-center justify-between">
        <div>Events Management</div>
        <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-3">
          <Input value={search} onChange={(e)=>setSearch(e.target.value)} name="searchValue" placeholder="Search" />
          <Button type="submit">Search</Button>
        </div>
        <Button size={"lg"} onClick={() => setOpen(true)}>
          Add Event +
        </Button>
        </div>
      </h1>
      <ErrorLoading
        loading={loading || isValidating}
        error={error}
        dataLength={searchedEvents?.length}
        emptyMessage="No Tournaments Exist!"
      >
        <div className="grid xl:grid-cols-3 gap-5">
          {searchedEvents?.map((tournament: any) => {
            return (
              <TournamentCard
                loading={pending}
                setEditOpen={setEditOpen}
                setInitialData={setInitialData}
                tournament={tournament}
                handleDelete={() => handleDelete(tournament.id)}
                key={tournament.id}
              />
            );
          })}
        </div>
      </ErrorLoading>
      <TournamentModal
        pending={pending}
        open={open}
        onClose={setOpen}
        onSubmit={handleCreate}
      />
      <TournamentModal
        pending={pending}
        open={editOpen}
        onClose={setEditOpen}
        initialData={initialData}
        onSubmit={handleEdit}
      />
    </div>
  );
}
