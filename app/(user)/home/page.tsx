import React from 'react'
import HeroSection from './_components/HeroSection'
import CategorySection from './_components/CategorySection'
import LiveContests from './_components/LiveContests'
import PrizesSection from './_components/PrizesSection'

export default function page() {
  return (
    <div className='max-w-xl grid gap-7 p-5 w-full mx-auto'>
        <HeroSection/>
        <CategorySection/>
        <LiveContests/>
        <PrizesSection/>
    </div>
  )
}
