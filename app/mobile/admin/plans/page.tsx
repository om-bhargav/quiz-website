import React from 'react'
import PlanCard from '../_components/PlanCard'

export default function page() {
  return (
         <div className="min-w-full space-y-3">
             <h1 className="text-3xl font-bold">
                 Plans Management
             </h1>
             <div className='grid grid-cols-3 gap-5'>
              <PlanCard/>                
              <PlanCard/>                
              <PlanCard/>                
              <PlanCard/>                
             </div>
         </div>
  )
}
