import Link from 'next/link';
import { Layout } from '../components';
import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import myColors from '../styles/myColors';
import React from 'react';

const GreetingBlock = styled.div`
  margin-top: 100%;
  filter: drop-shadow(0 0 4rem ${myColors.primary});
`;

const IntroText = styled(Text.Container)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  text-align: center;
`;

const CenteredA = styled.a`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export default function Home() {
  return (
    <Layout>
      <GreetingBlock>
        <Text color="white" StyledContainer={IntroText} size="2rem">
          Welcome to my website
        </Text>
        <Link href="/work" passHref={true}>
          <CenteredA>
            <Text color={myColors.primary} StyledContainer={IntroText}>
              Check out my projects
            </Text>
          </CenteredA>
        </Link>
      </GreetingBlock>
    </Layout>
  );
}
