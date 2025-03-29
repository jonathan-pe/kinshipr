import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/feed/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Link to='/profile'>Profile</Link>
    </div>
  )
}
