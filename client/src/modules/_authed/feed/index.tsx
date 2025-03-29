import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/feed/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Link to='/profile'>Profile</Link>
    </div>
  )
}
