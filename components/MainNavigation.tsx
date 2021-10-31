import { Text, variants, Tag, Button } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Icon from '@mdi/react';
import { mdiHamburger, mdiMenu, mdiThemeLightDark } from '@mdi/js';
import React, { useCallback } from 'react';
import { useTheme } from './ThemeContext';
import { darkColors, lightColors } from '../styles/myColors';
import { darken, lighten } from 'polished';
import MainNavigationF, { MainNavigationFProps, NavButton } from './MainNavigationF';
import { useState, useEffect } from 'react';

const NavDiv = styled(MainNavigationF.Container)`
  ${() => {
    const { theme } = useTheme();
    return `
      background-color: ${theme.backgroundHighlight};
      color: ${theme.text};
      border-bottom: 1px solid ${theme.primary};
      z-index: 5;
    `;
  }}
`;

const NavSection = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

const NavTag = styled(MainNavigationF.NavButtonContainer)`
  padding: 1rem;
`;

const Name = styled.span`
  white-space: nowrap;
`;

const useMediaQuery = width => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};

const MainNavigation = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<number>(
    router.pathname === '/'
      ? 0
      : router.pathname === '/work'
      ? 1
      : router.pathname === '/contact'
      ? 2
      : 3,
  );

  const navLinks: NavButton[] = [
    {
      label: 'Home',
      onClick: () => {
        router.push('/');
        setSelected(0);
        setExpanded(false);
      },
    },
    {
      label: 'My Work',
      onClick: () => {
        router.push('/work');
        setSelected(1);
        setExpanded(false);
      },
    },
    {
      label: 'Contact Me',
      onClick: () => {
        router.push('/contact');
        setSelected(2);
        setExpanded(false);
      },
    },
    {
      label: 'Résumé',
      onClick: () => {
        router.push(
          'https://docs.google.com/document/d/1ShEG5LOTRDRSrXFYFUleTOYWL_tbf7We030Vdn3cPv0/edit?usp=sharing',
        );
        setSelected(3);
        setExpanded(false);
      },
    },
  ];

  const isBreakpoint = useMediaQuery(800);

  return (
    <MainNavigationF
      color={theme.backgroundHighlight}
      StyledContainer={NavDiv}
      navButtons={navLinks}
      StyledNavButton={NavTag}
      activeButton={selected}
      header={
        <Link href="/" passHref={true}>
          <a>
            <Text size="1.5rem" color={theme.secondary}>
              <Name>Patrick DeVries</Name>
            </Text>
          </a>
        </Link>
      }
      hideBody={isBreakpoint && !expanded}
      bodyBelow={isBreakpoint}
      footer={
        <>
          <Button
            color="#0000"
            onClick={() => {
              if (theme.name === 'light') {
                setTheme(darkColors);
              } else {
                setTheme(lightColors);
              }
            }}
          >
            <Icon path={mdiThemeLightDark} size="1.5rem" color={theme.secondary} />
          </Button>
          {isBreakpoint ? (
            <Button
              color="#0000"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <Icon path={mdiMenu} size="1.5rem" color={theme.secondary} />
            </Button>
          ) : (
            ''
          )}
        </>
      }
    />
  );
};

export default MainNavigation;
