'use client'

import * as React from 'react'
import { SidebarIcon } from 'lucide-react'

import NavModules from '@/components/sidebar/nav-modules'
import { NavUser } from '@/components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useUser } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function KinshiprSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <Link to='/feed'>
          <h4>kinshipr</h4>
        </Link>

        <SidebarTrigger className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
          <Button variant='ghost' size='icon'>
            <SidebarIcon />
          </Button>
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent>
        <NavModules />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
