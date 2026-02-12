import React from 'react'
import {LucideLoader2} from "lucide-react";
import { InterFont } from '@/lib/fonts';
export default function Loader() {
  return (
    <div className='min-h-[300px] flex flex-col justify-between items-center'>
      <h1 className={`${InterFont.className} font-bold text-5xl`}>LOGO</h1>

      <LucideLoader2 className='animate-spin' size={50} color='var(--primary)'/>
    </div>
  )
}
