// src/modules/_authed/profile/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/_authed/profile/')({ component: Profile })

function Profile() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className='flex flex-1 flex-col items-center justify-center'>Loading...</div>
  }

  return (
    <div className='max-w-7xl flex flex-1 flex-col items-center justify-center space-y-4'>
      <h1 className='text-3xl font-bold'>Profile</h1>
      <span>Username: {user?.username}</span>
      <span>Email: {user?.primaryEmailAddress?.toString()}</span>
      <span>ID: {user?.id}</span>
      <Link to='/feed'>Feed</Link>
    </div>
  )
}
