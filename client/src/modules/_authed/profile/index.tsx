import { useUser } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useUser()
  const username = user?.username || 'unknown'

  return <div>My profile {username}</div>
}
