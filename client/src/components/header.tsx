import Breadcrumbs from '@/components/breadcrumbs'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Header() {
  return (
    <header className='flex h-16 items-center justify-between'>
      <nav className='flex items-center space-x-2 px-4'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </nav>
    </header>
  )
}
