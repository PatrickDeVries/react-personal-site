// import { Card } from '@headstorm/foundry-react-ui'
import Head from 'next/head';
// import Image from 'next/image'
import { MainNavigation } from '../components';
import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import myColors from '../styles/myColors';
import React from 'react';
import myWork from '../resources/myWork';
import WorkCard from '../components/WorkCard';

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
  align-items: center;
  height: fit-content;
`;

const IntroText = styled(Text.Container)`
  display: block;
`;

const WorkItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Home() {
  return (
    <HomeDiv>
      <link rel="preload" href="public/fonts/neon_pixel-7.ttf" as="font" crossOrigin="" />
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      <MainNavigation />
      <Body>
        <Text color="white" StyledContainer={IntroText} size="2rem">
          Hello, I'm Patrick
        </Text>
        <Text color={myColors.primary} StyledContainer={IntroText}>
          Check out my projects:
        </Text>

        <WorkItems>
          {myWork.map(item => (
            <WorkCard key={item.header} item={item} />
          ))}
        </WorkItems>
      </Body>
    </HomeDiv>
  );
}
