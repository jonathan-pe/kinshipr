// src/modules/_authed/profile/index.tsx
import { useState, useEffect } from 'react'
import { useUserProfile, useUpdateUserProfile, useAddFriend, useRemoveFriend } from '@/api/user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/store/authStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/')({ component: Profile })

function Profile() {
  const userId = useAuthStore((state) => state.userId)
  const [bio, setBio] = useState('')
  const [friendId, setFriendId] = useState('')

  const { data: user, error, mutate: getUserProfile, isLoading } = useUserProfile(userId || '')
  const { trigger: updateProfile, isMutating, error: updateError } = useUpdateUserProfile(userId || '')
  const { trigger: addFriend, isMutating: isAddingFriend } = useAddFriend(userId || '')
  const { trigger: removeFriend, isMutating: isRemovingFriend } = useRemoveFriend(userId || '')

  useEffect(() => {
    if (user && user.user) {
      setBio(user.user.bio || '')
    }
  }, [user])

  const handleUpdate = async () => {
    if (user && user.user) {
      try {
        await updateProfile({ bio })
        getUserProfile() // Re-fetch user profile
      } catch (err) {
        console.error('Failed to update profile:', err)
      }
    }
  }

  const handleAddFriend = async () => {
    try {
      await addFriend({ friendId })
      getUserProfile()
    } catch (err) {
      console.error('Failed to add friend:', err)
    }
  }

  const handleRemoveFriend = async (friendIdToRemove: string) => {
    try {
      await removeFriend({ friendId: friendIdToRemove })
      getUserProfile()
    } catch (err) {
      console.error('Failed to remove friend:', err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error || !user || !user.user) return <div>Failed to load profile</div>

  return (
    <div className='max-w-7xl mx-auto p-6 md:p-8 lg:p-10 space-y-6'>
      <h2 className='text-3xl font-bold mb-4'>Profile</h2>
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
          <Label htmlFor='friendId'>Friend ID</Label>
          <Input type='text' id='friendId' value={friendId} onChange={(e) => setFriendId(e.target.value)} />
          <Button onClick={handleAddFriend} disabled={isAddingFriend}>
            {isAddingFriend ? 'Adding...' : 'Add Friend'}
          </Button>
        </div>

        <div>
          <h3>Friends</h3>
          {user.user.friendList &&
            user.user.friendList.map((friend: any) => (
              <div key={friend}>
                {friend}
                <Button onClick={() => handleRemoveFriend(friend)} disabled={isRemovingFriend}>
                  {isRemovingFriend ? 'Removing...' : 'Remove'}
                </Button>
              </div>
            ))}
        </div>

        <div>
          <p>Username: {user.user.username}</p>
          <p>Email: {user.user.email}</p>
        </div>
      </div>
    </div>
  )
}
