import { useUserProfile } from '@/api/profiles'
import Pending from '@/components/pending'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ProfileContent from '@/modules/_authed/profile/-profile-content'
import AccountContent from '@/modules/_authed/profile/-account-content'

export const Route = createFileRoute('/_authed/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = useAuth()
  const { data, isLoading, error } = useUserProfile(userId ?? '')

  const [selectedTab, setSelectedTab] = useState('profile')

  if (isLoading) return <Pending />
  if (error) return <div className='flex flex-1 m-4'>Error retrieving profile data. Please try again</div>
  if (!data) return <div className='flex flex-1 m-4'>Profile data not found</div>

  const { username, profilePictureUrl, displayName } = data

  return (
    <div className='flex flex-col flex-1 m-4 gap-4'>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className='flex flex-1'>
        <div className='flex items-center gap-4'>
          <TabsList>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='account'>Account</TabsTrigger>
          </TabsList>

          {selectedTab === 'profile' && <Button>Edit Profile</Button>}
        </div>

        <ProfileContent username={username} profilePictureUrl={profilePictureUrl} displayName={displayName} />

        <AccountContent />
      </Tabs>
    </div>
  )
}
