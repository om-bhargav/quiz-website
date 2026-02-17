import React from 'react'
import TabsComponent from "@/components/TabsComponent";
export default function layout({children}:React.PropsWithChildren) {
  return (
    <>
    {children}
    <TabsComponent/>
    </>
  )
}
