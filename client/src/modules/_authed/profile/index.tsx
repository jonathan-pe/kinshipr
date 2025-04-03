import { useUserProfile } from '@/api/profiles'
import Pending from '@/components/pending'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth, UserProfile } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { User } from 'lucide-react'

export const Route = createFileRoute('/_authed/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = useAuth()
  const { data, isLoading, error } = useUserProfile(userId ?? '')

  if (isLoading) return <Pending />
  if (error) return <div className='flex flex-1 m-4'>Error retrieving profile data. Please try again</div>
  if (!data) return <div className='flex flex-1 m-4'>Profile data not found</div>

  const { username, profilePictureUrl, displayName } = data

  return (
    <div className='flex flex-col flex-1 m-4 gap-4'>
      <Tabs defaultValue='profile'>
        <TabsList>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='account'>Account</TabsTrigger>
        </TabsList>
        <TabsContent value='profile' className='flex flex-col mt-4 gap-4'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-40 w-40 rounded-full'>
              <AvatarImage src={profilePictureUrl} />
              <AvatarFallback className='rounded-full'>
                <User size={100} />
                <span className='sr-only'>{`${displayName || username}'s profile picture`}</span>
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              {displayName && <h1>{displayName}</h1>}
              <h1>@{username}</h1>
            </div>
          </div>

          <div className='flex flex-col gap-2 mx-2'>
            <h2>Bio</h2>
            <p className='text-muted-foreground'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </TabsContent>
        <TabsContent value='account' className='flex flex-col mt-4 justify-center items-center'>
          <UserProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}
