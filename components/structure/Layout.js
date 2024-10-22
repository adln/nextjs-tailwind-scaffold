import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'
import Topbar from './topbar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function Layout({ children }) {
  return (

    <>
      <SidebarProvider>
        <AppSidebar />
        <main className='relative flex-1 flex flex-col'>
          <Topbar />


          <div className='flex-1 bg-secondary/10 p-6'>
            <Card>
              <CardHeader><CardTitle>Tableau de bord</CardTitle></CardHeader>
              <CardContent>
                {children}
              </CardContent>
            </Card>
          </div>

        </main>
      </SidebarProvider>
    </>
  )
}
