import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { MainNavigation } from '.';

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
    <link rel="preload" href="public/fonts/neon_pixel-7.ttf" as="font" crossOrigin="" />
    <Head>
      <title>Patrick DeVries</title>
    </Head>
    <MainNavigation />
    <Body>{props.children}</Body>
  </HomeDiv>
);

export default Layout;
