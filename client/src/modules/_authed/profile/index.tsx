// src/modules/profile/Profile.tsx
import { useState, useEffect } from 'react'
import { useUserProfile, useUpdateUserProfile } from '@/api/user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({ component: Profile })

function Profile() {
  const token = localStorage.getItem('token') // Get token from local storage
  const userId = localStorage.getItem('userId') // Get userid from local storage
  const { data: user, error, mutate } = useUserProfile(userId || '', token || '')
  const { updateUserProfile } = useUpdateUserProfile(userId || '', token || '')
  const [bio, setBio] = useState('')

  useEffect(() => {
    if (user && user.user) {
      setBio(user.user.bio || '')
    }
  }, [user])

  const handleUpdate = async () => {
    if (user && user.user) {
      try {
        await updateUserProfile({ bio })
        mutate() // Re-fetch user profile
      } catch (err) {
        console.error('Failed to update profile:', err)
      }
    }
  }

  if (error) return <div>Failed to load profile</div>
  if (!user || !user.user) return <div>Loading...</div>

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Profile</h2>
      <div className='space-y-4'>
        <div>
          <Label htmlFor='bio'>Bio</Label>
          <Input type='text' id='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <Button onClick={handleUpdate}>Update Profile</Button>
        <div>
          <p>Username: {user.user.username}</p>
          <p>Email: {user.user.email}</p>
        </div>
      </div>
    </div>
  )
}
