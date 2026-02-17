import React from 'react'
import UserManagementCard from '../_components/UserCard'

export default function page() {
  return (
         <div className="min-w-full space-y-3">
             <h1 className="text-3xl font-bold">
                Users Management
             </h1>
             <div className='grid grid-cols-3 gap-5'>
                <UserManagementCard/>
                <UserManagementCard/>
                <UserManagementCard/>
                <UserManagementCard/>
             </div>
         </div>
  )
}
