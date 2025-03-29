// src/modules/_authed/route.tsx
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
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
  const { signOut } = useAuth()

  return (
    <div className='container min-h-screen flex flex-col items-center justify-center mx-auto'>
      <header className='flex justify-between items-center w-full p-4'>
        <h2>kinshipr</h2>
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
          <Button variant='outline' size='icon' onClick={() => signOut()}>
            <LogOutIcon />
          </Button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
