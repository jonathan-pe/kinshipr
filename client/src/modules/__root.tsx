import Header from '@/components/header'
import NotFound from '@/components/not-found'
import { KinshiprSidebar } from '@/components/sidebar/sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@clerk/clerk-react'
import { UseUserReturn } from '@clerk/types'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface RouterWithContext {
  user: UseUserReturn
}

export const Route = createRootRouteWithContext<RouterWithContext>()({
  component: Home,
  notFoundComponent: () => <NotFound />,
})

function Home() {
  const { isSignedIn } = useAuth()

  return (
    <SidebarProvider>
      {isSignedIn && <KinshiprSidebar />}
      <SidebarInset>
        <div className='flex flex-1 flex-col'>
          {isSignedIn && <Header />}
          <Outlet />
        </div>
      </SidebarInset>

      <Toaster richColors />
      <TanStackRouterDevtools position='bottom-right' />
    </SidebarProvider>
  )
}
