import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center mx-auto'>
      <h1>Non Authed</h1>
      <Outlet />
    </div>
  )
}
