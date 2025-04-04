import { UserProfile } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { TabsContent } from '@/components/ui/tabs'
import { useTheme } from '@/hooks/useTheme'

export default function AccountContent() {
  const { theme } = useTheme()

  return (
    <TabsContent value='account' className='flex flex-col mt-4 justify-center items-center'>
      <UserProfile appearance={{ baseTheme: theme === 'dark' ? dark : undefined }} />
    </TabsContent>
  )
}
