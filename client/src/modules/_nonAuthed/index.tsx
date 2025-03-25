import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/')({
  component: Home,
})

function Home() {
  return <div className='min-h-screen w-full flex flex-col items-center justify-center mx-auto'>Landing Page</div>
}
