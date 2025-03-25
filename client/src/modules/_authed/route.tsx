import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center mx-auto'>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  )
}
