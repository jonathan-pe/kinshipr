// src/modules/login/Login.tsx
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/modules/_nonAuthed/login/-login-form'

export const Route = createFileRoute('/_nonAuthed/login')({ component: Login })

function Login() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-8'>
      <LoginForm />
    </div>
  )
}
