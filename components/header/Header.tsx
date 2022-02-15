import { mdiCogOutline, mdiThemeLightDark } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/dist/client/router'
import React, { useContext } from 'react'
import { darkColors, lightColors } from '../../styles/myColors'
import { BackgroundControlContext } from '../BackgroundControlProvider'
import { useTheme } from '../ThemeContext'
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

const Header: React.FC = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
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
  const {
    setFirstHit,
    colorA,
    setColorA,
    colorB,
    setColorB,
    controlsOpen,
    setControlsOpen,
    updateState,
  } = useContext(BackgroundControlContext)

  const navItems: { label: string; onClick: () => void }[] = [
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
      label: 'Portfolio',
      onClick: () => {
        updateState()
        router.push('/portfolio')
        setSelected(1)
        setExpanded(false)
      },
    },
    {
      label: 'Contact',
      onClick: () => {
        updateState()
        router.push('/contact')
        setSelected(2)
        setExpanded(false)
      },
    },
    {
      label: 'Particles',
      onClick: () => {
        updateState()
        router.push('/background')
        setSelected(3)
        setExpanded(false)
      },
    },
  ]

  return (
    <>
      <Wrapper>
        <Logo>Patrick DeVries</Logo>
        <NavGroup>
          {navItems.map((item, index) => (
            <NavItem key={item.label} onClick={item.onClick} active={selected === index}>
              {item.label}
            </NavItem>
          ))}
        </NavGroup>
        <IconGroup>
          {router.pathname === '/background' && (
            <NavIcon
              onClick={() => {
                setControlsOpen(!controlsOpen)
                setFirstHit(false)
                setExpanded(false)
              }}
            >
              <Icon path={mdiCogOutline} size="1.5rem" />
            </NavIcon>
          )}
          <NavIcon
            onClick={() => {
              if (theme.name === 'light') {
                setTheme(darkColors)
                if (colorA === lightColors.primary && colorB === lightColors.secondary) {
                  setColorA(darkColors.primary)
                  setColorB(darkColors.secondary)
                }
              } else {
                setTheme(lightColors)
                if (colorA === darkColors.primary && colorB === darkColors.secondary) {
                  setColorA(lightColors.primary)
                  setColorB(lightColors.secondary)
                }
              }
            }}
          >
            <Icon path={mdiThemeLightDark} size="1.5rem" />
          </NavIcon>
          <NavIcon
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
