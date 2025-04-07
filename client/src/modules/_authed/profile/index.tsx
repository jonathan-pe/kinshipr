import { useUserProfile } from '@/api/profiles'
import Pending from '@/components/pending'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ProfileContent from '@/modules/_authed/profile/-profile-content'
import AccountContent from '@/modules/_authed/profile/-account-content'
import { EditProfileModal } from '@/modules/_authed/profile/-edit-profile-modal'

export const Route = createFileRoute('/_authed/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = useAuth()
  const { data, isLoading, error } = useUserProfile(userId ?? '')

  const [selectedTab, setSelectedTab] = useState('profile')
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  if (isLoading) return <Pending />
  if (error) return <div className='flex flex-1 m-4'>Error retrieving profile data. Please try again</div>
  if (!data) return <div className='flex flex-1 m-4'>Profile data not found</div>

  return (
    <div className='flex flex-col flex-1 m-4 gap-4'>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className='flex flex-1'>
        <div className='flex items-center gap-4'>
          <TabsList>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='account'>Account</TabsTrigger>
          </TabsList>

          {selectedTab === 'profile' && <Button onClick={() => setShowEditProfileModal(true)}>Edit Profile</Button>}
        </div>

        <ProfileContent profileData={data} />

        <AccountContent />
      </Tabs>

      <EditProfileModal open={showEditProfileModal} onClose={() => setShowEditProfileModal(false)} initialData={data} />
    </div>
  )
}
