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
  // const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const { data, error, isMutating, trigger } = useLoginUser()
  const setToken = useAuthStore((state) => state.setToken)

  const { token } = data || {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await trigger({ email, password })
      if (res && res.token) {
        setToken(res.token)
      }
    } catch (error: any) {
      console.log('EEEEEE', error)
      setMessage('Login failed')
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
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
