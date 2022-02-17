import Link from 'next/link'
import styled from 'styled-components'

const GreetingBlock = styled.div<{ controlsOpen?: boolean }>`
  flex: 1;
  align-self: center;
  align-items: center;
  display: flex;
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

const CenteredA = styled.a`
  text-align: center;
  font-size: 1.25rem;
  padding: 1rem;
  color: ${({ theme }) => theme.text};

  border: 2px ${({ theme }) => theme.text} solid;
`

export default function Home() {
  return (
    <>
      <GreetingBlock>
        <IntroText>
          {`Hello, I'm `} <b>Patrick DeVries</b>, a full-stack developer
        </IntroText>
        <Link href="/portfolio" passHref={true}>
          <CenteredA>Check out my projects</CenteredA>
        </Link>
      </GreetingBlock>
    </>
  )
}
