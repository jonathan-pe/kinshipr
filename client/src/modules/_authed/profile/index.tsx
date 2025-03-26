// src/modules/_authed/profile/index.tsx
import { useState, useEffect } from 'react'
import { useUserProfile, useUpdateUserProfile } from '@/api/user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/store/authStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({ component: Profile })

function Profile() {
  const userId = useAuthStore((state) => state.userId)
  const { data: user, error, mutate, isLoading } = useUserProfile(userId || '')
  const { trigger: updateProfile, isMutating, error: updateError } = useUpdateUserProfile(userId || '')
  const [bio, setBio] = useState('')

  useEffect(() => {
    if (user && user.user) {
      setBio(user.user.bio || '')
    }
  }, [user])

  const handleUpdate = async () => {
    if (user && user.user) {
      try {
        await updateProfile({ bio })
        mutate() // Re-fetch user profile
      } catch (err) {
        console.error('Failed to update profile:', err)
      }
    }
  }

  console.log(user)

  if (isLoading) return <div>Loading...</div>
  if (error || !user || !user.user) return <div>Failed to load profile</div>

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Profile</h2>
      <div className='space-y-4'>
        <div>
          <Label htmlFor='bio'>Bio</Label>
          <Input type='text' id='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <Button onClick={handleUpdate} disabled={isMutating}>
          {isMutating ? 'Updating...' : 'Update Profile'}
        </Button>
        {updateError && <p className='mt-2 text-red-500'>Failed to update profile.</p>}
        <div>
          <p>Username: {user.user.username}</p>
          <p>Email: {user.user.email}</p>
          <p>Bio: {user.user.bio}</p>
        </div>
      </div>
    </div>
  )
}
