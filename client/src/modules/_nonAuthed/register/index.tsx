// src/modules/register/Register.tsx
import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/modules/_nonAuthed/register/-register-form'
import { useState } from 'react'
import { VerifyForm } from '@/modules/_nonAuthed/register/-verify-form'

export const Route = createFileRoute('/_nonAuthed/register/')({ component: Register })

function Register() {
  const [verifying, setVerifying] = useState(false)

  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-8'>
      {verifying ? <VerifyForm /> : <RegisterForm setVerifying={setVerifying} />}
    </div>
  )
}
