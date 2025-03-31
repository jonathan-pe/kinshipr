import NotFound from '@/components/not-found'
import { routeTree } from '@/routeTree.gen'
import { useUser } from '@clerk/clerk-react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react'

const router = createRouter({
  routeTree,
  context: { user: undefined! },
  defaultNotFoundComponent: () => <NotFound />,
  defaultPendingComponent: () => <LoaderCircle className='animate-spin' />,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
  const user = useUser()

  if (!user || !user.isLoaded) {
    return (
      <div className='min-h-screen w-full flex justify-center items-center'>
        <LoaderCircle className='animate-spin' />
      </div>
    )
  }

  return <RouterProvider router={router} context={{ user }} />
}
