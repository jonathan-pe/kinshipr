// src/contexts/ThemeContext.tsx
import { Theme, ThemeContext } from '@/contexts/ThemeContext'
import React, { useState, useEffect } from 'react'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null

    if (storedTheme) {
      return storedTheme // Use stored theme if available
    } else {
      // Check system preference if no stored theme
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
