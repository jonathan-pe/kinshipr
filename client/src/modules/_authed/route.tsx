// src/modules/_authed/route.tsx
import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { SWRConfig } from 'swr'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const { isSignedIn } = context.user

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
  const navigate = useNavigate()

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              toast.error('Unauthorized', { id: 'unauthorized', description: 'Please sign in again' })
              navigate({ to: '/' })
            }
          }
        },
      }}
    >
      <Outlet />
    </SWRConfig>
  )
}
