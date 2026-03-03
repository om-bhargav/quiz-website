"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";
export default function Layout({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [pathName]);
  return loading ? <Loading /> : children;
}
