"use client";
import { useState } from "react";
import React from "react";
import Sidebar from "./_components/Sidebar";
import TopBar from "./_components/Topbar";

export default function layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 md:ml-64 min-h-screen">
        <TopBar setOpen={setSidebarOpen} />

        <div className="pt-16 md:pt-6 p-4 md:px-10">{children}</div>
      </main>
    </div>
  );
}
