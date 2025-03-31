import HomePage from '@/modules/_home/-home-page'
import LandingPage from '@/modules/_home/-landing-page'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { isSignedIn } = useAuth()

  return isSignedIn ? <HomePage /> : <LandingPage />
}
