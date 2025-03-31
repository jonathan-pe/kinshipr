import KinshiprLogo from '@/components/kinshipr-logo'
import { LoginForm } from '@/modules/_nonAuthed/login/-login-form'
import { GoogleOneTap } from '@clerk/clerk-react'

export default function LandingPage() {
  return (
    <>
      <div className='flex flex-1 justify-center items-center w-full space-x-40'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <KinshiprLogo className='w-96 h-auto' />
          <h1 className='text-3xl font-bold'>Kinshipr</h1>
        </div>
        <LoginForm />
      </div>

      <GoogleOneTap />
    </>
  )
}
