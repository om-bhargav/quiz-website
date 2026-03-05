"use client";
import TabsComponent from "@/components/TabsComponent";
import React, { useState, useEffect } from "react";
export default function layout({ children }: React.PropsWithChildren) {
  return (
    <div className="pb-25 grid self-start! w-full">
      {children}
      <TabsComponent />
    </div>
  );
}
