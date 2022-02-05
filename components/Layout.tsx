import Head from 'next/head'
import styled from 'styled-components'
import { MainNavigation } from '.'
import BackgroundParticles from './backgroundParticles/BackgroundParticles'

const Body = styled.div`
  background-repeat: no-repeat;
  ${({ theme }) =>
    `background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});`}
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-top: 3rem;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
`

const Layout = props => {
  return (
    <>
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      <BackgroundParticles />
      <MainNavigation />
      <Body>{props.children}</Body>
    </>
  )
}

export default Layout
