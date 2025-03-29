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
import { isClerkError } from '@/types/clerk'

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
  const { signIn, isLoaded: isClerkLoaded } = useSignIn()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await signIn?.create({
        strategy: 'password',
        identifier: data.email,
        password: data.password,
      })

      if (response?.status === 'complete') {
        toast.success('Logged in successfully')
        navigate({ to: '/profile' })
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
      if (isClerkError(error)) {
        error.errors?.forEach((err) => {
          toast.error(err.message)
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-balance text-sm text-muted-foreground'>
            Enter your credentials below to login to your account
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
                  <Input placeholder='username@domain.com' {...field} />
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
          {/* <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
          <Button variant='outline' className='w-full'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
                fill='currentColor'
              />
            </svg>
            Login with GitHub
          </Button> */}
        </div>
        <div className='text-center text-sm'>
          Don&apos;t have an account? <Link to='/register'>Sign up</Link>
        </div>
      </form>
    </Form>
  )
}
