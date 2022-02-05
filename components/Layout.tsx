import Head from 'next/head'
import styled from 'styled-components'
import { MainNavigation } from '.'
import FiberLayout from './FiberLayout'

const HomeDiv = styled.div`
  background-repeat: no-repeat;
  ${({ theme }) =>
    `background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});`}
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const Layout = props => {
  return (
    <>
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      <FiberLayout />
      <HomeDiv>
        <MainNavigation />
        <Body>{props.children}</Body>
      </HomeDiv>
    </>
  )
}

export default Layout
