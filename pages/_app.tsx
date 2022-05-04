import { I18nProvider, useLocale } from '@react-aria/i18n'
import { SSRProvider } from '@react-aria/ssr'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Layout from '../components/layout'
import { BackgroundControlProvider } from '../providers/BackgroundControlProvider'
import { ThemeProvider as CustomThemeProvider } from '../providers/ThemeProvider'
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
    setTheme(JSON.parse(localStorage.getItem('theme'))?.name === 'light' ? lightColors : darkColors)
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
