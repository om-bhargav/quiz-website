import AuthWrapper from "@/components/AuthWrapper";
import React from "react";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <AuthWrapper>
      <div className="max-w-lg pb-32 mx-auto w-full grid place-items-center relative bg-gray-100 grid">
        {children}
      </div>
    </AuthWrapper>
  );
}
