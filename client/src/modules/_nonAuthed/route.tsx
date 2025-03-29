import ThemeToggle from '@/components/theme-toggle'
import { GoogleOneTap } from '@clerk/clerk-react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed')({
  beforeLoad: ({ context }) => {
    const { isSignedIn } = context.auth

    if (isSignedIn) {
      throw redirect({ to: '/profile' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='container min-h-screen flex flex-col items-center justify-center mx-auto'>
      <header className='flex justify-between items-center w-full p-4'>
        <h2>kinshipr</h2>
        <ThemeToggle />
      </header>
      <Outlet />
      <GoogleOneTap />
    </div>
  )
}
