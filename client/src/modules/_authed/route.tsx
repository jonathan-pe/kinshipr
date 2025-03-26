// src/modules/_authed/route.tsx
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import useAuthStore from '@/store/authStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
})

function RouteComponent() {
  const token = useAuthStore((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate({ to: '/login' }) // Redirect to login if no token
    }
  }, [token, navigate])

  if (!token) {
    return null // Don't render outlet if not authenticated
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center mx-auto'>
      <Outlet />
    </div>
  )
}
