import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'
import Topbar from './topbar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const pageTitle = children.type?.title || 'Default Title';
  const hasSearch = children.type?.has_search || false;
  const router = useRouter();
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className='relative flex-1 flex flex-col'>
          <Topbar />


          <div className='flex-1 bg-secondary/10 p-6'>
            <Card>
              <CardHeader>
                <CardTitle data-testid="main-title" className="flex items-center">
                  {pageTitle}
                  {hasSearch && <Input className="ml-auto max-w-48" onChange={({ target }) => router.push({
                    query: {
                      ...(target.value ? { q: target.value } : null)
                    }
                  })} placeholder="Recherche..." />}
                </CardTitle>
              </CardHeader>
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
