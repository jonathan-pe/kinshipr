import { Toaster } from '@/components/ui/sonner'
import { UseAuthReturn } from '@clerk/types'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Suspense } from 'react'

interface RouterWithContext {
  auth: UseAuthReturn
}

export const Route = createRootRouteWithContext<RouterWithContext>()({
  component: () => (
    <Suspense fallback={<div className='min-h-screen w-full flex justify-center items-center'>Loading...</div>}>
      <Outlet />
      <Toaster richColors />
      <TanStackRouterDevtools position='bottom-right' />
    </Suspense>
  ),
  notFoundComponent: () => <div className='min-h-screen w-full flex justify-center items-center'>404 Not Found</div>,
})
