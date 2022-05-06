import { Button, variants } from '@headstorm/foundry-react-ui'
import { useRouter } from 'next/dist/client/router'
import styled from 'styled-components'
import { useTheme } from '../providers/ThemeProvider'

const GreetingBlock = styled.div<{ controlsOpen?: boolean }>`
  flex: 1;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  filter: drop-shadow(0 0 4rem ${({ theme }) => theme.primary});
`

const IntroText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  padding: 1rem;

  > b {
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
  }
`

const Index: React.FC = () => {
  const router = useRouter()
  const { theme } = useTheme()
  return (
    <>
      <GreetingBlock>
        <IntroText>
          {`Hello, I'm `} <b>Patrick DeVries</b>, a full-stack developer
        </IntroText>
        <Button
          color={theme.focus}
          variant={variants.text}
          onClick={() => router.push('/portfolio')}
        >
          Check out my projects
        </Button>
      </GreetingBlock>
    </>
  )
}

export default Index
