import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useSignUp } from '@clerk/clerk-react'
import { isClerkError } from '@/types/clerk'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const VerifyFormSchema = z.object({
  code: z.string().nonempty({ message: 'Code is required' }),
})

export function VerifyForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { isLoaded, signUp, setActive } = useSignUp()

  const verifyForm = useForm<z.infer<typeof VerifyFormSchema>>({
    resolver: zodResolver(VerifyFormSchema),
    defaultValues: {
      code: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async (data: z.infer<typeof VerifyFormSchema>) => {
    if (!isLoaded) return

    try {
      setLoading(true)
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        toast.success('Registered successfully!')
        navigate({ to: '/profile' })
      } else if (signUpAttempt.status === 'missing_requirements') {
        toast.error('Please verify your email address')
      }
    } catch (error) {
      if (isClerkError(error)) {
        error.errors?.forEach((err) => {
          toast.error(err.message)
        })
      } else {
        toast.error('An error occurred while verifying your email', { description: 'Please try again' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...verifyForm}>
      <form onSubmit={verifyForm.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Verify your email</h1>
          <p className='text-balance text-sm text-muted-foreground'>
            Please enter the verification code sent to your email address
          </p>
        </div>
        <div className='flex flex-1 flex-col items-center justify-center gap-4'>
          <FormField
            control={verifyForm.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='code'>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {/* <Input placeholder='123456' {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Verify'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
