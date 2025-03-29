import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/login/sso-callback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthenticateWithRedirectCallback />
}
