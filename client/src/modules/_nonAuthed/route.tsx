import ThemeToggle from '@/components/theme-toggle'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='container min-h-screen flex flex-col items-center justify-center mx-auto'>
      <header className='flex justify-between items-center w-full p-4'>
        <h2>kinshipr</h2>
        <ThemeToggle />
      </header>
      <Outlet />
    </div>
  )
}
