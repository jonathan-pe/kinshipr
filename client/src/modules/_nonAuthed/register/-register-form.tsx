import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useSignUp } from '@clerk/clerk-react'
import { isClerkAPIResponseError } from '@clerk/clerk-js'
import { OAuthStrategy } from '@clerk/types'
import { MAIN_HOME_URL } from '@/constants'
import GoogleIcon from '@/assets/google-icon.png'

interface RegisterFormProps extends React.ComponentPropsWithoutRef<'form'> {
  setVerifying: (verifying: boolean) => void
}

const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_\-.]+$/, { message: 'Username can only contain letters, numbers, and "_", "-", or "."' })
      .nonempty({ message: 'Username is required' })
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(30, { message: 'Username must be at most 20 characters' }),
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message:
          'Password must contain an uppercase letter, a lowercase letter, a number AND a special character (!@#$%^&*)',
      })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(50, { message: 'Password must be at most 50 characters' })
      .nonempty({ message: 'Password is required' }),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export function RegisterForm({ setVerifying, className, ...props }: RegisterFormProps) {
  const { isLoaded, signUp } = useSignUp()
  const registerForm = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    if (!isLoaded) return

    try {
      setLoading(true)
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.username,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      toast.success('Verification code sent to your email address')
      setVerifying(true)
    } catch (error) {
      console.error(error)
      if (isClerkAPIResponseError(error)) {
        error.errors?.forEach((err) => {
          toast.error(err.message)
        })
      } else {
        toast.error('An error occurred while registering', { description: 'Please try again' })
      }
    } finally {
      setLoading(false)
    }
  }

  const signUpWithProvider = async (provider: OAuthStrategy) => {
    try {
      await signUp?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/login/sso-callback',
        redirectUrlComplete: MAIN_HOME_URL,
      })
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          toast.error(err.message)
        })
      }
    }
  }

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Register</h1>
          <p className='text-balance text-sm text-muted-foreground'>
            Enter your credentials below to register for an account
          </p>
        </div>
        <div className='grid gap-6'>
          <FormField
            control={registerForm.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='email'>Username</FormLabel>
                <FormControl>
                  <Input placeholder='bestuser' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='bestuser@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='B3stp@ssw0rd' {...field} type={showPassword ? 'text' : 'password'} />
                    <Button
                      variant='transparent'
                      size='icon'
                      type='button'
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPassword((prev) => !prev)
                      }}
                      className='absolute inset-y-0 right-0 flex items-center hover:bg-transparent'
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='B3stp@ssw0rd' {...field} type={showPassword ? 'text' : 'password'} />
                    <Button
                      variant='transparent'
                      size='icon'
                      type='button'
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPassword((prev) => !prev)
                      }}
                      className='absolute inset-y-0 right-0 flex items-center hover:bg-transparent'
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Register'}
          </Button>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
          <Button variant='outline' className='w-full' type='button' onClick={() => signUpWithProvider('oauth_google')}>
            <img src={GoogleIcon} className='h-auto max-w-4' />
            Sign Up with Google
          </Button>
        </div>
        <div className='text-center text-sm'>
          Already have an account? <Link to='/login'>Log In</Link>
        </div>
      </form>
    </Form>
  )
}
