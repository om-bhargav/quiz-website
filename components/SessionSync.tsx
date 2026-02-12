"use client"
import React,{useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { UserInfo } from '@/store/UserInfo';
export default function SessionSync({children}:React.PropsWithChildren) {
  const {data,status} = useSession();
  const {login,logout} = UserInfo();
  useEffect(()=>{
    if(status==="authenticated"){
        login(data as any);
    }else if(status==="unauthenticated"){
        logout();
    }
  },[status]);
  return (
    children
  )
}
