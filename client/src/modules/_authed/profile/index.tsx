// src/modules/_authed/profile/index.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({
  component: Profile,
})

function Profile() {
  return (
    <div className='max-w-7xl flex flex-1 flex-col items-center justify-center space-y-4'>
      <h1>Profile</h1>
      <Outlet />
    </div>
  )
}
