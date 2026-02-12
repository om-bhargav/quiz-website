import React from 'react'
import { redirect } from 'next/navigation';
import { checkUser } from '@/lib/checkAuth';
export default async function AuthWrapper({children}:React.PropsWithChildren) {
  const user = await checkUser();  
  if(!user){
    redirect("/login")
  }
    return (
    children
  )
}
