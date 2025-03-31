import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  return <div>Hello "/_authed/profile/{username}"!</div>
}
