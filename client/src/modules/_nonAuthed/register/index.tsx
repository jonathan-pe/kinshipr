// src/modules/register/Register.tsx
import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/modules/_nonAuthed/register/-register-form'

export const Route = createFileRoute('/_nonAuthed/register/')({ component: Register })

function Register() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-8'>
      <RegisterForm />
    </div>
  )
}
