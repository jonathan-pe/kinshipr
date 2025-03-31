// src/modules/_authed/profile/index.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({
  component: Profile,
  beforeLoad: async ({ context }) => {
    throw redirect({ to: '/profile/$username', params: { username: context.user.user?.username ?? '' } })
  },
})

function Profile() {
  return (
    <div className='max-w-7xl flex flex-1 flex-col items-center justify-center space-y-4'>
      <Outlet />
    </div>
  )
}
