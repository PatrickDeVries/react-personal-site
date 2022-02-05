import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { MainNavigation } from '.'
import FiberLayout from './FiberLayout'
import { useTheme } from './ThemeContext'

const HomeDiv = styled.div`
  ${() => {
    const { theme } = useTheme()
    return `
    background-repeat: no-repeat;
    background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
  `
  }}
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30rem;
  padding-bottom: 5rem;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const Layout = props => {
  return (
    <>
      <HomeDiv>
        <MainNavigation />
        <Head>
          <title>Patrick DeVries</title>
        </Head>
        <FiberLayout />
        <Body>{props.children}</Body>
      </HomeDiv>
    </>
  )
}

export default Layout
