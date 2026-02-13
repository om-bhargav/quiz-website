import React from 'react'
import { colorMap } from '@/lib/constants';
interface Item{
  title: string;
  Icon: any;
  subtitle: string | null;
  color: string;
}
export default function MenuItemCard({item}:{item: Item}) {
  const Icon = item.Icon;
  return (
    <div className={`${colorMap[item.color]} flex gap-6 justify-start items-center p-4 rounded-xl border-4 border-black shadow-[5px_5px_0px_0px_black]`}>
      <div className='min-h-[80px] flex items-center justify-center border-4 border-black shadow-[5px_5px_0px_0px_black] max-w-[80px] rounded-xl bg-background w-full'>
        <Icon size={30} strokeWidth={3}/>
      </div>
      <div>
        <div className='text-xl font-extrabold uppercase'>{item.title}</div>
        <div className='text-lg font-semibold'>{item.subtitle}</div>
      </div>
    </div>
  )
}
