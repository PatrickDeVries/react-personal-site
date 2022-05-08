import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import BackgroundParticles from '../backgroundParticles'
import Header from './header'
import { Body, Main } from './style'

const PARTICLE_WHITELIST = ['/', '/portfolio', '/contact', '/background']
interface Props {
  theme: 'light' | 'dark'
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ theme, setTheme, children }) => {
  const router = useRouter()
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [router])

  return (
    <>
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      {PARTICLE_WHITELIST.includes(router.pathname) && (
        <BackgroundParticles top={bodyRef.current?.offsetTop ?? 0} />
      )}
      <Main>
        <Header theme={theme} setTheme={setTheme} />
        <Body tint={router.pathname !== '/background'} ref={bodyRef}>
          {children}
        </Body>
      </Main>
    </>
  )
}

export default Layout
