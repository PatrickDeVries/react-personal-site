import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import BackgroundParticles from '../backgroundParticles'
import Header from '../header'
import { Body, Main } from './style'

const Layout = props => {
  const router = useRouter()
  const bodyRef = useRef<HTMLElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [router])

  return (
    <>
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      <BackgroundParticles />
      <Main>
        <Header />
        <Body tint={router.pathname !== '/background'} ref={bodyRef}>
          {props.children}
        </Body>
      </Main>
    </>
  )
}

export default Layout
