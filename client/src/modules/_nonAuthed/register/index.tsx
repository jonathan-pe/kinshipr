// src/modules/register/Register.tsx
import React, { useState } from 'react'
import { useRegisterUser } from '@/api/user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/register/')({ component: Register })

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { registerUser } = useRegisterUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await registerUser({ username, email, password })
      setMessage(response.data.message)
    } catch (error: any) {
      setMessage(error.response.data.message || 'Registration failed')
    }
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='username'>Username</Label>
          <Input
            type='text'
            id='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <Button type='submit'>Register</Button>
      </form>
      {message && <p className='mt-2 text-red-500'>{message}</p>}
    </div>
  )
}
