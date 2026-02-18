import React from "react";
import Sidebar from "./_components/Sidebar";
import TopBar from "./_components/Topbar";

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-72  min-h-screen">
        <TopBar />
        <div className="mt-4 p-3 px-10 ">{children}</div>
      </main>
    </div>
  );
}
