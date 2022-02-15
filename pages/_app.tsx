import { I18nProvider, useLocale } from '@react-aria/i18n'
import { SSRProvider } from '@react-aria/ssr'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BackgroundControlProvider } from '../components/BackgroundControlProvider'
import Layout from '../components/Layout'
import { ThemeProvider as CustomThemeProvider } from '../components/ThemeContext'
import '../styles/globals.css'
import { darkColors, lightColors } from '../styles/myColors'

function MyApp({ Component, pageProps }) {
  const [isInitialized, setIsInitialized] = React.useState(false)
  const { locale, direction } = useLocale()

  const [theme, setTheme] = React.useState(darkColors)
  React.useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('theme', JSON.stringify(theme))
    }
  }, [isInitialized, theme])

  React.useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem('theme')) || darkColors)
    if (theme.name === 'light') setTheme(lightColors)
    else setTheme(darkColors)
    setIsInitialized(true)
  }, [])

  return (
    <SSRProvider>
      <I18nProvider locale={locale}>
        <ThemeProvider theme={theme}>
          <CustomThemeProvider value={{ theme, setTheme }}>
            <BackgroundControlProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </BackgroundControlProvider>
          </CustomThemeProvider>
        </ThemeProvider>
      </I18nProvider>
    </SSRProvider>
  )
}

export default MyApp
