import { useUserProfile } from '@/api/profiles'
import Pending from '@/components/pending'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = useAuth()
  const { data, isLoading, error } = useUserProfile(userId ?? '')

  if (isLoading) return <Pending />
  if (error) return <div className='flex flex-1 m-4'>Error retrieving profile data. Please try again</div>
  if (!data) return <div className='flex flex-1 m-4'>Profile data not found</div>

  const { username } = data

  return <div className='flex flex-1 m-4'>My profile {username}</div>
}
