import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { MainNavigation } from '.';
import { useTheme } from './ThemeContext';

const HomeDiv = styled.div`
  ${() => {
    const { theme } = useTheme();
    return `
  background-repeat: no-repeat;
  background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  `;
  }}
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: fit-content;
`;

const Layout = props => (
  <HomeDiv>
    <Head>
      <title>Patrick DeVries</title>
    </Head>
    <MainNavigation />
    <Body>{props.children}</Body>
  </HomeDiv>
);

export default Layout;
