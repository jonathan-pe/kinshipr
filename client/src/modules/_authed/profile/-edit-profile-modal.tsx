import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUpdateUserProfile } from '@/api/profiles'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { LoaderCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

type Props = {
  open: boolean
  onClose: () => void
  initialData: {
    username?: string
    displayName?: string
    bio?: string
  }
}

const UpdateFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'Username is required' })
    .regex(/^[a-zA-Z0-9_\-.]+$/, { message: 'Username can only contain letters, numbers, and "_", "-", or "."' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username must be at most 30 characters' }),
  displayName: z.string().max(30, { message: 'Display name must be at most 30 characters' }).optional(),
  bio: z.string().optional(),
})

export function EditProfileModal({ open, onClose, initialData }: Props) {
  const updateForm = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      username: initialData.username ?? '',
      displayName: initialData.displayName ?? '',
      bio: initialData.bio ?? '',
    },
  })

  const { userId } = useAuth()

  const { trigger: updateUserProfile, isMutating } = useUpdateUserProfile(userId)

  const onSubmit = async (data: z.infer<typeof UpdateFormSchema>) => {
    try {
      await updateUserProfile(data)
      toast.success('Profile updated successfully')
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update your profile', { description: 'Please try again' })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <Form {...updateForm}>
          <form onSubmit={updateForm.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <div className='grid gap-6'>
              <FormField
                control={updateForm.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='bestuser' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name='displayName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='displayName'>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder='best user' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='bio'>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Let everyone know more about yourself' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isMutating}>
                {isMutating ? <LoaderCircle className='animate-spin' /> : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
