// src/modules/login/Login.tsx
import React, { useState } from 'react'
import { useLoginUser } from '@/modules/user/userApi'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const { loginUser } = useLoginUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await loginUser({ email, password })
      setToken(response.data.token)
      setMessage('Login successful')
    } catch (error: any) {
      setMessage(error.response.data.message || 'Login failed')
    }
  }

  return (
    <div className='max-w-md mx-auto p-4'>
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
      {token && <p className='mt-2'>Token: {token}</p>}
    </div>
  )
}

export default Login
