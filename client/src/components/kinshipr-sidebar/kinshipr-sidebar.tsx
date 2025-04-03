'use client'

import * as React from 'react'

import NavModules from '@/components/kinshipr-sidebar/nav-modules'
import { NavUser } from '@/components/kinshipr-sidebar/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { useUser } from '@clerk/clerk-react'
import NavLogo from '@/components/kinshipr-sidebar/nav-logo'

export function KinshiprSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <NavLogo />
      </SidebarHeader>

      <SidebarContent>
        <NavModules />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
