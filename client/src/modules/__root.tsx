import { Toaster } from '@/components/ui/sonner'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<div className='min-h-screen w-full flex justify-center items-center'>Loading...</div>}>
      <Outlet />
      <Toaster richColors />
      <TanStackRouterDevtools />
    </Suspense>
  ),
  notFoundComponent: () => <div className='min-h-screen w-full flex justify-center items-center'>404 Not Found</div>,
})
