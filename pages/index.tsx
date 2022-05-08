import { Button, variants } from '@headstorm/foundry-react-ui'
import { useRouter } from 'next/dist/client/router'
import styled, { useTheme } from 'styled-components'

const GreetingBlock = styled.div<{ controlsOpen?: boolean }>`
  flex: 1;
  padding: 1rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  filter: drop-shadow(0 0 4rem ${({ theme }) => theme.primary});
  font-size: 2rem;
`

const IntroText = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 3rem;

  > b {
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
  }
`

const Index: React.FC = () => {
  const router = useRouter()
  const theme = useTheme()
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
