// src/modules/_authed/route.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

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
  return <Outlet />
}
