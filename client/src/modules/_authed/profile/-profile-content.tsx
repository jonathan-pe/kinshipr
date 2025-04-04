import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { TabsContent } from '@radix-ui/react-tabs'
import { User } from 'lucide-react'

interface ProfileContentProps {
  username: string
  profilePictureUrl: string
  displayName?: string
}

export default function ProfileContent({ username, profilePictureUrl, displayName }: ProfileContentProps) {
  return (
    <TabsContent value='profile' className='flex flex-col mt-4 gap-4'>
      <div className='flex items-center gap-8'>
        <Avatar className='h-32 w-32 rounded-full'>
          <AvatarImage src={profilePictureUrl} className='rounded-full' />
          <AvatarFallback className='rounded-full'>
            <User size={80} />
            <span className='sr-only'>{`${displayName || username}'s profile picture`}</span>
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          {displayName && <h1>{displayName}</h1>}
          <h2>@{username}</h2>
          <p className='text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </TabsContent>
  )
}
