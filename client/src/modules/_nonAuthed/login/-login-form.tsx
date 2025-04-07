import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useSignIn } from '@clerk/clerk-react'
import { isClerkAPIResponseError } from '@clerk/clerk-js'

import GoogleIcon from '@/assets/google-icon.png'
import { OAuthStrategy } from '@clerk/types'
import { MAIN_HOME_URL } from '@/constants'

const FormSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string().nonempty({ message: 'Password is required' }),
})

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const { signIn, isLoaded: isClerkLoaded, setActive } = useSignIn()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!isClerkLoaded) return

    try {
      const response = await signIn?.create({
        strategy: 'password',
        identifier: data.email,
        password: data.password,
      })

      if (response?.status === 'complete') {
        await setActive({ session: response.createdSessionId })
        toast.success('Logged in successfully')
        navigate({ to: MAIN_HOME_URL })
      } else if (response?.status === 'needs_first_factor') {
        toast.error('Please verify your email address')
      } else if (response?.status === 'needs_second_factor') {
        toast.error('Please verify your email address')
      } else if (response?.status === 'needs_identifier') {
        toast.error('Please enter your email address')
      } else if (response?.status === 'needs_new_password') {
        toast.error('Please enter your new password')
      } else {
        toast.error('An error occurred while logging in')
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors?.forEach((err) => {
          toast.error(err.message)
        })
      }
    }
  }

  const loginWithProvider = async (provider: OAuthStrategy) => {
    try {
      await signIn?.authenticateWithRedirect({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Log in to your account</h1>
          <p className='text-balance text-sm text-muted-foreground'>
            Enter your credentials below to log in to your account
          </p>
        </div>
        <div className='grid gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='username@domain.com' {...field} className='autofill:bg-transparent!' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='password'>
                  <Label htmlFor='password'>Password</Label>
                  <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                    Forgot your password?
                  </a>
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input {...field} type={showPassword ? 'text' : 'password'} />
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
          <Button type='submit' className='w-full' disabled={!isClerkLoaded}>
            {!isClerkLoaded ? <LoaderCircle className='animate-spin' /> : 'Login'}
          </Button>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
          <Button variant='outline' className='w-full' type='button' onClick={() => loginWithProvider('oauth_google')}>
            <img src={GoogleIcon} className='h-auto max-w-4' />
            Log in with Google
          </Button>
        </div>
        <div className='text-center text-sm'>
          Don&apos;t have an account? <Link to='/register'>Sign up</Link>
        </div>
      </form>
    </Form>
  )
}
