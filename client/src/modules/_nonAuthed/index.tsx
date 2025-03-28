import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonAuthed/')({
  component: Home,
})

function Home() {
  return <div className='flex flex-1 flex-col items-center justify-center mx-auto'>Landing Page</div>
}
