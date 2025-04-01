// src/modules/_authed/profile/index.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile')({
  component: Profile,
  loader: () => ({
    crumb: `Profile`,
  }),
})

function Profile() {
  return <Outlet />
}
