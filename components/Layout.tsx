import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import BackgroundParticles from './backgroundParticles'
import Header from './header'

const Main = styled.div`
  background-repeat: no-repeat;
  ${({ theme }) =>
    `background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});`}
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 2;
`

const Body = styled.div<{ tint?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  ${({ tint, theme }) => tint && `background-color: ${theme.background}77;`}
`

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
