"use client";
import React,{useEffect} from 'react'

export default function TrackTraffic({children}:React.PropsWithChildren) {
    useEffect(()=>{
        const makeTraffic = async () => {
            await fetch("/api/logTraffic");
        };
        makeTraffic();
    },[]);
  return (
    children
  )
}
