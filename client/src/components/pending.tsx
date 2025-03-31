import { LoaderCircle } from 'lucide-react'

export default function Pending() {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <LoaderCircle className='animate-spin' />
    </div>
  )
}
