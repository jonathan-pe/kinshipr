import { MAIN_HOME_URL } from '@/constants'
import { GoogleOneTap } from '@clerk/clerk-react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed')({
  beforeLoad: ({ context }) => {
    const { isSignedIn } = context.auth

    if (isSignedIn) {
      throw redirect({ to: MAIN_HOME_URL })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='container min-h-screen flex flex-col items-center justify-center mx-auto'>
      <Outlet />
      <GoogleOneTap />
    </div>
  )
}
