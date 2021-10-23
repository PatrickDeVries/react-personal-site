import { Text, variants, Tag, Button } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Icon from '@mdi/react';
import { mdiThemeLightDark } from '@mdi/js';
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { darkColors, lightColors } from '../styles/myColors';
import { darken, lighten } from 'polished';

const NavDiv = styled.div`
  ${() => {
    const { theme } = useTheme();
    return `
      width: 100%;
      height: 3rem;
      display: flex;
      align-items: center;
      background-color: ${theme.backgroundHighlight};
      color: ${theme.text};
      border-bottom: 1px solid ${theme.primary};
    `;
  }}
`;

const Header = styled.div`
  ${() => {
    const { theme } = useTheme();
    return `
      left: auto;
      margin-left: 2rem;
      filter: drop-shadow(0 0 0.75rem ${theme.secondary});
  `;
  }}
`;

const Footer = styled.div`
  margin-left: auto;
  margin-right: 1rem;
`;

const NavSection = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

const NavTag = styled(Tag.Container)`
  ${({ color }: { color: string }) => {
    const { theme } = useTheme();
    return `
      outline: 1px solid ${theme.primary};
      height: 100%;
      border-radius: 0 0 0 0;
      &:hover {
        background-color: ${
          color !== '#0000'
            ? theme.name === 'light'
              ? darken(0.1, color)
              : lighten(0.1, color)
            : theme.name === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(256, 256, 256, 0.05)'
        };
      }
  `;
  }}
`;

const Name = styled.span`
  white-space: nowrap;
`;

const pages = {
  Home: '/',
  'My Work': '/work',
  'Contact Me': '/contact',
  Résumé:
    'https://media-exp1.licdn.com/dms/document/C4E2DAQHCFUhb3AZYAA/profile-treasury-document-pdf-analyzed/0/1612393403952?e=1634878800&v=beta&t=h57kKXP43wP3HJhmKmdOWmvU4_L9wEgxKwJKdY4-m0I',
};

const MainNavigation = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  console.log(setTheme);
  const [dark, setDark] = React.useState<boolean>(true);

  return (
    <NavDiv>
      <Header>
        <Text size="1.5rem" color={theme.secondary}>
          <Name>Patrick DeVries</Name>
        </Text>
      </Header>
      <NavSection>
        {Object.keys(pages).map(label => (
          <Link href={pages[label]} key={label}>
            <a>
              <Tag
                color={router.pathname === pages[label] ? theme.strongHighlight : '#0000'}
                variant={variants.fill}
                StyledContainer={NavTag}
                containerProps={{
                  color: router.pathname === pages[label] ? theme.strongHighlight : '#0000',
                }}
              >
                <Text color={theme.text}>{label}</Text>
              </Tag>
            </a>
          </Link>
        ))}
      </NavSection>
      <Footer>
        <Button
          color="#0000"
          onClick={() => {
            setDark(!dark);
            if (dark) {
              setTheme(darkColors);
            } else {
              setTheme(lightColors);
            }
          }}
        >
          <Icon path={mdiThemeLightDark} size="1.5rem" color={theme.secondary} />
        </Button>
      </Footer>
    </NavDiv>
  );
};

export default MainNavigation;
