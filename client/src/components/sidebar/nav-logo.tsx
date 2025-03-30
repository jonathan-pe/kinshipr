import KinshiprLogo from '@/components/kinshipr-logo'
import { useSidebar } from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'

export default function NavLogo() {
  const { open } = useSidebar()
  return (
    <Link to='/feed' className='flex items-center space-x-2 justify-center'>
      <KinshiprLogo />
      {open && <h4>kinshipr</h4>}
    </Link>
  )
}
