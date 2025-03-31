import NotFound from '@/components/not-found'
import Pending from '@/components/pending'
import { routeTree } from '@/routeTree.gen'
import { useUser } from '@clerk/clerk-react'
import { createRouter, RouterProvider } from '@tanstack/react-router'

const router = createRouter({
  routeTree,
  context: { user: undefined! },
  defaultNotFoundComponent: () => <NotFound />,
  defaultPendingComponent: () => <Pending />,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
  const user = useUser()

  if (!user || !user.isLoaded) {
    return <Pending />
  }

  return <RouterProvider router={router} context={{ user }} />
}
