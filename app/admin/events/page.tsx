import React from 'react'
import TournamentCard from '../_components/TournamentCard'
export default function page() {
  return (
         <div className="min-w-full space-y-3">
             <h1 className="text-3xl font-bold">
                Events Management
             </h1>
             <div className='grid grid-cols-3 gap-5'>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
             </div>
         </div>
  )
}
