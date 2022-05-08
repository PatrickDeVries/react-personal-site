import { useLocale } from '@react-aria/i18n'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Global } from '../components/ theme/global'
import { dark, light } from '../components/ theme/theme'
import Layout from '../components/layout'
import { BackgroundControlProvider } from '../components/particleControlCard/provider'

function MyApp({ Component, pageProps }) {
  const [isInitialized, setIsInitialized] = React.useState(false)
  const { locale } = useLocale()

  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark')

  React.useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('theme', JSON.stringify(theme))
    }
  }, [isInitialized, theme])

  React.useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem('theme'))?.name === 'light' ? 'light' : 'dark')
    setIsInitialized(true)
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Global />
      <BackgroundControlProvider>
        <Layout theme={theme} setTheme={setTheme}>
          <Component {...pageProps} />
        </Layout>
      </BackgroundControlProvider>
    </ThemeProvider>
  )
}

export default MyApp
