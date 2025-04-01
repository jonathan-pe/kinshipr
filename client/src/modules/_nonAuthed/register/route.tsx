import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
