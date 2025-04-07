import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { TabsContent } from '@radix-ui/react-tabs'
import { User } from 'lucide-react'

interface ProfileContentProps {
  username: string
  profilePictureUrl: string
  displayName?: string
  bio?: string
}

export default function ProfileContent({ profileData }: { profileData: ProfileContentProps }) {
  return (
    <TabsContent value='profile' className='flex flex-col mt-4 gap-4'>
      <div className='flex items-center gap-8'>
        <Avatar className='h-32 w-32 rounded-full'>
          <AvatarImage src={profileData.profilePictureUrl} className='rounded-full' />
          <AvatarFallback className='rounded-full'>
            <User size={80} />
            <span className='sr-only'>{`${profileData.displayName || profileData.username}'s profile picture`}</span>
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          {profileData.displayName && <h2>{profileData.displayName}</h2>}
          <h3>@{profileData.username}</h3>
          <p className='text-muted-foreground'>{profileData.bio}</p>
        </div>
      </div>
    </TabsContent>
  )
}
