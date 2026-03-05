"use client";

import Image from "next/image";
import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const LoaderContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
});

export const useLoader = () => useContext(LoaderContext);

// 1. Extract the hook logic into a separate, invisible component
function NavigationListener({ setIsLoading }: { setIsLoading: (loading: boolean) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams, setIsLoading]);

  return null; // This component doesn't render any UI
}

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      
      {/* 2. Wrap ONLY the listener in Suspense to satisfy Next.js build requirements */}
      <Suspense fallback={null}>
        <NavigationListener setIsLoading={setIsLoading} />
      </Suspense>

      {isLoading && (
        /* Note: I updated 'z-300' to 'z-[300]' and added 'inset-0' so it properly covers the screen */
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-yellow-500/30">
          <Image
            src={"/loading.png"}
            height={200}
            width={200}
            alt={"Loading"}
            className="animate-spin brightness-0 invert sepia saturate-[1000%] hue-rotate-[10deg]"
          />
        </div>
      )}
      
      {children}
    </LoaderContext.Provider>
  );
}