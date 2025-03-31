import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <h1>Not Found</h1>
      <p className='text-lg text-accent-foreground mb-10'>The page you are looking for does not exist.</p>
      <Link to='/'>Go home</Link>
    </div>
  )
}
