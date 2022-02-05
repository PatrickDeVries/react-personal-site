import React, { createContext, useContext } from 'react'

export type Theme = {
  name: string
  text: string
  primary: string
  secondary: string
  background: string
  backgroundHighlight: string
  strongHighlight: string
}

export type ThemeProviderType = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeProviderType>(null)
export const useTheme = () => useContext(ThemeContext)
export const ThemeProvider = ThemeContext.Provider
