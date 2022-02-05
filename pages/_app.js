import React from 'react'
import { ThemeProvider } from '../components/ThemeContext'
import { darkColors, lightColors } from '../styles/myColors'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { BackgroundControlProvider } from '../components/BackgroundControlProvider'

function MyApp({ Component, pageProps }) {
  const [isInitialized, setIsInitialized] = React.useState(false)

  const [theme, setTheme] = React.useState(darkColors)
  React.useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('theme', JSON.stringify(theme))
    }
  }, [isInitialized, theme])

  React.useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem('theme')) || darkColors)
    setIsInitialized(true)
  }, [])

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <BackgroundControlProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BackgroundControlProvider>
    </ThemeProvider>
  )
}

export default MyApp
