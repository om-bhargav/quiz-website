import AuthWrapper from "@/components/AuthWrapper";
import React from "react";
import TabsComponent from "@/components/TabsComponent";
export default function layout({ children }: React.PropsWithChildren) {
  return (
    <AuthWrapper>
      <div className="max-w-xl mb-32 mx-auto w-full grid place-items-center relative grid">
        {children}
        <TabsComponent />
      </div>
    </AuthWrapper>
  );
}
