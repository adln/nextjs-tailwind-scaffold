import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'

export default function Topbar() {
  return (
    <div className='border-b w-full h-12 px-3 flex items-center justify-start'>
      <SidebarTrigger />
    </div>
  )
}
