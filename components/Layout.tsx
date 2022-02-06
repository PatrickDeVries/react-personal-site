import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import styled from 'styled-components'
import BackgroundParticles from './backgroundParticles/'
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
  return (
    <>
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      <BackgroundParticles />
      <Main>
        <Header />
        <Body tint={router.pathname !== '/background'}>{props.children}</Body>
      </Main>
    </>
  )
}

export default Layout
