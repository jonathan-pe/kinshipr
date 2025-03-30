// src/components/ThemeToggle.tsx
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <DropdownMenuItem onClick={toggleTheme} className='cursor-pointer'>
      {theme === 'light' ? (
        <>
          <Moon /> Dark Mode
        </>
      ) : (
        <>
          <Sun /> Light Mode
        </>
      )}
      {}
    </DropdownMenuItem>
  )
}

export default ThemeToggle
