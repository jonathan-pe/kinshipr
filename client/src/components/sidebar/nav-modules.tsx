import { Bell, CalendarDays, Handshake, MessageCircle, Search, type LucideIcon } from 'lucide-react'

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'

const MODULES = [
  {
    name: 'Events',
    url: '/events',
    icon: CalendarDays as LucideIcon,
  },
  {
    name: 'Explore',
    url: '/explore',
    icon: Search as LucideIcon,
  },
  {
    name: 'Groups',
    url: '/groups',
    icon: Handshake as LucideIcon,
  },
  {
    name: 'Messages',
    url: '/messages',
    icon: MessageCircle as LucideIcon,
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: Bell as LucideIcon,
  },
]

export default function NavModules() {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarMenu>
        {MODULES.map((module) => (
          <SidebarMenuItem key={module.name}>
            <SidebarMenuButton asChild>
              <Link to={module.url} className='text-foreground'>
                <module.icon />
                <span>{module.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
