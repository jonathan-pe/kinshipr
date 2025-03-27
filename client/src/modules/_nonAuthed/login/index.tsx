// src/modules/login/Login.tsx
import React, { useState } from 'react'
import { useLoginUser } from '@/api/user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import useAuthStore from '@/store/authStore'

export const Route = createFileRoute('/_nonAuthed/login/')({ component: Login })

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const { data, error, isMutating, trigger } = useLoginUser()
  const setToken = useAuthStore((state) => state.setToken)
  const setUserId = useAuthStore((state) => state.setUserId)

  const { token } = data || {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await trigger({ email, password })
      if (res && res.token && res.userId) {
        setToken(res.token)
        setUserId(res.userId)
      }
    } catch (error: any) {
      console.error(error)
      setMessage('Login failed')
    }
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center mx-auto'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold'>Welcome back</h1>
        <p className='text-sm text-muted-foreground'>Enter your credentials to sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type='submit'>Login</Button>
      </form>
      {message && <p className='mt-2 text-red-500'>{message}</p>}
      {!isMutating && token && <p className='mt-2'>Token: {token}</p>}
    </div>
  )
}
