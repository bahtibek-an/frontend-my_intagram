import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from '../dashboard/dashboard'

const index: React.FC = () => {
  return (
    <div className='flex'>
      <div className=''>
        <Dashboard />
      </div>
      <div className='sm:ml-80 w-full h-full'>
        <div className='m-6 border-2 border-gray-300 rounded-lg'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default index
