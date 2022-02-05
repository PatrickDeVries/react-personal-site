import { Text } from '@headstorm/foundry-react-ui'
import Link from 'next/link'
import { useContext } from 'react'
import styled from 'styled-components'
import { BackgroundControlContext } from '../components/BackgroundControlProvider'
import { useTheme } from '../components/ThemeContext'

const GreetingBlock = styled.div<{ controlsOpen?: boolean }>`
  margin-top: ${({ controlsOpen }) => (controlsOpen ? '140' : '100')}%;
  filter: drop-shadow(0 0 4rem ${({ theme }) => theme.primary});
`

const IntroText = styled(Text.Container)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  text-align: center;
`

const CenteredA = styled.a`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

export default function Home() {
  const { controlsOpen } = useContext(BackgroundControlContext)
  const { theme } = useTheme()

  return (
    <>
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
    </>
  )
}
