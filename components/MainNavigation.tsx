import { Button, Text } from '@headstorm/foundry-react-ui'
import { mdiMenu, mdiThemeLightDark } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { darkColors, lightColors } from '../styles/myColors'
import { BackgroundControlContext } from './BackgroundControlProvider'
import MainNavigationF, { NavButton } from './MainNavigationF'
import { useTheme } from './ThemeContext'

const NavDiv = styled(MainNavigationF.Container)`
  background-color: ${({ theme }) => theme.backgroundHighlight};
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  z-index: 2;
  width: 100%;
`

const NavTag = styled(MainNavigationF.NavButtonContainer)`
  padding: 1rem;
`

const Name = styled.span`
  white-space: nowrap;
`

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addListener(updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeListener(updateTarget)
  }, [updateTarget, width])

  return targetReached
}

const MainNavigation: React.FC = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [expanded, setExpanded] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<number>(
    router.pathname === '/'
      ? 0
      : router.pathname === '/work'
      ? 1
      : router.pathname === '/contact'
      ? 2
      : 3,
  )
  const { controlsOpen, setControlsOpen, updateState } = useContext(BackgroundControlContext)

  const navLinks: NavButton[] = [
    {
      label: 'Home',
      onClick: () => {
        updateState()
        router.push('/')
        setSelected(0)
        setExpanded(false)
      },
    },
    {
      label: 'My Work',
      onClick: () => {
        updateState()
        router.push('/work')
        setSelected(1)
        setExpanded(false)
      },
    },
    {
      label: 'Contact Me',
      onClick: () => {
        updateState()
        router.push('/contact')
        setSelected(2)
        setExpanded(false)
      },
    },

    router.pathname === '/' && {
      label: 'Toggle Background Settings',
      onClick: () => {
        setControlsOpen(!controlsOpen)
        setExpanded(false)
      },
    },
  ]

  const isBreakpoint = useMediaQuery(1000)

  return (
    <MainNavigationF
      color={theme.backgroundHighlight}
      height="3rem"
      StyledContainer={NavDiv}
      navButtons={navLinks}
      StyledNavButton={NavTag}
      activeButton={selected}
      header={
        <Link href="/" passHref={true}>
          <a onClick={updateState}>
            <Text size="1.5rem" color={theme.secondary}>
              <Name>Patrick DeVries</Name>
            </Text>
          </a>
        </Link>
      }
      hideBody={isBreakpoint && !expanded}
      bodyBelow={isBreakpoint}
      position="absolute; top: 0; left: 0;"
      footer={
        <>
          <Button
            color="#0000"
            onClick={() => {
              if (theme.name === 'light') {
                setTheme(darkColors)
              } else {
                setTheme(lightColors)
              }
            }}
          >
            <Icon path={mdiThemeLightDark} size="1.5rem" color={theme.secondary} />
          </Button>
          {isBreakpoint ? (
            <Button
              color="#0000"
              onClick={() => {
                setExpanded(!expanded)
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
  )
}

export default MainNavigation
