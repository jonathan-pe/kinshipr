import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
