import { mdiCogOutline, mdiThemeLightDark } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useRef } from 'react'
import { dark, light } from '../../ theme/theme'
import { BackgroundControlContext } from '../../particleControlCard/provider'
import {
  BarWrapper,
  DropDown,
  DropDownItem,
  IconGroup,
  Logo,
  MenuIcon,
  MenuIconBar,
  MenuWrapper,
  NavGroup,
  NavIcon,
  NavItem,
  Wrapper,
} from './style'

interface Props {
  theme: 'light' | 'dark'
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

const Header: React.FC<Props> = ({ theme, setTheme }) => {
  const router = useRouter()
  const [expanded, setExpanded] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<number>(
    router.pathname === '/'
      ? 0
      : router.pathname === '/portfolio'
      ? 1
      : router.pathname === '/contact'
      ? 2
      : router.pathname === '/background'
      ? 3
      : 4,
  )
  const gearRef = useRef<HTMLDivElement>(null)

  const {
    setFirstHit,
    mouseSize,
    setMouseSize,
    colorA,
    setColorA,
    colorB,
    setColorB,
    controlsOpen,
    setControlsOpen,
    updateState,
  } = useContext(BackgroundControlContext)

  const navItems: { route: string; label: string; onClick: () => void }[] = [
    {
      route: '/',
      label: 'Home',
      onClick: () => {
        updateState()
        router.push('/')
        setSelected(0)
        setExpanded(false)
      },
    },
    {
      route: '/portfolio',
      label: 'Portfolio',
      onClick: () => {
        updateState()
        router.push('/portfolio')
        setSelected(1)
        setExpanded(false)
      },
    },
    {
      route: '/contact',
      label: 'Contact',
      onClick: () => {
        updateState()
        router.push('/contact')
        setSelected(2)
        setExpanded(false)
      },
    },
    {
      route: '/background',
      label: 'Particles',
      onClick: () => {
        updateState()
        router.push('/background')
        setSelected(3)
        setExpanded(false)
      },
    },
  ]

  useEffect(() => {
    if (document) {
      document.onkeyup = event => {
        if (event.key === 'Escape') {
          if (gearRef.current) {
            gearRef.current.click()
          }
        } else if (event.key === '=') {
          setMouseSize(mouseSize + 0.5 < 5 ? mouseSize + 0.5 : 5)
        } else if (event.key === '-') {
          setMouseSize(mouseSize - 0.5 > 0 ? mouseSize - 0.5 : 0)
        }
      }
    }
  }, [mouseSize, setMouseSize])
  return (
    <>
      <Wrapper>
        <Logo>Patrick DeVries</Logo>
        <NavGroup>
          {navItems.map((item, index) => (
            <NavItem
              key={item.label}
              onClick={item.onClick}
              active={router.pathname === item.route}
            >
              {item.label}
            </NavItem>
          ))}
        </NavGroup>
        <IconGroup>
          {router.pathname === '/background' && (
            <NavIcon
              title="Edit background settings"
              onClick={() => {
                setControlsOpen(!controlsOpen)
                setFirstHit(false)
                setExpanded(false)
              }}
              ref={gearRef}
            >
              <Icon path={mdiCogOutline} size="1.5rem" />
            </NavIcon>
          )}
          <NavIcon
            title={`Change to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={() => {
              if (theme === 'light') {
                setTheme('dark')
                if (colorA === light.primary && colorB === light.secondary) {
                  setColorA(dark.primary)
                  setColorB(dark.secondary)
                }
              } else {
                setTheme('light')
                if (colorA === dark.primary && colorB === dark.secondary) {
                  setColorA(light.primary)
                  setColorB(light.secondary)
                }
              }
            }}
          >
            <Icon path={mdiThemeLightDark} size="1.5rem" />
          </NavIcon>
          <NavIcon
            title="Open navigation"
            mobileOnly
            onClick={() => {
              setExpanded(!expanded)
            }}
          >
            <MenuWrapper>
              <MenuIcon expanded={expanded} size="1.5rem">
                <BarWrapper>
                  <MenuIconBar />
                </BarWrapper>
                <BarWrapper>
                  <MenuIconBar />
                </BarWrapper>
                <BarWrapper>
                  <MenuIconBar />
                </BarWrapper>
              </MenuIcon>
            </MenuWrapper>
          </NavIcon>
        </IconGroup>
      </Wrapper>
      <DropDown expanded={expanded}>
        {navItems.map((item, index) => (
          <DropDownItem key={item.label} onClick={item.onClick} active={selected === index}>
            {item.label}
          </DropDownItem>
        ))}
      </DropDown>
    </>
  )
}

export default Header
