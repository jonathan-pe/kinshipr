// src/modules/_authed/route.tsx
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { KinshiprSidebar } from '@/components/sidebar/sidebar'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const { isSignedIn } = context.auth

    if (!isSignedIn) {
      toast.error('You must be signed in to view this page', { id: 'accessing-protected-page' })
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <KinshiprSidebar />
      <SidebarInset>
        <div className='container min-h-screen flex flex-col items-center justify-center mx-auto'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
