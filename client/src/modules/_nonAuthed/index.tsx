import { LoginForm } from '@/modules/_nonAuthed/login/-login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/')({
  component: Home,
})

function Home() {
  return (
    <div className='flex flex-1 items-center justify-between mx-auto space-x-48'>
      <h1 className='text-3xl font-bold'>Welcome to Kinshipr</h1>
      <LoginForm />
    </div>
  )
}
