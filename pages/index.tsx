import Link from 'next/link';
import { Layout } from '../components';
import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import React from 'react';
import { useTheme } from '../components/ThemeContext';

const GreetingBlock = styled.div`
  ${() => {
    const { theme } = useTheme();
    return `
      margin-top: 100%;
      filter: drop-shadow(0 0 4rem ${theme.primary});`;
  }}
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
  const { theme } = useTheme();

  return (
    <Layout>
      <GreetingBlock>
        <Text color={theme.text} StyledContainer={IntroText} size="2rem">
          Welcome to my website
        </Text>
        <Link href="/work" passHref={true}>
          <CenteredA>
            <Text color={theme.primary} StyledContainer={IntroText}>
              Check out my projects
            </Text>
          </CenteredA>
        </Link>
      </GreetingBlock>
    </Layout>
  );
}
