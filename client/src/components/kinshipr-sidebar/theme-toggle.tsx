// src/components/theme-toggle.tsx
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/hooks/useTheme'
import { Moon } from 'lucide-react'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <DropdownMenuItem onClick={toggleTheme} className='cursor-pointer'>
      <div className='flex flex-1 items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Moon />
          <span>Dark Mode</span>
        </div>
      </div>
      <Switch checked={theme !== 'light'} className='cursor-pointer' />
    </DropdownMenuItem>
  )
}

export default ThemeToggle
